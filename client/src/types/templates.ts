
export type TemplateType = 'modern' | 'freelancer' | 'retail' | 'service' | 'hospitality';

export interface Template {
  id: TemplateType;
  name: string;
  description: string;
  category: string;
  preview: string;
  features: string[];
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'number' | 'textarea' | 'select';
  required: boolean;
  placeholder?: string;
  options?: string[];
  category: 'business' | 'client' | 'invoice' | 'lineItems' | 'additional';
}

export const TEMPLATES: Template[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, minimalist design perfect for general business use',
    category: 'General Business',
    preview: '/templates/modern-preview.jpg',
    features: ['Clean Design', 'Professional Layout', 'Universal Use'],
    colorScheme: {
      primary: '#f59e0b',
      secondary: '#1f2937',
      accent: '#059669'
    }
  },
  {
    id: 'freelancer',
    name: 'Freelancer Creative',
    description: 'Creative design with project-focused billing and portfolio space',
    category: 'Creative Services',
    preview: '/templates/freelancer-preview.jpg',
    features: ['Project Billing', 'Creative Layout', 'Portfolio Integration'],
    colorScheme: {
      primary: '#8b5cf6',
      secondary: '#1f2937',
      accent: '#06b6d4'
    }
  },
  {
    id: 'retail',
    name: 'Retail E-commerce',
    description: 'Product-focused layout with SKU emphasis and inventory style',
    category: 'Retail & E-commerce',
    preview: '/templates/retail-preview.jpg',
    features: ['Product Focus', 'SKU Tracking', 'Inventory Style'],
    colorScheme: {
      primary: '#059669',
      secondary: '#1f2937',
      accent: '#dc2626'
    }
  },
  {
    id: 'service',
    name: 'Service Provider',
    description: 'Professional service industry design with time-based billing',
    category: 'Professional Services',
    preview: '/templates/service-preview.jpg',
    features: ['Time Tracking', 'Service Focus', 'Corporate Design'],
    colorScheme: {
      primary: '#0ea5e9',
      secondary: '#1f2937',
      accent: '#f59e0b'
    }
  },
  {
    id: 'hospitality',
    name: 'Hotel Hospitality',
    description: 'Elegant design for hospitality industry with guest focus',
    category: 'Hospitality',
    preview: '/templates/hospitality-preview.jpg',
    features: ['Guest Focus', 'Room Tracking', 'Elegant Design'],
    colorScheme: {
      primary: '#dc2626',
      secondary: '#1f2937',
      accent: '#f59e0b'
    }
  }
];

export const TEMPLATE_FIELDS: Record<TemplateType, TemplateField[]> = {
  modern: [
    // Standard fields for modern template
  ],
  freelancer: [
    {
      id: 'projectName',
      label: 'Project Name',
      type: 'text',
      required: true,
      placeholder: 'Enter project name',
      category: 'invoice'
    },
    {
      id: 'projectDescription',
      label: 'Project Description',
      type: 'textarea',
      required: false,
      placeholder: 'Brief project description',
      category: 'invoice'
    },
    {
      id: 'billingType',
      label: 'Billing Type',
      type: 'select',
      required: true,
      options: ['Hourly Rate', 'Fixed Project', 'Milestone'],
      category: 'additional'
    }
  ],
  retail: [
    {
      id: 'storeLocation',
      label: 'Store Location',
      type: 'text',
      required: false,
      placeholder: 'Store location or branch',
      category: 'business'
    },
    {
      id: 'returnPolicy',
      label: 'Return Policy',
      type: 'textarea',
      required: false,
      placeholder: 'Store return policy',
      category: 'additional'
    }
  ],
  service: [
    {
      id: 'serviceCategory',
      label: 'Service Category',
      type: 'select',
      required: false,
      options: ['Consulting', 'Maintenance', 'Installation', 'Repair', 'Training'],
      category: 'additional'
    },
    {
      id: 'serviceWarranty',
      label: 'Service Warranty',
      type: 'text',
      required: false,
      placeholder: 'Warranty terms',
      category: 'additional'
    }
  ],
  hospitality: [
    {
      id: 'guestName',
      label: 'Guest Name',
      type: 'text',
      required: false,
      placeholder: 'Primary guest name',
      category: 'client'
    },
    {
      id: 'checkIn',
      label: 'Check-in Date',
      type: 'date',
      required: false,
      category: 'additional'
    },
    {
      id: 'checkOut',
      label: 'Check-out Date',
      type: 'date',
      required: false,
      category: 'additional'
    },
    {
      id: 'roomNumber',
      label: 'Room Number',
      type: 'text',
      required: false,
      placeholder: 'Room or suite number',
      category: 'additional'
    }
  ]
};
