import React, { useRef } from "react";
import { Download } from "lucide-react";
import html2pdf from "html2pdf.js";
import { DynamicBillConfig } from "@/types/invoice";

export default function Invoice1({
  formData,
  invoiceRef,
}: {
  formData: DynamicBillConfig;
  invoiceRef: React.Ref<null>;
}) {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      {/* Invoice Container - Fixed A4 Size */}
      <div
        ref={invoiceRef}
        className='bg-white shadow-lg'
        style={{
          width: "210mm",
          height: "297mm",
          padding: "40px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        {formData?.isBusinessInfoNeeded && (
          <div className='flex justify-between items-start mb-8 pb-6 border-b border-gray-200'>
            <div>
              <h1 className='text-xl font-bold text-gray-900'>
                {formData.businessInfo?.name}
              </h1>
              <p className='text-sm text-gray-600 mb-1'>
                {formData.businessInfo?.website}
              </p>
              <p className='text-sm text-gray-600 mb-1'>
                {formData.businessInfo?.email}
              </p>
              <p className='text-sm text-gray-600'>
                {formData.businessInfo?.phoneNumber}
              </p>
            </div>
            <div className='text-right'>
              <p className='text-sm text-gray-600 mb-1'>
                {`${formData.businessInfo?.address.city}
                ${formData.businessInfo?.address.state}
                ${formData.businessInfo?.address.country}
                ${formData.businessInfo?.address.pincode}
                `}
              </p>
              <p className='text-sm text-gray-600'>
                {formData.businessInfo?.taxId
                  ? `${formData.businessInfo?.taxId}`
                  : `${formData.businessInfo?.gstNumber}`}
              </p>
              <div className='mt-3'>
                <p className='font-bold text-gray-900'>
                  {formData?.invoiceInfo?.invoiceNumber}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Main Content */}
        <div
          className={`grid grid-cols-${
            formData?.isCustomerInfoNeeded ? "2" : "1"
          } gap-8 mb-8`}
        >
          {/* Left Column */}
          {formData?.isCustomerInfoNeeded && (
            <div>
              <p className='text-xs font-semibold text-gray-600 mb-1'>
                Billed to
              </p>
              <p className='font-bold text-gray-900 mb-1'>
                {formData?.customerInfo?.name}
              </p>
              <p className='text-sm text-gray-600 mb-2'>
                {`${formData.customerInfo?.address.city}
                ${formData.customerInfo?.address.state}
                ${formData.customerInfo?.address.country}
                ${formData.customerInfo?.address.pincode}
                `}
              </p>
              <p className='text-sm text-gray-600'>
                {formData.customerInfo?.phone}
              </p>
            </div>
          )}
          <div className='flex flex-col items-end gap-2'>
            <div>
              <p className='text-xs font-semibold text-gray-600 mb-1'>
                Invoice date
              </p>
              <p className='font-bold text-gray-900'>
                {new Date(
                  formData?.invoiceInfo?.invoiceDate
                ).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className='text-xs font-semibold text-gray-600 mb-1'>
                Due date
              </p>
              <p className='font-bold text-gray-900'>
                {new Date(
                  formData?.invoiceInfo?.invoiceDate
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        {/* Items Table */}
        {formData?.isItemListNeeded && (
          <div className='mb-8'>
            <table className='w-full text-sm border-collapse'>
              <thead>
                <tr className='border-t border-b border-gray-300 bg-gray-50'>
                  <th className='text-left py-3 px-3 font-semibold text-gray-700 text-xs uppercase'>
                    Item Detail
                  </th>
                  <th className='text-center py-3 px-3 font-semibold text-gray-700 text-xs uppercase w-16'>
                    QTY
                  </th>
                  <th className='text-right py-3 px-3 font-semibold text-gray-700 text-xs uppercase w-32'>
                    Rate
                  </th>
                  <th className='text-right py-3 px-3 font-semibold text-gray-700 text-xs uppercase w-32'>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {formData?.itemList?.map((item) => {
                  return (
                    <tr className='border-b border-gray-200'>
                      <td className='py-4 px-3'>
                        <p className='font-bold text-gray-900'>
                          {item.itemName}
                        </p>
                      </td>
                      <td className='text-center py-4 px-3 text-gray-900'>
                        {item.quantity}
                      </td>
                      <td className='text-right py-4 px-3 text-gray-900'>
                        ${item.rate}
                      </td>
                      <td className='text-right py-4 px-3 font-bold text-gray-900'>
                        ${item.quantity * item.rate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {/* Totals */}
        <div className='flex justify-end mb-8'>
          <div className='w-64'>
            <div className='flex justify-between py-2 border-b border-gray-300'>
              <p className='text-gray-700'>Subtotal</p>
              <p className='text-gray-900 font-semibold'>
                ${formData?.billSummary?.subTotal}
              </p>
            </div>
            <div className='flex justify-between py-2 border-b border-gray-300 mb-2'>
              <p className='text-gray-700'>Discount</p>
              <p className='text-gray-900 font-semibold'>
                {formData.billSummary.discount}
              </p>
            </div>
            <div className='flex justify-between py-2 border-b border-gray-300 mb-2'>
              <p className='text-gray-700'>Tax (10%)</p>
              <p className='text-gray-900 font-semibold'>$450.00</p>
            </div>
            <div className='flex justify-between py-3'>
              <p className='text-gray-900 font-bold text-base'>Total</p>
              <p className='text-gray-900 font-bold text-base'>
                ${formData.billSummary.totalDue}
              </p>
            </div>
          </div>
        </div>
        <div className='text-center pt-4 border-t border-gray-300 mb-4'>
          <h3 className='font-bold text-gray-900 text-sm mb-2'>
            Terms & Conditions
          </h3>
          <p className='text-sm text-gray-700 mb-2'>
            Please pay within 15 days of receiving this invoice.
          </p>
          <p className='font-bold text-gray-900'>Thanks for the business.</p>
        </div>
        ={/* Terms & Conditions */}
      </div>
    </div>
  );
}
