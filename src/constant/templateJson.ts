import { DynamicBillConfig } from "@/types/invoice";
// ===== ECOMMERCE TEMPLATES =====
export const ECOMMERCE_VIBRANT: DynamicBillConfig = {
  billType: "ECOMMERCE",
  templateStyle: "VIBRANT",
  templateVersion: 1,
  isBusinessInfoNeeded: true,
  businessInfo: {
    name: "ShopEase Online Store",
    address: {
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      pincode: "400001",
    },
    taxId: "AABCS1234E",
    gstNumber: "27AABCS1234E1Z5",
    phoneNumber: "9823456789",
    email: "support@shopease.in",
    placeOfSupply: "Maharashtra",
    logo: "https://via.placeholder.com/150x50?text=ShopEase",
  },
  invoiceInfo: {
    invoiceNumber: "#AB2324-01",
    invoiceDate: "2024-01-15",
    invoiceDueDate: "2024-01-30",
  },
  isCustomerInfoNeeded: true,
  customerInfo: {
    name: "Amit Kumar",
    address: {
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      pincode: "400002",
    },
    phoneNumber: "9898989898",
    email: "amit@example.com",
    customerId: "CUST001",
  },
  isItemListNeeded: true,
  itemList: [
    {
      itemName: "Wireless Mouse",
      description: "Ergonomic wireless mouse with USB receiver",
      hsnCode: "8471",
      quantity: 1,
      unit: "pc",
      rate: 499,
      tax: 18,
    },
    {
      itemName: "Mechanical Keyboard",
      description: "RGB backlit gaming keyboard",
      hsnCode: "8471",
      quantity: 1,
      unit: "pc",
      rate: 899,
      tax: 18,
    },
  ],
  billSummary: {
    subTotal: 1398,
    cgst: 125.82,
    sgst: 125.82,
    totalDue: 1649.64,
    totalInWords:
      "One Thousand Six Hundred Forty Nine Rupees and Sixty Four Paise Only",
    discountType: "PERCENTAGE",
    discount: 0,
    roundOff: 0.36,
  },
  isPaymentSectionNeeded: true,
  payment: {
    paymentOption: "UPI",
    transactionId: "TXN12345ABC",
    amountPaid: 1650,
  },
  isBankDetailsNeeded: false,
  isFooterNeeded: true,
  footer: {
    exitMessage: "Thank you for shopping with ShopEase!",
    returnPolicy: "7-day return policy on all electronics.",
    paymentTerms: "Prepaid orders only.",
    termsAndConditions: "All disputes subject to Mumbai jurisdiction.",
  },
  ecommerceInfo: {
    orderNumber: "ORD-2024-001",
    trackingNumber: "TRK123456789",
    estimatedDelivery: "2024-01-18",
    shippingMethod: "Standard Delivery",
    courierPartner: "BlueDart",
    returnDeadline: "2024-01-25",
  },
  uiMetadata: {
    displayName: "E-commerce & Online",
    description: "Optimized for online stores and delivery",
    icon: "ShoppingCart",
    colorGradient: "from-teal-500 to-sky-500",
    features: ["Shipping charges", "Order tracking", "Multiple items", "Online payment"],
    headerColor: "bg-gradient-to-r from-teal-500 to-sky-500",
    accentColor: "border-teal-200 bg-teal-50",
    textColor: "text-teal-700"
  }
};

// ===== HOTEL/RESTAURANT TEMPLATES =====
export const HOTEL_ELEGANT: DynamicBillConfig = {
  billType: "HOTEL",
  templateStyle: "ELEGANT",
  templateVersion: 1,
  isBusinessInfoNeeded: true,
  uiMetadata: {
    displayName: "Hotel & Hospitality",
    description: "Perfect for hotels, resorts, and restaurants",
    icon: "Hotel",
    colorGradient: "from-blue-500 to-cyan-500",
    features: ["Room charges", "Food & beverage", "Guest details", "Check-in/out dates"],
    headerColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
    accentColor: "border-blue-200 bg-blue-50",
    textColor: "text-blue-700"
  },
  businessInfo: {
    name: "Grand Palace Restaurant",
    address: {
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      pincode: "560001",
    },
    phoneNumber: "9876543210",
    email: "info@grandpalace.com",
    website: "www.grandpalace.com",
    gstNumber: "29AABCG1234H1Z5",
    licenseNumber: "FSSAI: 12345678901234",
  },
  invoiceInfo: {
    invoiceNumber: "INV-2024-0045",
    invoiceDate: "2024-01-15",
  },
  isCustomerInfoNeeded: true,
  customerInfo: {
    name: "Rajesh Sharma",
    phoneNumber: "9988776655",
  },
  isItemListNeeded: true,
  itemList: [
    {
      itemName: "Paneer Butter Masala",
      quantity: 2,
      unit: "plate",
      rate: 280,
      tax: 5,
    },
    {
      itemName: "Garlic Naan",
      quantity: 4,
      unit: "pc",
      rate: 45,
      tax: 5,
    },
    {
      itemName: "Mango Lassi",
      quantity: 2,
      unit: "glass",
      rate: 80,
      tax: 5,
    },
  ],
  billSummary: {
    subTotal: 800,
    cgst: 20,
    sgst: 20,
    totalDue: 840,
    totalInWords: "Eight Hundred Forty Rupees Only",
    discountType: "FIXED",
  },
  isPaymentSectionNeeded: true,
  payment: {
    paymentOption: "CARD",
    amountPaid: 840,
  },
  isBankDetailsNeeded: false,
  isFooterNeeded: true,
  footer: {
    exitMessage: "Thank you for dining with us! Visit again!",
    notes: "Service charge not included.",
  },
  hotelInfo: {
    tableNumber: "T-12",
    serverName: "Ramesh",
    numberOfGuests: 4,
    orderType: "DINE_IN",
  },
};

