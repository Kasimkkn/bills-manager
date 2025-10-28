import React from "react";
import { DynamicBillConfig } from "@/types/invoice";
import { formatAddress, formatDate, calculateTotalTax } from "@/lib/invoiceHelpers";

interface InvoiceProps {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<HTMLDivElement>;
}

export default function Invoice_Education_Academic({ invoiceData, invoiceRef }: InvoiceProps) {
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
        {/* Academic Header */}
        <div className="border-b-2 border-black px-16 py-10">
          {invoiceData.isBusinessInfoNeeded && (
            <div className="text-center">
              <h1 className="text-4xl font-bold text-black mb-2" style={{ letterSpacing: '0.05em' }}>{invoiceData.businessInfo?.name}</h1>
              <p className="text-sm text-gray-700 italic mb-1">{formatAddress(invoiceData.businessInfo?.address)}</p>
              <p className="text-sm text-gray-700">Tel: {invoiceData.businessInfo?.phoneNumber} | Email: {invoiceData.businessInfo?.email}</p>
            </div>
          )}
        </div>

        {/* Invoice Title */}
        <div className="px-16 py-8 text-center border-b border-gray-300">
          <h2 className="text-3xl font-bold text-black" style={{ letterSpacing: '0.1em' }}>STUDENT INVOICE</h2>
          <div className="mt-4 text-sm text-gray-700">
            <p>Invoice Number: <span className="font-semibold text-black">{invoiceData.invoiceInfo?.invoiceNumber}</span></p>
            <p>Issue Date: <span className="font-semibold text-black">{formatDate(invoiceData.invoiceInfo?.invoiceDate)}</span> | Due Date: <span className="font-semibold text-black">{formatDate(invoiceData.invoiceInfo?.invoiceDueDate)}</span></p>
          </div>
        </div>

        {/* Student Information */}
        {invoiceData.isCustomerInfoNeeded && (
          <div className="px-16 py-6 border-b border-gray-300">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">Student Details</h3>
            <div className="bg-gray-50 p-4 border-l-4 border-black">
              <p className="font-semibold text-black mb-1">{invoiceData.customerInfo?.name}</p>
              <p className="text-sm text-gray-700">{invoiceData.customerInfo?.email}</p>
              <p className="text-sm text-gray-700">{formatAddress(invoiceData.customerInfo?.address)}</p>
            </div>
          </div>
        )}

        {/* Fee Details */}
        {invoiceData.isItemListNeeded && invoiceData.itemList && (
          <div className="px-16 py-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-4">Fee Breakdown</h3>
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-black">
                  <th className="text-left py-3 px-4 font-bold text-black">Description</th>
                  <th className="text-center py-3 px-4 font-bold text-black">Period</th>
                  <th className="text-right py-3 px-4 font-bold text-black">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.itemList.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="py-3 px-4">
                      <p className="font-semibold text-black">{item.itemName}</p>
                      {item.description && <p className="text-xs text-gray-600 italic">{item.description}</p>}
                    </td>
                    <td className="text-center py-3 px-4 text-sm text-gray-700">{item.quantity} unit(s)</td>
                    <td className="text-right py-3 px-4 text-black font-semibold">${(Number(item.quantity) * Number(item.rate)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Summary */}
        <div className="px-16 pb-8">
          <div className="flex justify-end">
            <div className="w-96 border-2 border-black bg-gray-50 p-6">
              <div className="flex justify-between py-2 text-sm border-b border-gray-300">
                <span className="text-gray-700">Subtotal:</span>
                <span className="text-black font-medium">${Number(invoiceData.billSummary?.subTotal || 0).toFixed(2)}</span>
              </div>
              {Number(invoiceData.billSummary?.discount || 0) > 0 && (
                <div className="flex justify-between py-2 text-sm border-b border-gray-300">
                  <span className="text-gray-700">Scholarship/Discount:</span>
                  <span className="text-black font-medium">-${Number(invoiceData.billSummary.discount).toFixed(2)}</span>
                </div>
              )}
              {calculateTotalTax(invoiceData.billSummary?.cgst, invoiceData.billSummary?.sgst, invoiceData.billSummary?.igst) > 0 && (
                <div className="flex justify-between py-2 text-sm border-b border-gray-300">
                  <span className="text-gray-700">Tax:</span>
                  <span className="text-black font-medium">${calculateTotalTax(invoiceData.billSummary?.cgst, invoiceData.billSummary?.sgst, invoiceData.billSummary?.igst).toFixed(2)}</span>
                </div>
              )}
              <div className="pt-3 flex justify-between items-center">
                <span className="font-bold text-lg text-black">Total Amount Due:</span>
                <span className="font-bold text-2xl text-black">${Number(invoiceData.billSummary?.totalDue || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {invoiceData.isFooterNeeded && invoiceData.footer && (
          <div className="px-16 py-6 border-t-2 border-black bg-gray-50 mt-auto">
            <p className="text-xs text-center text-gray-700 mb-2"><span className="font-semibold">Payment Terms:</span> {invoiceData.footer.paymentTerms}</p>
            <p className="text-xs text-center text-gray-700 italic">Please ensure payment is made by the due date to avoid late fees.</p>
          </div>
        )}
      </div>
    </div>
  );
}
