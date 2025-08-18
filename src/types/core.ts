// types/core.ts - Simplified and Scalable Types

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'CAD' | 'AUD' | 'JPY' | 'CHF' | 'CNY' | 'SGD' | 'BRL' | 'MXN' | 'ZAR';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';

// Core Business Entities - These stay the same regardless of templates
export interface BusinessInfo {
    name: string;
    logo?: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    website?: string;
    taxId?: string;
}

export interface ClientInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    companyName?: string;
}

export interface LineItem {
    id: string;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
    taxable?: boolean;
    category?: string;
    sku?: string;
    unit?: string;
}

// 🔥 KEY CHANGE: Dynamic Template Data
// Instead of predefined interfaces, use a flexible object
export interface TemplateData {
    [key: string]: any; // This allows any field to be added dynamically
}

// Main Invoice Structure - Much Simpler!
export interface InvoiceData {
    // Basic Invoice Info
    id: string;
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    status: InvoiceStatus;

    // Template Info
    templateId: string; // Changed from enum to string for flexibility

    // Core Data
    businessInfo: BusinessInfo;
    clientInfo: ClientInfo;
    lineItems: LineItem[];

    // Calculations
    subtotal: number;
    taxRate: number;
    taxAmount: number;
    discountAmount?: number;
    total: number;

    // Localization
    currency: CurrencyCode;
    locale: string;

    // Additional
    notes?: string;
    terms?: string;
    attachments?: string[];

    // 🔥 FLEXIBLE TEMPLATE DATA
    templateData: TemplateData; // One object for all template-specific fields

    // Metadata
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
}

// Form Field Definition - Very Flexible
export interface FormField {
    id: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'date' | 'number' | 'textarea' | 'select' | 'multiselect' | 'file' | 'checkbox' | 'radio';
    required?: boolean;
    placeholder?: string;
    options?: string[] | { value: string; label: string }[];
    defaultValue?: any;
    category?: 'business' | 'client' | 'invoice' | 'templateSpecific' | 'additional';
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
        message?: string;
    };
    conditional?: {
        dependsOn: string;
        values: any[];
    };
    helpText?: string;
    group?: string; // For grouping fields in UI
}

// Template Definition - Very Flexible
export interface Template {
    id: string; // Any string, not limited to enum
    name: string;
    description: string;
    category: string;
    version: string; // For template versioning
    preview?: string;
    thumbnail?: string;
    features: string[];
    colorScheme: {
        primary: string;
        secondary: string;
        accent: string;
        background?: string;
    };

    // 🔥 DYNAMIC FIELDS DEFINITION
    fields: FormField[]; // All fields defined in one place

    // Default values for this template
    defaultData: TemplateData;

    // Template metadata
    author?: string;
    isActive: boolean;
    isPremium?: boolean;
    tags?: string[];
    supportedCurrencies?: CurrencyCode[];

    // For multi-language support
    locales?: {
        [locale: string]: {
            name: string;
            description: string;
            fields: { [fieldId: string]: { label: string; placeholder?: string; helpText?: string } };
        };
    };
}

// User and Invoice Types
export interface User {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
    subscription: {
        plan: 'free' | 'pro' | 'enterprise';
        downloadsUsed: number;
        downloadsLimit: number;
        expiresAt?: Date;
    };
    preferences: {
        defaultCurrency: CurrencyCode;
        defaultTemplate: string; // Template ID
        autoSave: boolean;
        language: string;
    };
}

export interface UserInvoice extends InvoiceData {
    userId: string;
    title?: string;
    isTemplate?: boolean;
    downloadCount: number;
    lastDownloaded?: Date;
    shareUrl?: string;
    pdfUrl?: string;
    tags?: string[];
}

// Context Types
export interface InvoiceContextType {
    invoice: InvoiceData;
    updateBusinessInfo: (data: Partial<BusinessInfo>) => void;
    updateClientInfo: (data: Partial<ClientInfo>) => void;
    updateInvoiceMeta: (field: keyof InvoiceData, value: any) => void;
    updateTemplateData: (field: string, value: any) => void;
    addLineItem: () => void;
    updateLineItem: (id: string, field: keyof LineItem, value: any) => void;
    removeLineItem: (id: string) => void;
    updateCurrency: (currency: CurrencyCode) => void;
    updateNotes: (notes: string) => void;
    updateTerms: (terms: string) => void;
    updateTaxRate: (rate: number) => void;
    calculateTotals: () => void;
    resetInvoice: () => void;
    loadInvoice: (invoice: InvoiceData) => void;
    setTemplate: (templateId: string) => void;
}

export interface TemplateContextType {
    currentTemplate: Template | null;
    setCurrentTemplate: (templateId: string) => void;
    availableTemplates: Template[];
    getTemplateById: (id: string) => Template | null;
    getTemplateFields: (templateId?: string) => FormField[];
    validateTemplateData: (templateId: string, data: TemplateData) => { isValid: boolean; errors: string[] };
}

// Currency Configuration
export interface Currency {
    code: CurrencyCode;
    symbol: string;
    name: string;
    locale: string;
}

export const CURRENCIES: Currency[] = [
    { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
    { code: 'EUR', symbol: '€', name: 'Euro', locale: 'en-EU' },
    { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', locale: 'en-CA' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', locale: 'en-AU' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen', locale: 'ja-JP' },
    { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', locale: 'de-CH' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', locale: 'zh-CN' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', locale: 'en-SG' },
    { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', locale: 'pt-BR' },
    { code: 'MXN', symbol: '$', name: 'Mexican Peso', locale: 'es-MX' },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand', locale: 'en-ZA' },
];

// Utility Types
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};