import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  InvoiceData,
  BusinessInfo,
  ClientInfo,
  LineItem,
  CurrencyCode,
  TemplateData
} from '@/types/core';
import { TemplateRegistry } from '@/types/templates';

// Initial invoice factory
const createInitialInvoice = (templateId: string = 'modern'): InvoiceData => ({
  id: `inv-${Date.now()}`,
  invoiceNumber: `INV-${String(Date.now()).slice(-6)}`,
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  status: 'draft',
  templateId,
  businessInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    logo: undefined
  },
  clientInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  },
  lineItems: [{
    id: `item-${Date.now()}`,
    description: '',
    quantity: 1,
    rate: 0,
    amount: 0
  }],
  subtotal: 0,
  taxRate: 0,
  taxAmount: 0,
  total: 0,
  currency: 'USD' as CurrencyCode,
  locale: 'en-US',
  notes: '',
  terms: 'Payment is due within 30 days of invoice date.',
  // 🔥 FLEXIBLE TEMPLATE DATA
  templateData: TemplateRegistry.getDefaultData(templateId),
  createdAt: new Date(),
  updatedAt: new Date()
});

interface InvoiceContextType {
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

type InvoiceAction =
  | { type: 'UPDATE_BUSINESS_INFO'; payload: Partial<BusinessInfo> }
  | { type: 'UPDATE_CLIENT_INFO'; payload: Partial<ClientInfo> }
  | { type: 'UPDATE_INVOICE_META'; payload: { field: keyof InvoiceData; value: any } }
  | { type: 'UPDATE_TEMPLATE_DATA'; payload: { field: string; value: any } }
  | { type: 'ADD_LINE_ITEM' }
  | { type: 'UPDATE_LINE_ITEM'; payload: { id: string; field: keyof LineItem; value: any } }
  | { type: 'REMOVE_LINE_ITEM'; payload: string }
  | { type: 'UPDATE_CURRENCY'; payload: CurrencyCode }
  | { type: 'UPDATE_NOTES'; payload: string }
  | { type: 'UPDATE_TERMS'; payload: string }
  | { type: 'UPDATE_TAX_RATE'; payload: number }
  | { type: 'CALCULATE_TOTALS' }
  | { type: 'RESET_INVOICE'; payload?: string }
  | { type: 'LOAD_INVOICE'; payload: InvoiceData }
  | { type: 'SET_TEMPLATE'; payload: string };

const invoiceReducer = (state: InvoiceData, action: InvoiceAction): InvoiceData => {
  switch (action.type) {
    case 'UPDATE_BUSINESS_INFO':
      return {
        ...state,
        businessInfo: { ...state.businessInfo, ...action.payload },
        updatedAt: new Date()
      };

    case 'UPDATE_CLIENT_INFO':
      return {
        ...state,
        clientInfo: { ...state.clientInfo, ...action.payload },
        updatedAt: new Date()
      };

    case 'UPDATE_INVOICE_META':
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        updatedAt: new Date()
      };

    case 'UPDATE_TEMPLATE_DATA':
      return {
        ...state,
        templateData: {
          ...state.templateData,
          [action.payload.field]: action.payload.value
        },
        updatedAt: new Date()
      };

    case 'SET_TEMPLATE':
      return {
        ...state,
        templateId: action.payload,
        templateData: TemplateRegistry.getDefaultData(action.payload),
        updatedAt: new Date()
      };

    case 'ADD_LINE_ITEM':
      return {
        ...state,
        lineItems: [
          ...state.lineItems,
          {
            id: `item-${Date.now()}`,
            description: '',
            quantity: 1,
            rate: 0,
            amount: 0
          }
        ],
        updatedAt: new Date()
      };

    case 'UPDATE_LINE_ITEM':
      const updatedLineItems = state.lineItems.map(item => {
        if (item.id === action.payload.id) {
          const updatedItem = { ...item, [action.payload.field]: action.payload.value };
          // Recalculate amount when quantity or rate changes
          if (action.payload.field === 'quantity' || action.payload.field === 'rate') {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate;
          }
          return updatedItem;
        }
        return item;
      });

      return {
        ...state,
        lineItems: updatedLineItems,
        updatedAt: new Date()
      };

    case 'REMOVE_LINE_ITEM':
      return {
        ...state,
        lineItems: state.lineItems.filter(item => item.id !== action.payload),
        updatedAt: new Date()
      };

    case 'UPDATE_CURRENCY':
      return {
        ...state,
        currency: action.payload,
        updatedAt: new Date()
      };

    case 'UPDATE_NOTES':
      return {
        ...state,
        notes: action.payload,
        updatedAt: new Date()
      };

    case 'UPDATE_TERMS':
      return {
        ...state,
        terms: action.payload,
        updatedAt: new Date()
      };

    case 'UPDATE_TAX_RATE':
      return {
        ...state,
        taxRate: action.payload,
        updatedAt: new Date()
      };

    case 'CALCULATE_TOTALS':
      const subtotal = state.lineItems.reduce((sum, item) => sum + item.amount, 0);
      const taxAmount = subtotal * (state.taxRate / 100);
      const total = subtotal + taxAmount - (state.discountAmount || 0);

      return {
        ...state,
        subtotal,
        taxAmount,
        total,
        updatedAt: new Date()
      };

    case 'RESET_INVOICE':
      return createInitialInvoice(action.payload || 'modern');

    case 'LOAD_INVOICE':
      return action.payload;

    default:
      return state;
  }
};

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};

