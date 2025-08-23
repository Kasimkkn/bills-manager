import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { InvoiceData } from '@/contexts/InvoiceContext';
import { TemplateType } from '@/types/templates';

export const generateInvoicePDF = async (
  invoice: InvoiceData, 
  templateType: TemplateType = 'modern',
  templateData: Record<string, any> = {}
): Promise<void> => {
  // Get the actual preview element to ensure 100% identical rendering
  const previewElement = document.querySelector('.invoice-preview-container');
  
  if (previewElement) {
    // Use the existing preview for PDF generation to ensure 100% match
    try {
      // Create a temporary container with fixed dimensions for consistent PDF generation
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '210mm'; // A4 width
      tempContainer.style.minHeight = '297mm'; // A4 height
      tempContainer.style.backgroundColor = 'white';
      tempContainer.style.padding = '20mm';
      tempContainer.style.boxSizing = 'border-box';
      tempContainer.style.fontFamily = 'Inter, system-ui, sans-serif';
      tempContainer.style.fontSize = '14px';
      tempContainer.style.lineHeight = '1.5';
      tempContainer.style.color = '#111827';
      
      // Clone the preview content and apply it to temp container
      const clonedContent = previewElement.cloneNode(true) as HTMLElement;
      
      // Remove any mobile-specific classes and ensure consistent styling
      clonedContent.style.width = '100%';
      clonedContent.style.maxWidth = 'none';
      clonedContent.style.margin = '0';
      clonedContent.style.padding = '0';
      clonedContent.style.transform = 'none';
      clonedContent.style.scale = '1';
      
      // Recursively fix all child elements
      const fixElementStyles = (element: HTMLElement) => {
        // Remove responsive classes that might cause issues
        element.classList.remove('lg:p-8', 'p-4', 'lg:p-12', 'lg:flex-row', 'lg:grid-cols-2');
        
        // Apply consistent styling
        if (element.style) {
          element.style.transform = 'none';
          element.style.scale = '1';
          element.style.maxWidth = 'none';
        }
        
        // Process all children
        Array.from(element.children).forEach(child => {
          if (child instanceof HTMLElement) {
            fixElementStyles(child);
          }
        });
      };
      
      fixElementStyles(clonedContent);
      tempContainer.appendChild(clonedContent);
      document.body.appendChild(tempContainer);

      // Generate canvas with fixed dimensions
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794, // A4 width in pixels at 96 DPI
        height: 1123, // A4 height in pixels at 96 DPI
        logging: false,
        removeContainer: true
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${invoice.invoiceNumber}.pdf`);
      
      // Clean up
      document.body.removeChild(tempContainer);
    } catch (error) {
      console.error('PDF generation from preview failed:', error);
      // Fallback to HTML generation
      await generateFromHTML(invoice, templateType, templateData);
    }
  } else {
    // Fallback to HTML generation
    await generateFromHTML(invoice, templateType, templateData);
  }
};

const generateFromHTML = async (
  invoice: InvoiceData, 
  templateType: TemplateType,
  templateData: Record<string, any>
): Promise<void> => {
  const invoiceHTML = createInvoiceHTML(invoice, templateType, templateData);
  
  const container = document.createElement('div');
  container.innerHTML = invoiceHTML;
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '210mm';
  container.style.minHeight = '297mm';
  container.style.backgroundColor = 'white';
  container.style.fontFamily = 'Inter, system-ui, sans-serif';
  container.style.padding = '20mm';
  container.style.boxSizing = 'border-box';
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 794,
      height: 1123,
    });

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    
    const pdfWidth = 210;
    const pdfHeight = 297;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice-${invoice.invoiceNumber}.pdf`);
  } finally {
    document.body.removeChild(container);
  }
};

const getTemplateColors = (templateType: TemplateType) => {
  switch (templateType) {
    case 'freelancer':
      return {
        primary: '#8b5cf6',
        secondary: '#06b6d4',
        accent: '#1f2937'
      };
    case 'retail':
      return {
        primary: '#059669',
        secondary: '#dc2626',
        accent: '#1f2937'
      };
    case 'service':
      return {
        primary: '#0ea5e9',
        secondary: '#f59e0b',
        accent: '#1f2937'
      };
    case 'hospitality':
      return {
        primary: '#dc2626',
        secondary: '#f59e0b',
        accent: '#1f2937'
      };
    case 'modern':
    default:
      return {
        primary: '#f59e0b',
        secondary: '#1f2937',
        accent: '#059669'
      };
  }
};

