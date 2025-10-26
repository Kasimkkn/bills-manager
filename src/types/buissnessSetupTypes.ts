import { BusinessInfo, Address, BankDetails } from './invoice';

// Business Profile Form Data Interface - integrates with existing invoice types
export interface BusinessProfileFormData {
    // Step 1: Business Information
    businessName: string;
    businessType: BusinessType | '';
    ownerName: string;
    contactNumber: string;
    email: string;

    // Step 2: Business Details
    address: string;
    city: string;
    state: IndianState | '';
    pinCode: string;
    gstin: string;
    gstRegistered: boolean;
    businessLogo: File | null;
    logoPreview: string | null;

    // Step 3: Preferences
    currency: 'INR';
    invoicePrefix: string;
    startingInvoiceNumber: string;
    defaultTaxRate: TaxRate;
    dateFormat: DateFormat;
    language: Language;
}

// Business Profile Form Errors Interface
export interface BusinessProfileFormErrors {
    // Step 1 Errors
    businessName?: string;
    businessType?: string;
    ownerName?: string;
    contactNumber?: string;
    email?: string;

    // Step 2 Errors
    address?: string;
    city?: string;
    state?: string;
    pinCode?: string;
    gstin?: string;
    businessLogo?: string;

    // Step 3 Errors
    invoicePrefix?: string;
    startingInvoiceNumber?: string;
    defaultTaxRate?: string;
    dateFormat?: string;
    language?: string;
}

// Business Types
export type BusinessType =
    | 'Contractor'
    | 'Hardware Shop'
    | 'Electrician'
    | 'Garage'
    | 'Mobile Shop'
    | 'Tailor'
    | 'Clinic'
    | 'Salon'
    | 'Laundry'
    | 'General Store'
    | 'Other';

// Tax Rates
export type TaxRate = '0' | '5' | '12' | '18' | '28';

// Date Formats
export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';

// Languages
export type Language = 'English' | 'Hindi';

// Indian States
export type IndianState =
    | 'Andhra Pradesh'
    | 'Arunachal Pradesh'
    | 'Assam'
    | 'Bihar'
    | 'Chhattisgarh'
    | 'Goa'
    | 'Gujarat'
    | 'Haryana'
    | 'Himachal Pradesh'
    | 'Jharkhand'
    | 'Karnataka'
    | 'Kerala'
    | 'Madhya Pradesh'
    | 'Maharashtra'
    | 'Manipur'
    | 'Meghalaya'
    | 'Mizoram'
    | 'Nagaland'
    | 'Odisha'
    | 'Punjab'
    | 'Rajasthan'
    | 'Sikkim'
    | 'Tamil Nadu'
    | 'Telangana'
    | 'Tripura'
    | 'Uttar Pradesh'
    | 'Uttarakhand'
    | 'West Bengal'
    | 'Andaman and Nicobar Islands'
    | 'Chandigarh'
    | 'Dadra and Nagar Haveli'
    | 'Daman and Diu'
    | 'Delhi'
    | 'Jammu and Kashmir'
    | 'Ladakh'
    | 'Lakshadweep'
    | 'Puducherry';

// Step Numbers
export type StepNumber = 1 | 2 | 3;

// Step Information Interface
export interface StepInfo {
    number: StepNumber;
    title: string;
    icon: any; // For Lucide React icons
}

// Business Logo Upload Interface
export interface LogoUpload {
    file: File;
    preview: string;
    size: number;
    name: string;
}

// Validation Result Interface
export interface ValidationResult {
    isValid: boolean;
    errors: Partial<BusinessProfileFormErrors>;
}

// Constants
export const BUSINESS_TYPES: readonly BusinessType[] = [
    'Contractor',
    'Hardware Shop',
    'Electrician',
    'Garage',
    'Mobile Shop',
    'Tailor',
    'Clinic',
    'Salon',
    'Laundry',
    'General Store',
    'Other'
] as const;

export const INDIAN_STATES: readonly IndianState[] = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Jammu and Kashmir',
    'Ladakh',
    'Lakshadweep',
    'Puducherry'
] as const;

