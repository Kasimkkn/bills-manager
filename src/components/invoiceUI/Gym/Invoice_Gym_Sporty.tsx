import React from "react";
import { DynamicBillConfig } from "@/types/invoice";

interface InvoiceProps {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<HTMLDivElement>;
}

export default function Invoice_Gym_Sporty({ invoiceData, invoiceRef }: InvoiceProps) {
  const calculateItemAmount = (rate: number, quantity?: number, tax?: number) => {
    const qty = quantity || 1;
    const subtotal = rate * qty;
    const taxAmount = tax ? (subtotal * tax) / 100 : 0;
    return subtotal + taxAmount;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div
        ref={invoiceRef}
        className="bg-white shadow-lg"
        style={{
          width: "210mm",
          minHeight: "297mm",
          padding: "0",
          boxSizing: "border-box",
          fontFamily: "'Arial', 'Helvetica', sans-serif",
        }}
      >
        {/* Header with Diagonal Stripe Pattern */}
        <div className="relative bg-black text-white p-8">
          <div className="absolute top-0 right-0 w-64 h-full opacity-10">
            <div className="h-full w-full" style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 20px)" }}></div>
          </div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-wide mb-1">Invoice</h1>
              <div className="h-1 w-24 bg-white"></div>
            </div>
            {invoiceData.isBusinessInfoNeeded && invoiceData.businessInfo && (
              <div className="text-right">
                <h2 className="text-2xl font-bold mb-2">{invoiceData.businessInfo.name}</h2>
                {invoiceData.businessInfo.address && (
                  <p className="text-sm opacity-90">
                    {invoiceData.businessInfo.address.street}
                    {invoiceData.businessInfo.address.city}, {invoiceData.businessInfo.address.state} {invoiceData.businessInfo.address.pincode}
                  </p>
                )}
                {invoiceData.businessInfo.phoneNumber && (
                  <p className="text-sm opacity-90">Tel: {invoiceData.businessInfo.phoneNumber}</p>
                )}
                {invoiceData.businessInfo.email && (
                  <p className="text-sm opacity-90">{invoiceData.businessInfo.email}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Invoice Info Bar */}
        <div className="bg-gray-900 text-white px-8 py-4">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="opacity-70">Invoice #:</span>
              <span className="ml-2 font-bold">{invoiceData.invoiceInfo.invoiceNumber}</span>
            </div>
            <div>
              <span className="opacity-70">Date:</span>
              <span className="ml-2 font-bold">
                {invoiceData.invoiceInfo.invoiceDate ? new Date(invoiceData.invoiceInfo.invoiceDate).toLocaleDateString() : ""}
              </span>
            </div>
            {invoiceData.gymInfo?.membershipType && (
              <div className="text-right">
                <span className="opacity-70">Plan:</span>
                <span className="ml-2 font-bold uppercase">{invoiceData.gymInfo.membershipType}</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Customer & Membership Info */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {invoiceData.isCustomerInfoNeeded && invoiceData.customerInfo && (
              <div className="border-l-4 border-black pl-4">
                <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Member Details</h3>
                <p className="font-bold text-lg mb-1">{invoiceData.customerInfo.name}</p>
                {invoiceData.customerInfo.membershipId && (
                  <p className="text-sm text-gray-600">Member ID: {invoiceData.customerInfo.membershipId}</p>
                )}
                {invoiceData.customerInfo.phoneNumber && (
                  <p className="text-sm text-gray-600">Phone: {invoiceData.customerInfo.phoneNumber}</p>
                )}
              </div>
            )}
            
            {invoiceData.gymInfo && (
              <div className="border-l-4 border-gray-400 pl-4">
                <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Membership Info</h3>
                {invoiceData.gymInfo.validityPeriod && (
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Valid From:</span> {new Date(invoiceData.gymInfo.validityPeriod.startDate).toLocaleDateString()}
                  </p>
                )}
                {invoiceData.gymInfo.validityPeriod && (
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Valid Until:</span> {new Date(invoiceData.gymInfo.validityPeriod.endDate).toLocaleDateString()}
                  </p>
                )}
                {invoiceData.gymInfo.trainerName && (
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Trainer:</span> {invoiceData.gymInfo.trainerName}
                  </p>
                )}
                {invoiceData.gymInfo.lockerNumber && (
                  <p className="text-sm">
                    <span className="font-semibold">Locker:</span> {invoiceData.gymInfo.lockerNumber}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Items Table */}
          {invoiceData.isItemListNeeded && invoiceData.itemList && invoiceData.itemList.length > 0 && (
            <div className="mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left py-3 text-xs font-bold uppercase tracking-wide">Service/Item</th>
                    <th className="text-center py-3 text-xs font-bold uppercase tracking-wide">Qty</th>
                    <th className="text-right py-3 text-xs font-bold uppercase tracking-wide">Rate</th>
                    <th className="text-right py-3 text-xs font-bold uppercase tracking-wide">Tax %</th>
                    <th className="text-right py-3 text-xs font-bold uppercase tracking-wide">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.itemList.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-4">
                        <p className="font-semibold">{item.itemName}</p>
                        {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                      </td>
                      <td className="text-center py-4">{item.quantity || 1} {item.unit || ''}</td>
                      <td className="text-right py-4">₹{item.rate.toFixed(2)}</td>
                      <td className="text-right py-4">{item.tax || 0}%</td>
                      <td className="text-right py-4 font-semibold">₹{calculateItemAmount(item.rate, item.quantity, item.tax).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Summary */}
          {invoiceData.billSummary && (
            <div className="flex justify-end mb-8">
              <div className="w-80">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">₹{invoiceData.billSummary.subTotal.toFixed(2)}</span>
                  </div>
                  {invoiceData.billSummary.discount && Number(invoiceData.billSummary.discount) > 0 && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Discount:</span>
                      <span className="font-semibold">- ₹{invoiceData.billSummary.discount}</span>
                    </div>
                  )}
                  {invoiceData.billSummary.cgst && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">CGST:</span>
                      <span className="font-semibold">₹{invoiceData.billSummary.cgst.toFixed(2)}</span>
                    </div>
                  )}
                  {invoiceData.billSummary.sgst && (
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">SGST:</span>
                      <span className="font-semibold">₹{invoiceData.billSummary.sgst.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-4 bg-black text-white px-4 mt-2">
                    <span className="font-bold uppercase">Total Due:</span>
                    <span className="font-bold text-xl">₹{invoiceData.billSummary.totalDue.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Info */}
          {invoiceData.isPaymentSectionNeeded && invoiceData.payment && (
            <div className="bg-gray-50 p-6 mb-8 border-l-4 border-black">
              <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3">Payment Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="ml-2 font-semibold">{invoiceData.payment.paymentOption}</span>
                </div>
                {invoiceData.payment.amountPaid && (
                  <div>
                    <span className="text-gray-600">Amount Paid:</span>
                    <span className="ml-2 font-semibold">₹{invoiceData.payment.amountPaid.toFixed(2)}</span>
                  </div>
                )}
                {invoiceData.payment.transactionId && (
                  <div className="col-span-2">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="ml-2 font-mono text-xs">{invoiceData.payment.transactionId}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          {invoiceData.isFooterNeeded && invoiceData.footer && (
            <div className="border-t-2 border-gray-200 pt-6">
              {invoiceData.footer.exitMessage && (
                <p className="text-center text-lg font-semibold mb-2">{invoiceData.footer.exitMessage}</p>
              )}
              {invoiceData.footer.notes && (
                <p className="text-center text-sm text-gray-600 mb-2">{invoiceData.footer.notes}</p>
              )}
              {invoiceData.footer.termsAndConditions && (
                <p className="text-xs text-gray-500 text-center mt-4">{invoiceData.footer.termsAndConditions}</p>
              )}
            </div>
          )}
        </div>

        {/* Bottom Stripe */}
        <div className="h-2 bg-black"></div>
      </div>
    </div>
  );
}