// ===== MEDICAL/CLINIC TEMPLATES =====
export const MEDICAL_CLINICAL: DynamicBillConfig = {
  billType: "MEDICAL",
  templateStyle: "CLINICAL",
  templateVersion: 1,
  isBusinessInfoNeeded: true,
  businessInfo: {
    name: "HealthCare Multispecialty Clinic",
    address: {
      street: "45 Park Street",
      city: "Kolkata",
      state: "West Bengal",
      country: "India",
      pincode: "700016",
    },
    phoneNumber: "9123456789",
    email: "care@healthcare.com",
    licenseNumber: "MED-WB-2023-001234",
  },
  invoiceInfo: {
    invoiceNumber: "MED-2024-0089",
    invoiceDate: "2024-01-15",
  },
  isCustomerInfoNeeded: true,
  customerInfo: {
    name: "Priya Banerjee",
    phoneNumber: "9876543210",
    email: "priya.b@email.com",
    patientId: "PAT-1234",
  },
  isServiceListNeeded: true,
  uiMetadata: {
    displayName: "Medical & Clinic",
    description: "Healthcare and medical services",
    icon: "Stethoscope",
    colorGradient: "from-red-500 to-pink-500",
    features: ["Patient records", "Consultation fees", "Prescription tracking", "Insurance details"],
    headerColor: "bg-gradient-to-r from-red-500 to-pink-500",
    accentColor: "border-red-200 bg-red-50",
    textColor: "text-red-700"
  },
  serviceList: [
    {
      description: "General Consultation",
      rate: "500",
      hours: 0.5,
    },
    {
      description: "Blood Test - Complete Blood Count",
      rate: "400",
      hours: 0,
    },
    {
      description: "ECG",
      rate: "300",
      hours: 0,
    },
  ],
  billSummary: {
    subTotal: 1200,
    totalDue: 1200,
    totalInWords: "One Thousand Two Hundred Rupees Only",
    discountType: "FIXED",
  },
  isPaymentSectionNeeded: true,
  payment: {
    paymentOption: "CASH",
    amountPaid: 1200,
    balanceDue: 0,
  },
  isBankDetailsNeeded: false,
  isFooterNeeded: true,
  footer: {
    exitMessage: "Get well soon! Follow prescribed medications.",
    notes: "Next appointment: 22nd January 2024",
  },
  medicalInfo: {
    doctorName: "Dr. Amit Sengupta",
    doctorQualification: "MBBS, MD (General Medicine)",
    patientAge: 32,
    patientGender: "FEMALE",
    visitType: "CONSULTATION",
    prescriptionNumber: "RX-2024-0089",
  },
};

