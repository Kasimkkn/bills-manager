
export type TemplateType = 'modern' | 'freelancer' | 'retail' | 'service' | 'hospitality' | 
  'commercial' | 'proforma' | 'recurring' | 'timesheet' | 'final' | 
  'standard' | 'interim' | 'credit' | 'overdue' | 'sales' | 
  'debit' | 'digital' | 'mixed' | 'retainer' | 'creditNote' | 
  'debitMemo' | 'expenseReport' | 'consolidated' | 'creditMemo' | 'tax';

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
  // Existing templates
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, minimalist design perfect for general business use',
    category: 'General Business',
    preview: '/templates/modern-preview.jpg',
    features: ['Clean Design', 'Professional Layout', 'Universal Use'],
    colorScheme: { primary: '#f59e0b', secondary: '#1f2937', accent: '#059669' }
  },
  {
    id: 'freelancer',
    name: 'Freelancer Creative',
    description: 'Creative design with project-focused billing and portfolio space',
    category: 'Creative Services',
    preview: '/templates/freelancer-preview.jpg',
    features: ['Project Billing', 'Creative Layout', 'Portfolio Integration'],
    colorScheme: { primary: '#8b5cf6', secondary: '#1f2937', accent: '#06b6d4' }
  },
  {
    id: 'retail',
    name: 'Retail E-commerce',
    description: 'Product-focused layout with SKU emphasis and inventory style',
    category: 'Retail & E-commerce',
    preview: '/templates/retail-preview.jpg',
    features: ['Product Focus', 'SKU Tracking', 'Inventory Style'],
    colorScheme: { primary: '#059669', secondary: '#1f2937', accent: '#dc2626' }
  },
  {
    id: 'service',
    name: 'Service Provider',
    description: 'Professional service industry design with time-based billing',
    category: 'Professional Services',
    preview: '/templates/service-preview.jpg',
    features: ['Time Tracking', 'Service Focus', 'Corporate Design'],
    colorScheme: { primary: '#0ea5e9', secondary: '#1f2937', accent: '#f59e0b' }
  },
  {
    id: 'hospitality',
    name: 'Hotel Hospitality',
    description: 'Elegant design for hospitality industry with guest focus',
    category: 'Hospitality',
    preview: '/templates/hospitality-preview.jpg',
    features: ['Guest Focus', 'Room Tracking', 'Elegant Design'],
    colorScheme: { primary: '#dc2626', secondary: '#1f2937', accent: '#f59e0b' }
  },
  
  // New specialized invoice templates
  {
    id: 'commercial',
    name: 'Commercial Invoice',
    description: 'International trade focused with customs and shipping details',
    category: 'International Trade',
    preview: '/templates/commercial-preview.jpg',
    features: ['Export/Import', 'Customs Info', 'Shipping Details', 'Currency Exchange'],
    colorScheme: { primary: '#1e40af', secondary: '#1f2937', accent: '#059669' }
  },
  {
    id: 'proforma',
    name: 'Proforma Invoice',
    description: 'Preliminary invoice for quotes and advance payments',
    category: 'Sales & Quotes',
    preview: '/templates/proforma-preview.jpg',
    features: ['Quote Mode', 'Advance Payment', 'Validity Period', 'Terms Preview'],
    colorScheme: { primary: '#7c2d12', secondary: '#1f2937', accent: '#f59e0b' }
  },
  {
    id: 'recurring',
    name: 'Recurring Invoice',
    description: 'Subscription and recurring billing with period tracking',
    category: 'Subscription',
    preview: '/templates/recurring-preview.jpg',
    features: ['Period Tracking', 'Auto-billing', 'Subscription Info', 'Next Due'],
    colorScheme: { primary: '#059669', secondary: '#1f2937', accent: '#dc2626' }
  },
  {
    id: 'timesheet',
    name: 'Timesheet Invoice',
    description: 'Detailed time tracking with hourly breakdowns and task logging',
    category: 'Time Tracking',
    preview: '/templates/timesheet-preview.jpg',
    features: ['Time Tracking', 'Task Breakdown', 'Rate Calculation', 'Period Summary'],
    colorScheme: { primary: '#7c3aed', secondary: '#1f2937', accent: '#f59e0b' }
  },
  {
    id: 'final',
    name: 'Final Invoice',
    description: 'Project completion invoice with final balances and closeout',
    category: 'Project Management',
    preview: '/templates/final-preview.jpg',
    features: ['Final Balance', 'Project Summary', 'Payment History', 'Closeout'],
    colorScheme: { primary: '#dc2626', secondary: '#1f2937', accent: '#059669' }
  },
  {
    id: 'standard',
    name: 'Standard Invoice',
    description: 'Basic invoice template for standard business transactions',
    category: 'General Business',
    preview: '/templates/standard-preview.jpg',
    features: ['Simple Layout', 'Basic Info', 'Standard Terms', 'Professional'],
    colorScheme: { primary: '#374151', secondary: '#1f2937', accent: '#059669' }
  },
  {
    id: 'interim',
    name: 'Interim Invoice',
    description: 'Progress billing for ongoing projects with milestone tracking',
    category: 'Project Management',
    preview: '/templates/interim-preview.jpg',
    features: ['Progress Tracking', 'Milestone Billing', 'Running Total', 'Phase Info'],
    colorScheme: { primary: '#0ea5e9', secondary: '#1f2937', accent: '#f59e0b' }
  },
  {
    id: 'credit',
    name: 'Credit Invoice',
    description: 'Credit application invoice with adjustment details',
    category: 'Adjustments',
    preview: '/templates/credit-preview.jpg',
    features: ['Credit Application', 'Adjustments', 'Balance Correction', 'Reference Link'],
    colorScheme: { primary: '#059669', secondary: '#1f2937', accent: '#0ea5e9' }
  },
  {
    id: 'overdue',
    name: 'Overdue Invoice',
    description: 'Past due notice with late fees and collection details',
    category: 'Collections',
    preview: '/templates/overdue-preview.jpg',
    features: ['Overdue Notice', 'Late Fees', 'Payment Urgency', 'Collection Info'],
    colorScheme: { primary: '#dc2626', secondary: '#1f2937', accent: '#f59e0b' }
  },
  {
    id: 'sales',
    name: 'Sales Invoice',
    description: 'Product sales focused with inventory and commission tracking',
    category: 'Sales',
    preview: '/templates/sales-preview.jpg',
    features: ['Sales Focus', 'Commission Info', 'Product Details', 'Sales Rep'],
    colorScheme: { primary: '#059669', secondary: '#1f2937', accent: '#dc2626' }
  },
  {
    id: 'debit',
    name: 'Debit Invoice',
    description: 'Additional charges invoice with fee breakdowns',
    category: 'Adjustments',
    preview: '/templates/debit-preview.jpg',
    features: ['Additional Charges', 'Fee Breakdown', 'Charge Explanation', 'Balance Update'],
    colorScheme: { primary: '#7c2d12', secondary: '#1f2937', accent: '#dc2626' }
  },
  {
    id: 'digital',
    name: 'Digital Invoice',
    description: 'Tech-savvy design for digital services and online transactions',
    category: 'Technology',
    preview: '/templates/digital-preview.jpg',
    features: ['QR Codes', 'Digital Payment', 'Online Links', 'Tech Design'],
    colorScheme: { primary: '#6366f1', secondary: '#1f2937', accent: '#06b6d4' }
  },
  {
    id: 'mixed',
    name: 'Mixed Invoice',
    description: 'Combined products and services with flexible item types',
    category: 'Hybrid Business',
    preview: '/templates/mixed-preview.jpg',
    features: ['Product & Service Mix', 'Flexible Items', 'Category Grouping', 'Versatile'],
    colorScheme: { primary: '#8b5cf6', secondary: '#1f2937', accent: '#f59e0b' }
  },
  {
    id: 'retainer',
    name: 'Retainer Invoice',
    description: 'Upfront payment invoice with retainer agreement details',
    category: 'Legal & Consulting',
    preview: '/templates/retainer-preview.jpg',
    features: ['Retainer Agreement', 'Upfront Payment', 'Usage Tracking', 'Agreement Terms'],
    colorScheme: { primary: '#1e40af', secondary: '#1f2937', accent: '#059669' }
  },
  {
    id: 'creditNote',
    name: 'Credit Note',
    description: 'Official credit note for returns, refunds, and adjustments',
    category: 'Adjustments',
    preview: '/templates/creditnote-preview.jpg',
    features: ['Credit Note Format', 'Return Details', 'Refund Info', 'Adjustment Reason'],
    colorScheme: { primary: '#059669', secondary: '#1f2937', accent: '#0ea5e9' }
  },
  {
    id: 'debitMemo',
    name: 'Debit Memo',
    description: 'Official debit memo for additional charges and corrections',
    category: 'Adjustments',
    preview: '/templates/debitmemo-preview.jpg',
    features: ['Debit Memo Format', 'Charge Details', 'Correction Info', 'Balance Impact'],
    colorScheme: { primary: '#dc2626', secondary: '#1f2937', accent: '#f59e0b' }
  },
  {
    id: 'expenseReport',
    name: 'Expense Report',
    description: 'Expense reimbursement invoice with receipt tracking',
    category: 'Expenses',
    preview: '/templates/expense-preview.jpg',
    features: ['Expense Categories', 'Receipt Links', 'Reimbursement', 'Approval Flow'],
    colorScheme: { primary: '#7c3aed', secondary: '#1f2937', accent: '#059669' }
  },
  {
    id: 'consolidated',
    name: 'Consolidated Invoice',
    description: 'Multiple account or period consolidated billing',
    category: 'Multi-Account',
    preview: '/templates/consolidated-preview.jpg',
    features: ['Multi-Account', 'Period Grouping', 'Summary Totals', 'Account Breakdown'],
    colorScheme: { primary: '#374151', secondary: '#1f2937', accent: '#0ea5e9' }
  },
  {
    id: 'creditMemo',
    name: 'Credit Memo',
    description: 'Internal credit memorandum with accounting references',
    category: 'Accounting',
    preview: '/templates/creditmemo-preview.jpg',
    features: ['Accounting Format', 'GL References', 'Internal Processing', 'Audit Trail'],
    colorScheme: { primary: '#059669', secondary: '#1f2937', accent: '#6366f1' }
  },
  {
    id: 'tax',
    name: 'Tax Invoice',
    description: 'Tax-compliant invoice with detailed tax breakdowns and compliance',
    category: 'Tax Compliance',
    preview: '/templates/tax-preview.jpg',
    features: ['Tax Compliance', 'GST/VAT Details', 'Tax Breakdowns', 'Regulatory Info'],
    colorScheme: { primary: '#1e40af', secondary: '#1f2937', accent: '#dc2626' }
  }
];

