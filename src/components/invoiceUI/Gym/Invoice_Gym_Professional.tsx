import React from "react";
import { DynamicBillConfig } from "@/types/invoice";

interface InvoiceProps {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<HTMLDivElement>;
}

export default function Invoice_Gym_Professional({ invoiceData, invoiceRef }: InvoiceProps) {
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
        {/* Professional Header */}
        <div className="bg-black text-white px-12 py-8">
          {invoiceData.isBusinessInfoNeeded && (
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">{invoiceData.businessInfo?.name}</h1>
                <p className="text-sm opacity-90">{invoiceData.businessInfo?.address}</p>
              </div>
              <div className="text-right text-sm">
                <p>{invoiceData.businessInfo.businessPhone}</p>
                <p>{invoiceData.businessInfo.businessEmail}</p>
              </div>
            </div>
          )}
        </div>

        {/* Invoice Info Bar */}
        <div className="bg-gray-100 px-12 py-5 border-b-2 border-gray-900">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-black">MEMBERSHIP INVOICE</h2>
            {invoiceData.isInvoiceInfoNeeded && (
              <div className="text-right text-sm">
                <p className="text-gray-700">Invoice #: <span className="font-bold text-black">{invoiceData.invoiceInfo.invoiceNumber}</span></p>
                <p className="text-gray-700">Date: <span className="font-semibold text-black">{invoiceData.invoiceInfo.invoiceDate}</span></p>
                <p className="text-gray-700">Due: <span className="font-semibold text-black">{invoiceData.invoiceInfo.dueDate}</span></p>
              </div>
            )}
          </div>
        </div>

        {/* Member Information */}
        {invoiceData.isCustomerInfoNeeded && (
          <div className="px-12 py-8">
            <div className="bg-gray-50 border-l-4 border-black p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Member Details</p>
              <p className="font-bold text-xl text-black">{invoiceData.customerInfo.name}</p>
              <p className="text-sm text-gray-700 mt-1">{invoiceData.customerInfo.email}</p>
              <p className="text-sm text-gray-700">{formatAddress(invoiceData.customerInfo.address)}</p>
            </div>
          </div>
        )}

        {/* Services/Membership Table */}
        {invoiceData.isItemListNeeded && (
          <div className="px-12 pb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-black text-white">
                  <th className="text-left py-3 px-4 font-bold">Service/Membership</th>
                  <th className="text-center py-3 px-4 font-bold">Duration</th>
                  <th className="text-right py-3 px-4 font-bold">Rate</th>
                  <th className="text-right py-3 px-4 font-bold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.itemList.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="py-4 px-4">
                      <p className="font-semibold text-black">{item.itemName}</p>
                      <p className="text-xs text-gray-600">{item.itemDescription}</p>
                    </td>
                    <td className="text-center py-4 px-4 text-black">{item.quantity} month(s)</td>
                    <td className="text-right py-4 px-4 text-gray-700">{invoiceData.businessInfo.currency}{Number(item.rate).toFixed(2)}</td>
                    <td className="text-right py-4 px-4 font-semibold text-black">{invoiceData.businessInfo.currency}{(Number(item.quantity) * Number(item.rate)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Summary */}
        <div className="px-12 pb-8">
          <div className="flex justify-end">
            <div className="w-96 border-2 border-black">
              <div className="bg-gray-100 px-6 py-3 border-b-2 border-black">
                <p className="font-bold text-black">Summary</p>
              </div>
              <div className="p-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="text-black font-medium">{invoiceData.businessInfo.currency}{Number(invoiceData.billSummary.subtotal).toFixed(2)}</span>
                </div>
                {Number(invoiceData.billSummary.discount) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Member Discount:</span>
                    <span className="text-black font-medium">-{invoiceData.businessInfo.currency}{Number(invoiceData.billSummary.discount).toFixed(2)}</span>
                  </div>
                )}
                {Number(invoiceData.billSummary.tax) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Tax:</span>
                    <span className="text-black font-medium">{invoiceData.businessInfo.currency}{Number(invoiceData.billSummary.tax).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t-2 border-black pt-3 flex justify-between items-center">
                  <span className="font-bold text-lg text-black">Total Due:</span>
                  <span className="font-bold text-2xl text-black">{invoiceData.businessInfo.currency}{Number(invoiceData.billSummary.total).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {invoiceData.isFooterNeeded && (
          <div className="px-12 py-6 bg-gray-900 text-white mt-auto">
            <div className="text-center">
              <p className="text-sm font-semibold mb-2">Payment Terms</p>
              <p className="text-xs opacity-90">{invoiceData.footerInfo.paymentTerms}</p>
              <p className="text-xs mt-4 opacity-75">Thank you for being a valued member!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
