import React from "react";
import { DynamicBillConfig } from "@/types/invoice";

interface InvoiceProps {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<HTMLDivElement>;
}

export default function Invoice_Hotel_Classic({ invoiceData, invoiceRef }: InvoiceProps) {
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
          fontFamily: "'Georgia', 'Times New Roman', serif",
        }}
      >
        {/* Classic Header with Border */}
        <div className="border-8 border-double border-black m-8">
          <div className="border-4 border-black p-8">
            {invoiceData.isBusinessInfoNeeded && (
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-black mb-3" style={{ letterSpacing: '0.1em' }}>{invoiceData.businessInfo?.name}</h1>
                <p className="text-sm text-gray-700 italic">{invoiceData.businessInfo?.address}</p>
                <p className="text-sm text-gray-700">Tel: {invoiceData.businessInfo.businessPhone} | Email: {invoiceData.businessInfo.businessEmail}</p>
              </div>
            )}

            {/* Invoice Title */}
            <div className="text-center py-6 border-y-2 border-black mb-6">
              <h2 className="text-3xl font-bold text-black" style={{ letterSpacing: '0.2em' }}>INVOICE</h2>
              {invoiceData.isInvoiceInfoNeeded && (
                <p className="text-sm text-gray-700 mt-2">No. {invoiceData.invoiceInfo.invoiceNumber}</p>
              )}
            </div>

            {/* Guest & Date Information */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {invoiceData.isCustomerInfoNeeded && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-600 mb-2 font-semibold">Guest Details</p>
                  <div className="border border-gray-400 p-4 bg-gray-50">
                    <p className="font-bold text-black">{invoiceData.customerInfo.name}</p>
                    <p className="text-sm text-gray-700">{invoiceData.customerInfo.email}</p>
                    <p className="text-sm text-gray-700">{formatAddress(invoiceData.customerInfo.address)}</p>
                  </div>
                </div>
              )}
              {invoiceData.isInvoiceInfoNeeded && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-600 mb-2 font-semibold">Invoice Details</p>
                  <div className="border border-gray-400 p-4 bg-gray-50">
                    <p className="text-sm text-gray-700">Invoice Date: <span className="font-semibold text-black">{invoiceData.invoiceInfo.invoiceDate}</span></p>
                    <p className="text-sm text-gray-700">Due Date: <span className="font-semibold text-black">{invoiceData.invoiceInfo.dueDate}</span></p>
                  </div>
                </div>
              )}
            </div>

            {/* Charges Table */}
            {invoiceData.isItemListNeeded && (
              <div className="mb-8">
                <table className="w-full border-2 border-black">
                  <thead>
                    <tr className="bg-gray-200 border-b-2 border-black">
                      <th className="text-left py-3 px-4 font-bold text-black">Description</th>
                      <th className="text-center py-3 px-4 font-bold text-black">Qty</th>
                      <th className="text-right py-3 px-4 font-bold text-black">Rate</th>
                      <th className="text-right py-3 px-4 font-bold text-black">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.itemList.map((item, index) => (
                      <tr key={index} className="border-b border-gray-400">
                        <td className="py-3 px-4">
                          <p className="font-semibold text-black">{item.itemName}</p>
                          <p className="text-xs text-gray-600 italic">{item.itemDescription}</p>
                        </td>
                        <td className="text-center py-3 px-4 text-black">{item.quantity}</td>
                        <td className="text-right py-3 px-4 text-gray-700">{invoiceData.businessInfo.currency}{Number(item.rate).toFixed(2)}</td>
                        <td className="text-right py-3 px-4 font-semibold text-black">{invoiceData.businessInfo.currency}{(Number(item.quantity) * Number(item.rate)).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Summary */}
            <div className="flex justify-end mb-8">
              <div className="w-96 border-2 border-black bg-gray-50 p-5">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Subtotal:</span>
                    <span className="text-black font-medium">{invoiceData.businessInfo.currency}{Number(invoiceData.billSummary.subtotal).toFixed(2)}</span>
                  </div>
                  {Number(invoiceData.billSummary.discount) > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Discount:</span>
                      <span className="text-black font-medium">-{invoiceData.businessInfo.currency}{Number(invoiceData.billSummary.discount).toFixed(2)}</span>
                    </div>
                  )}
                  {Number(invoiceData.billSummary.tax) > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Tax:</span>
                      <span className="text-black font-medium">{invoiceData.businessInfo.currency}{Number(invoiceData.billSummary.tax).toFixed(2)}</span>
                    </div>
                  )}
                </div>
                <div className="border-t-2 border-black pt-3 flex justify-between items-center">
                  <span className="font-bold text-lg text-black">Total Amount Due:</span>
                  <span className="font-bold text-2xl text-black">{invoiceData.businessInfo.currency}{Number(invoiceData.billSummary.total).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            {invoiceData.isFooterNeeded && (
              <div className="border-t-2 border-black pt-6 text-center">
                <p className="text-sm font-semibold text-black mb-2">Payment Terms</p>
                <p className="text-xs text-gray-700 italic">{invoiceData.footerInfo.paymentTerms}</p>
                <p className="text-xs text-gray-700 mt-4">Thank you for choosing {invoiceData.businessInfo?.name}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