interface InvoiceProviderProps {
  children: React.ReactNode;
}

export const InvoiceProvider: React.FC<InvoiceProviderProps> = ({ children }) => {
  const [invoice, dispatch] = useReducer(invoiceReducer, createInitialInvoice());

  // Auto-calculate totals when line items or tax rate change
  useEffect(() => {
    dispatch({ type: 'CALCULATE_TOTALS' });
  }, [invoice.lineItems, invoice.taxRate, invoice.discountAmount]);

  const updateBusinessInfo = (data: Partial<BusinessInfo>) => {
    dispatch({ type: 'UPDATE_BUSINESS_INFO', payload: data });
  };

  const updateClientInfo = (data: Partial<ClientInfo>) => {
    dispatch({ type: 'UPDATE_CLIENT_INFO', payload: data });
  };

  const updateInvoiceMeta = (field: keyof InvoiceData, value: any) => {
    dispatch({ type: 'UPDATE_INVOICE_META', payload: { field, value } });
  };

  const updateTemplateData = (field: string, value: any) => {
    dispatch({ type: 'UPDATE_TEMPLATE_DATA', payload: { field, value } });
  };

  const addLineItem = () => {
    dispatch({ type: 'ADD_LINE_ITEM' });
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    dispatch({ type: 'UPDATE_LINE_ITEM', payload: { id, field, value } });
  };

  const removeLineItem = (id: string) => {
    dispatch({ type: 'REMOVE_LINE_ITEM', payload: id });
  };

  const updateCurrency = (currency: CurrencyCode) => {
    dispatch({ type: 'UPDATE_CURRENCY', payload: currency });
  };

  const updateNotes = (notes: string) => {
    dispatch({ type: 'UPDATE_NOTES', payload: notes });
  };

  const updateTerms = (terms: string) => {
    dispatch({ type: 'UPDATE_TERMS', payload: terms });
  };

  const updateTaxRate = (rate: number) => {
    dispatch({ type: 'UPDATE_TAX_RATE', payload: rate });
  };

  const calculateTotals = () => {
    dispatch({ type: 'CALCULATE_TOTALS' });
  };

  const resetInvoice = () => {
    dispatch({ type: 'RESET_INVOICE' });
  };

  const loadInvoice = (invoiceData: InvoiceData) => {
    dispatch({ type: 'LOAD_INVOICE', payload: invoiceData });
  };

  const setTemplate = (templateId: string) => {
    dispatch({ type: 'SET_TEMPLATE', payload: templateId });
  };

  const value: InvoiceContextType = {
    invoice,
    updateBusinessInfo,
    updateClientInfo,
    updateInvoiceMeta,
    updateTemplateData,
    addLineItem,
    updateLineItem,
    removeLineItem,
    updateCurrency,
    updateNotes,
    updateTerms,
    updateTaxRate,
    calculateTotals,
    resetInvoice,
    loadInvoice,
    setTemplate
  };

  return (
    <InvoiceContext.Provider value={value}>
      {children}
    </InvoiceContext.Provider>
  );
};

// 🔥 BENEFITS OF THIS APPROACH:

/*
✅ EASY TO ADD NEW TEMPLATES:
   - Just create a new template object
   - Add it to ALL_TEMPLATES array
   - No type changes needed!

✅ FLEXIBLE FIELD SYSTEM:
   - Any field can be added to any template
   - No predefined interfaces required
   - Fields are self-documenting

✅ AUTOMATIC FORM GENERATION:
   - Forms automatically adapt to template fields
   - No manual form updates needed

✅ TYPE SAFETY:
   - Still type-safe with TypeScript
   - Uses generic types for flexibility

✅ EASY MAINTENANCE:
   - Each template is self-contained
   - No complex inheritance or shared types
   - Easy to modify or remove templates

✅ FUTURE PROOF:
   - Can add any kind of field
   - Can add validation rules
   - Can add conditional fields
   - Can add field groups/sections

✅ SCALABLE:
   - Works with 5 templates or 500 templates
   - No performance impact
   - Clean separation of concerns
*/