// ===== SALON/SPA TEMPLATES =====
export const SALON_LUXURY: DynamicBillConfig = {
  billType: "SALON",
  templateStyle: "LUXURY",
  templateVersion: 1,
  uiMetadata: {
    displayName: "Salon & Spa",
    description: "Beauty and wellness services",
    icon: "Scissors",
    colorGradient: "from-pink-500 to-rose-500",
    features: ["Service packages", "Stylist details", "Appointment tracking", "Membership benefits"],
    headerColor: "bg-gradient-to-r from-pink-500 to-rose-500",
    accentColor: "border-pink-200 bg-pink-50",
    textColor: "text-pink-700"
  },
  isBusinessInfoNeeded: true,
  businessInfo: {
    name: "Glamour Studio & Spa",
    address: {
      street: "56 Fashion Street",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      pincode: "110001",
    },
    phoneNumber: "9811223344",
    email: "bookings@glamourstudio.com",
    gstNumber: "07AABCG5678P1Z5",
  },
  invoiceInfo: {
    invoiceNumber: "SAL-2024-0156",
    invoiceDate: "2024-01-15",
  },
  isCustomerInfoNeeded: true,
  customerInfo: {
    name: "Neha Kapoor",
    phoneNumber: "9988112233",
    membershipId: "MEM-5678",
  },
  isServiceListNeeded: true,
  serviceList: [
    {
      description: "Hair Cut & Styling",
      rate: "800",
      hours: 1,
      serviceProvider: "Sonia (Senior Stylist)",
    },
    {
      description: "Facial - Gold",
      rate: "1500",
      hours: 1.5,
      serviceProvider: "Meera",
    },
    {
      description: "Manicure & Pedicure",
      rate: "900",
      hours: 1,
      serviceProvider: "Rita",
    },
  ],
  billSummary: {
    subTotal: 3200,
    discount: 320,
    cgst: 259.2,
    sgst: 259.2,
    totalDue: 3398.4,
    totalInWords:
      "Three Thousand Three Hundred Ninety Eight Rupees and Forty Paise Only",
    discountType: "PERCENTAGE",
  },
  isPaymentSectionNeeded: true,
  payment: {
    paymentOption: "CARD",
    amountPaid: 3398,
  },
  isBankDetailsNeeded: false,
  isFooterNeeded: true,
  footer: {
    exitMessage: "Thank you for choosing Glamour Studio! You look fabulous!",
    notes: "Next appointment: 15th February 2024",
  },
  salonInfo: {
    appointmentTime: "2024-01-15T14:00:00",
    packageName: "Premium Grooming Package",
    membershipDiscount: 10,
  },
};

// ===== FREELANCER TEMPLATES =====
export const FREELANCER_PROFESSIONAL: DynamicBillConfig = {
  billType: "FREELANCER",
  templateStyle: "PROFESSIONAL",
  templateVersion: 1,
  isBusinessInfoNeeded: true,
  uiMetadata: {
    displayName: "Freelancer & Services",
    description: "Ideal for consultants and service providers",
    icon: "Briefcase",
    colorGradient: "from-purple-500 to-pink-500",
    features: ["Hourly billing", "Service description", "Payment terms", "Project details"],
    headerColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    accentColor: "border-purple-200 bg-purple-50",
    textColor: "text-purple-700"
  },
  businessInfo: {
    name: "Digital Solutions by Rahul",
    address: {
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      pincode: "411001",
    },
    phoneNumber: "9876501234",
    email: "rahul@digitalsolutions.com",
    website: "www.rahuldigital.com",
    gstNumber: "27AABCP1234R1Z5",
  },
  invoiceInfo: {
    invoiceNumber: "INV-2024-003",
    invoiceDate: "2024-01-15",
    invoiceDueDate: "2024-01-30",
  },
  isCustomerInfoNeeded: true,
  customerInfo: {
    name: "Tech Innovations Pvt Ltd",
    address: {
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      pincode: "411014",
    },
    email: "accounts@techinnovations.com",
  },
  isServiceListNeeded: true,
  serviceList: [
    {
      description: "Website Design & Development",
      rate: "25000",
      hours: 40,
      duration: "40 hours",
    },
    {
      description: "SEO Optimization",
      rate: "8000",
      hours: 16,
      duration: "16 hours",
    },
    {
      description: "Content Writing",
      rate: "5000",
      hours: 10,
      duration: "10 hours",
    },
  ],
  billSummary: {
    subTotal: 38000,
    cgst: 3420,
    sgst: 3420,
    totalDue: 44840,
    totalInWords: "Forty Four Thousand Eight Hundred Forty Rupees Only",
    discountType: "FIXED",
  },
  isPaymentSectionNeeded: true,
  payment: {
    paymentOption: "BANK_TRANSFER",
    balanceDue: 44840,
  },
  isBankDetailsNeeded: true,
  bankDetails: {
    bankName: "HDFC Bank",
    accountHolderName: "Rahul Sharma",
    accountNumber: "12345678901234",
    ifscCode: "HDFC0001234",
    upiId: "rahul@paytm",
  },
  isFooterNeeded: true,
  footer: {
    exitMessage: "Thank you for your business!",
    paymentTerms: "Payment due within 15 days.",
    notes: "Milestone 2 of 3 completed.",
  },
  freelancerInfo: {
    projectName: "E-commerce Website Development",
    projectDuration: "3 months",
    milestoneNumber: 2,
    totalMilestones: 3,
    deliverables: [
      "Responsive website",
      "Admin panel",
      "Payment gateway integration",
    ],
  },
};

