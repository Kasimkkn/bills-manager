import React from "react";
import { DynamicBillConfig } from "@/types/invoice";

interface InvoiceProps {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<HTMLDivElement>;
}

export default function Invoice_Rental_Professional({ invoiceData, invoiceRef }: InvoiceProps) {
  const { businessInfo, customerInfo, invoiceInfo, rentalInfo, itemList, serviceList, billSummary, payment, bankDetails, footer } = invoiceData;

  const formatAddress = (address: any) => {
    if (!address) return '';
    const parts = [];
    if (address.street) parts.push(address.street);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.pincode) parts.push(address.pincode);
    return parts.join(', ');
  };

  const formatDate = (date: any) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDays = () => {
    if (!rentalInfo?.rentalPeriod) return 0;
    const start = new Date(rentalInfo.rentalPeriod.startDate);
    const end = new Date(rentalInfo.rentalPeriod.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateItemTotal = (item: any) => {
    const qty = item.quantity || 1;
    const rate = item.rate || 0;
    const discount = item.discount || 0;
    const tax = item.tax || 0;
    const subtotal = qty * rate - discount;
    return subtotal + (subtotal * tax) / 100;
  };

  const calculateServiceTotal = (service: any) => {
    const hours = service.hours || 1;
    const rate = parseFloat(service.rate) || 0;
    return hours * rate;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
        {/* Header */}
        <div className="bg-black text-white px-14 py-8">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              {businessInfo?.logo && (
                <img src={businessInfo.logo} alt="Logo" className="h-16 mb-3 brightness-0 invert" />
              )}
              {businessInfo?.name && (
                <h1 className="text-3xl font-bold mb-2">{businessInfo.name}</h1>
              )}
              {businessInfo?.address && (
                <div className="text-sm opacity-90">
                  <p>{formatAddress(businessInfo.address)}</p>
                </div>
              )}
              {(businessInfo?.phoneNumber || businessInfo?.email) && (
                <div className="text-sm mt-2 opacity-90">
                  {businessInfo.phoneNumber && <span className="mr-4">📞 {businessInfo.phoneNumber}</span>}
                  {businessInfo.email && <span>✉ {businessInfo.email}</span>}
                </div>
              )}
            </div>

            <div className="text-right">
              <h2 className="text-4xl font-bold mb-3">RENTAL INVOICE</h2>
              {invoiceInfo?.invoiceNumber && (
                <p className="text-sm opacity-90">Invoice #: {invoiceInfo.invoiceNumber}</p>
              )}
              {invoiceInfo?.invoiceDate && (
                <p className="text-sm opacity-90">{formatDate(invoiceInfo.invoiceDate)}</p>
              )}
              {rentalInfo?.agreementNumber && (
                <p className="text-sm opacity-90 mt-2">Agreement #: {rentalInfo.agreementNumber}</p>
              )}
            </div>
          </div>
        </div>

        {/* Tenant & Property Information */}
        <div className="px-14 py-6 bg-gray-50">
          <div className="grid grid-cols-2 gap-6">
            {customerInfo && (
              <div className="bg-white border-2 border-black p-4">
                <p className="text-xs font-bold uppercase tracking-wider mb-3">Tenant Information</p>
                <div className="space-y-1">
                  <p className="font-bold text-lg text-black">{customerInfo.name}</p>
                  {customerInfo.customerId && (
                    <p className="text-xs text-gray-600">Tenant ID: {customerInfo.customerId}</p>
                  )}
                  {customerInfo.phoneNumber && (
                    <p className="text-sm text-gray-700">📱 {customerInfo.phoneNumber}</p>
                  )}
                  {customerInfo.email && (
                    <p className="text-sm text-gray-700">✉ {customerInfo.email}</p>
                  )}
                  {customerInfo.address && (
                    <p className="text-sm text-gray-700 mt-2">📍 {formatAddress(customerInfo.address)}</p>
                  )}
                </div>
              </div>
            )}

            {rentalInfo && (
              <div className="bg-white border-2 border-black p-4">
                <p className="text-xs font-bold uppercase tracking-wider mb-3">Property Details</p>
                <div className="space-y-2">
                  {rentalInfo.propertyType && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-semibold text-black">{rentalInfo.propertyType}</span>
                    </div>
                  )}
                  {rentalInfo.propertyAddress && (
                    <div className="text-sm">
                      <span className="text-gray-600 block mb-1">Address:</span>
                      <p className="font-semibold text-black">{formatAddress(rentalInfo.propertyAddress)}</p>
                    </div>
                  )}
                  {rentalInfo.renewalDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Renewal:</span>
                      <span className="font-semibold text-black">{formatDate(rentalInfo.renewalDate)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rental Period */}
        {rentalInfo?.rentalPeriod && (
          <div className="px-14 py-4 bg-black text-white">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider opacity-75 mb-1">Rental Period</p>
                <p className="text-lg font-bold">
                  {formatDate(rentalInfo.rentalPeriod.startDate)} - {formatDate(rentalInfo.rentalPeriod.endDate)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider opacity-75 mb-1">Duration</p>
                <p className="text-2xl font-bold">{calculateDays()} Days</p>
              </div>
            </div>
          </div>
        )}

        {/* Items/Services */}
        <div className="px-14 py-6">
          <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-b-2 border-black pb-2">
            Rental Charges
          </h3>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-black">
                <th className="text-left py-3 px-4 font-bold text-sm">Description</th>
                <th className="text-center py-3 px-4 font-bold text-sm w-24">Quantity</th>
                <th className="text-right py-3 px-4 font-bold text-sm w-32">Rate</th>
                <th className="text-right py-3 px-4 font-bold text-sm w-32">Amount</th>
              </tr>
            </thead>
            <tbody>
              {serviceList?.map((service, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="py-4 px-4">
                    <p className="font-semibold text-black">{service.description}</p>
                    {service.duration && (
                      <p className="text-xs text-gray-600 mt-1">Period: {service.duration}</p>
                    )}
                  </td>
                  <td className="text-center py-4 px-4 text-black">{service.hours || 1}</td>
                  <td className="text-right py-4 px-4 text-gray-700">₹{parseFloat(service.rate).toFixed(2)}</td>
                  <td className="text-right py-4 px-4 font-semibold text-black">
                    ₹{calculateServiceTotal(service).toFixed(2)}
                  </td>
                </tr>
              ))}

              {itemList?.map((item, index) => (
                <tr key={`item-${index}`} className="border-b border-gray-300">
                  <td className="py-4 px-4">
                    <p className="font-semibold text-black">{item.itemName}</p>
                    {item.description && (
                      <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                    )}
                  </td>
                  <td className="text-center py-4 px-4 text-black">{item.quantity || 1} {item.unit || ''}</td>
                  <td className="text-right py-4 px-4 text-gray-700">₹{item.rate.toFixed(2)}</td>
                  <td className="text-right py-4 px-4 font-semibold text-black">
                    ₹{calculateItemTotal(item).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Security Deposit & Late Fees */}
        {(rentalInfo?.securityDeposit || rentalInfo?.lateFee) && (
          <div className="px-14 pb-4">
            <div className="bg-gray-50 border-2 border-gray-300 p-4">
              <p className="text-xs font-bold uppercase tracking-wider mb-3">Additional Information</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {rentalInfo.securityDeposit && (
                  <div className="flex justify-between">
                    <span className="text-gray-700">Security Deposit:</span>
                    <span className="font-semibold text-black">₹{rentalInfo.securityDeposit.toFixed(2)}</span>
                  </div>
                )}
                {rentalInfo.lateFee && (
                  <div className="flex justify-between">
                    <span className="text-gray-700">Late Fee:</span>
                    <span className="font-semibold text-red-600">₹{rentalInfo.lateFee.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="px-14 pb-6">
          <div className="flex justify-between gap-6">
            {payment && (
              <div className="flex-1 bg-white border-2 border-gray-300 p-4">
                <p className="text-xs font-bold uppercase tracking-wider mb-3">Payment Details</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Method:</span>
                    <span className="font-semibold text-black">{payment.paymentOption}</span>
                  </div>
                  {payment.transactionId && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">Transaction:</span>
                      <span className="font-mono text-xs text-black">{payment.transactionId}</span>
                    </div>
                  )}
                  {payment.amountPaid !== undefined && (
                    <div className="flex justify-between pt-2 border-t border-gray-300">
                      <span className="font-semibold text-gray-700">Paid:</span>
                      <span className="font-bold text-black">₹{payment.amountPaid.toFixed(2)}</span>
                    </div>
                  )}
                  {payment.balanceDue !== undefined && payment.balanceDue > 0 && (
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Balance:</span>
                      <span className="font-bold text-red-600">₹{payment.balanceDue.toFixed(2)}</span>
                    </div>
                  )}
                  {payment.advancePaid !== undefined && payment.advancePaid > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">Advance:</span>
                      <span className="font-semibold text-green-600">₹{payment.advancePaid.toFixed(2)}</span>
                    </div>
                  )}
                  {payment.securityDeposit !== undefined && payment.securityDeposit > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">Security:</span>
                      <span className="font-semibold text-blue-600">₹{payment.securityDeposit.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {billSummary && (
              <div className="w-96">
                <div className="border-2 border-black">
                  <div className="p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Subtotal:</span>
                      <span className="text-black font-medium">₹{billSummary.subTotal.toFixed(2)}</span>
                    </div>
                    {billSummary.discount !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-gray-700">Discount:</span>
                        <span className="text-black font-medium">
                          -₹{billSummary.discountType === "PERCENTAGE"
                            ? `${billSummary.discount}%`
                            : billSummary.discount}
                        </span>
                      </div>
                    )}
                    {billSummary.cgst !== undefined && billSummary.cgst > 0 && (
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">CGST:</span>
                        <span className="text-black">₹{billSummary.cgst.toFixed(2)}</span>
                      </div>
                    )}
                    {billSummary.sgst !== undefined && billSummary.sgst > 0 && (
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">SGST:</span>
                        <span className="text-black">₹{billSummary.sgst.toFixed(2)}</span>
                      </div>
                    )}
                    {billSummary.igst !== undefined && billSummary.igst > 0 && (
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">IGST:</span>
                        <span className="text-black">₹{billSummary.igst.toFixed(2)}</span>
                      </div>
                    )}
                    {billSummary.roundOff !== undefined && billSummary.roundOff !== 0 && (
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Round Off:</span>
                        <span className="text-black">
                          {billSummary.roundOff > 0 ? '+' : ''}₹{billSummary.roundOff.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-black text-white p-4 border-t-2 border-black">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold uppercase">Total Due</span>
                      <span className="text-3xl font-bold">₹{billSummary.totalDue.toFixed(2)}</span>
                    </div>
                    {billSummary.totalInWords && (
                      <p className="text-xs mt-2 opacity-75 italic">{billSummary.totalInWords}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bank Details */}
        {bankDetails && (
          <div className="px-14 pb-6">
            <div className="bg-gray-50 border-2 border-gray-300 p-4">
              <p className="text-xs font-bold uppercase tracking-wider mb-3">Bank Transfer Details</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Bank Name</p>
                  <p className="font-semibold text-black">{bankDetails.bankName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Account Number</p>
                  <p className="font-mono font-semibold text-black">{bankDetails.accountNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">IFSC Code</p>
                  <p className="font-mono font-semibold text-black">{bankDetails.ifscCode}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Account Holder</p>
                  <p className="font-semibold text-black">{bankDetails.accountHolderName}</p>
                </div>
                {bankDetails.upiId && (
                  <div>
                    <p className="text-xs text-gray-600 mb-1">UPI ID</p>
                    <p className="font-mono font-semibold text-black">{bankDetails.upiId}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div className="px-14 py-6 border-t-2 border-black bg-gray-50">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                {footer.termsAndConditions && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-2">Terms & Conditions</p>
                    <p className="text-xs text-gray-700 leading-relaxed">{footer.termsAndConditions}</p>
                  </div>
                )}
                {footer.paymentTerms && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-2">Payment Terms</p>
                    <p className="text-xs text-gray-700 leading-relaxed">{footer.paymentTerms}</p>
                  </div>
                )}
                {footer.notes && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-2">Important Notes</p>
                    <p className="text-xs text-gray-700 leading-relaxed">{footer.notes}</p>
                  </div>
                )}
              </div>

              <div className="text-right">
                {footer.signature && (
                  <div className="mb-4">
                    <div className="w-48 ml-auto border-t-2 border-black pt-2">
                      <p className="text-xs uppercase tracking-wider">Landlord Signature</p>
                    </div>
                  </div>
                )}
                {footer.exitMessage && (
                  <p className="text-sm font-semibold text-black mt-4">{footer.exitMessage}</p>
                )}
                {(businessInfo?.licenseNumber || businessInfo?.gstNumber) && (
                  <div className="text-xs text-gray-600 mt-4">
                    {businessInfo.licenseNumber && <p>License: {businessInfo.licenseNumber}</p>}
                    {businessInfo.gstNumber && <p>GSTIN: {businessInfo.gstNumber}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}