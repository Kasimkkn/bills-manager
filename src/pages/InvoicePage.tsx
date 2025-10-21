import DynamicInvoiceForm from "@/components/DynamicInvoiceForm";
import Invoice1 from "@/components/invoiceUI/Invoice1";
import Invoice2 from "@/components/invoiceUI/Invoice2";
import Invoice3 from "@/components/invoiceUI/Invoice3";
import Invoice4 from "@/components/invoiceUI/Invoice4";
import Invoice5 from "@/components/invoiceUI/Invoice5";
import { Button } from "@/components/ui/button";
import { billType, DynamicBillConfig } from "@/types/invoice";
import html2pdf from "html2pdf.js";
import { Download, Eye, EyeOff } from "lucide-react";
import { useRef, useState } from "react";
import { getTemplate, ECOMMERCE_VIBRANT } from "@/constant/templateJson"; // Adjust path as needed
import { useSearchParams } from "react-router-dom";
import Invoice_Ecommerce_Vibrant from "@/components/invoiceUI/Ecommerce/Invoice_Ecommerce_Vibrant";
import Invoice_Ecommerce_Clean from "@/components/invoiceUI/Ecommerce/Invoice_Ecommerce_Clean";
import Invoice_Ecommerce_Marketplace from "@/components/invoiceUI/Ecommerce/Invoice_Ecommerce_Marketplace";
import Invoice_Freelancer_Professional from "@/components/invoiceUI/Freelancer/Invoice_Freelancer_Professional";
import Invoice_Freelancer_Corporate from "@/components/invoiceUI/Freelancer/Invoice_Freelancer_Corporate";
import Invoice_Hotel_Minimal from "@/components/invoiceUI/Hotel/Invoice_Hotel_Minimal";
import Invoice_Hotel_Modern from "@/components/invoiceUI/Hotel/Invoice_Hotel_Modern";
import Invoice_Supplier_Detailed from "@/components/invoiceUI/Supplier/Invoice_Supplier_Detailed";
import Invoice_Retailer_Classic from "@/components/invoiceUI/Retailer/Invoice_Retailer_Classic";
import Invoice_Rental_Professional from "@/components/invoiceUI/Rental/Invoice_Rental_Professional";
import Invoice_Rental_Friendly from "@/components/invoiceUI/Rental/Invoice_Rental_Friendly";
import Invoice_Medical_Clinical from "@/components/invoiceUI/Medical/Invoice_Medical_Clinical";
import Invoice_Medical_Modern from "@/components/invoiceUI/Medical/Invoice_Medical_Modern";
import Invoice_Education_Academic from "@/components/invoiceUI/Education/Invoice_Education_Academic";
import Invoice_Education_Modern from "@/components/invoiceUI/Education/Invoice_Education_Modern";
import Invoice_Gym_Energetic from "@/components/invoiceUI/Gym/Invoice_Gym_Energetic";
import Invoice_Gym_Professional from "@/components/invoiceUI/Gym/Invoice_Gym_Professional";
import Invoice_Legal_Formal from "@/components/invoiceUI/Legal/Invoice_Legal_Formal";
import Invoice_Legal_Modern from "@/components/invoiceUI/Legal/Invoice_Legal_Modern";
import Invoice_Salon_Luxury from "@/components/invoiceUI/Salon/Invoice_Salon_Luxury";
import Invoice_Salon_Minimal from "@/components/invoiceUI/Salon/Invoice_Salon_Minimal";
import Invoice_Transportation_Courier from "@/components/invoiceUI/Transportation/Invoice_Transportation_Courier";
import Invoice_Transportation_Logistics from "@/components/invoiceUI/Transportation/Invoice_Transportation_Logistics";

