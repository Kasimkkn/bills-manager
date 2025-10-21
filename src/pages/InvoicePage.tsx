import Invoice1 from "@/components/invoiceUI/Invoice1";
import Invoice2 from "@/components/invoiceUI/Invoice2";
import { Button } from "@/components/ui/button";
import { DynamicBillConfig } from "@/types/invoice";
import { Download, Eye, EyeOff } from "lucide-react";
import { useState } from "react";


const InvoicePage = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState<DynamicBillConfig | null>({
    billType: "ECOMMERCE",

    isBusinessInfoNeeded: true,
    businessInfo: {
      name: "ShopEase Online Store",
      address: {
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        pincode: "000123",
      },
      taxId: "",
      gstNumber: "GST IN: 12434 44285 34595",
      phoneNumber: "9823456789",
      email: "support@shopease.in",
      placeOfSupply: "Maharashtra",
      logo: "https://raw.githubusercontent.com/mkronix/mkronix_web/refs/heads/main/public/favicon.ico?token=GHSAT0AAAAAADMXOXIQ5YYVLWJX2H4M7ID62HWK44A",
    },
    invoiceInfo: {
      invoiceNumber: "#AB2324-01",
      invoiceDate: "01 Aug, 2023",
      invoiceDueDate: "15 Aug, 2023",
    },
    isCustomerInfoNeeded: true,
    customerInfo: {
      name: "Amit Kumar",
      address: {
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        pincode: "000123",
      },
      phone: "9898989898",
      email: "amit@example.com",
    },

    isItemListNeeded: true,
    itemList: [
      {
        itemName: "Wireless Mouse",
        hsnCode: "8471",
        quantity: 1,
        rate: 499,
        tax: 18,
      },
      {
        itemName: "Keyboard",
        hsnCode: "8471",
        quantity: 1,
        rate: 899,
        tax: 18,
      },
    ],

    billSummary: {
      subTotal: 1398,
      cgst: 9,
      sgst: 9,
      totalDue: 1650,
      totalInWords: "One Thousand Six Hundred Fifty Rupees Only",
      discountType: "PERCENTAGE",
      discount: "10%",
    },

    isPaymentSectionNeeded: true,
    payment: {
      paymentOption: "UPI",
      transactionId: "TXN12345",
      amountPaid: 1650,
    },

    isBankDetailsNeeded: false,

    isFooterNeeded: true,
    footer: {
      exitMessage: "Thank you for shopping with ShopEase!",
      returnPolicy: "7-day return policy on electronics.",
      paymentTerms: "Prepaid orders only.",
    },
  });

  return (
    <div className='min-h-screen bg-background'>
      {/* Mobile Header */}
      <div className='lg:hidden sticky top-0 z-40 bg-surface-elevated/95 backdrop-blur-lg border-b border-border/50'>
        <div className='flex items-center justify-between p-4'>

          <div className='flex items-center space-x-2'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setShowPreview(!showPreview)}
              className='text-muted-foreground hover:text-foreground'
            >
              {showPreview ? (
                <EyeOff className='w-4 h-4' />
              ) : (
                <Eye className='w-4 h-4' />
              )}
            </Button>

            <Button
              size='sm'
              disabled={isGeneratingPDF}
              className='bg-black text-white'
            >
              <Download className='w-4 h-4 mr-2' />
              {isGeneratingPDF ? "Generating..." : "PDF"}
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className='hidden lg:block sticky top-0 z-40 bg-surface-elevated/95 backdrop-blur-lg border-b border-border/50'>
        <div className='px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <div className='h-6 w-px bg-border' />
              <h1 className='text-lg font-semibold'>Invoice Creator</h1>
            </div>

            <div className='flex items-center space-x-4'>
              <div className='text-sm text-muted-foreground'>
                download1 remaining
              </div>

              <Button
                disabled={isGeneratingPDF}
                className='bg-black text-white'
              >
                <Download className='w-4 h-4 mr-2' />
                {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='lg:grid lg:grid-cols-2 lg:gap-0 min-h-[calc(100vh-80px)]'>
        {/* Form Panel */}
        <div
          className={`${showPreview ? "hidden lg:block" : "block"
            } bg-background border-r border-border/50`}
        >
          <div className='h-full overflow-y-auto'>{/* <InvoiceForm /> */}</div>
        </div>

        {/* Preview Panel */}
        <div
          className={`${!showPreview ? "hidden lg:block" : "block"} bg-surface`}
        >
          <div className='h-full overflow-y-auto'>
            {/* <InvoicePreview /> */}
            {/* <Invoice1 formData={formData} /> */}
            <Invoice2 invoiceData={formData} />
            {/* <Invoice3 /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
