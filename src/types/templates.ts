// templates/definitions.ts - Super Easy to Add New Templates!

import { Template } from '@/types/core';

// 🔥 EXISTING TEMPLATES - Each template is self-contained
export const MODERN_TEMPLATE: Template = {
  id: 'modern',
  name: 'Modern Professional',
  description: 'Clean, minimalist design perfect for general business use',
  category: 'General Business',
  version: '1.0.0',
  thumbnail: '/templates/modern-thumb.jpg',
  features: ['Clean Design', 'Professional Layout', 'Universal Use'],
  colorScheme: {
    primary: '#f59e0b',
    secondary: '#1f2937',
    accent: '#059669'
  },
  isActive: true,
  tags: ['professional', 'clean', 'minimal'],
  fields: [
    // Standard fields are automatically included, only add template-specific ones
    {
      id: 'companyRegistration',
      label: 'Company Registration',
      type: 'text',
      placeholder: 'Company registration number',
      category: 'business',
      group: 'legal'
    },
    {
      id: 'vatNumber',
      label: 'VAT Number',
      type: 'text',
      placeholder: 'VAT/Tax ID number',
      category: 'business',
      group: 'legal'
    }
  ],
  defaultData: {}
};

export const FREELANCER_TEMPLATE: Template = {
  id: 'freelancer',
  name: 'Freelancer Creative',
  description: 'Creative design with project-focused billing',
  category: 'Creative Services',
  version: '1.0.0',
  thumbnail: '/templates/freelancer-thumb.jpg',
  features: ['Project Billing', 'Creative Layout', 'Portfolio Integration'],
  colorScheme: {
    primary: '#8b5cf6',
    secondary: '#1f2937',
    accent: '#06b6d4'
  },
  isActive: true,
  tags: ['creative', 'project-based', 'freelance'],
  fields: [
    {
      id: 'projectName',
      label: 'Project Name',
      type: 'text',
      required: true,
      placeholder: 'Enter project name',
      category: 'templateSpecific',
      group: 'project',
      validation: {
        min: 3,
        max: 100,
        message: 'Project name must be between 3-100 characters'
      }
    },
    {
      id: 'projectDescription',
      label: 'Project Description',
      type: 'textarea',
      placeholder: 'Brief description of the project scope',
      category: 'templateSpecific',
      group: 'project'
    },
    {
      id: 'billingType',
      label: 'Billing Type',
      type: 'select',
      required: true,
      options: ['Hourly Rate', 'Fixed Project', 'Milestone'],
      defaultValue: 'Hourly Rate',
      category: 'templateSpecific',
      group: 'billing'
    },
    {
      id: 'projectTimeline',
      label: 'Project Timeline',
      type: 'text',
      placeholder: 'e.g., "2-3 weeks"',
      category: 'templateSpecific',
      group: 'project'
    }
  ],
  defaultData: {
    billingType: 'Hourly Rate'
  }
};

export const RETAIL_TEMPLATE: Template = {
  id: 'retail',
  name: 'Retail Store',
  description: 'Perfect for retail and e-commerce businesses',
  category: 'Retail & E-commerce',
  version: '1.0.0',
  thumbnail: '/templates/retail-thumb.jpg',
  features: ['Product Focus', 'SKU Tracking', 'Return Policy'],
  colorScheme: {
    primary: '#059669',
    secondary: '#1f2937',
    accent: '#dc2626'
  },
  isActive: true,
  tags: ['retail', 'ecommerce', 'products'],
  fields: [
    {
      id: 'storeLocation',
      label: 'Store Location',
      type: 'text',
      placeholder: 'Store address or branch name',
      category: 'business',
      group: 'store'
    },
    {
      id: 'returnPolicy',
      label: 'Return Policy',
      type: 'textarea',
      placeholder: '30 days return policy with receipt',
      category: 'templateSpecific',
      group: 'policies'
    },
    {
      id: 'salesPerson',
      label: 'Sales Representative',
      type: 'text',
      placeholder: 'Sales rep name or ID',
      category: 'templateSpecific',
      group: 'staff'
    }
  ],
  defaultData: {
    returnPolicy: '30 days return policy with original receipt'
  }
};

// 🚀 ADDING A NEW TEMPLATE IS SUPER EASY! 
// Just copy this structure and modify:

