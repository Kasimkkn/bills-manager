import React from "react";
import { DynamicBillConfig } from "@/types/invoice";

interface InvoiceProps {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<HTMLDivElement>;
}

export default function Invoice_Hotel_Minimal({ invoiceData, invoiceRef }: InvoiceProps) {
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
          fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
        }}
      >
        {/* Minimal Header */}
        <div className="px-20 py-16">
          {invoiceData.isBusinessInfoNeeded && (
            <div className="mb-12">
              <h1 className="text-5xl font-thin text-black mb-4">{invoiceData.businessInfo?.name}</h1>
              <div className="w-16 h-px bg-black mb-6"></div>
              <div className="text-sm text-gray-600 space-y-1">
                {invoiceData.businessInfo?.address && (
                  <p>{invoiceData.businessInfo.address.street}, {invoiceData.businessInfo.address.city}, {invoiceData.businessInfo.address.state} {invoiceData.businessInfo.address.pincode}</p>
                )}
                <p>{invoiceData.businessInfo?.email} • {invoiceData.businessInfo?.phoneNumber}</p>
              </div>
            </div>
          )}

          {/* Invoice & Guest Info */}
          <div className="grid grid-cols-2 gap-16 mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Invoice</p>
              <p className="text-3xl font-thin text-black mb-4">{invoiceData.invoiceInfo?.invoiceNumber}</p>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Issued: {invoiceData.invoiceInfo?.invoiceDate?.toString()}</p>
                <p>Due: {invoiceData.invoiceInfo?.invoiceDueDate?.toString()}</p>
              </div>
            </div>
            {invoiceData.isCustomerInfoNeeded && (
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Guest</p>
                <p className="text-lg font-medium text-black">{invoiceData.customerInfo?.name}</p>
                <div className="space-y-1 text-sm text-gray-600 mt-2">
                  <p>{invoiceData.customerInfo?.email}</p>
                  {invoiceData.customerInfo?.address && (
                    <p>{invoiceData.customerInfo.address.street}, {invoiceData.customerInfo.address.city}, {invoiceData.customerInfo.address.state} {invoiceData.customerInfo.address.pincode}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Items */}
          {invoiceData.isItemListNeeded && (
            <div className="mb-12">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-4 font-medium text-sm text-gray-500 uppercase tracking-wider">Item</th>
                    <th className="text-center py-4 font-medium text-sm text-gray-500 uppercase tracking-wider">Qty</th>
                    <th className="text-right py-4 font-medium text-sm text-gray-500 uppercase tracking-wider">Rate</th>
                    <th className="text-right py-4 font-medium text-sm text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.itemList.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-6">
                        <p className="font-medium text-black">{item.itemName}</p>
                        {item.description && <p className="text-xs text-gray-500 mt-1">{item.description}</p>}
                      </td>
                      <td className="text-center py-6 text-gray-700">{item.quantity}</td>
                      <td className="text-right py-6 text-gray-700">${Number(item.rate).toFixed(2)}</td>
                      <td className="text-right py-6 text-black font-medium">${(Number(item.quantity) * Number(item.rate)).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Summary */}
          <div className="flex justify-end">
            <div className="w-96 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-black">${Number(invoiceData.billSummary?.subTotal || 0).toFixed(2)}</span>
              </div>
              {Number(invoiceData.billSummary?.discount || 0) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-black">-${Number(invoiceData.billSummary.discount).toFixed(2)}</span>
                </div>
              )}
              {((invoiceData.billSummary?.cgst || 0) + (invoiceData.billSummary?.sgst || 0) + (invoiceData.billSummary?.igst || 0)) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-black">${((invoiceData.billSummary?.cgst || 0) + (invoiceData.billSummary?.sgst || 0) + (invoiceData.billSummary?.igst || 0)).toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-gray-900 pt-4 flex justify-between">
                <span className="text-lg font-medium text-black">Total</span>
                <span className="text-4xl font-thin text-black">${Number(invoiceData.billSummary?.totalDue || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          {invoiceData.isFooterNeeded && invoiceData.footer && (
            <div className="mt-16 pt-8 border-t border-gray-300">
              <p className="text-xs text-gray-500 mb-2">PAYMENT TERMS</p>
              <p className="text-sm text-gray-700">{invoiceData.footer.paymentTerms}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
