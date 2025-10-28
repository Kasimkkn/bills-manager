import React from "react";
import { DynamicBillConfig } from "@/types/invoice";
import { formatAddress, formatDate, calculateTotalTax } from "@/lib/invoiceHelpers";

interface InvoiceProps {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<HTMLDivElement>;
}

export default function Invoice_Freelancer_Creative({ invoiceData, invoiceRef }: InvoiceProps) {
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
        {/* Creative Header */}
        <div className="relative px-12 py-10">
          <div className="absolute top-0 left-0 w-2 h-full bg-black"></div>
          <div className="pl-8">
            {invoiceData.isBusinessInfoNeeded && (
              <>
                <h1 className="text-5xl font-bold text-black mb-2">{invoiceData.businessInfo?.name}</h1>
                <div className="w-24 h-1 bg-black mb-4"></div>
                <p className="text-sm text-gray-700">{formatAddress(invoiceData.businessInfo?.address)}</p>
                <p className="text-sm text-gray-700">{invoiceData.businessInfo?.email} • {invoiceData.businessInfo?.phoneNumber}</p>
              </>
            )}
          </div>
        </div>

        {/* Invoice Info */}
        <div className="px-12 py-6">
          <div className="flex justify-between items-start">
            <div className="bg-black text-white px-8 py-6">
              <p className="text-xs uppercase tracking-wider mb-2">Invoice</p>
              <p className="text-3xl font-bold mb-1">{invoiceData.invoiceInfo?.invoiceNumber}</p>
              <p className="text-xs">Date: {formatDate(invoiceData.invoiceInfo?.invoiceDate)}</p>
            </div>
            {invoiceData.isCustomerInfoNeeded && (
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-gray-600 mb-2">Billed To</p>
                <p className="font-bold text-xl text-black">{invoiceData.customerInfo?.name}</p>
                <p className="text-sm text-gray-700">{invoiceData.customerInfo?.email}</p>
                <p className="text-sm text-gray-700">{formatAddress(invoiceData.customerInfo?.address)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Services */}
        {invoiceData.isItemListNeeded && invoiceData.itemList && (
          <div className="px-12 py-8">
            <h3 className="text-2xl font-bold text-black mb-6">Services Provided</h3>
            <div className="space-y-4">
              {invoiceData.itemList.map((item, index) => (
                <div key={index} className="border-l-4 border-black pl-6 py-3 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-bold text-lg text-black">{item.itemName}</p>
                      {item.description && <p className="text-sm text-gray-600 mt-1">{item.description}</p>}
                      <p className="text-xs text-gray-500 mt-2">{item.quantity} × ${Number(item.rate).toFixed(2)}</p>
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-black">${(Number(item.quantity) * Number(item.rate)).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="px-12 pb-8">
          <div className="flex justify-end">
            <div className="w-96">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="text-black font-medium">${Number(invoiceData.billSummary?.subTotal || 0).toFixed(2)}</span>
                </div>
                {Number(invoiceData.billSummary?.discount || 0) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Discount</span>
                    <span className="text-black font-medium">-${Number(invoiceData.billSummary.discount).toFixed(2)}</span>
                  </div>
                )}
                {calculateTotalTax(invoiceData.billSummary?.cgst, invoiceData.billSummary?.sgst, invoiceData.billSummary?.igst) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Tax</span>
                    <span className="text-black font-medium">${calculateTotalTax(invoiceData.billSummary?.cgst, invoiceData.billSummary?.sgst, invoiceData.billSummary?.igst).toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="bg-black text-white px-6 py-5 flex justify-between items-center">
                <span className="text-lg font-bold">Total Due</span>
                <span className="text-3xl font-bold">${Number(invoiceData.billSummary?.totalDue || 0).toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-600 mt-3 text-right">Payment due by {formatDate(invoiceData.invoiceInfo?.invoiceDueDate)}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        {invoiceData.isFooterNeeded && invoiceData.footer && (
          <div className="px-12 py-8 border-t-2 border-black mt-auto">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Payment Terms</p>
                <p className="text-sm text-gray-700">{invoiceData.footer.paymentTerms}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-700">Thank you for your business!</p>
                <p className="text-xs text-gray-600 mt-1">{invoiceData.businessInfo?.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
