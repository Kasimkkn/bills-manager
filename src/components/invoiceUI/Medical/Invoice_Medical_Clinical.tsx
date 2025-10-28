import React from "react";
import { DynamicBillConfig } from "@/types/invoice";

interface InvoiceProps {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<HTMLDivElement>;
}

export default function Invoice_Medical_Clinical({ invoiceData, invoiceRef }: InvoiceProps) {
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
          padding: "15mm",
          boxSizing: "border-box",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Header Section */}
        <div className="border-b-4 border-black pb-6 mb-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              {businessInfo?.logo && (
                <img src={businessInfo.logo} alt="Logo" className="h-16 mb-2" />
              )}
              {businessInfo?.name && (
                <h1 className="text-2xl font-bold mb-1 tracking-wide">{businessInfo.name}</h1>
              )}
              {businessInfo?.address && (
                <div className="text-xs leading-relaxed text-gray-800">
                  {businessInfo.address.street && <div>{businessInfo.address.street}</div>}
                  <div>
                    {businessInfo.address.city}, {businessInfo.address.state} {businessInfo.address.pincode}
                  </div>
                </div>
              )}
              {(businessInfo?.phoneNumber || businessInfo?.email) && (
                <div className="text-xs mt-2 text-gray-800">
                  {businessInfo.phoneNumber && <div>Tel: {businessInfo.phoneNumber}</div>}
                  {businessInfo.email && <div>Email: {businessInfo.email}</div>}
                </div>
              )}
              {(businessInfo?.licenseNumber || businessInfo?.registrationNumber) && (
                <div className="text-xs mt-2 text-gray-600">
                  {businessInfo.licenseNumber && <div>License: {businessInfo.licenseNumber}</div>}
                  {businessInfo.registrationNumber && <div>Reg: {businessInfo.registrationNumber}</div>}
                </div>
              )}
            </div>

            <div className="text-right min-w-60">
              <div className="text-3xl font-bold mb-2">INVOICE</div>
              {invoiceInfo?.invoiceNumber && (
                <div className="text-xs mb-1">
                  <strong>Invoice #:</strong> {invoiceInfo.invoiceNumber}
                </div>
              )}
              {invoiceInfo?.invoiceDate && (
                <div className="text-xs mb-1">
                  <strong>Date:</strong> {new Date(invoiceInfo.invoiceDate).toLocaleDateString()}
                </div>
              )}
              {medicalInfo?.prescriptionNumber && (
                <div className="text-xs mb-1">
                  <strong>Prescription #:</strong> {medicalInfo.prescriptionNumber}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Patient & Doctor Info */}
        <div className="flex gap-4 mb-4">
          {customerInfo && (
            <div className="flex-1 border border-black p-3">
              <div className="text-sm font-bold mb-2 border-b border-black pb-1">
                PATIENT INFORMATION
              </div>
              <div className="text-xs leading-relaxed">
                <div><strong>Name:</strong> {customerInfo.name}</div>
                {customerInfo.patientId && <div><strong>Patient ID:</strong> {customerInfo.patientId}</div>}
                {medicalInfo?.patientAge && <div><strong>Age:</strong> {medicalInfo.patientAge} years</div>}
                {medicalInfo?.patientGender && <div><strong>Gender:</strong> {medicalInfo.patientGender}</div>}
                {customerInfo.phoneNumber && <div><strong>Phone:</strong> {customerInfo.phoneNumber}</div>}
                {customerInfo.address && (
                  <div className="mt-1">
                    <strong>Address:</strong> {customerInfo.address.city}, {customerInfo.address.state}
                  </div>
                )}
              </div>
            </div>
          )}

          {medicalInfo && (
            <div className="flex-1 border border-black p-3">
              <div className="text-sm font-bold mb-2 border-b border-black pb-1">
                DOCTOR INFORMATION
              </div>
              <div className="text-xs leading-relaxed">
                <div><strong>Doctor:</strong> {medicalInfo.doctorName}</div>
                {medicalInfo.doctorQualification && <div><strong>Qualification:</strong> {medicalInfo.doctorQualification}</div>}
                {medicalInfo.visitType && <div><strong>Visit Type:</strong> {medicalInfo.visitType}</div>}
                {medicalInfo.diagnosis && (
                  <div className="mt-1">
                    <strong>Diagnosis:</strong> {medicalInfo.diagnosis}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Services/Items Table */}
        <div className="mb-4">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-2 text-left font-bold w-16">S.No</th>
                <th className="p-2 text-left font-bold">Description</th>
                <th className="p-2 text-center font-bold w-20">Qty</th>
                <th className="p-2 text-right font-bold w-24">Rate</th>
                <th className="p-2 text-right font-bold w-20">Tax</th>
                <th className="p-2 text-right font-bold w-28">Amount</th>
              </tr>
            </thead>
            <tbody>
              {serviceList?.map((service, idx) => (
                <tr key={idx} className="border-b border-gray-300">
                  <td className="p-2 text-left">{idx + 1}</td>
                  <td className="p-2">
                    <div className="font-semibold">{service.description}</div>
                    {service.serviceProvider && (
                      <div className="text-xs text-gray-600 mt-1">
                        Provider: {service.serviceProvider}
                      </div>
                    )}
                  </td>
                  <td className="p-2 text-center">{service.hours || 1}</td>
                  <td className="p-2 text-right">₹{service.rate || 0}</td>
                  <td className="p-2 text-right">-</td>
                  <td className="p-2 text-right font-semibold">
                    ₹{((service.hours || 1) * (parseFloat(service.rate) || 0)).toFixed(2)}
                  </td>
                </tr>
              ))}
              {itemList?.map((item, idx) => (
                <tr key={`item-${idx}`} className="border-b border-gray-300">
                  <td className="p-2 text-left">{(serviceList?.length || 0) + idx + 1}</td>
                  <td className="p-2">
                    <div className="font-semibold">{item.itemName}</div>
                    {item.description && (
                      <div className="text-xs text-gray-600 mt-1">{item.description}</div>
                    )}
                  </td>
                  <td className="p-2 text-center">{item.quantity || 1}</td>
                  <td className="p-2 text-right">₹{item.rate}</td>
                  <td className="p-2 text-right">{item.tax || 0}%</td>
                  <td className="p-2 text-right font-semibold">
                    ₹{calculateItemTotal(item).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Section */}
        <div className="flex justify-between mb-4">
          <div className="flex-1">
            {payment && (
              <div className="border border-black p-3 max-w-xs">
                <div className="text-sm font-bold mb-2">PAYMENT DETAILS</div>
                <div className="text-xs leading-relaxed">
                  <div><strong>Method:</strong> {payment.paymentOption}</div>
                  {payment.transactionId && <div><strong>Transaction ID:</strong> {payment.transactionId}</div>}
                  {payment.amountPaid !== undefined && <div><strong>Amount Paid:</strong> ₹{payment.amountPaid}</div>}
                </div>
              </div>
            )}
          </div>

          {billSummary && (
            <div className="min-w-60">
              <table className="w-full text-xs border border-black">
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="p-2 font-semibold">Subtotal:</td>
                    <td className="p-2 text-right">₹{billSummary.subTotal.toFixed(2)}</td>
                  </tr>
                  {billSummary.discount !== undefined && (
                    <tr className="border-b border-gray-300">
                      <td className="p-2">Discount:</td>
                      <td className="p-2 text-right">-₹{billSummary.discount}</td>
                    </tr>
                  )}
                  {billSummary.cgst !== undefined && billSummary.cgst > 0 && (
                    <tr className="border-b border-gray-300">
                      <td className="p-2">CGST:</td>
                      <td className="p-2 text-right">₹{billSummary.cgst.toFixed(2)}</td>
                    </tr>
                  )}
                  {billSummary.sgst !== undefined && billSummary.sgst > 0 && (
                    <tr className="border-b border-gray-300">
                      <td className="p-2">SGST:</td>
                      <td className="p-2 text-right">₹{billSummary.sgst.toFixed(2)}</td>
                    </tr>
                  )}
                  <tr className="bg-black text-white">
                    <td className="p-2 font-bold text-sm">TOTAL DUE:</td>
                    <td className="p-2 text-right font-bold text-sm">
                      ₹{billSummary.totalDue.toFixed(2)}
                    </td>
                  </tr>
                  {billSummary.totalInWords && (
                    <tr>
                      <td colSpan={2} className="p-2 text-xs italic">
                        {billSummary.totalInWords}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Bank Details */}
        {bankDetails && (
          <div className="border border-black p-3 mb-4">
            <div className="text-sm font-bold mb-2">BANK DETAILS</div>
            <div className="text-xs leading-relaxed grid grid-cols-2 gap-2">
              <div><strong>Bank:</strong> {bankDetails.bankName}</div>
              <div><strong>Account:</strong> {bankDetails.accountNumber}</div>
              <div><strong>Holder:</strong> {bankDetails.accountHolderName}</div>
              <div><strong>IFSC:</strong> {bankDetails.ifscCode}</div>
              {bankDetails.upiId && <div><strong>UPI:</strong> {bankDetails.upiId}</div>}
            </div>
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div className="border-t-2 border-black pt-3 text-xs text-gray-600">
            {footer.termsAndConditions && (
              <div className="mb-2"><strong>Terms:</strong> {footer.termsAndConditions}</div>
            )}
            {footer.notes && (
              <div className="mb-2"><strong>Notes:</strong> {footer.notes}</div>
            )}
            {footer.exitMessage && (
              <div className="text-center font-semibold mt-3">{footer.exitMessage}</div>
            )}
            {footer.signature && (
              <div className="mt-4 text-right">
                <div className="inline-block border-t border-black pt-1 px-8">
                  <div className="text-xs">Authorized Signature</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}