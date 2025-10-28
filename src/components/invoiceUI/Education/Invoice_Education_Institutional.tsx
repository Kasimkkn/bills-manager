import React from "react";
import { DynamicBillConfig } from "@/types/invoice";
import { formatAddress, formatDate, calculateTotalTax } from "@/lib/invoiceHelpers";

interface InvoiceProps {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<HTMLDivElement>;
}

export default function Invoice_Education_Institutional({ invoiceData, invoiceRef }: InvoiceProps) {
  return (
    <div className="min-h-screen flex items-center justify-center ">
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
        {/* Letterhead Header */}
        <div className="bg-black text-white px-16 py-6">
          {invoiceData.isBusinessInfoNeeded && (
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-1">{invoiceData.businessInfo?.name}</h1>
                <p className="text-sm opacity-90">{formatAddress(invoiceData.businessInfo?.address)}</p>
              </div>
              <div className="text-right text-sm">
                <p>{invoiceData.businessInfo?.phoneNumber}</p>
                <p>{invoiceData.businessInfo?.email}</p>
              </div>
            </div>
          )}
        </div>

        {/* Invoice Details Bar */}
        <div className="bg-gray-100 px-16 py-4 border-y border-gray-300">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-black">TAX INVOICE</h2>
            <div className="text-right text-sm">
              <p className="text-gray-700">Invoice #: <span className="font-bold text-black">{invoiceData.invoiceInfo?.invoiceNumber}</span></p>
              <p className="text-gray-700">Date: <span className="font-semibold text-black">{formatDate(invoiceData.invoiceInfo?.invoiceDate)}</span></p>
            </div>
          </div>
        </div>

        {/* Billing Information */}
        {invoiceData.isCustomerInfoNeeded && (
          <div className="px-16 py-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="border border-gray-300 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider bg-black text-white px-2 py-1 mb-3 inline-block">Billed To</h3>
                <p className="font-bold text-black mb-1">{invoiceData.customerInfo?.name}</p>
                <p className="text-sm text-gray-700">{invoiceData.customerInfo?.email}</p>
                <p className="text-sm text-gray-700">{formatAddress(invoiceData.customerInfo?.address)}</p>
              </div>
              <div className="border border-gray-300 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider bg-black text-white px-2 py-1 mb-3 inline-block">Payment Due</h3>
                <p className="text-2xl font-bold text-black">{formatDate(invoiceData.invoiceInfo?.invoiceDueDate)}</p>
                <p className="text-sm text-gray-700 mt-2">Please remit payment by this date</p>
              </div>
            </div>
          </div>
        )}

        {/* Items Table */}
        {invoiceData.isItemListNeeded && invoiceData.itemList && (
          <div className="px-16 pb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-black text-white">
                  <th className="text-left py-3 px-4 font-bold">Item Description</th>
                  <th className="text-center py-3 px-4 font-bold">Qty</th>
                  <th className="text-right py-3 px-4 font-bold">Rate</th>
                  <th className="text-right py-3 px-4 font-bold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.itemList.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="py-4 px-4">
                      <p className="font-semibold text-black">{item.itemName}</p>
                      {item.description && <p className="text-xs text-gray-600">{item.description}</p>}
                    </td>
                    <td className="text-center py-4 px-4 text-black">{item.quantity}</td>
                    <td className="text-right py-4 px-4 text-gray-700">${Number(item.rate).toFixed(2)}</td>
                    <td className="text-right py-4 px-4 font-semibold text-black">${(Number(item.quantity) * Number(item.rate)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Totals */}
        <div className="px-16 pb-8">
          <div className="flex justify-end">
            <div className="w-96">
              <div className="flex justify-between py-2 border-b border-gray-300">
                <span className="text-gray-700">Subtotal:</span>
                <span className="text-black font-medium">${Number(invoiceData.billSummary?.subTotal || 0).toFixed(2)}</span>
              </div>
              {Number(invoiceData.billSummary?.discount || 0) > 0 && (
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <span className="text-gray-700">Discount:</span>
                  <span className="text-black font-medium">-${Number(invoiceData.billSummary.discount).toFixed(2)}</span>
                </div>
              )}
              {calculateTotalTax(invoiceData.billSummary?.cgst, invoiceData.billSummary?.sgst, invoiceData.billSummary?.igst) > 0 && (
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <span className="text-gray-700">Tax:</span>
                  <span className="text-black font-medium">${calculateTotalTax(invoiceData.billSummary?.cgst, invoiceData.billSummary?.sgst, invoiceData.billSummary?.igst).toFixed(2)}</span>
                </div>
              )}
              <div className="bg-black text-white px-4 py-4 mt-2 flex justify-between items-center">
                <span className="font-bold text-lg">TOTAL DUE:</span>
                <span className="font-bold text-2xl">${Number(invoiceData.billSummary?.totalDue || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {invoiceData.isFooterNeeded && invoiceData.footer && (
          <div className="px-16 py-6 bg-gray-100 border-t border-gray-300 mt-auto">
            <div className="text-center">
              <p className="text-sm font-semibold text-black mb-1">Payment Terms & Conditions</p>
              <p className="text-xs text-gray-700">{invoiceData.footer.paymentTerms}</p>
              <p className="text-xs text-gray-700 mt-3">Thank you for your business. For inquiries, please contact {invoiceData.businessInfo?.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
