import React from "react";
import { DynamicBillConfig } from "@/types/invoice";

interface InvoiceProps {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<HTMLDivElement>;
}

export default function Invoice_Hotel_Modern({ invoiceData, invoiceRef }: InvoiceProps) {
  const calculateItemAmount = (rate: number, quantity?: number, tax?: number) => {
    const qty = quantity || 1;
    const subtotal = rate * qty;
    const taxAmount = tax ? (subtotal * tax) / 100 : 0;
    return subtotal + taxAmount;
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div
        ref={invoiceRef}
        className="bg-white shadow-lg"
        style={{
          width: "210mm",
          minHeight: "297mm",
          padding: "0",
          boxSizing: "border-box",
          fontFamily: "'Georgia', serif",
        }}
      >
        {/* Elegant Header */}
        <div className="border-b-4 border-black p-10">
          <div className="flex justify-between items-start">
            {invoiceData.isBusinessInfoNeeded && invoiceData.businessInfo && (
              <div>
                <h1 className="text-5xl font-serif mb-2">{invoiceData.businessInfo.name}</h1>
                {invoiceData.businessInfo.address && (
                  <p className="text-sm text-gray-600 max-w-xs">
                    {invoiceData.businessInfo.address.street && `${invoiceData.businessInfo.address.street}, `}
                    {invoiceData.businessInfo.address.city}, {invoiceData.businessInfo.address.state} {invoiceData.businessInfo.address.pincode}
                  </p>
                )}
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  {invoiceData.businessInfo.phoneNumber && <p>T: {invoiceData.businessInfo.phoneNumber}</p>}
                  {invoiceData.businessInfo.email && <p>E: {invoiceData.businessInfo.email}</p>}
                  {invoiceData.businessInfo.website && <p>W: {invoiceData.businessInfo.website}</p>}
                </div>
              </div>
            )}
            <div className="text-right">
              <div className="bg-black text-white px-6 py-3 inline-block">
                <h2 className="text-2xl font-bold tracking-wider">INVOICE</h2>
              </div>
              <div className="mt-4 text-sm">
                <p className="mb-1"><span className="font-semibold">Invoice #:</span> {invoiceData.invoiceInfo.invoiceNumber}</p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {invoiceData.invoiceInfo.invoiceDate ? new Date(invoiceData.invoiceInfo.invoiceDate).toLocaleDateString() : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10">
          {/* Guest & Order Details */}
          <div className="grid grid-cols-2 gap-8 mb-10">
            {invoiceData.isCustomerInfoNeeded && invoiceData.customerInfo && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 pb-2 border-b border-gray-300">
                  Guest Information
                </h3>
                <p className="font-semibold text-lg mb-1">{invoiceData.customerInfo.name}</p>
                {invoiceData.customerInfo.phoneNumber && (
                  <p className="text-sm text-gray-600">Phone: {invoiceData.customerInfo.phoneNumber}</p>
                )}
                {invoiceData.customerInfo.email && (
                  <p className="text-sm text-gray-600">Email: {invoiceData.customerInfo.email}</p>
                )}
              </div>
            )}

            {invoiceData.hotelInfo && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 pb-2 border-b border-gray-300">
                  Service Details
                </h3>
                <div className="text-sm space-y-1">
                  {invoiceData.hotelInfo.tableNumber && (
                    <p><span className="font-semibold">Table:</span> {invoiceData.hotelInfo.tableNumber}</p>
                  )}
                  {invoiceData.hotelInfo.roomNumber && (
                    <p><span className="font-semibold">Room:</span> {invoiceData.hotelInfo.roomNumber}</p>
                  )}
                  {invoiceData.hotelInfo.serverName && (
                    <p><span className="font-semibold">Server:</span> {invoiceData.hotelInfo.serverName}</p>
                  )}
                  {invoiceData.hotelInfo.numberOfGuests && (
                    <p><span className="font-semibold">Guests:</span> {invoiceData.hotelInfo.numberOfGuests}</p>
                  )}
                  {invoiceData.hotelInfo.orderType && (
                    <p><span className="font-semibold">Type:</span> {invoiceData.hotelInfo.orderType}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Items Table */}
          {invoiceData.isItemListNeeded && invoiceData.itemList && invoiceData.itemList.length > 0 && (
            <div className="mb-10">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left py-4 text-xs font-bold uppercase tracking-wider">Item Description</th>
                    <th className="text-center py-4 text-xs font-bold uppercase tracking-wider">Quantity</th>
                    <th className="text-right py-4 text-xs font-bold uppercase tracking-wider">Unit Price</th>
                    <th className="text-right py-4 text-xs font-bold uppercase tracking-wider">Tax</th>
                    <th className="text-right py-4 text-xs font-bold uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.itemList.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-4">
                        <p className="font-semibold">{item.itemName}</p>
                        {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                      </td>
                      <td className="text-center py-4 text-sm">{item.quantity || 1} {item.unit || ''}</td>
                      <td className="text-right py-4 text-sm">₹{item.rate.toFixed(2)}</td>
                      <td className="text-right py-4 text-sm">{item.tax || 0}%</td>
                      <td className="text-right py-4 font-semibold">₹{calculateItemAmount(item.rate, item.quantity, item.tax).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Summary */}
          {invoiceData.billSummary && (
            <div className="flex justify-end mb-10">
              <div className="w-96 border-2 border-black">
                <div className="bg-black text-white px-6 py-3">
                  <h3 className="font-bold uppercase tracking-wider">Bill Summary</h3>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">₹{invoiceData.billSummary.subTotal.toFixed(2)}</span>
                  </div>
                  {invoiceData.billSummary.discount && Number(invoiceData.billSummary.discount) > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount:</span>
                      <span className="font-semibold text-red-600">- ₹{invoiceData.billSummary.discount}</span>
                    </div>
                  )}
                  {invoiceData.billSummary.cgst && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">CGST:</span>
                      <span className="font-semibold">₹{invoiceData.billSummary.cgst.toFixed(2)}</span>
                    </div>
                  )}
                  {invoiceData.billSummary.sgst && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">SGST:</span>
                      <span className="font-semibold">₹{invoiceData.billSummary.sgst.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t-2 border-black pt-3 flex justify-between">
                    <span className="font-bold text-lg uppercase">Total Amount:</span>
                    <span className="font-bold text-2xl">₹{invoiceData.billSummary.totalDue.toFixed(2)}</span>
                  </div>
                  {invoiceData.billSummary.totalInWords && (
                    <p className="text-xs text-gray-600 italic pt-2 border-t border-gray-200">
                      {invoiceData.billSummary.totalInWords}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Payment Details */}
          {invoiceData.isPaymentSectionNeeded && invoiceData.payment && (
            <div className="bg-gray-50 p-6 mb-8 border-l-4 border-black">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Payment Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Method:</span>
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
            <div className="text-center border-t border-gray-300 pt-8">
              {invoiceData.footer.exitMessage && (
                <p className="text-lg italic mb-3">{invoiceData.footer.exitMessage}</p>
              )}
              {invoiceData.footer.notes && (
                <p className="text-sm text-gray-600 mb-2">{invoiceData.footer.notes}</p>
              )}
              {invoiceData.footer.termsAndConditions && (
                <p className="text-xs text-gray-500 mt-6">{invoiceData.footer.termsAndConditions}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
