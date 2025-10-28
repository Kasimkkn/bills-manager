import React from "react";
import { DynamicBillConfig } from "@/types/invoice";

interface InvoiceProps {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<HTMLDivElement>;
}

export default function Invoice_Salon_Luxury({ invoiceData, invoiceRef }: InvoiceProps) {
  const { businessInfo, customerInfo, invoiceInfo, salonInfo, itemList, serviceList, billSummary, payment, bankDetails, footer } = invoiceData;

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
        {/* Elegant Header with Double Border */}
        <div className="border-b-4 border-double border-black" style={{ padding: "12mm 15mm" }}>
          <div className="text-center mb-6">
            {businessInfo?.logo && (
              <img src={businessInfo.logo} alt="Logo" className="h-20 mx-auto mb-4" />
            )}
            {businessInfo?.name && (
              <h1 className="text-4xl font-bold tracking-widest mb-2" style={{ letterSpacing: "0.15em" }}>
                {businessInfo.name}
              </h1>
            )}
            <div className="w-24 h-px bg-black mx-auto my-3"></div>
            {businessInfo?.address && (
              <div className="text-xs tracking-wide text-gray-700">
                {businessInfo.address.street && <div>{businessInfo.address.street}</div>}
                <div>
                  {businessInfo.address.city}, {businessInfo.address.state} {businessInfo.address.pincode}
                </div>
              </div>
            )}
            {(businessInfo?.phoneNumber || businessInfo?.email) && (
              <div className="text-xs mt-2 text-gray-700">
                {businessInfo.phoneNumber && <span className="mx-2">{businessInfo.phoneNumber}</span>}
                {businessInfo.email && <span className="mx-2">• {businessInfo.email}</span>}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-300">
            <div className="text-sm">
              <div className="font-bold tracking-wider">INVOICE</div>
              {invoiceInfo?.invoiceNumber && (
                <div className="text-xs text-gray-600 mt-1">No. {invoiceInfo.invoiceNumber}</div>
              )}
            </div>
            {invoiceInfo?.invoiceDate && (
              <div className="text-xs text-gray-600">
                {new Date(invoiceInfo.invoiceDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: "0 15mm" }}>
          {/* Client & Appointment Details */}
          <div className="py-6 border-b border-gray-300">
            <div className="grid grid-cols-2 gap-8">
              {customerInfo && (
                <div>
                  <div className="text-xs uppercase tracking-widest font-bold mb-3 text-gray-500">
                    Client Details
                  </div>
                  <div className="text-sm">
                    <div className="font-bold text-lg mb-2">{customerInfo.name}</div>
                    {customerInfo.membershipId && (
                      <div className="text-xs text-gray-600 mb-1">Member ID: {customerInfo.membershipId}</div>
                    )}
                    {customerInfo.phoneNumber && (
                      <div className="text-xs text-gray-700">{customerInfo.phoneNumber}</div>
                    )}
                    {customerInfo.email && (
                      <div className="text-xs text-gray-700">{customerInfo.email}</div>
                    )}
                  </div>
                </div>
              )}

              {salonInfo && (
                <div>
                  <div className="text-xs uppercase tracking-widest font-bold mb-3 text-gray-500">
                    Appointment Details
                  </div>
                  <div className="text-sm space-y-1">
                    {salonInfo.appointmentTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-semibold">
                          {new Date(salonInfo.appointmentTime).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    )}
                    {(salonInfo.stylistName || salonInfo.therapistName) && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Specialist:</span>
                        <span className="font-semibold">{salonInfo.stylistName || salonInfo.therapistName}</span>
                      </div>
                    )}
                    {salonInfo.packageName && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Package:</span>
                        <span className="font-semibold">{salonInfo.packageName}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Services Table */}
          <div className="py-6">
            <div className="text-xs uppercase tracking-widest font-bold mb-4 text-gray-500">
              Services & Products
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="py-3 text-left font-bold text-xs uppercase tracking-wider">Description</th>
                  <th className="py-3 text-center font-bold text-xs uppercase tracking-wider w-24">Duration</th>
                  <th className="py-3 text-right font-bold text-xs uppercase tracking-wider w-32">Amount</th>
                </tr>
              </thead>
              <tbody>
                {serviceList?.map((service, idx) => (
                  <tr key={idx} className="border-b border-gray-200">
                    <td className="py-4">
                      <div className="font-semibold">{service.description}</div>
                      {service.serviceProvider && (
                        <div className="text-xs text-gray-600 mt-1 italic">
                          with {service.serviceProvider}
                        </div>
                      )}
                    </td>
                    <td className="py-4 text-center text-xs text-gray-600">
                      {service.duration || `${service.hours || 1}h`}
                    </td>
                    <td className="py-4 text-right font-semibold">
                      ₹{((service.hours || 1) * (parseFloat(service.rate) || 0)).toFixed(2)}
                    </td>
                  </tr>
                ))}

                {itemList?.map((item, idx) => (
                  <tr key={`item-${idx}`} className="border-b border-gray-200">
                    <td className="py-4">
                      <div className="font-semibold">{item.itemName}</div>
                      {item.description && (
                        <div className="text-xs text-gray-600 mt-1">{item.description}</div>
                      )}
                    </td>
                    <td className="py-4 text-center text-xs text-gray-600">
                      Qty: {item.quantity || 1}
                    </td>
                    <td className="py-4 text-right font-semibold">
                      ₹{calculateItemTotal(item).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="py-6 border-t-2 border-black">
            <div className="flex justify-between items-start">
              <div className="w-80  ">
                {payment && (
                  <div>
                    <div className="text-xs uppercase tracking-widest font-bold mb-3 text-gray-500">
                      Payment Information
                    </div>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Method:</span>
                        <span className="font-semibold">{payment.paymentOption}</span>
                      </div>
                      {payment.transactionId && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reference:</span>
                          <span className="text-xs font-mono">{payment.transactionId}</span>
                        </div>
                      )}
                      {payment.amountPaid !== undefined && (
                        <div className="flex justify-between pt-2 border-t border-gray-300">
                          <span className="font-semibold">Amount Paid:</span>
                          <span className="font-bold">₹{payment.amountPaid.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {billSummary && (
                <div className="w-80">
                  <div className="border-2 border-black">
                    <div className="p-4 space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold">₹{billSummary.subTotal.toFixed(2)}</span>
                      </div>

                      {salonInfo?.membershipDiscount && salonInfo.membershipDiscount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Membership Discount</span>
                          <span className="font-semibold">-₹{salonInfo.membershipDiscount.toFixed(2)}</span>
                        </div>
                      )}

                      {billSummary.discount !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Discount</span>
                          <span className="font-semibold">
                            -{billSummary.discountType === "PERCENTAGE" ? `${billSummary.discount}%` : `₹${billSummary.discount}`}
                          </span>
                        </div>
                      )}

                      {(billSummary.cgst || billSummary.sgst || billSummary.igst) && (
                        <div className="pt-2 border-t border-gray-300 space-y-1">
                          {billSummary.cgst !== undefined && billSummary.cgst > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-600">CGST</span>
                              <span>₹{billSummary.cgst.toFixed(2)}</span>
                            </div>
                          )}
                          {billSummary.sgst !== undefined && billSummary.sgst > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-600">SGST</span>
                              <span>₹{billSummary.sgst.toFixed(2)}</span>
                            </div>
                          )}
                          {billSummary.igst !== undefined && billSummary.igst > 0 && (
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-600">IGST</span>
                              <span>₹{billSummary.igst.toFixed(2)}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {billSummary.roundOff !== undefined && billSummary.roundOff !== 0 && (
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Round Off</span>
                          <span>{billSummary.roundOff > 0 ? '+' : ''}₹{billSummary.roundOff.toFixed(2)}</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-black text-white p-4 border-t-2 border-black">
                      <div className="flex justify-between items-center">
                        <span className="text-sm uppercase tracking-widest font-bold">Total</span>
                        <span className="text-2xl font-bold">₹{billSummary.totalDue.toFixed(2)}</span>
                      </div>
                      {billSummary.totalInWords && (
                        <div className="text-xs mt-2 opacity-75 italic text-center">
                          {billSummary.totalInWords}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bank Details */}
          {bankDetails && (
            <div className="py-6 border-t border-gray-300">
              <div className="text-xs uppercase tracking-widest font-bold mb-3 text-gray-500">
                Bank Details
              </div>
              <div className="grid grid-cols-3 gap-6 text-sm">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Bank Name</div>
                  <div className="font-semibold">{bankDetails.bankName}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Account Number</div>
                  <div className="font-mono font-semibold">{bankDetails.accountNumber}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">IFSC Code</div>
                  <div className="font-mono font-semibold">{bankDetails.ifscCode}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Account Holder</div>
                  <div className="font-semibold">{bankDetails.accountHolderName}</div>
                </div>
                {bankDetails.upiId && (
                  <div>
                    <div className="text-xs text-gray-600 mb-1">UPI ID</div>
                    <div className="font-mono font-semibold">{bankDetails.upiId}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          {footer && (
            <div className="py-6 border-t-2 border-double border-black">
              {footer.termsAndConditions && (
                <div className="mb-4">
                  <div className="text-xs uppercase tracking-widest font-bold mb-2 text-gray-500">
                    Terms & Conditions
                  </div>
                  <div className="text-xs text-gray-700 leading-relaxed">{footer.termsAndConditions}</div>
                </div>
              )}

              {footer.notes && (
                <div className="mb-4">
                  <div className="text-xs uppercase tracking-widest font-bold mb-2 text-gray-500">
                    Special Notes
                  </div>
                  <div className="text-xs text-gray-700 leading-relaxed">{footer.notes}</div>
                </div>
              )}

              <div className="flex justify-between items-end mt-6">
                {footer.exitMessage && (
                  <div className="text-sm italic">{footer.exitMessage}</div>
                )}

                {footer.signature && (
                  <div className="text-right">
                    <div className="w-48 border-t-2 border-black pt-2">
                      <div className="text-xs uppercase tracking-wider">Authorized Signature</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Business Registration */}
          {(businessInfo?.licenseNumber || businessInfo?.gstNumber) && (
            <div className="text-center py-4 border-t border-gray-300">
              <div className="text-xs text-gray-600">
                {businessInfo.licenseNumber && <span className="mx-3">License: {businessInfo.licenseNumber}</span>}
                {businessInfo.gstNumber && <span className="mx-3">GSTIN: {businessInfo.gstNumber}</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}