export type LinkData = {
  label: string;
  href: string;
};

export type OptionData = {
  value: string;
  label: string;
};

export interface SiteData {
  brand: {
    name: string;
    shortName: string;
    alternateName: string;
    description: string;
    footerText: string;
    email: string;
    location: string;
    responseTime: string;
    socialLinks: Array<LinkData & { icon: string }>;
  };
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
    favicon: string;
    ogImage: string;
    ogImageAlt: string;
    locale: string;
    themeColor: string;
    robots: string;
    googleSiteVerification: string;
  };
  nav: LinkData[];
  navigation: {
    skipLinkLabel: string;
    openMenuLabel: string;
    closeMenuLabel: string;
  };
  actions: {
    startProject: LinkData;
    viewWork: LinkData;
    email: LinkData;
  };
  themeSwitcher: {
    ariaLabel: string;
    menuLabel: string;
    themes: {
      light: string;
      dark: string;
      midnight: string;
      sepia: string;
      clay: string;
    };
  };
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    subheadline: string;
    availability: string;
    responseNote: string;
    signalFlow: {
      eyebrow: string;
      title: string;
      channels: string[];
      steps: Array<{
        icon: string;
        label: string;
        detail: string;
      }>;
      resultLabel: string;
      result: string;
    };
  };
  stats: Array<{
    icon: string;
    value: string;
    label: string;
  }>;
  founder: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryFounderId: string;
    carouselLabel: string;
    previousPersonLabel: string;
    nextPersonLabel: string;
    slideLabel: string;
    workingStyleTitle: string;
    workingStyle: string[];
    trustStatement: string;
    people: Array<{
      id: string;
      organizationRole: string;
      initials: string;
      name: string;
      role: string;
      location: string;
      bio: string;
      ctaLabel: string;
      disclaimer: string;
      portrait?: {
        src: string;
        alt: string;
      };
      proofPoints: Array<{
        value: string;
        label: string;
      }>;
    }>;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    outcomeLabel: string;
    includesLabel: string;
    items: Array<{
      id: string;
      icon: string;
      title: string;
      description: string;
      outcome: string;
      deliverables: string[];
      cta: string;
    }>;
  };
  work: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
    detailsLabel: string;
    closeDetailsLabel: string;
    caseStudyLabel: string;
    galleryLabel: string;
    challengeLabel: string;
    solutionLabel: string;
    outcomeLabel: string;
    capabilitiesLabel: string;
    proofPoints: Array<{
      label: string;
      detail: string;
    }>;
    items: Array<{
      id: string;
      kind: "package" | "product";
      category: string;
      status: string;
      frameLabel: string;
      title: string;
      summary: string;
      challenge: string;
      solution: string;
      outcome: string;
      verification: string;
      metrics: Array<{
        value: string;
        label: string;
      }>;
      capabilities: string[];
      stack: string[];
      links: Array<LinkData & { kind: "live" | "npm" | "source" }>;
      media:
        | {
            kind: "gallery";
            images: Array<{
              src: string;
              alt: string;
              label: string;
            }>;
          }
        | {
            kind: "notes";
            label: string;
            workspaceName: string;
            workspaceType: string;
            navigationLabel: string;
            navigationItems: string[];
            pagesLabel: string;
            pageTitle: string;
            editedLabel: string;
            shareLabel: string;
            intro: string;
            heading: string;
            task: string;
          };
    }>;
  };
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    experienceEyebrow: string;
    experienceTitle: string;
    experienceNote: string;
    experienceLabels: {
      contribution: string;
      evidence: string;
      change: string;
    };
    experienceItems: Array<{
      id: string;
      icon: string;
      context: string;
      title: string;
      description: string;
      contribution: string;
      evidence: string[];
      change: string;
      skills: string[];
    }>;
    conceptsEyebrow: string;
    conceptsTitle: string;
    conceptLabel: string;
    visualDisclosureLabel: string;
    challengeLabel: string;
    approachLabel: string;
    acceptanceLabel: string;
    outcomeLabel: string;
    includesLabel: string;
    ctaLabel: string;
    items: Array<{
      id: string;
      category: string;
      title: string;
      description: string;
      challenge: string;
      approach: string;
      acceptanceCriterion: string;
      designedOutcome: string;
      deliverables: string[];
      variant: "website" | "copilot" | "analytics";
      featured: boolean;
      visual: {
        eyebrow: string;
        title: string;
        status: string;
        inputs: string[];
        stages: string[];
        resultTitle: string;
        result: string;
      };
    }>;
  };
  projectPlanner: {
    eyebrow: string;
    title: string;
    subtitle: string;
    questionTitle: string;
    goals: Array<{
      id: string;
      label: string;
      icon: string;
      recommendation: string;
      timeline: string;
      budget: string;
      description: string;
      deliverables: string[];
    }>;
    labels: {
      recommendation: string;
      timeline: string;
      budget: string;
      includes: string;
    };
    cta: LinkData;
    disclaimer: string;
  };
  aiIntegrations: {
    eyebrow: string;
    title: string;
    subtitle: string;
    sceneLabel: string;
    statusLabel: string;
    inputLabel: string;
    sources: Array<{
      label: string;
      detail: string;
    }>;
    workflowLabel: string;
    workflowSteps: Array<{
      label: string;
      detail: string;
    }>;
    outputLabel: string;
    outputs: Array<{
      label: string;
      detail: string;
    }>;
    connectedLabel: string;
    connectedSystems: string[];
    exampleNote: string;
    benefits: Array<{
      title: string;
      description: string;
    }>;
  };
  process: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: Array<{
      step: string;
      title: string;
      description: string;
      proof: string;
      meta: string;
    }>;
  };
  techStack: {
    eyebrow: string;
    title: string;
    subtitle: string;
    categories: Array<{
      name: string;
      technologies: string[];
    }>;
    principles: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  whyChooseUs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    reasons: Array<{
      icon: string;
      title: string;
      description: string;
      proof: string;
    }>;
  };
  industries: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: string[];
    useCases: Array<{
      industry: string;
      case: string;
    }>;
  };
  testimonials: {
    title: string;
    items: Array<{
      name: string;
      role: string;
      quote: string;
    }>;
  };
  faqs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    contactPrompt: string;
    contactLabel: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  community: {
    eyebrow: string;
    title: string;
    description: string;
    label: string;
    href: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    directContactLabel: string;
    form: {
      endpoint: string;
      requestTimeoutMs: number;
      clientRateLimit: {
        cooldownSeconds: number;
        windowSeconds: number;
        maxSubmissions: number;
      };
      fields: {
        name: { label: string; placeholder: string };
        email: { label: string; placeholder: string };
        company: { label: string; placeholder: string };
        projectType: { label: string; placeholder: string };
        budget: { label: string; placeholder: string };
        message: { label: string; placeholder: string };
      };
      projectTypes: OptionData[];
      budgetRanges: OptionData[];
      submitLabel: string;
      submittingLabel: string;
      submittingText: string;
      successText: string;
      errorText: string;
      validationErrorText: string;
      rateLimitText: string;
      privacyNote: string;
    };
  };
  footer: {
    navigationHeading: string;
    servicesHeading: string;
    contactHeading: string;
    copyrightSuffix: string;
    legalLinks: LinkData[];
  };
}
