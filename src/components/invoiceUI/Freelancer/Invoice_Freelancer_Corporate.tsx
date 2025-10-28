import React from "react";
import { DynamicBillConfig } from "@/types/invoice";
import { formatAddress, formatDate, calculateTotalTax } from "@/lib/invoiceHelpers";

interface InvoiceProps {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<HTMLDivElement>;
}

export default function Invoice_Freelancer_Corporate({ invoiceData, invoiceRef }: InvoiceProps) {
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
        {/* Corporate Header */}
        <div className="bg-gray-900 text-white px-16 py-8">
          {invoiceData.isBusinessInfoNeeded && (
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">{invoiceData.businessInfo?.name}</h1>
                <p className="text-sm opacity-80">{formatAddress(invoiceData.businessInfo?.address)}</p>
              </div>
              <div className="text-right text-sm">
                <p>{invoiceData.businessInfo?.phoneNumber}</p>
                <p>{invoiceData.businessInfo?.email}</p>
              </div>
            </div>
          )}
        </div>

        {/* Invoice Title Bar */}
        <div className="bg-gray-100 px-16 py-6 border-b-2 border-gray-900">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold text-black">INVOICE</h2>
              <p className="text-sm text-gray-700 mt-1">Invoice #{invoiceData.invoiceInfo?.invoiceNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-700">Issue Date: <span className="font-semibold text-black">{formatDate(invoiceData.invoiceInfo?.invoiceDate)}</span></p>
              <p className="text-sm text-gray-700">Due Date: <span className="font-semibold text-black">{formatDate(invoiceData.invoiceInfo?.invoiceDueDate)}</span></p>
            </div>
          </div>
        </div>

        {/* Client Info */}
        {invoiceData.isCustomerInfoNeeded && (
          <div className="px-16 py-8">
            <div className="border-l-4 border-gray-900 pl-6 py-4 bg-gray-50">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Bill To</p>
              <p className="font-bold text-xl text-black mb-1">{invoiceData.customerInfo?.name}</p>
              <p className="text-sm text-gray-700">{invoiceData.customerInfo?.email}</p>
              <p className="text-sm text-gray-700">{formatAddress(invoiceData.customerInfo?.address)}</p>
            </div>
          </div>
        )}

        {/* Services Table */}
        {invoiceData.isItemListNeeded && invoiceData.itemList && (
          <div className="px-16 pb-6">
            <table className="w-full">
              <thead>
                <tr className="border-y-2 border-gray-900">
                  <th className="text-left py-4 px-2 font-bold text-black">Description</th>
                  <th className="text-center py-4 px-2 font-bold text-black">Hours/Qty</th>
                  <th className="text-right py-4 px-2 font-bold text-black">Rate</th>
                  <th className="text-right py-4 px-2 font-bold text-black">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.itemList.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-4 px-2">
                      <p className="font-semibold text-black">{item.itemName}</p>
                      {item.description && <p className="text-xs text-gray-600 mt-1">{item.description}</p>}
                    </td>
                    <td className="text-center py-4 px-2 text-black">{item.quantity}</td>
                    <td className="text-right py-4 px-2 text-gray-700">${Number(item.rate).toFixed(2)}</td>
                    <td className="text-right py-4 px-2 font-semibold text-black">${(Number(item.quantity) * Number(item.rate)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Totals */}
        <div className="px-16 pb-8">
          <div className="flex justify-end">
            <div className="w-96 border-2 border-gray-900 p-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="text-black font-medium">${Number(invoiceData.billSummary?.subTotal || 0).toFixed(2)}</span>
                </div>
                {Number(invoiceData.billSummary?.discount || 0) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Discount:</span>
                    <span className="text-black font-medium">-${Number(invoiceData.billSummary.discount).toFixed(2)}</span>
                  </div>
                )}
                {calculateTotalTax(invoiceData.billSummary?.cgst, invoiceData.billSummary?.sgst, invoiceData.billSummary?.igst) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Tax:</span>
                    <span className="text-black font-medium">${calculateTotalTax(invoiceData.billSummary?.cgst, invoiceData.billSummary?.sgst, invoiceData.billSummary?.igst).toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="border-t-2 border-gray-900 mt-4 pt-4 flex justify-between items-center">
                <span className="font-bold text-xl text-black">Total Due:</span>
                <span className="font-bold text-3xl text-black">${Number(invoiceData.billSummary?.totalDue || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {invoiceData.isFooterNeeded && invoiceData.footer && (
          <div className="px-16 py-6 bg-gray-900 text-white mt-auto">
            <div className="text-center">
              <p className="text-sm font-semibold mb-2">Payment Terms</p>
              <p className="text-xs opacity-90">{invoiceData.footer.paymentTerms}</p>
              <p className="text-xs mt-4 opacity-75">Thank you for your business</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
