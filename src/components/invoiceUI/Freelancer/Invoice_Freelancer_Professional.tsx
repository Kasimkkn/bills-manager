import React from "react";
import { DynamicBillConfig } from "@/types/invoice";

interface InvoiceProps {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<HTMLDivElement>;
}

export default function Invoice_Freelancer_Professional({ invoiceData, invoiceRef }: InvoiceProps) {
  const { businessInfo, customerInfo, invoiceInfo, freelancerInfo, serviceList, itemList, billSummary, payment, bankDetails, footer } = invoiceData;

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

  const calculateServiceTotal = (service: any) => {
    const hours = service.hours || 1;
    const rate = parseFloat(service.rate) || 0;
    return hours * rate;
  };

  const calculateItemTotal = (item: any) => {
    const qty = item.quantity || 1;
    const rate = item.rate || 0;
    const discount = item.discount || 0;
    const tax = item.tax || 0;
    const subtotal = qty * rate - discount;
    return subtotal + (subtotal * tax) / 100;
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
        {/* Professional Header */}
        <div className="border-b-4 border-black px-14 py-8">
          <div className="flex justify-between items-start">
            {businessInfo && (
              <div className="flex-1">
                {businessInfo.logo && (
                  <img src={businessInfo.logo} alt="Logo" className="h-16 mb-3" />
                )}
                <h1 className="text-3xl font-bold text-black mb-3">{businessInfo.name}</h1>
                <div className="space-y-1 text-sm text-gray-700">
                  {businessInfo.address && <p>{formatAddress(businessInfo.address)}</p>}
                  {businessInfo.email && <p>Email: {businessInfo.email}</p>}
                  {businessInfo.phoneNumber && <p>Phone: {businessInfo.phoneNumber}</p>}
                  {businessInfo.website && <p>Web: {businessInfo.website}</p>}
                </div>
                {(businessInfo.taxId || businessInfo.gstNumber) && (
                  <div className="mt-2 text-xs text-gray-600">
                    {businessInfo.taxId && <p>Tax ID: {businessInfo.taxId}</p>}
                    {businessInfo.gstNumber && <p>GST: {businessInfo.gstNumber}</p>}
                  </div>
                )}
              </div>
            )}
            <div className="text-right">
              <h2 className="text-4xl font-bold text-black mb-3">INVOICE</h2>
              <div className="text-sm space-y-1">
                {invoiceInfo?.invoiceNumber && (
                  <p className="text-gray-700">Invoice #: <span className="font-bold text-black">{invoiceInfo.invoiceNumber}</span></p>
                )}
                {invoiceInfo?.invoiceDate && (
                  <p className="text-gray-700">Date: <span className="font-semibold text-black">{formatDate(invoiceInfo.invoiceDate)}</span></p>
                )}
                {invoiceInfo?.invoiceDueDate && (
                  <p className="text-gray-700">Due: <span className="font-semibold text-black">{formatDate(invoiceInfo.invoiceDueDate)}</span></p>
                )}
                {invoiceInfo?.poNumber && (
                  <p className="text-gray-700">PO #: <span className="font-semibold text-black">{invoiceInfo.poNumber}</span></p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Client Details & Project Info */}
        <div className="px-14 py-6 bg-gray-50">
          <div className="grid grid-cols-2 gap-8">
            {customerInfo && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">Bill To</p>
                <div className="bg-white border-2 border-gray-300 p-4">
                  <p className="font-bold text-lg text-black">{customerInfo.name}</p>
                  {customerInfo.email && <p className="text-sm text-gray-700 mt-1">{customerInfo.email}</p>}
                  {customerInfo.phoneNumber && <p className="text-sm text-gray-700">{customerInfo.phoneNumber}</p>}
                  {customerInfo.address && <p className="text-sm text-gray-700 mt-1">{formatAddress(customerInfo.address)}</p>}
                  {customerInfo.customerId && (
                    <p className="text-xs text-gray-600 mt-2">Client ID: {customerInfo.customerId}</p>
                  )}
                </div>
              </div>
            )}

            {freelancerInfo && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">Project Details</p>
                <div className="bg-white border-2 border-gray-300 p-4">
                  {freelancerInfo.projectName && (
                    <p className="font-bold text-base text-black">{freelancerInfo.projectName}</p>
                  )}
                  {freelancerInfo.projectDuration && (
                    <p className="text-sm text-gray-700 mt-1">Duration: {freelancerInfo.projectDuration}</p>
                  )}
                  {(freelancerInfo.milestoneNumber && freelancerInfo.totalMilestones) && (
                    <p className="text-sm text-gray-700">
                      Milestone: {freelancerInfo.milestoneNumber} of {freelancerInfo.totalMilestones}
                    </p>
                  )}
                  {freelancerInfo.workDescription && (
                    <p className="text-xs text-gray-600 mt-2">{freelancerInfo.workDescription}</p>
                  )}
                  {freelancerInfo.deliverables && freelancerInfo.deliverables.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs font-semibold text-gray-700">Deliverables:</p>
                      <ul className="text-xs text-gray-600 list-disc list-inside mt-1">
                        {freelancerInfo.deliverables.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Services/Work Items */}
        <div className="px-14 py-6">
          <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide">
            {serviceList && serviceList.length > 0 ? 'Services Rendered' : 'Work Items'}
          </h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-black text-white">
                <th className="text-left py-3 px-4 font-bold">Description</th>
                <th className="text-center py-3 px-4 font-bold w-24">Qty/Hours</th>
                <th className="text-right py-3 px-4 font-bold w-32">Rate</th>
                <th className="text-right py-3 px-4 font-bold w-32">Amount</th>
              </tr>
            </thead>
            <tbody>
              {serviceList?.map((service, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="py-4 px-4">
                    <p className="font-semibold text-black">{service.description}</p>
                    {service.serviceProvider && (
                      <p className="text-xs text-gray-600 mt-1">Provider: {service.serviceProvider}</p>
                    )}
                    {service.duration && (
                      <p className="text-xs text-gray-600">Duration: {service.duration}</p>
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

        {/* Summary Section */}
        <div className="px-14 pb-6">
          <div className="flex justify-end">
            {billSummary && (
              <div className="w-96 bg-gray-50 border-2 border-gray-900 p-6">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Subtotal:</span>
                    <span className="text-black font-medium">₹{billSummary.subTotal.toFixed(2)}</span>
                  </div>
                  {billSummary.discount !== undefined && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Discount:</span>
                      <span className="text-black font-medium">
                        -₹{billSummary.discountType === "PERCENTAGE"
                          ? `${billSummary.discount}%`
                          : billSummary.discount}
                      </span>
                    </div>
                  )}
                  {billSummary.cgst !== undefined && billSummary.cgst > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">CGST:</span>
                      <span className="text-black font-medium">₹{billSummary.cgst.toFixed(2)}</span>
                    </div>
                  )}
                  {billSummary.sgst !== undefined && billSummary.sgst > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">SGST:</span>
                      <span className="text-black font-medium">₹{billSummary.sgst.toFixed(2)}</span>
                    </div>
                  )}
                  {billSummary.igst !== undefined && billSummary.igst > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">IGST:</span>
                      <span className="text-black font-medium">₹{billSummary.igst.toFixed(2)}</span>
                    </div>
                  )}
                  {billSummary.roundOff !== undefined && billSummary.roundOff !== 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Round Off:</span>
                      <span className="text-black font-medium">
                        {billSummary.roundOff > 0 ? '+' : ''}₹{billSummary.roundOff.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="border-t-2 border-black pt-4 flex justify-between items-center">
                  <span className="font-bold text-xl text-black">Amount Due:</span>
                  <span className="font-bold text-3xl text-black">₹{billSummary.totalDue.toFixed(2)}</span>
                </div>
                {billSummary.totalInWords && (
                  <p className="text-xs text-gray-600 mt-3 italic text-center">{billSummary.totalInWords}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Payment Details */}
        {payment && (
          <div className="px-14 pb-6">
            <div className="bg-white border-2 border-gray-300 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">Payment Information</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-700">Method:</span>
                  <span className="font-semibold text-black ml-2">{payment.paymentOption}</span>
                </div>
                {payment.transactionId && (
                  <div>
                    <span className="text-gray-700">Transaction ID:</span>
                    <span className="font-mono text-xs text-black ml-2">{payment.transactionId}</span>
                  </div>
                )}
                {payment.amountPaid !== undefined && (
                  <div>
                    <span className="text-gray-700">Amount Paid:</span>
                    <span className="font-semibold text-black ml-2">₹{payment.amountPaid.toFixed(2)}</span>
                  </div>
                )}
                {payment.balanceDue !== undefined && payment.balanceDue > 0 && (
                  <div>
                    <span className="text-gray-700">Balance Due:</span>
                    <span className="font-semibold text-red-600 ml-2">₹{payment.balanceDue.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bank Details */}
        {bankDetails && (
          <div className="px-14 pb-6">
            <div className="bg-gray-50 border-2 border-gray-300 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">Bank Details for Payment</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-600">Bank Name</p>
                  <p className="font-semibold text-black">{bankDetails.bankName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Account Number</p>
                  <p className="font-mono font-semibold text-black">{bankDetails.accountNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">IFSC Code</p>
                  <p className="font-mono font-semibold text-black">{bankDetails.ifscCode}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Account Holder</p>
                  <p className="font-semibold text-black">{bankDetails.accountHolderName}</p>
                </div>
                {bankDetails.upiId && (
                  <div>
                    <p className="text-xs text-gray-600">UPI ID</p>
                    <p className="font-mono font-semibold text-black">{bankDetails.upiId}</p>
                  </div>
                )}
                {bankDetails.swiftCode && (
                  <div>
                    <p className="text-xs text-gray-600">SWIFT Code</p>
                    <p className="font-mono font-semibold text-black">{bankDetails.swiftCode}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div className="px-14 py-6 border-t-2 border-black bg-gray-100 mt-auto">
            <div className="grid grid-cols-2 gap-8">
              <div>
                {footer.paymentTerms && (
                  <div className="mb-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Payment Terms</p>
                    <p className="text-sm text-gray-700">{footer.paymentTerms}</p>
                  </div>
                )}
                {footer.termsAndConditions && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Terms & Conditions</p>
                    <p className="text-xs text-gray-700">{footer.termsAndConditions}</p>
                  </div>
                )}
              </div>
              <div className="text-right">
                {footer.exitMessage && (
                  <p className="text-sm font-semibold text-black mb-2">{footer.exitMessage}</p>
                )}
                {businessInfo?.email && (
                  <p className="text-xs text-gray-600">Questions? Contact {businessInfo.email}</p>
                )}
                {footer.signature && (
                  <div className="mt-6">
                    <div className="w-48 ml-auto border-t-2 border-black pt-2">
                      <p className="text-xs uppercase tracking-wider">Authorized Signature</p>
                    </div>
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