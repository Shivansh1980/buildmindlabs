export type ContactFormValues = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
  website: string;
};

export type ContactSubmissionResult = {
  id?: number;
  status?: string;
  message?: string;
};

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  company?: string;
  project_type?: string;
  budget?: string;
  website?: string;
};

export type ContactRateLimitConfig = {
  cooldownSeconds: number;
  windowSeconds: number;
  maxSubmissions: number;
};

export type ClientRateLimitState =
  | { limited: false; retryAfterSeconds: 0 }
  | { limited: true; retryAfterSeconds: number };

export type ContactApiErrorCode =
  | "configuration"
  | "validation"
  | "rate-limited"
  | "timeout"
  | "network"
  | "server";

export class ContactApiError extends Error {
  readonly code: ContactApiErrorCode;
  readonly status?: number;
  readonly retryAfterSeconds?: number;

  constructor(
    message: string,
    code: ContactApiErrorCode,
    options: { status?: number; retryAfterSeconds?: number } = {},
  ) {
    super(message);
    this.name = "ContactApiError";
    this.code = code;
    this.status = options.status;
    this.retryAfterSeconds = options.retryAfterSeconds;
  }
}

export const CONTACT_FIELD_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  company: { max: 150 },
  projectType: { max: 100 },
  budget: { max: 50 },
  message: { min: 10, max: 5_000 },
  website: { max: 200 },
} as const;

const STORAGE_KEY = "buildmindlabs:contact-submissions:v1";
let inMemorySubmissionTimes: number[] = [];

function normalizeValues(values: ContactFormValues): ContactFormValues {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, value.trim()]),
  ) as ContactFormValues;
}

function validateValues(values: ContactFormValues): ContactFormValues {
  const normalized = normalizeValues(values);
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    normalized.email,
  );

  if (
    normalized.name.length < CONTACT_FIELD_LIMITS.name.min ||
    normalized.name.length > CONTACT_FIELD_LIMITS.name.max ||
    normalized.email.length === 0 ||
    normalized.email.length > CONTACT_FIELD_LIMITS.email.max ||
    !emailLooksValid ||
    normalized.company.length > CONTACT_FIELD_LIMITS.company.max ||
    normalized.projectType.length > CONTACT_FIELD_LIMITS.projectType.max ||
    normalized.budget.length > CONTACT_FIELD_LIMITS.budget.max ||
    normalized.message.length < CONTACT_FIELD_LIMITS.message.min ||
    normalized.message.length > CONTACT_FIELD_LIMITS.message.max ||
    normalized.website.length > CONTACT_FIELD_LIMITS.website.max
  ) {
    throw new ContactApiError(
      "One or more contact fields are invalid.",
      "validation",
    );
  }

  return normalized;
}

function validateEndpoint(endpoint: string): string {
  try {
    const url = new URL(endpoint, window.location.origin);
    const isLoopback =
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname === "[::1]";
    const isSameOrigin = url.origin === window.location.origin;

    if (
      url.protocol !== "https:" &&
      !(url.protocol === "http:" && (isLoopback || isSameOrigin))
    ) {
      throw new Error("Contact endpoint must use HTTPS.");
    }

    return url.toString();
  } catch {
    throw new ContactApiError(
      "The contact endpoint is not configured correctly.",
      "configuration",
    );
  }
}

function parseRetryAfter(value: string | null): number | undefined {
  if (!value) {
    return undefined;
  }

  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds >= 0) {
    return Math.ceil(seconds);
  }

  const retryAt = Date.parse(value);
  if (Number.isNaN(retryAt)) {
    return undefined;
  }

  return Math.max(0, Math.ceil((retryAt - Date.now()) / 1_000));
}

async function readResponseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) {
    return undefined;
  }

  if (response.headers.get("content-type")?.includes("application/json")) {
    try {
      return JSON.parse(text) as unknown;
    } catch {
      return undefined;
    }
  }

  return text.slice(0, 500);
}

function errorDetail(body: unknown): string {
  if (typeof body === "string") {
    return body;
  }

  if (!body || typeof body !== "object") {
    return "Unable to send your message.";
  }

  const detail = (body as { detail?: unknown }).detail;
  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    const messages = detail.flatMap((item) => {
      if (!item || typeof item !== "object") {
        return [];
      }

      const message = (item as { msg?: unknown }).msg;
      return typeof message === "string" ? [message] : [];
    });

    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  return "Unable to send your message.";
}

