export interface DynamicBillConfig {
  billType: "HOTEL" | "FREELANCER" | "SUPPLIER" | "RETAILER" | "ECOMMERCE";

  // 1️⃣ Business Information Section
  isBusinessInfoNeeded: boolean;
  businessInfo?: {
    name: string;
    address?: string;
    phoneNumber?: number | string;
    email?: string;
    website?: string;
    logoUrl?: string;
    gstin?: string;
    invoiceNumber?: string | number;
    invoiceDate?: string | Date;
    placeOfSupply?: string;
    logo?: string;
  };

  // 2️⃣ Customer / Client Section
  isCustomerInfoNeeded: boolean;
  customerInfo?: {
    name: string;
    address?: string;
    phone?: number | string;
    email?: string;
    gstin?: string;
  };

  // 3️⃣ Product or Service List Section
  isItemListNeeded: boolean;
  itemList?: {
    itemName: string;
    hsnCode?: string;
    quantity?: number;
    unit?: string;
    rate: number;
    discount?: number; // fixed or %
    tax?: number; // % or fixed
    total: number;
  }[];

  // 4️⃣ Bill Summary Section
  isBillSummaryNeeded: boolean;
  billSummary?: {
    discountType: "FIXED" | "PERCENTAGE";
    subTotal: number;
    discount?: number;
    shippingCharge?: number;
    packingCharge?: number;
    cgst?: number;
    sgst?: number;
    igst?: number;
    totalDue: number;
    totalInWords?: string;
  };

  // 5️⃣ Payment Section
  isPaymentSectionNeeded: boolean;
  payment?: {
    paymentOption: "CASH" | "UPI" | "CARD" | "BANK_TRANSFER" | "COD" | string;
    transactionId?: string;
    amountPaid?: number;
    balanceDue?: number;
  };

  // 6️⃣ Bank Details (Freelancer / Supplier)
  isBankDetailsNeeded: boolean;
  bankDetails?: {
    bankName: string;
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    upiId?: string;
  };

  // 7️⃣ Footer / Extra Section
  isFooterNeeded: boolean;
  footer?: {
    exitMessage: string;
    returnPolicy?: string;
    warrantyInfo?: string;
    paymentTerms?: string;
    signature?: string;
  };
}
