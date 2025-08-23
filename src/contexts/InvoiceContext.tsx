import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface BusinessInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
}

export interface ClientInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  email?: string;
  phone?: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  businessInfo: BusinessInfo;
  clientInfo: ClientInfo;
  lineItems: LineItem[];
  notes: string;
  terms: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  currency: string;
}

type InvoiceAction =
  | { type: 'UPDATE_BUSINESS_INFO'; payload: Partial<BusinessInfo> }
  | { type: 'UPDATE_CLIENT_INFO'; payload: Partial<ClientInfo> }
  | { type: 'UPDATE_INVOICE_META'; payload: { field: string; value: string } }
  | { type: 'ADD_LINE_ITEM' }
  | { type: 'UPDATE_LINE_ITEM'; payload: { id: string; field: keyof LineItem; value: string | number } }
  | { type: 'REMOVE_LINE_ITEM'; payload: string }
  | { type: 'UPDATE_NOTES'; payload: string }
  | { type: 'UPDATE_TERMS'; payload: string }
  | { type: 'UPDATE_TAX_RATE'; payload: number }
  | { type: 'UPDATE_CURRENCY'; payload: string }
  | { type: 'CALCULATE_TOTALS' }
  | { type: 'LOAD_DATA'; payload: InvoiceData };

const initialState: InvoiceData = {
  invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  businessInfo: {
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
  },
  clientInfo: {
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    phone: '',
  },
  lineItems: [
    {
      id: '1',
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
    },
  ],
  notes: '',
  terms: 'Payment is due within 30 days of invoice date.',
  subtotal: 0,
  taxRate: 0,
  taxAmount: 0,
  total: 0,
  currency: 'USD',
};

function invoiceReducer(state: InvoiceData, action: InvoiceAction): InvoiceData {
  switch (action.type) {
    case 'UPDATE_BUSINESS_INFO':
      return {
        ...state,
        businessInfo: { ...state.businessInfo, ...action.payload },
      };
    
    case 'UPDATE_CLIENT_INFO':
      return {
        ...state,
        clientInfo: { ...state.clientInfo, ...action.payload },
      };
    
    case 'UPDATE_INVOICE_META':
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    
    case 'ADD_LINE_ITEM':
      return {
        ...state,
        lineItems: [
          ...state.lineItems,
          {
            id: Date.now().toString(),
            description: '',
            quantity: 1,
            rate: 0,
            amount: 0,
          },
        ],
      };
    
    case 'UPDATE_LINE_ITEM':
      const updatedItems = state.lineItems.map(item => {
        if (item.id === action.payload.id) {
          const updatedItem = { ...item, [action.payload.field]: action.payload.value };
          if (action.payload.field === 'quantity' || action.payload.field === 'rate') {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate;
          }
          return updatedItem;
        }
        return item;
      });
      
      return { ...state, lineItems: updatedItems };
    
    case 'REMOVE_LINE_ITEM':
      return {
        ...state,
        lineItems: state.lineItems.filter(item => item.id !== action.payload),
      };
    
    case 'UPDATE_NOTES':
      return { ...state, notes: action.payload };
    
    case 'UPDATE_TERMS':
      return { ...state, terms: action.payload };
    
    case 'UPDATE_TAX_RATE':
      return { ...state, taxRate: action.payload };
    
    case 'UPDATE_CURRENCY':
      return { ...state, currency: action.payload };
    
    case 'CALCULATE_TOTALS':
      const subtotal = state.lineItems.reduce((sum, item) => sum + item.amount, 0);
      const taxAmount = subtotal * (state.taxRate / 100);
      const total = subtotal + taxAmount;
      
      return {
        ...state,
        subtotal,
        taxAmount,
        total,
      };
    
    case 'LOAD_DATA':
      return action.payload;
    
    default:
      return state;
  }
}

interface InvoiceContextType {
  invoice: InvoiceData;
  dispatch: React.Dispatch<InvoiceAction>;
  updateBusinessInfo: (info: Partial<BusinessInfo>) => void;
  updateClientInfo: (info: Partial<ClientInfo>) => void;
  updateInvoiceMeta: (field: string, value: string) => void;
  addLineItem: () => void;
  updateLineItem: (id: string, field: keyof LineItem, value: string | number) => void;
  removeLineItem: (id: string) => void;
  updateNotes: (notes: string) => void;
  updateTerms: (terms: string) => void;
  updateTaxRate: (rate: number) => void;
  updateCurrency: (currency: string) => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [invoice, dispatch] = useReducer(invoiceReducer, initialState);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('invoice-draft');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      } catch (error) {
        console.log('No saved invoice data found');
      }
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('invoice-draft', JSON.stringify(invoice));
  }, [invoice]);

  // Auto-calculate totals when line items or tax rate changes
  useEffect(() => {
    dispatch({ type: 'CALCULATE_TOTALS' });
  }, [invoice.lineItems, invoice.taxRate]);

  const updateBusinessInfo = (info: Partial<BusinessInfo>) => {
    dispatch({ type: 'UPDATE_BUSINESS_INFO', payload: info });
  };

  const updateClientInfo = (info: Partial<ClientInfo>) => {
    dispatch({ type: 'UPDATE_CLIENT_INFO', payload: info });
  };

  const updateInvoiceMeta = (field: string, value: string) => {
    dispatch({ type: 'UPDATE_INVOICE_META', payload: { field, value } });
  };

  const addLineItem = () => {
    dispatch({ type: 'ADD_LINE_ITEM' });
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    dispatch({ type: 'UPDATE_LINE_ITEM', payload: { id, field, value } });
  };

  const removeLineItem = (id: string) => {
    dispatch({ type: 'REMOVE_LINE_ITEM', payload: id });
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

  const updateCurrency = (currency: string) => {
    dispatch({ type: 'UPDATE_CURRENCY', payload: currency });
  };

  const value = {
    invoice,
    dispatch,
    updateBusinessInfo,
    updateClientInfo,
    updateInvoiceMeta,
    addLineItem,
    updateLineItem,
    removeLineItem,
    updateNotes,
    updateTerms,
    updateTaxRate,
    updateCurrency,
  };

  return (
    <InvoiceContext.Provider value={value}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};