// ===== RENTAL TEMPLATES =====
export const RENTAL_PROFESSIONAL: DynamicBillConfig = {
  billType: "RENTAL",
  templateStyle: "PROFESSIONAL",
  templateVersion: 1,
  uiMetadata: {
    displayName: "Rental & Property",
    description: "Property rentals and leasing",
    icon: "Home",
    colorGradient: "from-indigo-500 to-purple-500",
    features: ["Monthly rent", "Security deposit", "Maintenance charges", "Lease terms"],
    headerColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
    accentColor: "border-indigo-200 bg-indigo-50",
    textColor: "text-indigo-700"
  },
  isBusinessInfoNeeded: true,
  businessInfo: {
    name: "Prime Properties Rentals",
    address: {
      street: "88 Real Estate Avenue",
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
      pincode: "500001",
    },
    phoneNumber: "9177889900",
    email: "rentals@primeproperties.com",
    licenseNumber: "RERA-TS-2023-0012",
  },
  invoiceInfo: {
    invoiceNumber: "RENT-2024-001",
    invoiceDate: "2024-01-01",
  },
  isCustomerInfoNeeded: true,
  customerInfo: {
    name: "Vikram Reddy",
    phoneNumber: "9988334455",
    email: "vikram.r@email.com",
  },
  isItemListNeeded: true,
  itemList: [
    {
      itemName: "Monthly Rent - 2BHK Apartment",
      description: "Flat No. 302, Block A, Green Valley Apartments",
      quantity: 1,
      unit: "month",
      rate: 25000,
    },
    {
      itemName: "Maintenance Charges",
      quantity: 1,
      unit: "month",
      rate: 2000,
    },
  ],
  billSummary: {
    subTotal: 27000,
    totalDue: 27000,
    totalInWords: "Twenty Seven Thousand Rupees Only",
    discountType: "FIXED",
  },
  isPaymentSectionNeeded: true,
  payment: {
    paymentOption: "BANK_TRANSFER",
    amountPaid: 27000,
    securityDeposit: 50000,
  },
  isBankDetailsNeeded: true,
  bankDetails: {
    bankName: "State Bank of India",
    accountHolderName: "Prime Properties Rentals",
    accountNumber: "98765432109876",
    ifscCode: "SBIN0001234",
  },
  isFooterNeeded: true,
  footer: {
    exitMessage: "Thank you for choosing Prime Properties!",
    paymentTerms: "Rent due by 5th of every month.",
    termsAndConditions: "Late payment attracts penalty of Rs. 500 per day.",
  },
  rentalInfo: {
    rentalPeriod: {
      startDate: "2024-01-01",
      endDate: "2024-01-31",
    },
    propertyType: "RESIDENTIAL",
    securityDeposit: 50000,
    lateFee: 500,
    agreementNumber: "AGR-2023-0567",
  },
};

// ===== EDUCATION TEMPLATES =====
export const EDUCATION_ACADEMIC: DynamicBillConfig = {
  billType: "EDUCATION",
  templateStyle: "ACADEMIC",
  templateVersion: 1,
  uiMetadata: {
    displayName: "Education & Training",
    description: "Schools, colleges, and training centers",
    icon: "GraduationCap",
    colorGradient: "from-blue-500 to-indigo-500",
    features: ["Tuition fees", "Course details", "Student information", "Installment plans"],
    headerColor: "bg-gradient-to-r from-blue-500 to-indigo-500",
    accentColor: "border-blue-200 bg-blue-50",
    textColor: "text-blue-700"
  },
  isBusinessInfoNeeded: true,
  businessInfo: {
    name: "Bright Future Academy",
    address: {
      street: "15 Education Lane",
      city: "Jaipur",
      state: "Rajasthan",
      country: "India",
      pincode: "302001",
    },
    phoneNumber: "9141234567",
    email: "admissions@brightfuture.edu",
    website: "www.brightfuture.edu",
    registrationNumber: "EDU-RAJ-2020-5678",
  },
  invoiceInfo: {
    invoiceNumber: "FEE-2024-0234",
    invoiceDate: "2024-01-05",
  },
  isCustomerInfoNeeded: true,
  customerInfo: {
    name: "Ankit Sharma (Student)",
    phoneNumber: "9876543210",
    email: "ankit.sharma@email.com",
    studentId: "STU-2023-1234",
  },
  isItemListNeeded: true,
  itemList: [
    {
      itemName: "Tuition Fee - Semester 2",
      description: "B.Tech Computer Science",
      quantity: 1,
      unit: "semester",
      rate: 45000,
    },
    {
      itemName: "Library Fee",
      quantity: 1,
      unit: "semester",
      rate: 2000,
    },
    {
      itemName: "Laboratory Fee",
      quantity: 1,
      unit: "semester",
      rate: 3000,
    },
  ],
  billSummary: {
    subTotal: 50000,
    totalDue: 50000,
    totalInWords: "Fifty Thousand Rupees Only",
    discountType: "FIXED",
  },
  isPaymentSectionNeeded: true,
  payment: {
    paymentOption: "BANK_TRANSFER",
    amountPaid: 50000,
  },
  isBankDetailsNeeded: true,
  bankDetails: {
    bankName: "ICICI Bank",
    accountHolderName: "Bright Future Academy",
    accountNumber: "11223344556677",
    ifscCode: "ICIC0001234",
  },
  isFooterNeeded: true,
  footer: {
    exitMessage: "Thank you! Wishing you success in your studies!",
    paymentTerms: "Fee must be paid by 10th January 2024.",
  },
  educationInfo: {
    courseName: "Bachelor of Technology - Computer Science",
    academicYear: "2023-24",
    semester: "Semester 2",
    instructorName: "Prof. R.K. Verma",
    installmentNumber: 1,
    totalInstallments: 1,
  },
};

