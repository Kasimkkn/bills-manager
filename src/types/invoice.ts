export interface Service {
  description: string;
  rate?: string;
  hours: number;
}

interface Address {
  city: string;
  state: string;
  country: string;
  pincode: string;
  street?: string;
}

interface BusinessInfo {
  name: string;
  address?: Address;
  phoneNumber?: number | string;
  email?: string;
  website?: string;
  placeOfSupply?: string;
  logo?: string;
  taxId?: string;
  gstNumber?: string;
  licenseNumber?: string; // For medical, salon, etc.
  registrationNumber?: string; // For education, legal, etc.
}

interface CustomerInfo {
  name: string;
  address?: Address;
  phoneNumber?: number | string;
  email?: string;
  gstin?: string;
  phone?: string;
  customerId?: string; // For tracking returning customers
  patientId?: string; // For medical bills
  studentId?: string; // For education bills
  membershipId?: string; // For gym/fitness bills
}

interface InvoiceInfo {
  invoiceNumber?: string | number;
  invoiceDate?: string | Date;
  invoiceDueDate?: string | Date;
  poNumber?: string; // Purchase Order Number
  referenceNumber?: string; // General reference
}

interface Item {
  itemName: string;
  description?: string;
  hsnCode?: string;
  quantity?: number;
  unit?: string;
  rate: number;
  discount?: number;
  tax?: number;
  // Service-specific fields
  duration?: string; // For services (e.g., "2 hours")
  serviceProvider?: string; // For salon, gym (therapist/trainer name)
}

interface Payment {
  paymentOption: "CASH" | "UPI" | "CARD" | "BANK_TRANSFER" | "CHEQUE" | "COD" | "INSURANCE" | string;
  transactionId?: string;
  amountPaid?: number;
  balanceDue?: number;
  advancePaid?: number; // For bookings/rentals
  securityDeposit?: number; // For rentals
}

interface BillSummary {
  discountType: "FIXED" | "PERCENTAGE";
  subTotal: number;
  discount?: string | number;
  shippingCharge?: number;
  packingCharge?: number;
  cgst?: number;
  sgst?: number;
  igst?: number;
  totalDue: number;
  totalInWords?: string;
  roundOff?: number;
}

interface Footer {
  exitMessage: string;
  returnPolicy?: string;
  warrantyInfo?: string;
  paymentTerms?: string;
  signature?: string;
  termsAndConditions?: string;
  notes?: string;
}

interface BankDetails {
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  upiId?: string;
  swiftCode?: string; // For international transactions
}

// ===== TYPE-SPECIFIC INTERFACES =====

// HOTEL/RESTAURANT specific
interface HotelInfo {
  tableNumber?: string;
  serverName?: string;
  numberOfGuests?: number;
  orderType?: "DINE_IN" | "TAKEAWAY" | "DELIVERY";
  roomNumber?: string; // For hotel room service
}

// RENTAL specific
interface RentalInfo {
  rentalPeriod: {
    startDate: string | Date;
    endDate: string | Date;
  };
  propertyAddress?: Address;
  propertyType?: "RESIDENTIAL" | "COMMERCIAL" | "EQUIPMENT" | "VEHICLE";
  securityDeposit?: number;
  lateFee?: number;
  renewalDate?: string | Date;
  agreementNumber?: string;
}

// MEDICAL/CLINIC specific
interface MedicalInfo {
  doctorName: string;
  doctorQualification?: string;
  patientAge?: number;
  patientGender?: "MALE" | "FEMALE" | "OTHER";
  visitType?: "CONSULTATION" | "FOLLOWUP" | "EMERGENCY";
  diagnosis?: string;
  prescriptionNumber?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
}

// SALON/SPA specific
interface SalonInfo {
  appointmentTime?: string | Date;
  stylistName?: string;
  therapistName?: string;
  packageName?: string;
  membershipDiscount?: number;
}

// TRANSPORTATION specific
interface TransportationInfo {
  vehicleNumber?: string;
  driverName?: string;
  driverPhone?: string;
  pickupLocation: string;
  deliveryLocation: string;
  distance?: number; // in km
  weight?: number; // in kg
  trackingNumber?: string;
  expectedDelivery?: string | Date;
  deliveryType?: "EXPRESS" | "STANDARD" | "SAME_DAY";
}

// EDUCATION specific
interface EducationInfo {
  courseName: string;
  batchNumber?: string;
  academicYear?: string;
  semester?: string;
  courseDuration?: string;
  instructorName?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  installmentNumber?: number;
  totalInstallments?: number;
}

