import React from "react";
import { DynamicBillConfig } from "@/types/invoice";
import { formatAddress, formatDate, calculateTotalTax } from "@/lib/invoiceHelpers";

interface InvoiceProps {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<HTMLDivElement>;
}

export default function Invoice_Education_Modern({ invoiceData, invoiceRef }: InvoiceProps) {
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
        {/* Modern Header */}
        <div className="px-12 py-8 border-b-4 border-black">
          <div className="flex justify-between items-start">
            {invoiceData.isBusinessInfoNeeded && (
              <div>
                <h1 className="text-4xl font-bold text-black mb-3">{invoiceData.businessInfo?.name}</h1>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>{formatAddress(invoiceData.businessInfo?.address)}</p>
                  <p>{invoiceData.businessInfo?.email} • {invoiceData.businessInfo?.phoneNumber}</p>
                </div>
              </div>
            )}
            <div className="text-right">
              <div className="bg-black text-white px-8 py-4 inline-block">
                <p className="text-sm mb-1">INVOICE</p>
                <p className="text-2xl font-bold">{invoiceData.invoiceInfo?.invoiceNumber}</p>
              </div>
              <div className="mt-4 text-sm space-y-1">
                <p className="text-gray-700">Issued: <span className="font-semibold text-black">{formatDate(invoiceData.invoiceInfo?.invoiceDate)}</span></p>
                <p className="text-gray-700">Due: <span className="font-semibold text-black">{formatDate(invoiceData.invoiceInfo?.invoiceDueDate)}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Student Info */}
        {invoiceData.isCustomerInfoNeeded && (
          <div className="px-12 py-6 bg-gray-50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">Student Information</h3>
            <div className="bg-white border-l-4 border-black p-4">
              <p className="font-bold text-lg text-black">{invoiceData.customerInfo?.name}</p>
              <p className="text-sm text-gray-700">{invoiceData.customerInfo?.email}</p>
              <p className="text-sm text-gray-700">{formatAddress(invoiceData.customerInfo?.address)}</p>
            </div>
          </div>
        )}

        {/* Items */}
        {invoiceData.isItemListNeeded && invoiceData.itemList && (
          <div className="px-12 py-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-4">Course/Fee Details</h3>
            <div className="space-y-3">
              {invoiceData.itemList.map((item, index) => (
                <div key={index} className="border border-gray-300 p-4 flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-semibold text-black text-lg">{item.itemName}</p>
                    {item.description && <p className="text-sm text-gray-600 mt-1">{item.description}</p>}
                    <p className="text-xs text-gray-500 mt-2">Quantity: {item.quantity} × ${Number(item.rate).toFixed(2)}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-2xl font-bold text-black">${(Number(item.quantity) * Number(item.rate)).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="px-12 pb-8">
          <div className="flex justify-end">
            <div className="w-96 space-y-2">
              <div className="flex justify-between py-2 text-sm">
                <span className="text-gray-700">Subtotal:</span>
                <span className="text-black font-medium">${Number(invoiceData.billSummary?.subTotal || 0).toFixed(2)}</span>
              </div>
              {Number(invoiceData.billSummary?.discount || 0) > 0 && (
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-gray-700">Discount/Aid:</span>
                  <span className="text-black font-medium">-${Number(invoiceData.billSummary.discount).toFixed(2)}</span>
                </div>
              )}
              {calculateTotalTax(invoiceData.billSummary?.cgst, invoiceData.billSummary?.sgst, invoiceData.billSummary?.igst) > 0 && (
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-gray-700">Tax:</span>
                  <span className="text-black font-medium">${calculateTotalTax(invoiceData.billSummary?.cgst, invoiceData.billSummary?.sgst, invoiceData.billSummary?.igst).toFixed(2)}</span>
                </div>
              )}
              <div className="border-t-4 border-black pt-3 flex justify-between items-center">
                <span className="font-bold text-xl text-black">Total Amount:</span>
                <span className="font-bold text-3xl text-black">${Number(invoiceData.billSummary?.totalDue || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {invoiceData.isFooterNeeded && invoiceData.footer && (
          <div className="px-12 py-6 bg-gray-900 text-white mt-auto">
            <div className="text-center">
              <p className="text-sm font-semibold mb-2">Payment Information</p>
              <p className="text-xs opacity-90">{invoiceData.footer.paymentTerms}</p>
              <p className="text-xs mt-3 opacity-75">Questions? Contact us at {invoiceData.businessInfo?.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
