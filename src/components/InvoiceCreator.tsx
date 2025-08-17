
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Eye, EyeOff } from "lucide-react";
import InvoiceForm from './InvoiceForm';
import InvoicePreview from './InvoicePreview';
import { useInvoice } from '@/contexts/InvoiceContext';

interface InvoiceCreatorProps {
  onBack: () => void;
}

const InvoiceCreator = ({ onBack }: InvoiceCreatorProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const { invoice } = useInvoice();

  const handleDownloadPDF = () => {
    // PDF generation will be implemented
    console.log('Downloading PDF...', invoice);
    alert('PDF download coming soon! For now, check the browser console to see the invoice data.');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-surface-elevated/95 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="ml-2">{showPreview ? 'Edit' : 'Preview'}</span>
            </Button>
            
            <Button
              size="sm"
              onClick={handleDownloadPDF}
              className="bg-gradient-primary text-background hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block sticky top-0 z-40 bg-surface-elevated/95 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-lg font-semibold">Invoice Creator</h1>
            </div>
            
            <Button
              onClick={handleDownloadPDF}
              className="bg-gradient-primary text-background hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-0 min-h-[calc(100vh-80px)]">
        {/* Form Panel */}
        <div className={`${showPreview ? 'hidden lg:block' : 'block'} bg-background border-r border-border/50`}>
          <div className="h-full overflow-y-auto">
            <InvoiceForm />
          </div>
        </div>

        {/* Preview Panel */}
        <div className={`${!showPreview ? 'hidden lg:block' : 'block'} bg-surface`}>
          <div className="h-full overflow-y-auto">
            <InvoicePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCreator;