const createInvoiceHTML = (invoice: InvoiceData, templateType: TemplateType, templateData: Record<string, any>): string => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: invoice.currency || 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const colors = getTemplateColors(templateType);

  // Template-specific headers and styling
  const getTemplateHeader = () => {
    switch (templateType) {
      case 'retail':
        return 'SALES INVOICE';
      case 'freelancer':
        return 'PROJECT INVOICE';
      case 'service':
        return 'SERVICE INVOICE';
      case 'hospitality':
        return 'HOSPITALITY INVOICE';
      default:
        return 'INVOICE';
    }
  };

  const renderLogo = () => {
    if (invoice.businessInfo.logo) {
      return `<img src="${invoice.businessInfo.logo}" alt="Logo" style="width: 80px; height: 80px; object-fit: contain; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);" />`;
    } else {
      return `<div style="width: 80px; height: 80px; background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
        <span style="color: white; font-weight: bold; font-size: 32px;">${invoice.businessInfo.name.charAt(0) || 'B'}</span>
      </div>`;
    }
  };

  const renderTemplateSpecificData = () => {
    let html = '';
    
    // Retail template specific data
    if (templateType === 'retail') {
      if (templateData.storeLocation || templateData.returnPolicy) {
        html += `
          <div style="margin-bottom: 32px; padding: 24px; background: linear-gradient(to right, ${colors.primary}15, ${colors.secondary}15); border-radius: 12px;">
            <h3 style="font-size: 18px; font-weight: bold; color: ${colors.accent}; margin-bottom: 16px;">Store Information</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              ${templateData.storeLocation ? `
                <div>
                  <p style="font-size: 14px; font-weight: 500; color: #666; margin-bottom: 4px;">Store Location</p>
                  <p style="font-size: 16px; font-weight: 600; color: ${colors.primary};">📍 ${templateData.storeLocation}</p>
                </div>
              ` : ''}
              ${templateData.returnPolicy ? `
                <div>
                  <p style="font-size: 14px; font-weight: 500; color: #666; margin-bottom: 4px;">Return Policy</p>
                  <p style="font-size: 14px; color: ${colors.secondary};">${templateData.returnPolicy}</p>
                </div>
              ` : ''}
            </div>
          </div>
        `;
      }
    }
    
    // Freelancer template specific data
    if (templateType === 'freelancer' && (templateData.projectName || templateData.projectDescription)) {
      html += `
        <div style="margin-bottom: 32px; padding: 24px; background: linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}10); border-radius: 12px; border-left: 4px solid ${colors.primary};">
          <h3 style="font-size: 16px; font-weight: bold; color: ${colors.accent}; margin-bottom: 12px;">Project Details</h3>
          ${templateData.projectName ? `<p style="font-weight: 600; color: ${colors.primary}; margin-bottom: 8px; font-size: 18px;">${templateData.projectName}</p>` : ''}
          ${templateData.projectDescription ? `<p style="color: ${colors.accent}; margin-bottom: 8px;">${templateData.projectDescription}</p>` : ''}
          ${templateData.billingType ? `<span style="background: ${colors.primary}20; color: ${colors.primary}; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;">${templateData.billingType}</span>` : ''}
        </div>
      `;
    }
    
    // Service template specific data
    if (templateType === 'service' && (templateData.serviceCategory || templateData.serviceWarranty)) {
      html += `
        <div style="margin-bottom: 32px; padding: 24px; background: ${colors.primary}08; border-radius: 12px; border-left: 4px solid ${colors.primary};">
          <h3 style="font-size: 16px; font-weight: bold; color: ${colors.accent}; margin-bottom: 12px;">Service Information</h3>
          ${templateData.serviceCategory ? `<p style="margin-bottom: 8px;"><strong>Service Type:</strong> ${templateData.serviceCategory}</p>` : ''}
          ${templateData.serviceWarranty ? `<p style="margin-bottom: 8px;"><strong>Warranty:</strong> ${templateData.serviceWarranty}</p>` : ''}
        </div>
      `;
    }
    
    // Hospitality template specific data
    if (templateType === 'hospitality' && (templateData.roomNumber || templateData.checkIn || templateData.checkOut)) {
      html += `
        <div style="margin-bottom: 32px; padding: 24px; background: ${colors.primary}08; border-radius: 12px; border-left: 4px solid ${colors.primary};">
          <h3 style="font-size: 16px; font-weight: bold; color: ${colors.accent}; margin-bottom: 12px;">Stay Details</h3>
          ${templateData.roomNumber ? `<p style="margin-bottom: 8px;"><strong>Room:</strong> ${templateData.roomNumber}</p>` : ''}
          ${templateData.checkIn ? `<p style="margin-bottom: 8px;"><strong>Check-in:</strong> ${formatDate(templateData.checkIn)}</p>` : ''}
          ${templateData.checkOut ? `<p style="margin-bottom: 8px;"><strong>Check-out:</strong> ${formatDate(templateData.checkOut)}</p>` : ''}
        </div>
      `;
    }
    
    return html;
  };

  return `
    <div style="padding: 48px; background: white; color: #111827; font-family: Inter, system-ui, sans-serif; font-size: 14px; line-height: 1.5; min-height: 100%; box-sizing: border-box;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 48px;">
        <div>
          <h1 style="font-size: 48px; font-weight: bold; color: #111827; margin: 0 0 8px 0;">${getTemplateHeader()}</h1>
          <div style="color: #6B7280; margin: 0;">
            <p style="margin: 4px 0; font-weight: 500;">#${invoice.invoiceNumber}</p>
            <p style="margin: 4px 0;">Date: ${formatDate(invoice.invoiceDate)}</p>
            <p style="margin: 4px 0;">Due: ${formatDate(invoice.dueDate)}</p>
          </div>
        </div>
        ${renderLogo()}
      </div>

      ${renderTemplateSpecificData()}

      <!-- Business & Client Info -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 48px;">
        <!-- From -->
        <div>
          <h3 style="font-size: 12px; font-weight: bold; color: #111827; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; border-bottom: 2px solid ${colors.primary}; padding-bottom: 8px;">${templateType === 'retail' ? 'Sold By' : 'From'}</h3>
          <div style="color: #374151;">
            <p style="font-weight: 600; font-size: 18px; margin: 0 0 4px 0;">${invoice.businessInfo.name || 'Your Business Name'}</p>
            ${templateType === 'retail' && templateData.storeLocation ? `<p style="font-size: 14px; color: ${colors.primary}; margin: 0 0 4px 0;">📍 ${templateData.storeLocation}</p>` : ''}
            ${invoice.businessInfo.address ? `<p style="margin: 0 0 4px 0;">${invoice.businessInfo.address}</p>` : ''}
            ${(invoice.businessInfo.city || invoice.businessInfo.state || invoice.businessInfo.zipCode) ? `<p style="margin: 0 0 4px 0;">${[invoice.businessInfo.city, invoice.businessInfo.state, invoice.businessInfo.zipCode].filter(Boolean).join(', ')}</p>` : ''}
            ${invoice.businessInfo.phone ? `<p style="margin: 0 0 4px 0;">Phone: ${invoice.businessInfo.phone}</p>` : ''}
            ${invoice.businessInfo.email ? `<p style="margin: 0 0 4px 0;">Email: ${invoice.businessInfo.email}</p>` : ''}
          </div>
        </div>

        <!-- To -->
        <div>
          <h3 style="font-size: 12px; font-weight: bold; color: #111827; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; border-bottom: 2px solid ${colors.primary}; padding-bottom: 8px;">Bill To</h3>
          <div style="color: #374151;">
            <p style="font-weight: 600; font-size: 18px; margin: 0 0 4px 0;">${invoice.clientInfo.name || 'Client Name'}</p>
            ${invoice.clientInfo.address ? `<p style="margin: 0 0 4px 0;">${invoice.clientInfo.address}</p>` : ''}
            ${(invoice.clientInfo.city || invoice.clientInfo.state || invoice.clientInfo.zipCode) ? `<p style="margin: 0 0 4px 0;">${[invoice.clientInfo.city, invoice.clientInfo.state, invoice.clientInfo.zipCode].filter(Boolean).join(', ')}</p>` : ''}
            ${invoice.clientInfo.phone ? `<p style="margin: 0 0 4px 0;">Phone: ${invoice.clientInfo.phone}</p>` : ''}
            ${invoice.clientInfo.email ? `<p style="margin: 0 0 4px 0;">Email: ${invoice.clientInfo.email}</p>` : ''}
          </div>
        </div>
      </div>

      <!-- Line Items Table -->
      <div style="margin-bottom: 32px;">
        <div style="background: linear-gradient(to right, ${colors.primary}, ${colors.secondary}); border-radius: 8px 8px 0 0; padding: 16px 24px;">
          <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 16px; font-size: 12px; font-weight: bold; color: white; text-transform: uppercase; letter-spacing: 0.05em;">
            <div>${templateType === 'retail' ? 'Product Description' : 'Description'}</div>
            <div style="text-align: center;">Qty</div>
            <div style="text-align: center;">${templateType === 'retail' ? 'Unit Price' : 'Rate'}</div>
            <div style="text-align: right;">${templateType === 'retail' ? 'Total' : 'Amount'}</div>
          </div>
        </div>
        
        <div style="background: white; border: 1px solid #e5e7eb; border-top: none;">
          ${invoice.lineItems.map((item, index) => `
            <div style="padding: 16px 24px; ${index < invoice.lineItems.length - 1 ? 'border-bottom: 1px solid #e5e7eb;' : ''}">
              <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 16px; color: #374151;">
                <div>
                  <p style="font-weight: 500; margin: 0;">${item.description || `Item ${index + 1}`}</p>
                </div>
                <div style="text-align: center;">${item.quantity}</div>
                <div style="text-align: center;">${formatCurrency(item.rate)}</div>
                <div style="text-align: right; font-weight: 500;">${formatCurrency(item.amount)}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Totals -->
      <div style="display: flex; justify-content: flex-end; margin-bottom: 32px;">
        <div style="width: 320px;">
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; color: #374151; margin-bottom: 12px;">
              <span>Subtotal:</span>
              <span style="font-weight: 500;">${formatCurrency(invoice.subtotal)}</span>
            </div>
            
            ${invoice.taxRate > 0 ? `
              <div style="display: flex; justify-content: space-between; color: #374151; margin-bottom: 12px;">
                <span>${templateType === 'retail' ? 'Sales Tax' : 'Tax'} (${invoice.taxRate}%):</span>
                <span style="font-weight: 500;">${formatCurrency(invoice.taxAmount)}</span>
              </div>
            ` : ''}
            
            <div style="height: 1px; background: #d1d5db; margin: 16px 0;"></div>
            
            <div style="display: flex; justify-content: space-between; font-size: 20px; font-weight: bold; color: #111827;">
              <span>Total:</span>
              <span style="color: ${colors.primary};">${formatCurrency(invoice.total)}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Return Policy for Retail -->
      ${templateType === 'retail' && templateData.returnPolicy ? `
        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 12px; font-weight: bold; color: #111827; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Return Policy</h3>
          <p style="color: #374151; background: ${colors.secondary}20; padding: 16px; border-radius: 8px; border-left: 4px solid ${colors.secondary}; margin: 0;">${templateData.returnPolicy}</p>
        </div>
      ` : ''}

      <!-- Notes -->
      ${invoice.notes ? `
        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 12px; font-weight: bold; color: #111827; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">${templateType === 'retail' ? 'Additional Notes' : 'Notes'}</h3>
          <p style="color: #374151; background: ${colors.primary}20; padding: 16px; border-radius: 8px; border-left: 4px solid ${colors.primary}; margin: 0;">${invoice.notes}</p>
        </div>
      ` : ''}

      <!-- Terms -->
      ${invoice.terms ? `
        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 12px; font-weight: bold; color: #111827; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">${templateType === 'retail' ? 'Terms & Conditions' : 'Payment Terms'}</h3>
          <p style="color: #374151; background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid ${colors.secondary}; margin: 0;">${invoice.terms}</p>
        </div>
      ` : ''}

      <!-- Footer -->
      <div style="text-align: center; padding-top: 32px; border-top: 1px solid #e5e7eb;">
        <p style="color: #9ca3af; font-size: 14px; margin: 0;">${templateType === 'retail' ? 'Thank you for shopping with us!' : 'Thank you for your business!'}</p>
        ${templateType === 'retail' ? '<p style="color: #9ca3af; font-size: 12px; margin: 4px 0 0 0;">We appreciate your business and look forward to serving you again</p>' : ''}
      </div>
    </div>
  `;
};
