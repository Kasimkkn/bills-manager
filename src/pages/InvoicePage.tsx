import DynamicInvoiceForm from "@/components/DynamicInvoiceForm";
import Invoice2 from "@/components/invoiceUI/Invoice2";
import { Button } from "@/components/ui/button";
import { DynamicBillConfig } from "@/types/invoice";
import html2pdf from "html2pdf.js";
import { Download, Eye, EyeOff } from "lucide-react";
import { useRef, useState } from "react";

const InvoicePage = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const invoiceRef = useRef();

  const [formData, setFormData] = useState<DynamicBillConfig>({
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

  // Handler to update form data - this provides real-time preview
  const handleFormDataChange = (newData: DynamicBillConfig) => {
    setFormData(newData);
  };

  // Handler for PDF generation (you can implement your PDF logic here)
  // const handleGeneratePDF = async () => {
  //   setIsGeneratingPDF(true);
  //   try {
  //     // Add your PDF generation logic here
  //     // For example, using html2pdf or jsPDF
  //     console.log("Generating PDF with data:", formData);

  //     // Simulate PDF generation
  //     await new Promise((resolve) => setTimeout(resolve, 2000));

  //     alert("PDF Generated Successfully!");
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //     alert("Failed to generate PDF");
  //   } finally {
  //     setIsGeneratingPDF(false);
  //   }
  // };

  const handleDownloadPDF = () => {
    setIsGeneratingPDF(true);
    try {
      const element = invoiceRef.current;
      const opt = {
        margin: 0,
        filename: "invoice_#AB2324-01.pdf",
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
          orientation: "portrait" as const,
          unit: "mm" as const,
          format: "a4",
        },
      };

      html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      {/* Mobile Header */}
      <div className='lg:hidden sticky top-0 z-40 bg-surface-elevated/95 backdrop-blur-lg border-b border-border/50'>
        <div className='flex items-center justify-between p-4'>
          <h1 className='text-lg font-semibold'>Invoice Creator</h1>

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
              onClick={handleDownloadPDF}
              className='bg-black text-white hover:bg-black/90'
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
              <h1 className='text-lg font-semibold'>Invoice Creator</h1>
            </div>

            <div className='flex items-center space-x-4'>
              <Button
                disabled={isGeneratingPDF}
                onClick={handleDownloadPDF}
                className='bg-black text-white hover:bg-black/90'
              >
                <Download className='w-4 h-4 mr-2' />
                {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='lg:grid lg:grid-cols-12 h-screen relative'>
        {/* Form Panel (scrollable) */}
        <div
          className={`${showPreview ? "hidden lg:block" : "block"
            } bg-background border-r border-border/50 overflow-y-auto h-screen lg:col-span-5`}
        >
          <DynamicInvoiceForm
            formData={formData}
            onChange={handleFormDataChange}
          />
        </div>

        {/* Preview Panel (fixed on right, same height) */}
        <div
          className={`${!showPreview ? "hidden lg:block" : "block"
            } bg-transparent h-screen py-10 overflow-y-auto lg:fixed lg:right-0 lg:top-0 lg:w-[60%]`}
        >
          <div className='p-4 lg:py-12 lg:px-8'>
            {/* <Invoice1 formData={formData} invoiceRef={invoiceRef} /> */}
            <Invoice2 invoiceData={formData} invoiceRef={invoiceRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