// ===== GYM/FITNESS TEMPLATES =====
export const GYM_ENERGETIC: DynamicBillConfig = {
  billType: "GYM",
  templateStyle: "ENERGETIC",
  uiMetadata: {
    displayName: "Gym & Fitness",
    description: "Fitness centers and training studios",
    icon: "Dumbbell",
    colorGradient: "from-orange-500 to-amber-500",
    features: ["Membership plans", "Personal training", "Class schedules", "Locker facilities"],
    headerColor: "bg-gradient-to-r from-orange-500 to-amber-500",
    accentColor: "border-orange-200 bg-orange-50",
    textColor: "text-orange-700"
  },
  templateVersion: 1,
  isBusinessInfoNeeded: true,
  businessInfo: {
    name: "PowerFit Gym & Wellness",
    address: {
      street: "22 Fitness Street",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      pincode: "600001",
    },
    phoneNumber: "9444556677",
    email: "info@powerfit.com",
    website: "www.powerfit.com",
  },
  invoiceInfo: {
    invoiceNumber: "GYM-2024-0067",
    invoiceDate: "2024-01-10",
  },
  isCustomerInfoNeeded: true,
  customerInfo: {
    name: "Karthik Subramanian",
    phoneNumber: "9988776655",
    membershipId: "MEM-2024-345",
  },
  isItemListNeeded: true,
  itemList: [
    {
      itemName: "Quarterly Membership",
      description: "Full gym access with group classes",
      quantity: 1,
      unit: "quarter",
      rate: 6000,
      tax: 18,
    },
    {
      itemName: "Personal Training Sessions",
      description: "10 sessions with certified trainer",
      quantity: 10,
      unit: "session",
      rate: 500,
      tax: 18,
    },
  ],
  billSummary: {
    subTotal: 11000,
    cgst: 990,
    sgst: 990,
    totalDue: 12980,
    totalInWords: "Twelve Thousand Nine Hundred Eighty Rupees Only",
    discountType: "FIXED",
  },
  isPaymentSectionNeeded: true,
  payment: {
    paymentOption: "UPI",
    transactionId: "GYM-TXN-001",
    amountPaid: 12980,
  },
  isBankDetailsNeeded: false,
  isFooterNeeded: true,
  footer: {
    exitMessage: "Stay fit, stay healthy! See you at the gym!",
    notes: "Membership valid till: 10th April 2024",
  },
  gymInfo: {
    membershipType: "QUARTERLY",
    validityPeriod: {
      startDate: "2024-01-10",
      endDate: "2024-04-10",
    },
    trainerName: "Rajesh Kumar",
    personalTrainingSession: 10,
    lockerNumber: "L-45",
  },
};