const InvoicePage = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const [searchParams] = useSearchParams();
  const template = searchParams.get("template");

  const invoiceRef = useRef();
  const [formData, setFormData] = useState<DynamicBillConfig>(() => {
    return getTemplate(template as billType, "VIBRANT") || ECOMMERCE_VIBRANT;
  });

  // Handler to update form data - this provides real-time preview
  const handleFormDataChange = (newData: DynamicBillConfig) => {
    setFormData(newData);
  };

  const handleDownloadPDF = () => {
    setIsGeneratingPDF(true);
    try {
      const element = invoiceRef.current;
      const opt = {
        margin: 0,
        filename: `invoice_${
          formData.invoiceInfo?.invoiceNumber || "document"
        }.pdf`,
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

  const renderTemplates = (template) => {
    switch (template) {
      case "ECOMMERCE":
        return <Invoice1 invoiceData={formData} invoiceRef={invoiceRef} />;

      case "HOTEL":
        return <Invoice2 invoiceData={formData} invoiceRef={invoiceRef} />;
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
          className={`${
            showPreview ? "hidden lg:block" : "block"
          } bg-background border-r border-border/50 overflow-y-auto h-screen lg:col-span-5`}
        >
          <DynamicInvoiceForm
            formData={formData}
            onChange={handleFormDataChange}
          />
        </div>
        <div
          className={`${
            !showPreview ? "hidden lg:block" : "block"
          } bg-transparent h-screen py-10 overflow-y-auto lg:fixed lg:right-0 lg:top-0 lg:w-[60%]`}
        >
          <div className='p-4 lg:py-12 lg:px-8'>
            {/* ECOMMERCE Templates */}
            {formData.billType === "ECOMMERCE" &&
              formData.templateStyle === "VIBRANT" && (
                <Invoice_Ecommerce_Vibrant
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}
            {formData.billType === "ECOMMERCE" &&
              formData.templateStyle === "CLEAN" && (
                <Invoice_Ecommerce_Clean
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}
            {formData.billType === "ECOMMERCE" &&
              formData.templateStyle === "MARKETPLACE" && (
                <Invoice_Ecommerce_Marketplace
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}

            {/* FREELANCER Templates */}
            {formData.billType === "FREELANCER" &&
              formData.templateStyle === "CREATIVE" && (
                <Invoice2 invoiceData={formData} invoiceRef={invoiceRef} />
              )}
            {formData.billType === "FREELANCER" &&
              formData.templateStyle === "PROFESSIONAL" && (
                <Invoice_Freelancer_Professional
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}
            {formData.billType === "FREELANCER" &&
              formData.templateStyle === "CORPORATE" && (
                <Invoice_Freelancer_Corporate
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}

            {/* HOTEL Templates */}
            {formData.billType === "HOTEL" &&
              formData.templateStyle === "ELEGANT" && (
                <Invoice3 invoiceData={formData} invoiceRef={invoiceRef} />
              )}
            {formData.billType === "HOTEL" &&
              formData.templateStyle === "MINIMAL" && (
                <Invoice_Hotel_Minimal
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}
            {formData.billType === "HOTEL" &&
              formData.templateStyle === "MODERN" && (
                <Invoice_Hotel_Modern
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}

            {/* SUPPLIER Templates */}
            {formData.billType === "SUPPLIER" &&
              formData.templateStyle === "FORMAL" && (
                <Invoice4 invoiceData={formData} invoiceRef={invoiceRef} />
              )}
            {formData.billType === "SUPPLIER" &&
              formData.templateStyle === "DETAILED" && (
                <Invoice_Supplier_Detailed
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}

            {/* RETAILER Templates */}
            {formData.billType === "RETAILER" &&
              formData.templateStyle === "MODERN" && (
                <Invoice5 invoiceData={formData} invoiceRef={invoiceRef} />
              )}
            {formData.billType === "RETAILER" &&
              formData.templateStyle === "CLASSIC" && (
                <Invoice_Retailer_Classic
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}

            {/* RENTAL Templates */}
            {formData.billType === "RENTAL" &&
              formData.templateStyle === "PROFESSIONAL" && (
                <Invoice_Rental_Professional
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}
            {formData.billType === "RENTAL" &&
              formData.templateStyle === "FRIENDLY" && (
                <Invoice_Rental_Friendly
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}

            {/* MEDICAL Templates */}
            {formData.billType === "MEDICAL" &&
              formData.templateStyle === "CLINICAL" && (
                <Invoice_Medical_Clinical
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}
            {formData.billType === "MEDICAL" &&
              formData.templateStyle === "MODERN" && (
                <Invoice_Medical_Modern
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}

            {/* SALON Templates */}
            {formData.billType === "SALON" &&
              formData.templateStyle === "LUXURY" && (
                <Invoice_Salon_Luxury
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}
            {formData.billType === "SALON" &&
              formData.templateStyle === "MINIMAL" && (
                <Invoice_Salon_Minimal
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}

            {/* TRANSPORTATION Templates */}
            {formData.billType === "TRANSPORTATION" &&
              formData.templateStyle === "LOGISTICS" && (
                <Invoice_Transportation_Logistics
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}
            {formData.billType === "TRANSPORTATION" &&
              formData.templateStyle === "COURIER" && (
                <Invoice_Transportation_Courier
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}

            {/* EDUCATION Templates */}
            {formData.billType === "EDUCATION" &&
              formData.templateStyle === "ACADEMIC" && (
                <Invoice_Education_Academic
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}
            {formData.billType === "EDUCATION" &&
              formData.templateStyle === "MODERN" && (
                <Invoice_Education_Modern
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}

            {/* GYM Templates */}
            {formData.billType === "GYM" &&
              formData.templateStyle === "ENERGETIC" && (
                <Invoice_Gym_Energetic
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}
            {formData.billType === "GYM" &&
              formData.templateStyle === "PROFESSIONAL" && (
                <Invoice_Gym_Professional
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}

            {/* LEGAL Templates */}
            {formData.billType === "LEGAL" &&
              formData.templateStyle === "FORMAL" && (
                <Invoice_Legal_Formal
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}
            {formData.billType === "LEGAL" &&
              formData.templateStyle === "MODERN" && (
                <Invoice_Legal_Modern
                  invoiceData={formData}
                  invoiceRef={invoiceRef}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
