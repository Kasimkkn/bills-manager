import { useInvoice } from '@/contexts/InvoiceContext';
import { useTemplate } from '@/contexts/TemplateContext';
import { TEMPLATES, TEMPLATE_FIELDS, TemplateType } from '@/types/templates';
import { format } from 'date-fns';

const UniversalTemplate = () => {
  const { invoice } = useInvoice();
  const { currentTemplate, templateData } = useTemplate();
  
  const templateInfo = TEMPLATES.find(t => t.id === currentTemplate);
  const templateFields = TEMPLATE_FIELDS[currentTemplate] || [];
  
  if (!templateInfo) {
    return <div>Template not found</div>;
  }

  const getTemplateStyles = () => {
    const { colorScheme } = templateInfo;
    return {
      '--primary-color': colorScheme.primary,
      '--secondary-color': colorScheme.secondary,
      '--accent-color': colorScheme.accent,
    } as React.CSSProperties;
  };

  const renderTemplateSpecificFields = () => {
    const additionalFields = templateFields.filter(field => 
      templateData[field.id] && field.category === 'additional'
    );

    if (additionalFields.length === 0) return null;

    return (
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--primary-color)' }}>
          {getTemplateSpecificTitle()}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {additionalFields.map(field => (
            <div key={field.id}>
              <span className="font-medium text-gray-600">{field.label}:</span>{' '}
              <span className="text-gray-900">
                {field.type === 'date' 
                  ? format(new Date(templateData[field.id]), 'MMM dd, yyyy')
                  : templateData[field.id]
                }
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getTemplateSpecificTitle = () => {
    switch (currentTemplate) {
      case 'commercial': return 'Export/Import Information';
      case 'proforma': return 'Quotation Details';
      case 'recurring': return 'Subscription Information';
      case 'timesheet': return 'Time Tracking Details';
      case 'final': return 'Project Summary';
      case 'interim': return 'Milestone Information';
      case 'credit': return 'Credit Information';
      case 'overdue': return 'Payment Notice';
      case 'sales': return 'Sales Information';
      case 'debit': return 'Additional Charges';
      case 'digital': return 'Digital Options';
      case 'mixed': return 'Service & Product Details';
      case 'retainer': return 'Retainer Agreement';
      case 'creditNote': return 'Credit Note Details';
      case 'debitMemo': return 'Debit Memo Information';
      case 'expenseReport': return 'Expense Details';
      case 'consolidated': return 'Consolidation Details';
      case 'creditMemo': return 'Credit Memo Information';
      case 'tax': return 'Tax Information';
      default: return 'Additional Information';
    }
  };

  const getInvoiceTitle = () => {
    switch (currentTemplate) {
      case 'proforma': return 'PROFORMA INVOICE';
      case 'creditNote': return 'CREDIT NOTE';
      case 'debitMemo': return 'DEBIT MEMO';
      case 'creditMemo': return 'CREDIT MEMO';
      case 'expenseReport': return 'EXPENSE REPORT';
      case 'consolidated': return 'CONSOLIDATED INVOICE';
      case 'overdue': return 'PAYMENT NOTICE';
      case 'final': return 'FINAL INVOICE';
      case 'interim': return 'INTERIM INVOICE';
      default: return 'INVOICE';
    }
  };

  const showOverdueNotice = () => {
    if (currentTemplate !== 'overdue') return null;
    
    return (
      <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
        <div className="text-red-800 font-semibold text-lg mb-2">PAYMENT OVERDUE</div>
        <div className="text-red-700 text-sm">
          {templateData.collectionNotice || 'This invoice is past due. Please remit payment immediately to avoid additional charges.'}
        </div>
      </div>
    );
  };

  const calculateTotal = () => {
    const subtotal = invoice.lineItems.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
    const taxAmount = subtotal * (invoice.taxRate / 100);
    return subtotal + taxAmount;
  };

  return (
    <div 
      className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none print:max-w-full"
      style={getTemplateStyles()}
    >
      <div className="p-8 print:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="mb-6 md:mb-0">
            {invoice.businessInfo.logo && (
              <img 
                src={invoice.businessInfo.logo} 
                alt="Company Logo" 
                className="h-12 mb-4 object-contain"
              />
            )}
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--primary-color)' }}>
                {invoice.businessInfo.name}
              </h1>
              <div className="text-sm text-gray-600 space-y-1">
                <div>{invoice.businessInfo.address}</div>
                <div>{invoice.businessInfo.city}, {invoice.businessInfo.state} {invoice.businessInfo.zipCode}</div>
                <div>{invoice.businessInfo.phone}</div>
                <div>{invoice.businessInfo.email}</div>
              </div>
            </div>
          </div>

          <div className="text-right">
            <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: 'var(--secondary-color)' }}>
              {getInvoiceTitle()}
            </h2>
            <div className="space-y-2 text-sm">
              <div><span className="font-semibold">Invoice #:</span> {invoice.invoiceNumber}</div>
              <div><span className="font-semibold">Date:</span> {format(new Date(invoice.invoiceDate), 'MMM dd, yyyy')}</div>
              <div><span className="font-semibold">Due Date:</span> {format(new Date(invoice.dueDate), 'MMM dd, yyyy')}</div>
              {templateData.validityPeriod && (
                <div><span className="font-semibold">Valid Until:</span> {format(new Date(templateData.validityPeriod), 'MMM dd, yyyy')}</div>
              )}
            </div>
          </div>
        </div>

        {/* Overdue Notice */}
        {showOverdueNotice()}

        {/* Bill To Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--primary-color)' }}>
              Bill To:
            </h3>
            <div className="text-sm space-y-1">
              <div className="font-semibold">{invoice.clientInfo.name}</div>
              <div>{invoice.clientInfo.email}</div>
              <div>{invoice.clientInfo.address}</div>
              <div>{invoice.clientInfo.city}, {invoice.clientInfo.state} {invoice.clientInfo.zipCode}</div>
              <div>{invoice.clientInfo.phone}</div>
            </div>
          </div>

          {/* Template Specific Fields */}
          <div>
            {renderTemplateSpecificFields()}
          </div>
        </div>

        {/* Line Items */}
        <div className="mb-8">
          <div className="bg-gray-50 p-4 rounded-t-lg">
            <div className="grid grid-cols-12 gap-4 text-sm font-semibold" style={{ color: 'var(--secondary-color)' }}>
              <div className="col-span-6 md:col-span-5">Description</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>
          </div>
          
          <div className="border border-t-0 rounded-b-lg">
            {invoice.lineItems.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 p-4 text-sm border-b last:border-b-0">
                <div className="col-span-6 md:col-span-5">
                  <div className="font-medium">{item.description}</div>
                </div>
                <div className="col-span-2 text-center">{item.quantity}</div>
                <div className="col-span-2 text-right">${item.rate.toFixed(2)}</div>
                <div className="col-span-2 text-right font-medium">${item.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            {invoice.notes && (
              <div>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>Notes:</h4>
                <p className="text-sm text-gray-600">{invoice.notes}</p>
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${invoice.subtotal.toFixed(2)}</span>
                </div>
                {invoice.taxRate > 0 && (
                  <div className="flex justify-between">
                    <span>Tax ({invoice.taxRate}%):</span>
                    <span>${invoice.taxAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between text-lg font-bold" style={{ color: 'var(--primary-color)' }}>
                  <span>Total:</span>
                  <span>${invoice.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terms */}
        {invoice.terms && (
          <div className="mt-8 pt-8 border-t">
            <h4 className="font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>Terms & Conditions:</h4>
            <p className="text-sm text-gray-600">{invoice.terms}</p>
          </div>
        )}

        {/* Template-specific footer information */}
        {currentTemplate === 'digital' && templateData.paymentLink && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
            <div className="text-sm text-blue-800 font-medium mb-2">Pay Online</div>
            <div className="text-xs text-blue-600">{templateData.paymentLink}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversalTemplate;