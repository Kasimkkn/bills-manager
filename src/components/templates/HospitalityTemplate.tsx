
import { useInvoice } from '@/contexts/InvoiceContext';
import { useTemplate } from '@/contexts/TemplateContext';
import { Separator } from "@/components/ui/separator";

const HospitalityTemplate = () => {
  const { invoice } = useInvoice();
  const { templateData } = useTemplate();

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

  return (
    <div className="p-4 lg:p-8 bg-surface min-h-full">
      <div className="max-w-4xl mx-auto">
        <div className="invoice-paper rounded-2xl shadow-invoice p-8 lg:p-12 animate-fade-in bg-gradient-to-br from-white to-red-50">
          {/* Elegant Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start mb-12">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                GUEST INVOICE
              </h1>
              <div className="text-gray-600 space-y-1">
                <p className="font-medium">#{invoice.invoiceNumber}</p>
                <p>Date: {formatDate(invoice.invoiceDate)}</p>
                <p>Due: {formatDate(invoice.dueDate)}</p>
              </div>
            </div>
            
            {invoice.businessInfo.logo ? (
              <img 
                src={invoice.businessInfo.logo} 
                alt="Logo" 
                className="w-24 h-24 object-contain rounded-xl shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">
                  {invoice.businessInfo.name.charAt(0) || 'H'}
                </span>
              </div>
            )}
          </div>

          {/* Stay Details */}
          {(templateData.roomNumber || templateData.checkIn || templateData.checkOut || templateData.guestName) && (
            <div className="mb-8 p-6 bg-gradient-to-r from-red-100 to-amber-100 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Stay Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templateData.guestName && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">Guest Name</p>
                    <p className="text-lg font-semibold text-red-700">{templateData.guestName}</p>
                  </div>
                )}
                {templateData.roomNumber && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">Room</p>
                    <p className="text-lg font-semibold text-amber-700">{templateData.roomNumber}</p>
                  </div>
                )}
                {templateData.checkIn && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">Check-in</p>
                    <p className="text-lg font-semibold text-red-700">{formatDate(templateData.checkIn)}</p>
                  </div>
                )}
                {templateData.checkOut && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">Check-out</p>
                    <p className="text-lg font-semibold text-amber-700">{formatDate(templateData.checkOut)}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Business & Client Info */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 border-b-2 border-red-600 pb-2">
                Hotel Information
              </h3>
              <div className="text-gray-700 space-y-1">
                <p className="font-semibold text-lg">{invoice.businessInfo.name || 'Hotel Name'}</p>
                {invoice.businessInfo.address && <p>{invoice.businessInfo.address}</p>}
                {(invoice.businessInfo.city || invoice.businessInfo.state || invoice.businessInfo.zipCode) && (
                  <p>
                    {[invoice.businessInfo.city, invoice.businessInfo.state, invoice.businessInfo.zipCode]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                )}
                {invoice.businessInfo.phone && <p>Phone: {invoice.businessInfo.phone}</p>}
                {invoice.businessInfo.email && <p>Email: {invoice.businessInfo.email}</p>}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 border-b-2 border-amber-500 pb-2">
                Bill To
              </h3>
              <div className="text-gray-700 space-y-1">
                <p className="font-semibold text-lg">{templateData.guestName || invoice.clientInfo.name || 'Guest Name'}</p>
                {invoice.clientInfo.address && <p>{invoice.clientInfo.address}</p>}
                {(invoice.clientInfo.city || invoice.clientInfo.state || invoice.clientInfo.zipCode) && (
                  <p>
                    {[invoice.clientInfo.city, invoice.clientInfo.state, invoice.clientInfo.zipCode]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                )}
                {invoice.clientInfo.phone && <p>Phone: {invoice.clientInfo.phone}</p>}
                {invoice.clientInfo.email && <p>Email: {invoice.clientInfo.email}</p>}
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-red-600 to-amber-500 rounded-t-lg px-6 py-4">
              <div className="grid grid-cols-12 gap-4 text-sm font-bold text-white uppercase tracking-wide">
                <div className="col-span-6">Service/Room Charge</div>
                <div className="col-span-2 text-center">Nights/Qty</div>
                <div className="col-span-2 text-center">Rate</div>
                <div className="col-span-2 text-right">Amount</div>
              </div>
            </div>
            
            <div className="bg-white">
              {invoice.lineItems.map((item, index) => (
                <div key={item.id} className={`px-6 py-4 ${index < invoice.lineItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="grid grid-cols-12 gap-4 text-gray-700">
                    <div className="col-span-6">
                      <p className="font-medium">{item.description || `Service ${index + 1}`}</p>
                    </div>
                    <div className="col-span-2 text-center">{item.quantity}</div>
                    <div className="col-span-2 text-center">{formatCurrency(item.rate)}</div>
                    <div className="col-span-2 text-right font-medium">{formatCurrency(item.amount)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-80">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
                </div>
                
                {invoice.taxRate > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>Tax ({invoice.taxRate}%):</span>
                    <span className="font-medium">{formatCurrency(invoice.taxAmount)}</span>
                  </div>
                )}
                
                <Separator className="bg-gray-300" />
                
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total:</span>
                  <span className="text-red-600">{formatCurrency(invoice.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes & Terms */}
          {invoice.notes && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
                Additional Notes
              </h3>
              <p className="text-gray-700 bg-red-50 p-4 rounded-lg border-l-4 border-red-600">
                {invoice.notes}
              </p>
            </div>
          )}

          {invoice.terms && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
                Hotel Policies
              </h3>
              <p className="text-gray-700 bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                {invoice.terms}
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-900 font-medium mb-2">Thank you for staying with us!</p>
            <p className="text-gray-500 text-sm">We hope you enjoyed your visit and look forward to welcoming you again</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalityTemplate;
