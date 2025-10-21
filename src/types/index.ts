// types/index.ts
export interface LandingHeroProps {
    onCreateInvoice: () => void;
}

export interface NavigationProps {
    onCreateInvoice: () => void;
}

export interface Feature {
    icon: any;
    title: string;
    description: string;
    color: string;
}

export interface Company {
    name: string;
    logo: string;
}

export interface Testimonial {
    name: string;
    role: string;
    company: string;
    rating: number;
    text: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface Template {
    name: string;
    category: string;
    color: string;
    preview: {
        headerColor: string;
        accentColor: string;
        textColor: string;
    };
}

export interface HeroSectionProps {
    isVisible: boolean;
    onCreateInvoice: () => void;
}

export interface TrustSectionProps {
    companies: Company[];
}

export interface FeaturesSectionProps {
    features: Feature[];
}

export interface TemplatesSectionProps {
    onCreateInvoice: () => void;
}

export interface TestimonialsSectionProps {
    testimonials: Testimonial[];
}

export interface FAQSectionProps {
    openFaq: number | null;
    setOpenFaq: (index: number | null) => void;
}

export interface CTASectionProps {
    onCreateInvoice: () => void;
}