// ===== TRANSPORTATION TEMPLATES =====
export const TRANSPORTATION_LOGISTICS: DynamicBillConfig = {
  billType: "TRANSPORTATION",
  templateStyle: "LOGISTICS",
  uiMetadata: {
    displayName: "Transportation & Logistics",
    description: "Shipping and delivery services",
    icon: "Truck",
    colorGradient: "from-cyan-500 to-blue-500",
    features: ["Weight-based pricing", "Distance tracking", "Vehicle details", "Delivery proof"],
    headerColor: "bg-gradient-to-r from-cyan-500 to-blue-500",
    accentColor: "border-cyan-200 bg-cyan-50",
    textColor: "text-cyan-700"
  },
  templateVersion: 1,
  isBusinessInfoNeeded: true,
  businessInfo: {
    name: "Swift Transport Services",
    address: {
      street: "Transport Hub, Sector 18",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      pincode: "380001",
    },
    phoneNumber: "9179889900",
    email: "bookings@swifttransport.com",
    gstNumber: "24AABCS1234F1Z5",
  },
  invoiceInfo: {
    invoiceNumber: "TRANS-2024-0123",
    invoiceDate: "2024-01-12",
  },
  isCustomerInfoNeeded: true,
  customerInfo: {
    name: "Modern Electronics Pvt Ltd",
    phoneNumber: "9876543210",
    email: "logistics@modernelectronics.com",
  },
  isItemListNeeded: true,
  itemList: [
    {
      itemName: "Goods Transportation",
      description: "Electronic items - fragile",
      quantity: 500,
      unit: "kg",
      rate: 15,
      tax: 18,
    },
    {
      itemName: "Loading & Unloading",
      quantity: 1,
      unit: "service",
      rate: 500,
      tax: 18,
    },
    {
      itemName: "Insurance",
      quantity: 1,
      unit: "service",
      rate: 1000,
      tax: 18,
    },
  ],
  billSummary: {
    subTotal: 9000,
    cgst: 810,
    sgst: 810,
    totalDue: 10620,
    totalInWords: "Ten Thousand Six Hundred Twenty Rupees Only",
    discountType: "FIXED",
  },
  isPaymentSectionNeeded: true,
  payment: {
    paymentOption: "BANK_TRANSFER",
    balanceDue: 10620,
  },
  isBankDetailsNeeded: true,
  bankDetails: {
    bankName: "Axis Bank",
    accountHolderName: "Swift Transport Services",
    accountNumber: "22334455667788",
    ifscCode: "UTIB0001234",
  },
  isFooterNeeded: true,
  footer: {
    exitMessage: "Thank you for choosing Swift Transport!",
    paymentTerms: "Payment due within 7 days.",
  },
  transportationInfo: {
    vehicleNumber: "GJ-01-AB-1234",
    driverName: "Mahesh Patel",
    driverPhone: "9123456789",
    pickupLocation: "Ahmedabad - Warehouse District",
    deliveryLocation: "Mumbai - Andheri East",
    distance: 530,
    weight: 500,
    trackingNumber: "SWIFT-TRK-12345",
    expectedDelivery: "2024-01-14",
    deliveryType: "STANDARD",
  },
};

// ===== LEGAL/PROFESSIONAL TEMPLATES =====
export const LEGAL_FORMAL: DynamicBillConfig = {
  billType: "LEGAL",
  templateStyle: "FORMAL",
  templateVersion: 1,
  uiMetadata: {
    displayName: "Legal & Professional",
    description: "Law firms and legal services",
    icon: "Scale",
    colorGradient: "from-slate-600 to-gray-700",
    features: ["Hourly consultation", "Case tracking", "Document preparation", "Court fees"],
    headerColor: "bg-gradient-to-r from-slate-600 to-gray-700",
    accentColor: "border-slate-200 bg-slate-50",
    textColor: "text-slate-700"
  },
  isBusinessInfoNeeded: true,
  businessInfo: {
    name: "Sharma & Associates Law Firm",
    address: {
      street: "Supreme Court Complex",
      city: "New Delhi",
      state: "Delhi",
      country: "India",
      pincode: "110001",
    },
    phoneNumber: "9111223344",
    email: "contact@sharmalaw.com",
    website: "www.sharmalaw.com",
    registrationNumber: "BAR-DEL-2015-1234",
  },
  invoiceInfo: {
    invoiceNumber: "LEG-2024-0089",
    invoiceDate: "2024-01-15",
    invoiceDueDate: "2024-01-30",
  },
  isCustomerInfoNeeded: true,
  customerInfo: {
    name: "ABC Enterprises Ltd",
    address: {
      city: "New Delhi",
      state: "Delhi",
      country: "India",
      pincode: "110002",
    },
    email: "legal@abcenterprises.com",
  },
  isServiceListNeeded: true,
  serviceList: [
    {
      description: "Legal Consultation - Contract Review",
      rate: "5000",
      hours: 5,
      duration: "5 hours",
    },
    {
      description: "Court Appearance - District Court",
      rate: "8000",
      hours: 3,
      duration: "3 hours",
    },
    {
      description: "Document Drafting",
      rate: "3000",
      hours: 4,
      duration: "4 hours",
    },
  ],
  billSummary: {
    subTotal: 16000,
    cgst: 1440,
    sgst: 1440,
    totalDue: 18880,
    totalInWords: "Eighteen Thousand Eight Hundred Eighty Rupees Only",
    discountType: "FIXED",
  },
  isPaymentSectionNeeded: true,
  payment: {
    paymentOption: "BANK_TRANSFER",
    balanceDue: 18880,
  },
  isBankDetailsNeeded: true,
  bankDetails: {
    bankName: "Punjab National Bank",
    accountHolderName: "Sharma & Associates",
    accountNumber: "99887766554433",
    ifscCode: "PUNB0001234",
  },
  isFooterNeeded: true,
  footer: {
    exitMessage: "Thank you for entrusting us with your legal matters.",
    paymentTerms: "Payment due within 15 days of invoice date.",
    termsAndConditions: "All disputes subject to Delhi jurisdiction.",
  },
  legalInfo: {
    caseNumber: "CASE-2024-0045",
    consultationType: "HOURLY",
    hoursWorked: 12,
    hourlyRate: 1333,
    professionalTitle: "Advocate",
    barCouncilNumber: "D/1234/2015",
  },
};