export const TEMPLATE_FIELDS: Record<TemplateType, TemplateField[]> = {
  modern: [],
  
  freelancer: [
    { id: 'projectName', label: 'Project Name', type: 'text', required: true, placeholder: 'Enter project name', category: 'invoice' },
    { id: 'projectDescription', label: 'Project Description', type: 'textarea', required: false, placeholder: 'Brief project description', category: 'invoice' },
    { id: 'billingType', label: 'Billing Type', type: 'select', required: true, options: ['Hourly Rate', 'Fixed Project', 'Milestone'], category: 'additional' }
  ],
  
  retail: [
    { id: 'storeLocation', label: 'Store Location', type: 'text', required: false, placeholder: 'Store location or branch', category: 'business' },
    { id: 'returnPolicy', label: 'Return Policy', type: 'textarea', required: false, placeholder: 'Store return policy', category: 'additional' }
  ],
  
  service: [
    { id: 'serviceCategory', label: 'Service Category', type: 'select', required: false, options: ['Consulting', 'Maintenance', 'Installation', 'Repair', 'Training'], category: 'additional' },
    { id: 'serviceWarranty', label: 'Service Warranty', type: 'text', required: false, placeholder: 'Warranty terms', category: 'additional' }
  ],
  
  hospitality: [
    { id: 'guestName', label: 'Guest Name', type: 'text', required: false, placeholder: 'Primary guest name', category: 'client' },
    { id: 'checkIn', label: 'Check-in Date', type: 'date', required: false, category: 'additional' },
    { id: 'checkOut', label: 'Check-out Date', type: 'date', required: false, category: 'additional' },
    { id: 'roomNumber', label: 'Room Number', type: 'text', required: false, placeholder: 'Room or suite number', category: 'additional' }
  ],
  
  // New template field configurations
  commercial: [
    { id: 'exportLicense', label: 'Export License', type: 'text', required: false, placeholder: 'Export license number', category: 'business' },
    { id: 'hsCode', label: 'HS Code', type: 'text', required: false, placeholder: 'Harmonized System code', category: 'additional' },
    { id: 'countryOfOrigin', label: 'Country of Origin', type: 'text', required: false, placeholder: 'Manufacturing country', category: 'additional' },
    { id: 'portOfLoading', label: 'Port of Loading', type: 'text', required: false, placeholder: 'Departure port', category: 'additional' },
    { id: 'portOfDischarge', label: 'Port of Discharge', type: 'text', required: false, placeholder: 'Arrival port', category: 'additional' },
    { id: 'shippingTerms', label: 'Shipping Terms', type: 'select', required: false, options: ['FOB', 'CIF', 'EXW', 'DDP', 'FCA'], category: 'additional' },
    { id: 'customsInfo', label: 'Customs Information', type: 'textarea', required: false, placeholder: 'Additional customs details', category: 'additional' }
  ],
  
  proforma: [
    { id: 'validityPeriod', label: 'Validity Period', type: 'date', required: true, category: 'invoice' },
    { id: 'quotationRef', label: 'Quotation Reference', type: 'text', required: false, placeholder: 'Quote reference number', category: 'invoice' },
    { id: 'deliveryTerms', label: 'Delivery Terms', type: 'textarea', required: false, placeholder: 'Delivery conditions', category: 'additional' },
    { id: 'advancePayment', label: 'Advance Payment %', type: 'number', required: false, placeholder: 'Percentage required upfront', category: 'additional' }
  ],
  
  recurring: [
    { id: 'billingPeriod', label: 'Billing Period', type: 'select', required: true, options: ['Monthly', 'Quarterly', 'Semi-Annual', 'Annual'], category: 'invoice' },
    { id: 'nextBillingDate', label: 'Next Billing Date', type: 'date', required: true, category: 'invoice' },
    { id: 'subscriptionId', label: 'Subscription ID', type: 'text', required: false, placeholder: 'Subscription reference', category: 'invoice' },
    { id: 'autoRenewal', label: 'Auto Renewal', type: 'select', required: false, options: ['Yes', 'No'], category: 'additional' }
  ],
  
  timesheet: [
    { id: 'periodStart', label: 'Period Start', type: 'date', required: true, category: 'invoice' },
    { id: 'periodEnd', label: 'Period End', type: 'date', required: true, category: 'invoice' },
    { id: 'totalHours', label: 'Total Hours', type: 'number', required: false, placeholder: 'Total billable hours', category: 'invoice' },
    { id: 'hourlyRate', label: 'Hourly Rate', type: 'number', required: false, placeholder: 'Rate per hour', category: 'additional' },
    { id: 'overtimeRate', label: 'Overtime Rate', type: 'number', required: false, placeholder: 'Overtime hourly rate', category: 'additional' }
  ],
  
  final: [
    { id: 'projectEndDate', label: 'Project End Date', type: 'date', required: true, category: 'invoice' },
    { id: 'totalProjectValue', label: 'Total Project Value', type: 'number', required: false, placeholder: 'Complete project value', category: 'invoice' },
    { id: 'previousBillings', label: 'Previous Billings', type: 'number', required: false, placeholder: 'Previously billed amount', category: 'invoice' },
    { id: 'finalBalance', label: 'Final Balance', type: 'number', required: false, placeholder: 'Remaining balance', category: 'invoice' },
    { id: 'projectSummary', label: 'Project Summary', type: 'textarea', required: false, placeholder: 'Project completion summary', category: 'additional' }
  ],
  
  standard: [],
  
  interim: [
    { id: 'milestoneNumber', label: 'Milestone Number', type: 'text', required: true, placeholder: 'Current milestone', category: 'invoice' },
    { id: 'milestoneDescription', label: 'Milestone Description', type: 'textarea', required: false, placeholder: 'Milestone details', category: 'invoice' },
    { id: 'completionPercentage', label: 'Completion %', type: 'number', required: false, placeholder: 'Project completion percentage', category: 'invoice' },
    { id: 'nextMilestone', label: 'Next Milestone', type: 'text', required: false, placeholder: 'Upcoming milestone', category: 'additional' }
  ],
  
  credit: [
    { id: 'originalInvoice', label: 'Original Invoice', type: 'text', required: true, placeholder: 'Original invoice number', category: 'invoice' },
    { id: 'creditReason', label: 'Credit Reason', type: 'select', required: true, options: ['Return', 'Discount', 'Error Correction', 'Goodwill'], category: 'invoice' },
    { id: 'creditAmount', label: 'Credit Amount', type: 'number', required: true, placeholder: 'Amount to credit', category: 'invoice' },
    { id: 'adjustmentDetails', label: 'Adjustment Details', type: 'textarea', required: false, placeholder: 'Detailed explanation', category: 'additional' }
  ],
  
  overdue: [
    { id: 'originalDueDate', label: 'Original Due Date', type: 'date', required: true, category: 'invoice' },
    { id: 'daysOverdue', label: 'Days Overdue', type: 'number', required: false, placeholder: 'Days past due', category: 'invoice' },
    { id: 'lateFee', label: 'Late Fee', type: 'number', required: false, placeholder: 'Late payment fee', category: 'invoice' },
    { id: 'interestRate', label: 'Interest Rate %', type: 'number', required: false, placeholder: 'Monthly interest rate', category: 'additional' },
    { id: 'collectionNotice', label: 'Collection Notice', type: 'textarea', required: false, placeholder: 'Collection warning text', category: 'additional' }
  ],
  
  sales: [
    { id: 'salesRep', label: 'Sales Representative', type: 'text', required: false, placeholder: 'Sales rep name', category: 'business' },
    { id: 'commission', label: 'Commission %', type: 'number', required: false, placeholder: 'Commission percentage', category: 'additional' },
    { id: 'territory', label: 'Sales Territory', type: 'text', required: false, placeholder: 'Sales territory', category: 'additional' },
    { id: 'customerType', label: 'Customer Type', type: 'select', required: false, options: ['Retail', 'Wholesale', 'Distributor', 'Direct'], category: 'client' }
  ],
  
  debit: [
    { id: 'originalInvoice', label: 'Original Invoice', type: 'text', required: true, placeholder: 'Original invoice number', category: 'invoice' },
    { id: 'additionalCharge', label: 'Additional Charge', type: 'number', required: true, placeholder: 'Additional amount', category: 'invoice' },
    { id: 'chargeReason', label: 'Charge Reason', type: 'select', required: true, options: ['Additional Services', 'Price Adjustment', 'Shipping Costs', 'Other'], category: 'invoice' },
    { id: 'chargeDetails', label: 'Charge Details', type: 'textarea', required: false, placeholder: 'Detailed explanation', category: 'additional' }
  ],
  
  digital: [
    { id: 'digitalSignature', label: 'Digital Signature Required', type: 'select', required: false, options: ['Yes', 'No'], category: 'additional' },
    { id: 'paymentLink', label: 'Payment Link', type: 'text', required: false, placeholder: 'Online payment URL', category: 'additional' },
    { id: 'qrCode', label: 'Include QR Code', type: 'select', required: false, options: ['Yes', 'No'], category: 'additional' },
    { id: 'digitalDelivery', label: 'Digital Delivery Method', type: 'select', required: false, options: ['Email', 'Portal', 'API', 'Download'], category: 'additional' }
  ],
  
  mixed: [
    { id: 'productCategory', label: 'Primary Product Category', type: 'text', required: false, placeholder: 'Main product type', category: 'additional' },
    { id: 'serviceCategory', label: 'Primary Service Category', type: 'text', required: false, placeholder: 'Main service type', category: 'additional' },
    { id: 'itemGrouping', label: 'Group Items By', type: 'select', required: false, options: ['Category', 'Type', 'Date', 'None'], category: 'additional' }
  ],
  
  retainer: [
    { id: 'retainerAgreement', label: 'Retainer Agreement', type: 'text', required: true, placeholder: 'Agreement reference', category: 'invoice' },
    { id: 'retainerAmount', label: 'Retainer Amount', type: 'number', required: true, placeholder: 'Upfront payment amount', category: 'invoice' },
    { id: 'usageTracking', label: 'Track Usage', type: 'select', required: false, options: ['Yes', 'No'], category: 'additional' },
    { id: 'replenishmentTrigger', label: 'Replenishment Trigger', type: 'number', required: false, placeholder: 'Remaining amount trigger', category: 'additional' }
  ],
  
  creditNote: [
    { id: 'creditNoteNumber', label: 'Credit Note Number', type: 'text', required: true, placeholder: 'Credit note reference', category: 'invoice' },
    { id: 'originalInvoice', label: 'Original Invoice', type: 'text', required: true, placeholder: 'Original invoice number', category: 'invoice' },
    { id: 'returnReason', label: 'Return Reason', type: 'select', required: true, options: ['Damaged', 'Wrong Item', 'Customer Request', 'Quality Issue'], category: 'invoice' },
    { id: 'refundMethod', label: 'Refund Method', type: 'select', required: false, options: ['Bank Transfer', 'Credit Card', 'Store Credit', 'Cash'], category: 'additional' }
  ],
  
  debitMemo: [
    { id: 'memoNumber', label: 'Memo Number', type: 'text', required: true, placeholder: 'Debit memo reference', category: 'invoice' },
    { id: 'glAccount', label: 'GL Account', type: 'text', required: false, placeholder: 'General ledger account', category: 'additional' },
    { id: 'approvalRequired', label: 'Approval Required', type: 'select', required: false, options: ['Yes', 'No'], category: 'additional' },
    { id: 'balanceImpact', label: 'Balance Impact', type: 'number', required: false, placeholder: 'Net balance change', category: 'invoice' }
  ],
  
  expenseReport: [
    { id: 'reportPeriod', label: 'Report Period', type: 'text', required: true, placeholder: 'Expense period', category: 'invoice' },
    { id: 'employeeId', label: 'Employee ID', type: 'text', required: false, placeholder: 'Employee identifier', category: 'business' },
    { id: 'department', label: 'Department', type: 'text', required: false, placeholder: 'Department code/name', category: 'business' },
    { id: 'approver', label: 'Approver', type: 'text', required: false, placeholder: 'Approving manager', category: 'additional' },
    { id: 'reimbursementMethod', label: 'Reimbursement Method', type: 'select', required: false, options: ['Payroll', 'Direct Deposit', 'Check', 'Expense Card'], category: 'additional' }
  ],
  
  consolidated: [
    { id: 'consolidationPeriod', label: 'Consolidation Period', type: 'text', required: true, placeholder: 'Billing period', category: 'invoice' },
    { id: 'accountCount', label: 'Number of Accounts', type: 'number', required: false, placeholder: 'Total accounts included', category: 'invoice' },
    { id: 'summaryLevel', label: 'Summary Level', type: 'select', required: false, options: ['Account', 'Department', 'Location', 'Service'], category: 'additional' },
    { id: 'detailBreakdown', label: 'Include Detail Breakdown', type: 'select', required: false, options: ['Yes', 'No'], category: 'additional' }
  ],
  
  creditMemo: [
    { id: 'memoNumber', label: 'Credit Memo Number', type: 'text', required: true, placeholder: 'Credit memo reference', category: 'invoice' },
    { id: 'glReference', label: 'GL Reference', type: 'text', required: false, placeholder: 'General ledger reference', category: 'additional' },
    { id: 'accountingPeriod', label: 'Accounting Period', type: 'text', required: false, placeholder: 'Accounting period', category: 'additional' },
    { id: 'auditTrail', label: 'Audit Trail Required', type: 'select', required: false, options: ['Yes', 'No'], category: 'additional' }
  ],
  
  tax: [
    { id: 'taxId', label: 'Tax ID/GST Number', type: 'text', required: true, placeholder: 'Business tax identifier', category: 'business' },
    { id: 'taxPeriod', label: 'Tax Period', type: 'text', required: false, placeholder: 'Tax reporting period', category: 'invoice' },
    { id: 'taxRate', label: 'Tax Rate %', type: 'number', required: false, placeholder: 'Applicable tax rate', category: 'additional' },
    { id: 'taxExemption', label: 'Tax Exemption', type: 'text', required: false, placeholder: 'Exemption certificate number', category: 'additional' },
    { id: 'complianceNotes', label: 'Compliance Notes', type: 'textarea', required: false, placeholder: 'Regulatory compliance information', category: 'additional' }
  ]
};
