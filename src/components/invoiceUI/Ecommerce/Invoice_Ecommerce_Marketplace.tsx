import React from "react";
import { DynamicBillConfig } from "@/types/invoice";
import { formatAddress, formatDate, calculateTotalTax } from "@/lib/invoiceHelpers";

interface InvoiceProps {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<HTMLDivElement>;
}

export default function Invoice_Ecommerce_Marketplace({ invoiceData, invoiceRef }: InvoiceProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        ref={invoiceRef}
        className="bg-white shadow-xl"
        style={{
          width: "210mm",
          height: "297mm",
          padding: "0",
          boxSizing: "border-box",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Header Section */}
        <div className="border-b-4 border-black bg-gray-50 px-12 py-8">
          <div className="flex justify-between items-start">
            <div>
              {invoiceData.isBusinessInfoNeeded && (
                <>
                  <h1 className="text-3xl font-bold text-black mb-2">{invoiceData.businessInfo?.name}</h1>
                  <p className="text-sm text-gray-700">{formatAddress(invoiceData.businessInfo?.address)}</p>
                  <p className="text-sm text-gray-700">{invoiceData.businessInfo?.email} • {invoiceData.businessInfo?.phoneNumber}</p>
                  {invoiceData.businessInfo?.website && (
                    <p className="text-sm text-gray-700">{invoiceData.businessInfo.website}</p>
                  )}
                </>
              )}
            </div>
            <div className="text-right">
              <div className="bg-black text-white px-6 py-3 inline-block mb-2">
                <h2 className="text-2xl font-bold">INVOICE</h2>
              </div>
              <>
                <p className="text-sm text-gray-700">Invoice #: <span className="font-semibold text-black">{invoiceData.invoiceInfo?.invoiceNumber}</span></p>
                <p className="text-sm text-gray-700">Date: <span className="font-semibold text-black">{formatDate(invoiceData.invoiceInfo?.invoiceDate)}</span></p>
                <p className="text-sm text-gray-700">Due Date: <span className="font-semibold text-black">{formatDate(invoiceData.invoiceInfo?.invoiceDueDate)}</span></p>
              </>
            </div>
          </div>
        </div>

        {/* Customer & Order Info */}
        {invoiceData.isCustomerInfoNeeded && (
          <div className="px-12 py-6 bg-white border-b border-gray-200">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Bill To</h3>
                <p className="font-semibold text-black">{invoiceData.customerInfo?.name}</p>
                <p className="text-sm text-gray-700">{invoiceData.customerInfo?.email}</p>
                <p className="text-sm text-gray-700">{formatAddress(invoiceData.customerInfo?.address)}</p>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Ship To</h3>
                <p className="font-semibold text-black">{invoiceData.customerInfo?.name}</p>
                <p className="text-sm text-gray-700">{formatAddress(invoiceData.customerInfo?.address)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Items Table */}
        {invoiceData.isItemListNeeded && invoiceData.itemList && (
          <div className="px-12 py-6">
            <table className="w-full">
              <thead>
                <tr className="bg-black text-white">
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider">Product</th>
                  <th className="text-center py-3 px-4 text-xs font-bold uppercase tracking-wider">SKU</th>
                  <th className="text-center py-3 px-4 text-xs font-bold uppercase tracking-wider">Qty</th>
                  <th className="text-right py-3 px-4 text-xs font-bold uppercase tracking-wider">Price</th>
                  <th className="text-right py-3 px-4 text-xs font-bold uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.itemList.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-4 px-4">
                      <p className="font-semibold text-black">{item.itemName}</p>
                      {item.description && <p className="text-xs text-gray-600">{item.description}</p>}
                    </td>
                    <td className="text-center py-4 px-4 text-sm text-gray-700">SKU-{String(index + 1).padStart(4, '0')}</td>
                    <td className="text-center py-4 px-4 text-sm text-black font-medium">{item.quantity}</td>
                    <td className="text-right py-4 px-4 text-sm text-black">${Number(item.rate).toFixed(2)}</td>
                    <td className="text-right py-4 px-4 text-black font-semibold">${(Number(item.quantity) * Number(item.rate)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Summary Section */}
        <div className="px-12 pb-6">
          <div className="flex justify-end">
            <div className="w-80">
              <div className="flex justify-between py-2 text-sm">
                <span className="text-gray-700">Subtotal:</span>
                <span className="text-black font-medium">${Number(invoiceData.billSummary?.subTotal || 0).toFixed(2)}</span>
              </div>
              {Number(invoiceData.billSummary?.discount || 0) > 0 && (
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-gray-700">Discount:</span>
                  <span className="text-black font-medium">-${Number(invoiceData.billSummary.discount).toFixed(2)}</span>
                </div>
              )}
              {calculateTotalTax(invoiceData.billSummary?.cgst, invoiceData.billSummary?.sgst, invoiceData.billSummary?.igst) > 0 && (
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-gray-700">Tax:</span>
                  <span className="text-black font-medium">${calculateTotalTax(invoiceData.billSummary?.cgst, invoiceData.billSummary?.sgst, invoiceData.billSummary?.igst).toFixed(2)}</span>
                </div>
              )}
              <div className="border-t-2 border-black mt-2 pt-3 flex justify-between">
                <span className="font-bold text-lg text-black">Total Due:</span>
                <span className="font-bold text-2xl text-black">${Number(invoiceData.billSummary?.totalDue || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {invoiceData.isFooterNeeded && invoiceData.footer && (
          <div className="px-12 py-6 bg-gray-50 border-t border-gray-200 mt-auto">
            <div className="grid grid-cols-2 gap-8 text-xs">
              <div>
                <h4 className="font-bold text-black mb-2">Payment Information</h4>
                <p className="text-gray-700">{invoiceData.footer.paymentTerms}</p>
              </div>
              <div>
                <h4 className="font-bold text-black mb-2">Thank You!</h4>
                <p className="text-gray-700">For questions about this invoice, contact us at {invoiceData.businessInfo?.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