export async function submitContact(
  endpoint: string,
  values: ContactFormValues,
  timeoutMs: number,
): Promise<ContactSubmissionResult> {
  const safeEndpoint = validateEndpoint(endpoint);
  const normalized = validateValues(values);
  const payload: ContactPayload = {
    name: normalized.name,
    email: normalized.email,
    message: normalized.message,
    ...(normalized.company ? { company: normalized.company } : {}),
    ...(normalized.projectType
      ? { project_type: normalized.projectType }
      : {}),
    ...(normalized.budget ? { budget: normalized.budget } : {}),
    ...(normalized.website ? { website: normalized.website } : {}),
  };
  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort("contact-request-timeout"),
    timeoutMs,
  );

  try {
    const response = await fetch(safeEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      credentials: "omit",
      redirect: "error",
      referrerPolicy: "strict-origin-when-cross-origin",
      signal: controller.signal,
    });
    const body = await readResponseBody(response);

    if (!response.ok) {
      const retryAfterSeconds = parseRetryAfter(
        response.headers.get("Retry-After"),
      );

      if (response.status === 429) {
        throw new ContactApiError(
          "Too many contact requests.",
          "rate-limited",
          { status: response.status, retryAfterSeconds },
        );
      }

      throw new ContactApiError(errorDetail(body), "server", {
        status: response.status,
      });
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return {};
    }

    const result = body as Record<string, unknown>;
    return {
      ...(typeof result.id === "number" ? { id: result.id } : {}),
      ...(typeof result.status === "string" ? { status: result.status } : {}),
      ...(typeof result.message === "string"
        ? { message: result.message }
        : {}),
    };
  } catch (error) {
    if (error instanceof ContactApiError) {
      throw error;
    }

    if (controller.signal.aborted) {
      throw new ContactApiError(
        "The contact request timed out.",
        "timeout",
      );
    }

    throw new ContactApiError(
      "The contact service could not be reached.",
      "network",
    );
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function readSubmissionTimes(): number[] {
  if (typeof window === "undefined") {
    return inMemorySubmissionTimes;
  }

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) {
      return inMemorySubmissionTimes;
    }

    const parsed = JSON.parse(value) as unknown;
    if (
      Array.isArray(parsed) &&
      parsed.every((entry) => typeof entry === "number" && Number.isFinite(entry))
    ) {
      return parsed;
    }
  } catch {
    // Storage may be unavailable in privacy modes; the in-memory fallback remains.
  }

  return inMemorySubmissionTimes;
}

function writeSubmissionTimes(times: number[]): void {
  inMemorySubmissionTimes = times;

  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(times));
  } catch {
    // A client-side cooldown is a UX guard, so storage failure is non-fatal.
  }
}

export function getClientRateLimit(
  config: ContactRateLimitConfig,
  now = Date.now(),
): ClientRateLimitState {
  const cooldownMs = Math.max(0, config.cooldownSeconds) * 1_000;
  const windowMs = Math.max(0, config.windowSeconds) * 1_000;
  const windowStart = now - windowMs;
  const recentTimes = readSubmissionTimes()
    .filter((timestamp) => timestamp >= windowStart && timestamp <= now)
    .sort((left, right) => left - right);
  const lastSubmission = recentTimes.at(-1);
  const cooldownRemaining =
    lastSubmission === undefined ? 0 : lastSubmission + cooldownMs - now;
  const windowRemaining =
    recentTimes.length < Math.max(1, config.maxSubmissions)
      ? 0
      : recentTimes[0] + windowMs - now;
  const retryAfterMs = Math.max(cooldownRemaining, windowRemaining, 0);

  if (retryAfterMs <= 0) {
    return { limited: false, retryAfterSeconds: 0 };
  }

  return {
    limited: true,
    retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1_000)),
  };
}

export function recordClientSubmission(
  config: ContactRateLimitConfig,
  now = Date.now(),
): void {
  const windowStart = now - Math.max(0, config.windowSeconds) * 1_000;
  const recentTimes = readSubmissionTimes().filter(
    (timestamp) => timestamp >= windowStart && timestamp <= now,
  );

  writeSubmissionTimes([...recentTimes, now]);
}
