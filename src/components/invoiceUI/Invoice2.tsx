import { DynamicBillConfig } from "@/types/invoice";
import React from "react";

export default function Invoice2({
  invoiceData,
  invoiceRef,
}: {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<null>;
}) {
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      {/* Invoice Container - Fixed A4 Size */}
      <div
        ref={invoiceRef}
        className='bg-white shadow-lg'
        style={{
          width: "210mm",
          height: "297mm",
          padding: "20px 30px",
          boxSizing: "border-box",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div className='text-black'>
          {/* Invoice Number Header */}
          <div className='relative'>
            {invoiceData?.isBusinessInfoNeeded && invoiceData.businessInfo && (
              <div className='mb-6'>
                <img
                  src={invoiceData.businessInfo.logo}
                  alt='Logo'
                  className='w-12 h-12 absolute top-0 left-0'
                />
              </div>
            )}
            {invoiceData.invoiceInfo?.invoiceNumber && (
              <div className='text-right mb-6'>
                <div className='inline-block'>
                  <div className='text-xs text-gray-500 uppercase tracking-wider mb-1'>
                    Invoice Number
                  </div>
                  <div className='text-2xl font-bold text-gray-900'>
                    {invoiceData.invoiceInfo.invoiceNumber}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Header Section */}
          <div className='grid grid-cols-3 gap-12 mb-8 pb-6'>
            {/* Business Info */}
            {invoiceData.isBusinessInfoNeeded && invoiceData.businessInfo && (
              <div>
                <h2 className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3'>
                  From
                </h2>
                <div className='space-y-1.5 text-sm'>
                  <div className='font-bold text-lg text-gray-900'>
                    {invoiceData.businessInfo.name}
                  </div>
                  {invoiceData.businessInfo.address && (
                    <div className='text-gray-600'>
                      {invoiceData.businessInfo.address.city},{" "}
                      {invoiceData.businessInfo.address.state} ,{" "}
                      {invoiceData.businessInfo.address.country} -{" "}
                      {invoiceData.businessInfo.address.pincode}
                    </div>
                  )}
                  {invoiceData.businessInfo.email && (
                    <div className='text-gray-600'>
                      {invoiceData.businessInfo.email}
                    </div>
                  )}
                  {invoiceData.businessInfo.phoneNumber && (
                    <div className='text-gray-600'>
                      {invoiceData.businessInfo.phoneNumber}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Customer Info */}
            {invoiceData.isCustomerInfoNeeded && invoiceData.customerInfo && (
              <div>
                <h2 className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3'>
                  Bill To
                </h2>
                <div className='space-y-1.5 text-sm'>
                  <div className='font-bold text-lg text-gray-900'>
                    {invoiceData.customerInfo.name}
                  </div>
                  {invoiceData.customerInfo.address && (
                    <div className='text-gray-600'>
                      {invoiceData.customerInfo.address.city} ,{" "}
                      {invoiceData.customerInfo.address.state} ,{" "}
                      {invoiceData.customerInfo.address.country} -{" "}
                      {invoiceData.customerInfo.address.pincode}
                    </div>
                  )}
                  {invoiceData.customerInfo.email && (
                    <div className='text-gray-600'>
                      {invoiceData.customerInfo.email}
                    </div>
                  )}
                  {invoiceData.customerInfo.phoneNumber && (
                    <div className='text-gray-600'>
                      {invoiceData.customerInfo.phoneNumber}
                    </div>
                  )}
                </div>
              </div>
            )}

            {invoiceData.invoiceInfo && (
              <div className='flex gap-5 flex-col items-end'>
                <div>
                  <h2 className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
                    Date
                  </h2>
                  <div className='font-bold text-sm text-gray-900'>
                    {new Date(
                      invoiceData.invoiceInfo.invoiceDate
                    ).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <h2 className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1'>
                    Due
                  </h2>
                  <div className='font-bold text-sm text-gray-900'>
                    {new Date(
                      invoiceData.invoiceInfo.invoiceDate
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Items Table */}
          {invoiceData.isItemListNeeded && invoiceData.itemList && (
            <div className='mb-8'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b-2 border-gray-900'>
                    <th className='py-3 px-2 text-left font-semibold text-gray-900 w-12'>
                      #
                    </th>
                    <th className='py-3 px-2 text-left font-semibold text-gray-900'>
                      Description
                    </th>
                    <th className='py-3 px-2 text-right font-semibold text-gray-900 w-32'>
                      Qty
                    </th>
                    <th className='py-3 px-2 text-right font-semibold text-gray-900 w-32'>
                      Rate
                    </th>
                    <th className='py-3 px-2 text-right font-semibold text-gray-900 w-32'>
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.itemList.map((item, index) => (
                    <tr key={index} className='border-b border-gray-200'>
                      <td className='py-4 px-2 text-gray-600'>{index + 1}</td>
                      <td className='py-4 px-2 text-gray-900'>
                        {item.itemName}
                      </td>
                      <td className='py-4 px-2 text-right text-gray-600'>
                        {item.quantity}
                      </td>
                      <td className='py-4 px-2 text-right text-gray-600'>
                        ${item.rate?.toFixed(2)}
                      </td>
                      <td className='py-4 px-2 text-right text-gray-600'>
                        ${(item.rate * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Summary and Payment Terms */}
          <div className='grid grid-cols-2 gap-12 mb-8'>
            {/* Payment Terms */}
            <div>
              {invoiceData.footer?.paymentTerms && (
                <div className='mb-6'>
                  <h3 className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2'>
                    Payment Terms
                  </h3>
                  <p className='text-sm text-gray-700 leading-relaxed'>
                    {invoiceData.footer.paymentTerms}
                  </p>
                </div>
              )}
            </div>

            {/* Bill Summary */}
            {invoiceData.billSummary && (
              <div>
                <div className='bg-gray-50 p-5 rounded-lg'>
                  <div className='space-y-3 text-sm'>
                    <div className='flex justify-between text-gray-700'>
                      <span>Subtotal</span>
                      <span className='font-medium'>
                        ${invoiceData.billSummary.subTotal.toFixed(2)}
                      </span>
                    </div>
                    {invoiceData.billSummary.discount && (
                      <div className='flex justify-between text-gray-700'>
                        <span>Discount</span>
                        <span className='font-medium'>
                          {invoiceData.billSummary.discount}
                        </span>
                      </div>
                    )}
                    {invoiceData.billSummary.cgst !== undefined && (
                      <div className='flex justify-between text-gray-700'>
                        <span>Cgst</span>
                        <span className='font-medium'>
                          ${invoiceData.billSummary.cgst.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {invoiceData.billSummary.sgst !== undefined && (
                      <div className='flex justify-between text-gray-700'>
                        <span>Sgst</span>
                        <span className='font-medium'>
                          ${invoiceData.billSummary.sgst.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {invoiceData.billSummary.igst !== undefined && (
                      <div className='flex justify-between text-gray-700'>
                        <span>Igst</span>
                        <span className='font-medium'>
                          ${invoiceData.billSummary.igst.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {invoiceData.billSummary.shippingCharge !== undefined && (
                      <div className='flex justify-between text-gray-700'>
                        <span>Shipping</span>
                        <span className='font-medium'>
                          ${invoiceData.billSummary.shippingCharge.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {invoiceData.billSummary.packingCharge !== undefined && (
                      <div className='flex justify-between text-gray-700'>
                        <span>Packing</span>
                        <span className='font-medium'>
                          ${invoiceData.billSummary.packingCharge.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className='flex justify-between pt-3 border-t-2 border-gray-300 text-base font-bold text-gray-900'>
                      <span>Total</span>
                      <span>
                        ${invoiceData.billSummary.totalDue.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payment Method and Date */}
          <div className='grid grid-cols-2 gap-12 mb-8 pb-8 border-b border-gray-200'>
            {/* Payment Method */}
            {invoiceData.isPaymentSectionNeeded && invoiceData.payment && (
              <div>
                <h3 className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3'>
                  Payment Method
                </h3>
                <div className='grid grid-cols-2 gap-3 text-sm'>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <div className='w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center'>
                      {invoiceData.payment.paymentOption === "CASH" && (
                        <div className='w-2 h-2 rounded-full bg-blue-600'></div>
                      )}
                    </div>
                    <span className='text-gray-700'>Cash</span>
                  </label>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <div className='w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center'>
                      {invoiceData.payment.paymentOption ===
                        "BANK_TRANSFER" && (
                          <div className='w-2 h-2 rounded-full bg-blue-600'></div>
                        )}
                    </div>
                    <span className='text-gray-700'>Bank Transfer</span>
                  </label>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <div className='w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center'>
                      {invoiceData.payment.paymentOption === "CARD" && (
                        <div className='w-2 h-2 rounded-full bg-blue-600'></div>
                      )}
                    </div>
                    <span className='text-gray-700'>Credit Card</span>
                  </label>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <div className='w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center'>
                      {invoiceData.payment.paymentOption === "UPI" && (
                        <div className='w-2 h-2 rounded-full bg-blue-600'></div>
                      )}
                    </div>
                    <span className='text-gray-700'>Digital Wallet</span>
                  </label>
                </div>
              </div>
            )}

            {/* Date and Signature */}
            <div className='text-right'>
              {invoiceData.invoiceInfo?.invoiceDate && (
                <div className='text-sm text-gray-600 mb-8'>
                  <span className='font-medium'>Date: </span>
                  {new Date(
                    invoiceData.invoiceInfo.invoiceDate
                  ).toLocaleDateString()}
                </div>
              )}

              {invoiceData.footer?.signature && (
                <div className='inline-block'>
                  <div className='h-16 flex items-center justify-end mb-2'>
                    <svg
                      width='120'
                      height='50'
                      viewBox='0 0 120 50'
                      className='opacity-70'
                    >
                      <path
                        d='M10,35 Q20,15 40,30 T70,25 Q80,30 90,20'
                        fill='none'
                        stroke='#1f2937'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </svg>
                  </div>
                  <div className='border-t-2 border-gray-900 pt-2 min-w-40'>
                    {invoiceData.footer.signature.split("\n").map((line, i) => (
                      <div
                        key={i}
                        className='text-sm font-semibold text-gray-900'
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Notes */}
          {invoiceData.isFooterNeeded && invoiceData.footer?.exitMessage && (
            <div className='bg-gray-50 p-4 rounded'>
              <p className='text-xs text-gray-700'>
                <span className='font-semibold text-gray-900'>Notes: </span>
                {invoiceData.footer.exitMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
