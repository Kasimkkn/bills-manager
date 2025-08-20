
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { InvoiceData } from '@/contexts/InvoiceContext';
import { TemplateType } from '@/types/templates';

// Sanitize content to prevent security issues
const sanitizeForPDF = (content: string): string => {
  return content
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=["'][^"']*["']/gi, '');
};

export const generateInvoicePDF = async (
  invoice: InvoiceData, 
  templateType: TemplateType = 'modern',
  templateData: Record<string, any> = {}
): Promise<void> => {
  // Always use the actual preview element to ensure 100% template styling match
  const previewElement = document.querySelector('.invoice-preview-container');
  
  if (previewElement) {
    try {
      // Wait a moment for any styling to settle
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(previewElement as HTMLElement, {
        scale: 3, // Higher scale for better quality
        useCORS: false, // Disable CORS to prevent security issues
        allowTaint: false, // Prevent tainted canvas issues
        backgroundColor: '#ffffff',
        removeContainer: true,
        logging: false,
        foreignObjectRendering: false, // Disable foreign object rendering for security
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          // Clean up any potentially problematic elements in the clone
          const scripts = clonedDoc.querySelectorAll('script');
          scripts.forEach(script => script.remove());
          
          const links = clonedDoc.querySelectorAll('link[rel="stylesheet"]');
          links.forEach(link => {
            const linkElement = link as HTMLLinkElement;
            if (linkElement.href && !linkElement.href.includes('localhost') && !linkElement.href.includes('127.0.0.1')) {
              link.remove();
            }
          });
        }
      });

      // Calculate proper dimensions to maintain aspect ratio
      const canvasAspectRatio = canvas.width / canvas.height;
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      const pdfAspectRatio = pdfWidth / pdfHeight;
      
      let finalWidth = pdfWidth;
      let finalHeight = pdfHeight;
      
      if (canvasAspectRatio > pdfAspectRatio) {
        // Canvas is wider, fit to width
        finalHeight = pdfWidth / canvasAspectRatio;
      } else {
        // Canvas is taller, fit to height
        finalWidth = pdfHeight * canvasAspectRatio;
      }

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/jpeg', 0.95); // Use JPEG with compression for smaller file
      
      // Center the image on the page
      const x = (pdfWidth - finalWidth) / 2;
      const y = (pdfHeight - finalHeight) / 2;
      
      pdf.addImage(imgData, 'JPEG', x, y, finalWidth, finalHeight);
      
      // Clean filename to prevent issues
      const cleanInvoiceNumber = invoice.invoiceNumber.replace(/[^a-zA-Z0-9-_]/g, '');
      pdf.save(`invoice-${cleanInvoiceNumber}-${templateType}.pdf`);
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      throw new Error('PDF generation failed. Please try again.');
    }
  } else {
    throw new Error('Preview not available. Please wait for the preview to load and try again.');
  }
};

// Fallback function removed - we always use the preview element for consistent styling

// Template colors moved to types/templates.ts - we use the preview element styling instead

// HTML generation removed - we now always use the live preview element for exact template matching