export const TAX_RATES: readonly { value: TaxRate; label: string }[] = [
    { value: '0', label: 'No Tax (0%)' },
    { value: '5', label: 'GST 5%' },
    { value: '12', label: 'GST 12%' },
    { value: '18', label: 'GST 18%' },
    { value: '28', label: 'GST 28%' }
] as const;

export const DATE_FORMATS: readonly { value: DateFormat; label: string }[] = [
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
] as const;

export const LANGUAGES: readonly { value: Language; label: string; disabled?: boolean }[] = [
    { value: 'English', label: 'English (Default)' },
    { value: 'Hindi', label: 'Hindi (Coming Soon)', disabled: true }
] as const;

// Default Form Data
export const DEFAULT_BUSINESS_PROFILE_FORM_DATA: BusinessProfileFormData = {
    // Step 1
    businessName: '',
    businessType: '',
    ownerName: '', // Will be pre-filled from user account
    contactNumber: '',
    email: '', // Will be pre-filled from user account

    // Step 2
    address: '',
    city: '',
    state: '',
    pinCode: '',
    gstin: '',
    gstRegistered: false,
    businessLogo: null,
    logoPreview: null,

    // Step 3
    currency: 'INR',
    invoicePrefix: 'INV-',
    startingInvoiceNumber: '1',
    defaultTaxRate: '18',
    dateFormat: 'DD/MM/YYYY',
    language: 'English'
};

// Validation Rules
export const VALIDATION_RULES = {
    contactNumber: {
        length: 10,
        pattern: /^\d{10}$/,
        message: 'Contact number must be 10 digits'
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    pinCode: {
        length: 6,
        pattern: /^\d{6}$/,
        message: 'PIN code must be 6 digits'
    },
    gstin: {
        length: 15,
        pattern: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        message: 'Invalid GSTIN format (e.g., 22AAAAA0000A1Z5)'
    },
    logo: {
        maxSize: 2 * 1024 * 1024, // 2MB in bytes
        allowedTypes: ['image/jpeg', 'image/png'],
        message: 'Logo must be JPG or PNG and less than 2MB'
    }
} as const;

// ===== CONVERSION FUNCTIONS =====
// Convert BusinessProfileFormData to BusinessInfo (for invoice generation)
export const convertToBusinessInfo = (formData: BusinessProfileFormData): BusinessInfo => {
    const address: Address = {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        country: 'India',
        pincode: formData.pinCode
    };

    return {
        name: formData.businessName,
        address: address,
        phoneNumber: formData.contactNumber,
        email: formData.email,
        logo: formData.logoPreview || undefined,
        gstNumber: formData.gstin || undefined,
        taxId: formData.gstin || undefined
    };
};

// Convert BusinessProfileFormData to BankDetails (if needed)
export const convertToBankDetails = (
    bankName: string,
    accountHolderName: string,
    accountNumber: string,
    ifscCode: string,
    upiId?: string
): BankDetails => {
    return {
        bankName,
        accountHolderName,
        accountNumber,
        ifscCode,
        upiId
    };
};

// Business Profile Complete Data (includes bank details)
export interface CompleteBusinessProfile extends BusinessProfileFormData {
    // Optional Bank Details (can be added later)
    bankDetails?: {
        bankName: string;
        accountHolderName: string;
        accountNumber: string;
        ifscCode: string;
        upiId?: string;
    };
}

// Helper function to create initial invoice config from business profile
export const createInitialInvoiceConfig = (
    businessProfile: BusinessProfileFormData
): Partial<BusinessInfo> => {
    return {
        name: businessProfile.businessName,
        address: {
            street: businessProfile.address,
            city: businessProfile.city,
            state: businessProfile.state,
            country: 'India',
            pincode: businessProfile.pinCode
        },
        phoneNumber: businessProfile.contactNumber,
        email: businessProfile.email,
        logo: businessProfile.logoPreview || undefined,
        gstNumber: businessProfile.gstRegistered ? businessProfile.gstin : undefined,
        taxId: businessProfile.gstRegistered ? businessProfile.gstin : undefined
    };
};