// GYM/FITNESS specific
interface GymInfo {
  membershipType: "MONTHLY" | "QUARTERLY" | "HALF_YEARLY" | "YEARLY" | "DAILY";
  validityPeriod: {
    startDate: string | Date;
    endDate: string | Date;
  };
  trainerName?: string;
  personalTrainingSession?: number;
  lockerNumber?: string;
  plan?: string;
}

// LEGAL/PROFESSIONAL specific
interface LegalInfo {
  caseNumber?: string;
  projectReference?: string;
  consultationType?: "HOURLY" | "FIXED" | "RETAINER";
  hoursWorked?: number;
  hourlyRate?: number;
  professionalTitle?: string; // CA, Advocate, Architect, etc.
  barCouncilNumber?: string;
  licenseNumber?: string;
}

// FREELANCER specific
interface FreelancerInfo {
  projectName?: string;
  projectDuration?: string;
  milestoneNumber?: number;
  totalMilestones?: number;
  workDescription?: string;
  deliverables?: string[];
}

// ECOMMERCE specific
interface EcommerceInfo {
  orderNumber: string;
  trackingNumber?: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  estimatedDelivery?: string | Date;
  shippingMethod?: string;
  courierPartner?: string;
  returnDeadline?: string | Date;
}

// SUPPLIER/B2B specific
interface SupplierInfo {
  purchaseOrderNumber?: string;
  deliveryNote?: string;
  batchNumber?: string;
  vehicleNumber?: string;
  eWayBillNumber?: string;
  creditPeriod?: number; // in days
  creditLimit?: number;
}

type TemplateStyleConfig = {
  HOTEL: "ELEGANT" | "MINIMAL" | "MODERN" | "CLASSIC";
  FREELANCER: "CREATIVE" | "PROFESSIONAL" | "CORPORATE" | "MINIMAL";
  SUPPLIER: "FORMAL" | "DETAILED" | "COMPACT";
  RETAILER: "MODERN" | "CLASSIC" | "COLORFUL";
  ECOMMERCE: "VIBRANT" | "CLEAN" | "MARKETPLACE";
  RENTAL: "PROFESSIONAL" | "FRIENDLY" | "LEGAL";
  MEDICAL: "CLINICAL" | "MODERN" | "PRESCRIPTION";
  SALON: "LUXURY" | "MINIMAL" | "BOUTIQUE";
  TRANSPORTATION: "LOGISTICS" | "COURIER" | "TAXI";
  EDUCATION: "ACADEMIC" | "MODERN" | "INSTITUTIONAL";
  GYM: "ENERGETIC" | "PROFESSIONAL" | "SPORTY";
  LEGAL: "FORMAL" | "LETTERHEAD" | "MODERN";
};

// ===== MAIN DYNAMIC BILL CONFIG =====
interface DynamicBillConfig {
  billType:
  | "HOTEL"
  | "FREELANCER"
  | "SUPPLIER"
  | "RETAILER"
  | "ECOMMERCE"
  | "RENTAL"
  | "MEDICAL"
  | "SALON"
  | "TRANSPORTATION"
  | "EDUCATION"
  | "GYM"
  | "LEGAL";

  templateStyle?: string; // This will hold values like "ELEGANT", "MINIMAL", etc.
  templateVersion?: number; // Optional: for versioning like v1, v2, v3

  // Common fields
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

  // Type-specific fields
  hotelInfo?: HotelInfo;
  rentalInfo?: RentalInfo;
  medicalInfo?: MedicalInfo;
  salonInfo?: SalonInfo;
  transportationInfo?: TransportationInfo;
  educationInfo?: EducationInfo;
  gymInfo?: GymInfo;
  legalInfo?: LegalInfo;
  freelancerInfo?: FreelancerInfo;
  ecommerceInfo?: EcommerceInfo;
  supplierInfo?: SupplierInfo;
}

// ===== EXPORT =====
export type {
  DynamicBillConfig,
  Address,
  BusinessInfo,
  CustomerInfo,
  InvoiceInfo,
  Item,
  Payment,
  BillSummary,
  Footer,
  BankDetails,
  HotelInfo,
  RentalInfo,
  MedicalInfo,
  SalonInfo,
  TransportationInfo,
  EducationInfo,
  GymInfo,
  LegalInfo,
  FreelancerInfo,
  EcommerceInfo,
  SupplierInfo,
};