
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { InvoiceData } from '@/contexts/InvoiceContext';

export const generateInvoicePDF = async (invoice: InvoiceData): Promise<void> => {
  // Create a temporary HTML element with the invoice content
  const invoiceHTML = createInvoiceHTML(invoice);
  
  // Create a temporary container
  const container = document.createElement('div');
  container.innerHTML = invoiceHTML;
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '794px'; // A4 width in pixels at 96 DPI
  container.style.backgroundColor = 'white';
  container.style.fontFamily = 'Inter, system-ui, sans-serif';
  document.body.appendChild(container);

  try {
    // Generate canvas from HTML
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      width: 794,
      height: 1123, // A4 height
    });

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    
    // Calculate dimensions for A4
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    // Download the PDF
    pdf.save(`invoice-${invoice.invoiceNumber}.pdf`);
  } finally {
    // Clean up
    document.body.removeChild(container);
  }
};

const createInvoiceHTML = (invoice: InvoiceData): string => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return `
    <div style="padding: 48px; background: white; color: #111827; font-family: Inter, system-ui, sans-serif; font-size: 14px; line-height: 1.5;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 48px;">
        <div>
          <h1 style="font-size: 48px; font-weight: bold; color: #111827; margin: 0 0 8px 0;">INVOICE</h1>
          <div style="color: #6B7280; margin: 0;">
            <p style="margin: 4px 0; font-weight: 500;">#${invoice.invoiceNumber}</p>
            <p style="margin: 4px 0;">Date: ${formatDate(invoice.invoiceDate)}</p>
            <p style="margin: 4px 0;">Due: ${formatDate(invoice.dueDate)}</p>
          </div>
        </div>
        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
          <span style="color: white; font-weight: bold; font-size: 32px;">${invoice.businessInfo.name.charAt(0) || 'B'}</span>
        </div>
      </div>

      <!-- Business & Client Info -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-bottom: 48px;">
        <!-- From -->
        <div>
          <h3 style="font-size: 12px; font-weight: bold; color: #111827; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; border-bottom: 2px solid #f59e0b; padding-bottom: 8px;">From</h3>
          <div style="color: #374151;">
            <p style="font-weight: 600; font-size: 18px; margin: 0 0 4px 0;">${invoice.businessInfo.name || 'Your Business Name'}</p>
            ${invoice.businessInfo.address ? `<p style="margin: 0 0 4px 0;">${invoice.businessInfo.address}</p>` : ''}
            ${(invoice.businessInfo.city || invoice.businessInfo.state || invoice.businessInfo.zipCode) ? `<p style="margin: 0 0 4px 0;">${[invoice.businessInfo.city, invoice.businessInfo.state, invoice.businessInfo.zipCode].filter(Boolean).join(', ')}</p>` : ''}
            ${invoice.businessInfo.phone ? `<p style="margin: 0 0 4px 0;">Phone: ${invoice.businessInfo.phone}</p>` : ''}
            ${invoice.businessInfo.email ? `<p style="margin: 0 0 4px 0;">Email: ${invoice.businessInfo.email}</p>` : ''}
          </div>
        </div>

        <!-- To -->
        <div>
          <h3 style="font-size: 12px; font-weight: bold; color: #111827; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; border-bottom: 2px solid #f59e0b; padding-bottom: 8px;">Bill To</h3>
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
        <div style="background: #f9fafb; border-radius: 8px 8px 0 0; padding: 16px 24px; border-bottom: 2px solid #f59e0b;">
          <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 16px; font-size: 12px; font-weight: bold; color: #111827; text-transform: uppercase; letter-spacing: 0.05em;">
            <div>Description</div>
            <div style="text-align: center;">Qty</div>
            <div style="text-align: center;">Rate</div>
            <div style="text-align: right;">Amount</div>
          </div>
        </div>
        
        <div style="background: white;">
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
                <span>Tax (${invoice.taxRate}%):</span>
                <span style="font-weight: 500;">${formatCurrency(invoice.taxAmount)}</span>
              </div>
            ` : ''}
            
            <div style="height: 1px; background: #d1d5db; margin: 16px 0;"></div>
            
            <div style="display: flex; justify-content: space-between; font-size: 20px; font-weight: bold; color: #111827;">
              <span>Total:</span>
              <span style="color: #f59e0b;">${formatCurrency(invoice.total)}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Notes -->
      ${invoice.notes ? `
        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 12px; font-weight: bold; color: #111827; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Notes</h3>
          <p style="color: #374151; background: #f9fafb; padding: 16px; border-radius: 8px; margin: 0;">${invoice.notes}</p>
        </div>
      ` : ''}

      <!-- Terms -->
      ${invoice.terms ? `
        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 12px; font-weight: bold; color: #111827; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Payment Terms</h3>
          <p style="color: #374151; background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 0;">${invoice.terms}</p>
        </div>
      ` : ''}

      <!-- Footer -->
      <div style="text-align: center; padding-top: 32px; border-top: 1px solid #e5e7eb;">
        <p style="color: #9ca3af; font-size: 14px; margin: 0;">Thank you for your business!</p>
      </div>
    </div>
  `;
};