// ===== SUPPLIER/B2B TEMPLATES =====
export const SUPPLIER_FORMAL: DynamicBillConfig = {
  billType: "SUPPLIER",
  templateStyle: "FORMAL",
  templateVersion: 1,
  isBusinessInfoNeeded: true,
  uiMetadata: {
    displayName: "Supplier & Wholesale",
    description: "Designed for B2B and bulk transactions",
    icon: "Package",
    colorGradient: "from-orange-500 to-red-500",
    features: ["Bulk pricing", "GST details", "Credit terms", "Purchase orders"],
    headerColor: "bg-gradient-to-r from-orange-500 to-red-500",
    accentColor: "border-orange-200 bg-orange-50",
    textColor: "text-orange-700"
  },
  businessInfo: {
    name: "Industrial Supplies Co.",
    address: {
      street: "Plot No. 45, Industrial Area",
      city: "Coimbatore",
      state: "Tamil Nadu",
      country: "India",
      pincode: "641001",
    },
    phoneNumber: "9442233445",
    email: "sales@industrialsupplies.com",
    gstNumber: "33AABCI1234K1Z5",
  },
  invoiceInfo: {
    invoiceNumber: "SUP-2024-0234",
    invoiceDate: "2024-01-16",
    invoiceDueDate: "2024-02-15",
    poNumber: "PO-2024-0012",
  },
  isCustomerInfoNeeded: true,
  customerInfo: {
    name: "Manufacturing Solutions Pvt Ltd",
    address: {
      city: "Coimbatore",
      state: "Tamil Nadu",
      country: "India",
      pincode: "641002",
    },
    phoneNumber: "9443322110",
    email: "purchase@manufacturingsolutions.com",
    gstin: "33AABCM1234L1Z5",
  },
  isItemListNeeded: true,
  itemList: [
    {
      itemName: "Wireless Mouse",
      description: "Ergonomic wireless mouse with USB receiver",
      hsnCode: "8471",
      quantity: 1,
      unit: "pc",
      rate: 499,
      tax: 18,
    },
    {
      itemName: "Mechanical Keyboard",
      description: "RGB backlit gaming keyboard",
      hsnCode: "8471",
      quantity: 1,
      unit: "pc",
      rate: 899,
      tax: 18,
    },
  ],
  billSummary: {
    subTotal: 1398,
    cgst: 125.82,
    sgst: 125.82,
    totalDue: 1649.64,
    totalInWords:
      "One Thousand Six Hundred Forty Nine Rupees and Sixty Four Paise Only",
    discountType: "PERCENTAGE",
    discount: 0,
    roundOff: 0.36,
  },
  isPaymentSectionNeeded: true,
  payment: {
    paymentOption: "UPI",
    transactionId: "TXN12345ABC",
    amountPaid: 1650,
  },
  isBankDetailsNeeded: false,
  isFooterNeeded: true,
  footer: {
    exitMessage: "Thank you for shopping with ShopEase!",
    returnPolicy: "7-day return policy on all electronics.",
    paymentTerms: "Prepaid orders only.",
    termsAndConditions: "All disputes subject to Mumbai jurisdiction.",
  },
  ecommerceInfo: {
    orderNumber: "ORD-2024-001",
    trackingNumber: "TRK123456789",
    estimatedDelivery: "2024-01-18",
    shippingMethod: "Standard Delivery",
    courierPartner: "BlueDart",
    returnDeadline: "2024-01-25",
  },
};

