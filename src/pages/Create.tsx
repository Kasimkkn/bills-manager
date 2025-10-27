import { useState, useRef, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { DynamicBillConfig, billType } from "@/types/invoice";
import { getTemplate, ECOMMERCE_VIBRANT, ALL_TEMPLATES } from "@/constant/templateJson";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2pdf from "html2pdf.js";
import DynamicInvoiceForm from "@/components/DynamicInvoiceForm";

// Import all template components
import Invoice_Ecommerce_Vibrant from "@/components/invoiceUI/Ecommerce/Invoice_Ecommerce_Vibrant";
import Invoice_Ecommerce_Clean from "@/components/invoiceUI/Ecommerce/Invoice_Ecommerce_Clean";
import Invoice_Ecommerce_Marketplace from "@/components/invoiceUI/Ecommerce/Invoice_Ecommerce_Marketplace";
import Invoice_Freelancer_Minimal from "@/components/invoiceUI/Freelancer/Invoice_Freelancer_Minimal";
import Invoice_Freelancer_Professional from "@/components/invoiceUI/Freelancer/Invoice_Freelancer_Professional";
import Invoice_Freelancer_Corporate from "@/components/invoiceUI/Freelancer/Invoice_Freelancer_Corporate";
import Invoice_Freelancer_Creative from "@/components/invoiceUI/Freelancer/Invoice_Freelancer_Creative";
import Invoice_Hotel_Minimal from "@/components/invoiceUI/Hotel/Invoice_Hotel_Minimal";
import Invoice_Hotel_Modern from "@/components/invoiceUI/Hotel/Invoice_Hotel_Modern";
import Invoice_Hotel_Classic from "@/components/invoiceUI/Hotel/Invoice_Hotel_Classic";
import Invoice_Hotel_Elegant from "@/components/invoiceUI/Hotel/Invoice_Hotel_Elegant";
import Invoice_Supplier_Formal from "@/components/invoiceUI/Supplier/Invoice_Supplier_Formal";
import Invoice_Supplier_Detailed from "@/components/invoiceUI/Supplier/Invoice_Supplier_Detailed";
import Invoice_Supplier_Compact from "@/components/invoiceUI/Supplier/Invoice_Supplier_Compact";
import Invoice_Retailer_Modern from "@/components/invoiceUI/Retailer/Invoice_Retailer_Modern";
import Invoice_Retailer_Classic from "@/components/invoiceUI/Retailer/Invoice_Retailer_Classic";
import Invoice_Retailer_Colorful from "@/components/invoiceUI/Retailer/Invoice_Retailer_Colorful";
import Invoice_Rental_Professional from "@/components/invoiceUI/Rental/Invoice_Rental_Professional";
import Invoice_Rental_Friendly from "@/components/invoiceUI/Rental/Invoice_Rental_Friendly";
import Invoice_Rental_Legal from "@/components/invoiceUI/Rental/Invoice_Rental_Legal";
import Invoice_Medical_Clinical from "@/components/invoiceUI/Medical/Invoice_Medical_Clinical";
import Invoice_Medical_Modern from "@/components/invoiceUI/Medical/Invoice_Medical_Modern";
import Invoice_Medical_Prescription from "@/components/invoiceUI/Medical/Invoice_Medical_Prescription";
import Invoice_Salon_Luxury from "@/components/invoiceUI/Salon/Invoice_Salon_Luxury";
import Invoice_Salon_Minimal from "@/components/invoiceUI/Salon/Invoice_Salon_Minimal";
import Invoice_Salon_Boutique from "@/components/invoiceUI/Salon/Invoice_Salon_Boutique";
import Invoice_Transportation_Logistics from "@/components/invoiceUI/Transportation/Invoice_Transportation_Logistics";
import Invoice_Transportation_Courier from "@/components/invoiceUI/Transportation/Invoice_Transportation_Courier";
import Invoice_Transportation_Taxi from "@/components/invoiceUI/Transportation/Invoice_Transportation_Taxi";
import Invoice_Education_Academic from "@/components/invoiceUI/Education/Invoice_Education_Academic";
import Invoice_Education_Modern from "@/components/invoiceUI/Education/Invoice_Education_Modern";
import Invoice_Education_Institutional from "@/components/invoiceUI/Education/Invoice_Education_Institutional";
import Invoice_Gym_Energetic from "@/components/invoiceUI/Gym/Invoice_Gym_Energetic";
import Invoice_Gym_Professional from "@/components/invoiceUI/Gym/Invoice_Gym_Professional";
import Invoice_Gym_Sporty from "@/components/invoiceUI/Gym/Invoice_Gym_Sporty";
import Invoice_Legal_Formal from "@/components/invoiceUI/Legal/Invoice_Legal_Formal";
import Invoice_Legal_Modern from "@/components/invoiceUI/Legal/Invoice_Legal_Modern";
import Invoice_Legal_Letterhead from "@/components/invoiceUI/Legal/Invoice_Legal_Letterhead";

const Create = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const template = searchParams.get("template") as billType;
  const styleParam = searchParams.get("style");

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  // Get initial form data
  const [formData, setFormData] = useState<DynamicBillConfig>(() => {
    return getTemplate(template, styleParam) || ECOMMERCE_VIBRANT;
  });

  // Get available styles for the selected template
  const availableStyles = useMemo(() => {
    if (!template || !ALL_TEMPLATES[template]) return [];
    return Object.keys(ALL_TEMPLATES[template]);
  }, [template]);

  // Current selected style
  const currentStyle = formData.templateStyle || styleParam || availableStyles[0];

  // Handle style change
  const handleStyleChange = (newStyle: string) => {
    const newData = getTemplate(template, newStyle);
    if (newData) {
      setFormData(newData);
      setSearchParams({ template, style: newStyle });
    }
  };

  // Handler to update form data
  const handleFormDataChange = (newData: DynamicBillConfig) => {
    setFormData(newData);
  };

  const handleDownloadPDF = () => {
    setIsGeneratingPDF(true);
    try {
      const element = invoiceRef.current;
      const opt = {
        margin: 0,
        filename: `invoice_${formData.invoiceInfo?.invoiceNumber || "document"}.pdf`,
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

  // Render the appropriate template
  const renderTemplate = () => {
    const key = `${formData.billType}_${formData.templateStyle}`;

    const templates: Record<string, JSX.Element> = {
      // ECOMMERCE
      "ECOMMERCE_VIBRANT": <Invoice_Ecommerce_Vibrant invoiceData={formData} invoiceRef={invoiceRef} />,
      "ECOMMERCE_CLEAN": <Invoice_Ecommerce_Clean invoiceData={formData} invoiceRef={invoiceRef} />,
      "ECOMMERCE_MARKETPLACE": <Invoice_Ecommerce_Marketplace invoiceData={formData} invoiceRef={invoiceRef} />,

      // FREELANCER
      "FREELANCER_MINIMAL": <Invoice_Freelancer_Minimal invoiceData={formData} invoiceRef={invoiceRef} />,
      "FREELANCER_PROFESSIONAL": <Invoice_Freelancer_Professional invoiceData={formData} invoiceRef={invoiceRef} />,
      "FREELANCER_CORPORATE": <Invoice_Freelancer_Corporate invoiceData={formData} invoiceRef={invoiceRef} />,
      "FREELANCER_CREATIVE": <Invoice_Freelancer_Creative invoiceData={formData} invoiceRef={invoiceRef} />,

      // HOTEL
      "HOTEL_MINIMAL": <Invoice_Hotel_Minimal invoiceData={formData} invoiceRef={invoiceRef} />,
      "HOTEL_MODERN": <Invoice_Hotel_Modern invoiceData={formData} invoiceRef={invoiceRef} />,
      "HOTEL_CLASSIC": <Invoice_Hotel_Classic invoiceData={formData} invoiceRef={invoiceRef} />,
      "HOTEL_ELEGANT": <Invoice_Hotel_Elegant invoiceData={formData} invoiceRef={invoiceRef} />,

      // SUPPLIER
      "SUPPLIER_FORMAL": <Invoice_Supplier_Formal invoiceData={formData} invoiceRef={invoiceRef} />,
      "SUPPLIER_DETAILED": <Invoice_Supplier_Detailed invoiceData={formData} invoiceRef={invoiceRef} />,
      "SUPPLIER_COMPACT": <Invoice_Supplier_Compact invoiceData={formData} invoiceRef={invoiceRef} />,

      // RETAILER
      "RETAILER_MODERN": <Invoice_Retailer_Modern invoiceData={formData} invoiceRef={invoiceRef} />,
      "RETAILER_CLASSIC": <Invoice_Retailer_Classic invoiceData={formData} invoiceRef={invoiceRef} />,
      "RETAILER_COLORFUL": <Invoice_Retailer_Colorful invoiceData={formData} invoiceRef={invoiceRef} />,

      // RENTAL
      "RENTAL_PROFESSIONAL": <Invoice_Rental_Professional invoiceData={formData} invoiceRef={invoiceRef} />,
      "RENTAL_FRIENDLY": <Invoice_Rental_Friendly invoiceData={formData} invoiceRef={invoiceRef} />,
      "RENTAL_LEGAL": <Invoice_Rental_Legal invoiceData={formData} invoiceRef={invoiceRef} />,

      // MEDICAL
      "MEDICAL_CLINICAL": <Invoice_Medical_Clinical invoiceData={formData} invoiceRef={invoiceRef} />,
      "MEDICAL_MODERN": <Invoice_Medical_Modern invoiceData={formData} invoiceRef={invoiceRef} />,
      "MEDICAL_PRESCRIPTION": <Invoice_Medical_Prescription invoiceData={formData} invoiceRef={invoiceRef} />,

      // SALON
      "SALON_LUXURY": <Invoice_Salon_Luxury invoiceData={formData} invoiceRef={invoiceRef} />,
      "SALON_MINIMAL": <Invoice_Salon_Minimal invoiceData={formData} invoiceRef={invoiceRef} />,
      "SALON_BOUTIQUE": <Invoice_Salon_Boutique invoiceData={formData} invoiceRef={invoiceRef} />,

      // TRANSPORTATION
      "TRANSPORTATION_LOGISTICS": <Invoice_Transportation_Logistics invoiceData={formData} invoiceRef={invoiceRef} />,
      "TRANSPORTATION_COURIER": <Invoice_Transportation_Courier invoiceData={formData} invoiceRef={invoiceRef} />,
      "TRANSPORTATION_TAXI": <Invoice_Transportation_Taxi invoiceData={formData} invoiceRef={invoiceRef} />,

      // EDUCATION
      "EDUCATION_ACADEMIC": <Invoice_Education_Academic invoiceData={formData} invoiceRef={invoiceRef} />,
      "EDUCATION_MODERN": <Invoice_Education_Modern invoiceData={formData} invoiceRef={invoiceRef} />,
      "EDUCATION_INSTITUTIONAL": <Invoice_Education_Institutional invoiceData={formData} invoiceRef={invoiceRef} />,

      // GYM
      "GYM_ENERGETIC": <Invoice_Gym_Energetic invoiceData={formData} invoiceRef={invoiceRef} />,
      "GYM_PROFESSIONAL": <Invoice_Gym_Professional invoiceData={formData} invoiceRef={invoiceRef} />,
      "GYM_SPORTY": <Invoice_Gym_Sporty invoiceData={formData} invoiceRef={invoiceRef} />,

      // LEGAL
      "LEGAL_FORMAL": <Invoice_Legal_Formal invoiceData={formData} invoiceRef={invoiceRef} />,
      "LEGAL_MODERN": <Invoice_Legal_Modern invoiceData={formData} invoiceRef={invoiceRef} />,
      "LEGAL_LETTERHEAD": <Invoice_Legal_Letterhead invoiceData={formData} invoiceRef={invoiceRef} />,
    };

    return templates[key] || <div className="p-8 text-center">Template not found</div>;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">Create Invoice</h1>
              <p className="text-sm text-muted-foreground">
                {formData.uiMetadata?.displayName || template}
              </p>
            </div>

            <Button
              disabled={isGeneratingPDF}
              onClick={handleDownloadPDF}
              className="bg-black text-white hover:bg-black/90"
            >
              <Download className="w-4 h-4 mr-2" />
              {isGeneratingPDF ? "Generating..." : "Download PDF"}
            </Button>
          </div>
        </div>

        {/* Style Switcher */}
        {availableStyles.length > 1 && (
          <div className="px-6 pb-4">
            <div className="flex gap-2 overflow-x-auto">
              {availableStyles.map((style) => (
                <Button
                  key={style}
                  size="sm"
                  variant={currentStyle === style ? "default" : "outline"}
                  onClick={() => handleStyleChange(style)}
                  className={currentStyle === style ? "bg-black text-white" : ""}
                >
                  {style}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="lg:grid lg:grid-cols-12 h-[calc(100vh-90px)]">
        {/* Form Panel */}
        <div className="bg-background border-r border-border overflow-y-auto h-full lg:col-span-5">
          <DynamicInvoiceForm
            formData={formData}
            onChange={handleFormDataChange}
          />
        </div>

        {/* Preview Panel */}
        <div className="bg-muted/30 h-full overflow-y-auto lg:col-span-7">
          <div className="p-4 lg:p-8">
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
