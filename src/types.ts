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
    challengeLabel: string;
    approachLabel: string;
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
      designedOutcome: string;
      deliverables: string[];
      variant: "website" | "copilot" | "analytics";
      featured: boolean;
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
    hubLabel: string;
    platforms: string[];
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
  cta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    directContactLabel: string;
    form: {
      subjectPrefix: string;
      fields: {
        name: { label: string; placeholder: string };
        email: { label: string; placeholder: string };
        company: { label: string; placeholder: string };
        projectType: { label: string };
        budget: { label: string };
        message: { label: string; placeholder: string };
      };
      projectTypes: OptionData[];
      budgetRanges: OptionData[];
      submitLabel: string;
      statusText: string;
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
