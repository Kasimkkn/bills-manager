export interface Address {
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface BusinessInfo {
  name: string;
  address?: Address;
  phoneNumber?: number | string;
  email?: string;
  website?: string;
  placeOfSupply?: string;
  logo?: string;
  taxId?: string;
  gstNumber?: string;
}

export interface CustomerInfo {
  name: string;
  address?: Address;
  phoneNumber?: number | string;
  email?: string;
  gstin?: string;
}

export interface InvoiceInfo {
  invoiceNumber?: string | number;
  invoiceDate?: string | Date;
  invoiceDueDate?: string | Date;
}

export interface Item {
  itemName: string;
  hsnCode?: string;
  quantity?: number;
  unit?: string;
  rate: number;
  discount?: number; // fixed or %
  tax?: number; // % or fixed
}

export interface Service {
  description: string;
  rate?: string;
  hours: number;
}

export interface Payment {
  paymentOption: "CASH" | "UPI" | "CARD" | "BANK_TRANSFER" | "COD" | string;
  transactionId?: string;
  amountPaid?: number;
  balanceDue?: number;
}

export interface BillSummary {
  discountType: "FIXED" | "PERCENTAGE";
  subTotal: number;
  discount?: string;
  shippingCharge?: number;
  packingCharge?: number;
  cgst?: number;
  sgst?: number;
  igst?: number;
  totalDue: number;
  totalInWords?: string;
}

export interface Footer {
  exitMessage: string;
  returnPolicy?: string;
  warrantyInfo?: string;
  paymentTerms?: string;
  signature?: string;
}

export interface BankDetails {
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  upiId?: string;
}

export interface DynamicBillConfig {
  billType: "HOTEL" | "FREELANCER" | "SUPPLIER" | "RETAILER" | "ECOMMERCE";
  isBusinessInfoNeeded: boolean;
  businessInfo?: BusinessInfo;
  isCustomerInfoNeeded: boolean;
  customerInfo?: CustomerInfo;
  invoiceInfo: InvoiceInfo;
  isItemListNeeded?: boolean;
  itemList?: Item[];
  isServiceListNeeded?: boolean;
  serviceList?: Service[];
  billSummary?: BillSummary;
  isPaymentSectionNeeded: boolean;
  payment?: Payment;
  isBankDetailsNeeded: boolean;
  bankDetails?: BankDetails;
  isFooterNeeded: boolean;
  footer?: Footer;
}