export const RETAILER_MODERN: DynamicBillConfig = {
  billType: "RETAILER",
  templateStyle: "MODERN",
  templateVersion: 1,
  isBusinessInfoNeeded: true,
  uiMetadata: {
    displayName: "Retail & POS",
    description: "Great for shops and retail businesses",
    icon: "Store",
    colorGradient: "from-green-500 to-emerald-500",
    features: ["Item-wise billing", "Discounts", "Cash/Card payment", "Quick checkout"],
    headerColor: "bg-gradient-to-r from-green-500 to-emerald-500",
    accentColor: "border-green-200 bg-green-50",
    textColor: "text-green-700"
  },
  businessInfo: {
    name: "QuickMart Retail Store",
    address: {
      street: "Shop No. 12, Market Complex",
      city: "Lucknow",
      state: "Uttar Pradesh",
      country: "India",
      pincode: "226001",
    },
    phoneNumber: "9415223344",
    email: "info@quickmart.com",
    gstNumber: "09AABCQ1234R1Z5",
  },
  invoiceInfo: {
    invoiceNumber: "RET-2024-1567",
    invoiceDate: "2024-01-16",
  },
  isCustomerInfoNeeded: true,
  customerInfo: {
    name: "Suresh Kumar",
    phoneNumber: "9876543210",
  },
  isItemListNeeded: true,
  itemList: [
    {
      itemName: "Rice - Basmati 1kg",
      hsnCode: "1006",
      quantity: 2,
      unit: "kg",
      rate: 180,
      tax: 0,
    },
    {
      itemName: "Cooking Oil - Sunflower 1L",
      hsnCode: "1512",
      quantity: 1,
      unit: "ltr",
      rate: 150,
      tax: 5,
    },
    {
      itemName: "Sugar - 1kg",
      hsnCode: "1701",
      quantity: 2,
      unit: "kg",
      rate: 45,
      tax: 0,
    },
    {
      itemName: "Tea Powder - 250g",
      hsnCode: "0902",
      quantity: 1,
      unit: "pack",
      rate: 120,
      tax: 5,
    },
  ],
  billSummary: {
    subTotal: 720,
    cgst: 6.75,
    sgst: 6.75,
    totalDue: 733.5,
    totalInWords: "Seven Hundred Thirty Three Rupees and Fifty Paise Only",
    discountType: "FIXED",
    roundOff: 0.5,
  },
  isPaymentSectionNeeded: true,
  payment: {
    paymentOption: "CASH",
    amountPaid: 734,
  },
  isBankDetailsNeeded: false,
  isFooterNeeded: true,
  footer: {
    exitMessage: "Thank you! Visit again!",
    returnPolicy: "No returns on food items.",
  },
};

export const ALL_TEMPLATES = {
  ECOMMERCE: {
    VIBRANT: ECOMMERCE_VIBRANT,
  },
  HOTEL: {
    ELEGANT: HOTEL_ELEGANT,
  },
  MEDICAL: {
    CLINICAL: MEDICAL_CLINICAL,
  },
  SALON: {
    LUXURY: SALON_LUXURY,
  },
  FREELANCER: {
    PROFESSIONAL: FREELANCER_PROFESSIONAL,
  },
  RENTAL: {
    PROFESSIONAL: RENTAL_PROFESSIONAL,
  },
  EDUCATION: {
    ACADEMIC: EDUCATION_ACADEMIC,
  },
  GYM: {
    ENERGETIC: GYM_ENERGETIC,
  },
  TRANSPORTATION: {
    LOGISTICS: TRANSPORTATION_LOGISTICS,
  },
  LEGAL: {
    FORMAL: LEGAL_FORMAL,
  },
  SUPPLIER: {
    FORMAL: SUPPLIER_FORMAL,
  },
  RETAILER: {
    MODERN: RETAILER_MODERN,
  },
};

export function getTemplate(
  billType: keyof typeof ALL_TEMPLATES,
  templateStyle: string
): DynamicBillConfig | undefined {
  return ALL_TEMPLATES[billType]?.[
    templateStyle as keyof (typeof ALL_TEMPLATES)[typeof billType]
  ];
}

/**
 * Get all templates for a specific bill type
 * @param billType - The type of bill
 * @returns Object containing all style variants for that bill type
 */
export function getTemplatesByType(billType: keyof typeof ALL_TEMPLATES) {
  return ALL_TEMPLATES[billType];
}

/**
 * Get a list of all available bill types
 * @returns Array of bill type names
 */
export function getAllBillTypes(): string[] {
  return Object.keys(ALL_TEMPLATES);
}

/**
 * Get available styles for a bill type
 * @param billType - The type of bill
 * @returns Array of available style names
 */
export function getAvailableStyles(
  billType: keyof typeof ALL_TEMPLATES
): string[] {
  return Object.keys(ALL_TEMPLATES[billType] || {});
}
