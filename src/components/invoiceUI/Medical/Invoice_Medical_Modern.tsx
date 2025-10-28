import React from "react";
import { DynamicBillConfig } from "@/types/invoice";

interface InvoiceProps {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<HTMLDivElement>;
}

export default function Invoice_Medical_Modern({ invoiceData, invoiceRef }: InvoiceProps) {
  const { businessInfo, customerInfo, invoiceInfo, medicalInfo, itemList, serviceList, billSummary, payment, bankDetails, footer } = invoiceData;

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
        {/* Modern Header with Black Background */}
        <div className="bg-black text-white p-8">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              {businessInfo?.logo && (
                <img src={businessInfo.logo} alt="Logo" className="h-14 mb-3 brightness-0 invert" />
              )}
              {businessInfo?.name && (
                <h1 className="text-3xl font-bold mb-2 tracking-tight">{businessInfo.name}</h1>
              )}
              {businessInfo?.address && (
                <div className="text-xs leading-relaxed opacity-90">
                  {businessInfo.address.street && <div>{businessInfo.address.street}</div>}
                  <div>
                    {businessInfo.address.city}, {businessInfo.address.state} {businessInfo.address.pincode}
                  </div>
                </div>
              )}
              {(businessInfo?.phoneNumber || businessInfo?.email) && (
                <div className="text-xs mt-2 opacity-90">
                  {businessInfo.phoneNumber && <span className="mr-4">📞 {businessInfo.phoneNumber}</span>}
                  {businessInfo.email && <span>✉ {businessInfo.email}</span>}
                </div>
              )}
            </div>

            <div className="text-right">
              <div className="text-4xl font-bold mb-3 tracking-wider">INVOICE</div>
              {invoiceInfo?.invoiceNumber && (
                <div className="text-sm mb-1 opacity-90">
                  #{invoiceInfo.invoiceNumber}
                </div>
              )}
              {invoiceInfo?.invoiceDate && (
                <div className="text-xs opacity-75">
                  {new Date(invoiceInfo.invoiceDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Patient & Medical Info Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {customerInfo && (
              <div className="border-2 border-black p-4">
                <div className="text-xs uppercase tracking-wider font-bold mb-3 pb-2 border-b-2 border-black">
                  Patient Details
                </div>
                <div className="text-sm space-y-1">
                  <div className="font-bold text-base">{customerInfo.name}</div>
                  {customerInfo.patientId && (
                    <div className="text-xs text-gray-600">ID: {customerInfo.patientId}</div>
                  )}
                  {medicalInfo && (
                    <div className="flex gap-4 text-xs mt-2">
                      {medicalInfo.patientAge && <span>Age: {medicalInfo.patientAge}y</span>}
                      {medicalInfo.patientGender && <span>• {medicalInfo.patientGender}</span>}
                    </div>
                  )}
                  {customerInfo.phoneNumber && (
                    <div className="text-xs mt-2">📱 {customerInfo.phoneNumber}</div>
                  )}
                  {customerInfo.address && (
                    <div className="text-xs mt-2 text-gray-700">
                      📍 {customerInfo.address.city}, {customerInfo.address.state}
                    </div>
                  )}
                </div>
              </div>
            )}

            {medicalInfo && (
              <div className="border-2 border-black p-4">
                <div className="text-xs uppercase tracking-wider font-bold mb-3 pb-2 border-b-2 border-black">
                  Medical Information
                </div>
                <div className="text-sm space-y-1">
                  <div className="font-bold text-base">{medicalInfo.doctorName}</div>
                  {medicalInfo.doctorQualification && (
                    <div className="text-xs text-gray-600">{medicalInfo.doctorQualification}</div>
                  )}
                  {medicalInfo.visitType && (
                    <div className="text-xs mt-2 inline-block px-2 py-1 bg-black text-white">
                      {medicalInfo.visitType}
                    </div>
                  )}
                  {medicalInfo.diagnosis && (
                    <div className="text-xs mt-2 text-gray-700">
                      <strong>Diagnosis:</strong> {medicalInfo.diagnosis}
                    </div>
                  )}
                  {medicalInfo.prescriptionNumber && (
                    <div className="text-xs mt-2">Rx: {medicalInfo.prescriptionNumber}</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Modern Table */}
          <div className="mb-6">
            <div className="bg-black text-white text-xs font-bold uppercase tracking-wider">
              <div className="flex p-3">
                <div className="w-12">#</div>
                <div className="flex-1">Service / Item</div>
                <div className="w-20 text-center">Qty</div>
                <div className="w-24 text-right">Rate</div>
                <div className="w-20 text-right">Tax</div>
                <div className="w-28 text-right">Total</div>
              </div>
            </div>

            <div className="border-2 border-black border-t-0">
              {serviceList?.map((service, idx) => (
                <div key={idx} className="flex p-3 border-b border-gray-200 text-sm">
                  <div className="w-12 font-bold">{idx + 1}</div>
                  <div className="flex-1">
                    <div className="font-semibold">{service.description}</div>
                    {service.serviceProvider && (
                      <div className="text-xs text-gray-600 mt-1">
                        By: {service.serviceProvider}
                      </div>
                    )}
                    {service.duration && (
                      <div className="text-xs text-gray-600">⏱ {service.duration}</div>
                    )}
                  </div>
                  <div className="w-20 text-center">{service.hours || 1}</div>
                  <div className="w-24 text-right">₹{service.rate || 0}</div>
                  <div className="w-20 text-right">-</div>
                  <div className="w-28 text-right font-bold">
                    ₹{((service.hours || 1) * (parseFloat(service.rate) || 0)).toFixed(2)}
                  </div>
                </div>
              ))}

              {itemList?.map((item, idx) => (
                <div key={`item-${idx}`} className="flex p-3 border-b border-gray-200 text-sm">
                  <div className="w-12 font-bold">{(serviceList?.length || 0) + idx + 1}</div>
                  <div className="flex-1">
                    <div className="font-semibold">{item.itemName}</div>
                    {item.description && (
                      <div className="text-xs text-gray-600 mt-1">{item.description}</div>
                    )}
                    {item.hsnCode && (
                      <div className="text-xs text-gray-600">HSN: {item.hsnCode}</div>
                    )}
                  </div>
                  <div className="w-20 text-center">{item.quantity || 1} {item.unit || ''}</div>
                  <div className="w-24 text-right">₹{item.rate}</div>
                  <div className="w-20 text-right">{item.tax || 0}%</div>
                  <div className="w-28 text-right font-bold">
                    ₹{calculateItemTotal(item).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary & Payment */}
          <div className="flex gap-6 mb-6">
            <div className="flex-1">
              {payment && (
                <div className="border-2 border-black p-4">
                  <div className="text-xs uppercase tracking-wider font-bold mb-3">Payment Information</div>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Method:</span>
                      <span className="font-semibold">{payment.paymentOption}</span>
                    </div>
                    {payment.transactionId && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transaction:</span>
                        <span className="font-mono text-xs">{payment.transactionId}</span>
                      </div>
                    )}
                    {payment.amountPaid !== undefined && (
                      <div className="flex justify-between pt-2 border-t border-gray-300">
                        <span className="font-semibold">Paid:</span>
                        <span className="font-bold">₹{payment.amountPaid.toFixed(2)}</span>
                      </div>
                    )}
                    {payment.balanceDue !== undefined && payment.balanceDue > 0 && (
                      <div className="flex justify-between">
                        <span className="font-semibold">Balance:</span>
                        <span className="font-bold text-red-600">₹{payment.balanceDue.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {medicalInfo?.insuranceProvider && (
                <div className="border-2 border-black p-4 mt-4">
                  <div className="text-xs uppercase tracking-wider font-bold mb-2">Insurance</div>
                  <div className="text-sm">
                    <div>{medicalInfo.insuranceProvider}</div>
                    {medicalInfo.insurancePolicyNumber && (
                      <div className="text-xs text-gray-600">Policy: {medicalInfo.insurancePolicyNumber}</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {billSummary && (
              <div className="w-80">
                <div className="border-2 border-black">
                  <div className="p-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{billSummary.subTotal.toFixed(2)}</span>
                    </div>
                    {billSummary.discount !== undefined && (
                      <div className="flex justify-between text-green-700">
                        <span>Discount</span>
                        <span>-₹{billSummary.discount}</span>
                      </div>
                    )}
                    {billSummary.cgst !== undefined && billSummary.cgst > 0 && (
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>CGST</span>
                        <span>₹{billSummary.cgst.toFixed(2)}</span>
                      </div>
                    )}
                    {billSummary.sgst !== undefined && billSummary.sgst > 0 && (
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>SGST</span>
                        <span>₹{billSummary.sgst.toFixed(2)}</span>
                      </div>
                    )}
                    {billSummary.igst !== undefined && billSummary.igst > 0 && (
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>IGST</span>
                        <span>₹{billSummary.igst.toFixed(2)}</span>
                      </div>
                    )}
                    {billSummary.roundOff !== undefined && billSummary.roundOff !== 0 && (
                      <div className="flex justify-between text-xs">
                        <span>Round Off</span>
                        <span>{billSummary.roundOff > 0 ? '+' : ''}₹{billSummary.roundOff.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-black text-white p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">TOTAL</span>
                      <span className="text-2xl font-bold">₹{billSummary.totalDue.toFixed(2)}</span>
                    </div>
                    {billSummary.totalInWords && (
                      <div className="text-xs mt-2 opacity-75 italic">
                        {billSummary.totalInWords}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bank Details */}
          {bankDetails && (
            <div className="border-2 border-black p-4 mb-6">
              <div className="text-xs uppercase tracking-wider font-bold mb-3">Bank Transfer Details</div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-xs text-gray-600">Bank Name</div>
                  <div className="font-semibold">{bankDetails.bankName}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">Account Number</div>
                  <div className="font-mono font-semibold">{bankDetails.accountNumber}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">IFSC Code</div>
                  <div className="font-mono font-semibold">{bankDetails.ifscCode}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600">Account Holder</div>
                  <div className="font-semibold">{bankDetails.accountHolderName}</div>
                </div>
                {bankDetails.upiId && (
                  <div>
                    <div className="text-xs text-gray-600">UPI ID</div>
                    <div className="font-mono font-semibold">{bankDetails.upiId}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          {footer && (
            <div className="border-t-2 border-black pt-4">
              <div className="text-xs space-y-2">
                {footer.termsAndConditions && (
                  <div>
                    <strong className="uppercase text-xs">Terms & Conditions:</strong>
                    <div className="text-gray-700 mt-1">{footer.termsAndConditions}</div>
                  </div>
                )}
                {footer.notes && (
                  <div>
                    <strong className="uppercase text-xs">Notes:</strong>
                    <div className="text-gray-700 mt-1">{footer.notes}</div>
                  </div>
                )}
                {footer.returnPolicy && (
                  <div>
                    <strong className="uppercase text-xs">Return Policy:</strong>
                    <div className="text-gray-700 mt-1">{footer.returnPolicy}</div>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-end mt-6">
                {footer.exitMessage && (
                  <div className="text-sm font-semibold">{footer.exitMessage}</div>
                )}
                {footer.signature && (
                  <div className="text-right">
                    <div className="w-48 border-t-2 border-black pt-2 text-xs">
                      Authorized Signature
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* License/Registration Footer */}
          {(businessInfo?.licenseNumber || businessInfo?.registrationNumber || businessInfo?.gstNumber) && (
            <div className="mt-4 pt-3 border-t border-gray-300 text-xs text-center text-gray-600">
              {businessInfo.licenseNumber && <span className="mr-4">License: {businessInfo.licenseNumber}</span>}
              {businessInfo.registrationNumber && <span className="mr-4">Reg: {businessInfo.registrationNumber}</span>}
              {businessInfo.gstNumber && <span>GSTIN: {businessInfo.gstNumber}</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}