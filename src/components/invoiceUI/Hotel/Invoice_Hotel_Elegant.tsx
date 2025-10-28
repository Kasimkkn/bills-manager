import React from "react";
import { DynamicBillConfig } from "@/types/invoice";
import { calculateTotalTax, formatAddress, formatDate } from "@/lib/invoiceHelpers";

interface InvoiceProps {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<HTMLDivElement>;
}

export default function Invoice_Hotel_Elegant({ invoiceData, invoiceRef }: InvoiceProps) {
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
          fontFamily: "'Garamond', 'Georgia', serif",
        }}
      >
        {/* Elegant Header */}
        <div className="relative px-16 py-12 border-b border-gray-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>
          {invoiceData.isBusinessInfoNeeded && (
            <div className="text-center">
              <h1 className="text-5xl font-light text-black mb-4" style={{ letterSpacing: '0.15em' }}>{invoiceData.businessInfo?.name}</h1>
              <div className="w-32 h-px bg-black mx-auto mb-4"></div>
              <p className="text-sm text-gray-700">{formatAddress(invoiceData.businessInfo?.address)}</p>
              <p className="text-sm text-gray-700">{invoiceData.businessInfo.phoneNumber} • {invoiceData.businessInfo.email}</p>
            </div>
          )}
        </div>

        {/* Invoice Title */}
        <div className="px-16 py-8 text-center">
          <h2 className="text-4xl font-light text-black mb-4" style={{ letterSpacing: '0.3em' }}>INVOICE</h2>
          <div className="text-sm text-gray-700 space-y-1">
            <p>Invoice Number: <span className="font-semibold text-black">{invoiceData.invoiceInfo.invoiceNumber}</span></p>
            <p>Date Issued: <span className="font-semibold text-black">{formatDate(invoiceData.invoiceInfo.invoiceDate)}</span></p>
            {invoiceData.invoiceInfo.invoiceDueDate && (
              <p>Due Date: <span className="font-semibold text-black">{formatDate(invoiceData.invoiceInfo.invoiceDueDate)}</span></p>
            )}
          </div>
        </div>

        {/* Guest Information */}
        {invoiceData.isCustomerInfoNeeded && (
          <div className="px-16 py-6">
            <div className="border border-gray-300 p-6">
              <p className="text-xs uppercase tracking-widest text-gray-600 mb-3">Distinguished Guest</p>
              <p className="text-2xl font-light text-black mb-2">{invoiceData.customerInfo.name}</p>
              <p className="text-sm text-gray-700">{invoiceData.customerInfo.email}</p>
              <p className="text-sm text-gray-700">{formatAddress(invoiceData.customerInfo.address)}</p>
            </div>
          </div>
        )}

        {/* Services Table */}
        {invoiceData.isItemListNeeded && (
          <div className="px-16 py-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-4 text-sm font-light uppercase tracking-wider text-gray-600">Service Description</th>
                  <th className="text-center py-4 text-sm font-light uppercase tracking-wider text-gray-600">Qty</th>
                  <th className="text-right py-4 text-sm font-light uppercase tracking-wider text-gray-600">Rate</th>
                  <th className="text-right py-4 text-sm font-light uppercase tracking-wider text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.itemList.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-5">
                      <p className="font-medium text-black">{item.itemName}</p>
                      <p className="text-xs text-gray-600 italic mt-1">{item.description}</p>
                    </td>
                    <td className="text-center py-5 text-black">{item.quantity}</td>
                    <td className="text-right py-5 text-gray-700">{invoiceData.businessInfo.currency}{Number(item.rate).toFixed(2)}</td>
                    <td className="text-right py-5 font-medium text-black">{invoiceData.businessInfo.currency}{(Number(item.quantity) * Number(item.rate)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Summary */}
        <div className="px-16 pb-8">
          <div className="flex justify-end">
            <div className="w-96">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="text-black">{invoiceData.businessInfo.currency}{Number(invoiceData.billSummary.subTotal).toFixed(2)}</span>
                </div>
                {Number(invoiceData.billSummary.discount) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Discount</span>
                    <span className="text-black">-{invoiceData.businessInfo.currency}{Number(invoiceData.billSummary.discount).toFixed(2)}</span>
                  </div>
                )}
                {calculateTotalTax(invoiceData.billSummary?.cgst, invoiceData.billSummary?.sgst, invoiceData.billSummary?.igst) > 0 && (
                  <div className="flex justify-between py-2 text-sm">
                    <span className="text-gray-700">Tax:</span>
                    <span className="text-black font-medium">${calculateTotalTax(invoiceData.billSummary?.cgst, invoiceData.billSummary?.sgst, invoiceData.billSummary?.igst).toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="border-t-2 border-black pt-4 flex justify-between items-center">
                <span className="text-xl font-light text-black">Total Amount</span>
                <span className="text-4xl font-light text-black">{invoiceData.businessInfo.currency}{Number(invoiceData.billSummary.totalDue).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {invoiceData.isFooterNeeded && (
          <div className="px-16 py-8 border-t border-gray-300 mt-auto">
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-2">{invoiceData.footer.paymentTerms}</p>
              <p className="text-xs text-gray-600 italic">We appreciate your patronage and look forward to serving you again.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
