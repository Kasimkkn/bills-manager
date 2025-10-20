interface Address {
  city: string;
  state: string;
  country: string;
  pincode: string;
}
export interface DynamicBillConfig {
  billType: "HOTEL" | "FREELANCER" | "SUPPLIER" | "RETAILER" | "ECOMMERCE";

  // 1️⃣ Business Information Section
  isBusinessInfoNeeded: boolean;
  businessInfo?: {
    name: string;
    address?: Address;
    phoneNumber?: number | string;
    email?: string;
    website?: string;
    placeOfSupply?: string;
    logo?: string;
    taxId?: string;
    gstNumber?: string;
  };

  // 2️⃣ Customer / Client Section
  isCustomerInfoNeeded: boolean;
  customerInfo?: {
    name: string;
    address?: Address;
    phone?: number | string;
    email?: string;
    gstin?: string;
  };

  // Invoice Info
  invoiceInfo: {
    invoiceNumber?: string | number;
    invoiceDate?: string | Date;
    invoiceDueDate?: string | Date;
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
  }[];

  // 4️⃣ Bill Summary Section
  billSummary?: {
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