export const MEDICAL_TEMPLATE: Template = {
  id: 'medical',
  name: 'Medical Services',
  description: 'Professional template for healthcare providers',
  category: 'Healthcare',
  version: '1.0.0',
  thumbnail: '/templates/medical-thumb.jpg',
  features: ['Patient Focus', 'Insurance Billing', 'HIPAA Compliant'],
  colorScheme: {
    primary: '#0ea5e9',
    secondary: '#1e293b',
    accent: '#10b981'
  },
  isActive: true,
  tags: ['medical', 'healthcare', 'insurance'],
  fields: [
    {
      id: 'patientName',
      label: 'Patient Name',
      type: 'text',
      required: true,
      placeholder: 'Patient full name',
      category: 'templateSpecific',
      group: 'patient'
    },
    {
      id: 'patientId',
      label: 'Patient ID',
      type: 'text',
      placeholder: 'Unique patient identifier',
      category: 'templateSpecific',
      group: 'patient'
    },
    {
      id: 'insuranceProvider',
      label: 'Insurance Provider',
      type: 'text',
      placeholder: 'Insurance company name',
      category: 'templateSpecific',
      group: 'insurance'
    },
    {
      id: 'policyNumber',
      label: 'Policy Number',
      type: 'text',
      placeholder: 'Insurance policy number',
      category: 'templateSpecific',
      group: 'insurance'
    },
    {
      id: 'dateOfService',
      label: 'Date of Service',
      type: 'date',
      required: true,
      category: 'templateSpecific',
      group: 'service'
    },
    {
      id: 'diagnosisCode',
      label: 'Diagnosis Code',
      type: 'text',
      placeholder: 'ICD-10 code',
      category: 'templateSpecific',
      group: 'medical'
    },
    {
      id: 'treatmentNotes',
      label: 'Treatment Notes',
      type: 'textarea',
      placeholder: 'Brief treatment description',
      category: 'templateSpecific',
      group: 'medical'
    }
  ],
  defaultData: {
    dateOfService: new Date().toISOString().split('T')[0]
  }
};

export const CONSTRUCTION_TEMPLATE: Template = {
  id: 'construction',
  name: 'Construction & Trades',
  description: 'Built for contractors and construction companies',
  category: 'Construction',
  version: '1.0.0',
  thumbnail: '/templates/construction-thumb.jpg',
  features: ['Materials Tracking', 'Labor Hours', 'Project Phase'],
  colorScheme: {
    primary: '#f97316',
    secondary: '#1c1917',
    accent: '#eab308'
  },
  isActive: true,
  tags: ['construction', 'contractor', 'trades'],
  fields: [
    {
      id: 'projectAddress',
      label: 'Project Address',
      type: 'textarea',
      required: true,
      placeholder: 'Construction site address',
      category: 'templateSpecific',
      group: 'project'
    },
    {
      id: 'permitNumber',
      label: 'Permit Number',
      type: 'text',
      placeholder: 'Building permit number',
      category: 'templateSpecific',
      group: 'legal'
    },
    {
      id: 'projectPhase',
      label: 'Project Phase',
      type: 'select',
      options: ['Foundation', 'Framing', 'Electrical', 'Plumbing', 'Drywall', 'Finishing', 'Final'],
      category: 'templateSpecific',
      group: 'project'
    },
    {
      id: 'contractorLicense',
      label: 'Contractor License',
      type: 'text',
      placeholder: 'License number',
      category: 'business',
      group: 'legal'
    },
    {
      id: 'materialsCost',
      label: 'Materials Cost',
      type: 'number',
      placeholder: '0.00',
      category: 'templateSpecific',
      group: 'costs'
    },
    {
      id: 'laborHours',
      label: 'Labor Hours',
      type: 'number',
      placeholder: 'Total hours worked',
      category: 'templateSpecific',
      group: 'costs'
    }
  ],
  defaultData: {
    projectPhase: 'Foundation'
  }
};

// 🔥 ALL TEMPLATES REGISTRY - Just add your template here!
export const ALL_TEMPLATES: Template[] = [
  MODERN_TEMPLATE,
  FREELANCER_TEMPLATE,
  RETAIL_TEMPLATE,
  MEDICAL_TEMPLATE,      // ✅ New template added!
  CONSTRUCTION_TEMPLATE  // ✅ Another new template!
];

// Helper functions that work with any template
export const TemplateRegistry = {
  // Get all active templates
  getActiveTemplates: () => ALL_TEMPLATES.filter(t => t.isActive),

  // Get template by ID
  getById: (id: string) => ALL_TEMPLATES.find(t => t.id === id),

  // Get templates by category
  getByCategory: (category: string) => ALL_TEMPLATES.filter(t => t.category === category),

  // Get templates by tags
  getByTags: (tags: string[]) => ALL_TEMPLATES.filter(t =>
    t.tags?.some(tag => tags.includes(tag))
  ),

  // Get template fields
  getFields: (templateId: string) => {
    const template = ALL_TEMPLATES.find(t => t.id === templateId);
    return template?.fields || [];
  },

  // Get template default data
  getDefaultData: (templateId: string) => {
    const template = ALL_TEMPLATES.find(t => t.id === templateId);
    return template?.defaultData || {};
  },

  // Validate template data
  validateData: (templateId: string, data: any) => {
    const template = ALL_TEMPLATES.find(t => t.id === templateId);
    if (!template) return { isValid: false, errors: ['Template not found'] };

    const errors: string[] = [];
    const requiredFields = template.fields.filter(f => f.required);

    for (const field of requiredFields) {
      if (!data[field.id] || data[field.id] === '') {
        errors.push(`${field.label} is required`);
      }
    }

    return { isValid: errors.length === 0, errors };
  }
};

// 🎯 HOW TO ADD A NEW TEMPLATE:
/*
1. Copy any existing template structure
2. Change the id, name, description, colors
3. Define your custom fields in the `fields` array
4. Set default values in `defaultData`
5. Add to ALL_TEMPLATES array
6. Create a template component in components/templates/
7. Add it to the switch statement in InvoicePreview
8. Done! 🎉

NO TYPE CHANGES NEEDED!
NO COMPLEX INTERFACES!
NO ENUM UPDATES!
*/