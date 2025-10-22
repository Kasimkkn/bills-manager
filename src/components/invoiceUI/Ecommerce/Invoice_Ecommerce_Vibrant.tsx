import React from "react";
import { DynamicBillConfig } from "@/types/invoice";

interface InvoiceProps {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<HTMLDivElement>;
}

export default function Invoice_Ecommerce_Vibrant({
  invoiceData,
  invoiceRef,
}: InvoiceProps) {
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
        {invoiceData?.isBusinessInfoNeeded && (
          <div className='flex justify-between items-start mb-8 pb-6 border-b border-gray-200'>
            <div>
              <h1 className='text-xl font-bold text-gray-900'>
                {invoiceData.businessInfo?.name}
              </h1>
              <p className='text-sm text-gray-600 mb-1'>
                {invoiceData.businessInfo?.website}
              </p>
              <p className='text-sm text-gray-600 mb-1'>
                {invoiceData.businessInfo?.email}
              </p>
              <p className='text-sm text-gray-600'>
                {invoiceData.businessInfo?.phoneNumber}
              </p>
            </div>
            <div className='text-right'>
              <p className='text-sm text-gray-600 mb-1'>
                {`${invoiceData.businessInfo?.address.city}
                ${invoiceData.businessInfo?.address.state}
                ${invoiceData.businessInfo?.address.country}
                ${invoiceData.businessInfo?.address.pincode}
                `}
              </p>
              <p className='text-sm text-gray-600'>
                {invoiceData.businessInfo?.taxId
                  ? `${invoiceData.businessInfo?.taxId}`
                  : `${invoiceData.businessInfo?.gstNumber}`}
              </p>
              <div className='mt-3'>
                <p className='font-bold text-gray-900'>
                  {invoiceData?.invoiceInfo?.invoiceNumber}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Main Content */}
        <div
          className={`grid grid-cols-${
            invoiceData?.isCustomerInfoNeeded ? "2" : "1"
          } gap-8 mb-8`}
        >
          {/* Left Column */}
          {invoiceData?.isCustomerInfoNeeded && (
            <div>
              <p className='text-xs font-semibold text-gray-600 mb-1'>
                Billed to
              </p>
              <p className='font-bold text-gray-900 mb-1'>
                {invoiceData?.customerInfo?.name}
              </p>
              <p className='text-sm text-gray-600 mb-2'>
                {`${invoiceData.customerInfo?.address.city}
                ${invoiceData.customerInfo?.address.state}
                ${invoiceData.customerInfo?.address.country}
                ${invoiceData.customerInfo?.address.pincode}
                `}
              </p>
              <p className='text-sm text-gray-600'>
                {invoiceData.customerInfo?.phone}
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
                  invoiceData?.invoiceInfo?.invoiceDate
                ).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className='text-xs font-semibold text-gray-600 mb-1'>
                Due date
              </p>
              <p className='font-bold text-gray-900'>
                {new Date(
                  invoiceData?.invoiceInfo?.invoiceDueDate
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        {/* Items Table */}
        {invoiceData?.isItemListNeeded && (
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
                {invoiceData?.itemList?.map((item) => {
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
                ${invoiceData?.billSummary?.subTotal}
              </p>
            </div>
            <div className='flex justify-between py-2 border-b border-gray-300 mb-2'>
              <p className='text-gray-700'>Discount</p>
              <p className='text-gray-900 font-semibold'>
                {invoiceData.billSummary.discount}
              </p>
            </div>
            <div className='flex justify-between py-2 border-b border-gray-300 mb-2'>
              <p className='text-gray-700'>Tax (10%)</p>
              <p className='text-gray-900 font-semibold'>$450.00</p>
            </div>
            <div className='flex justify-between py-3'>
              <p className='text-gray-900 font-bold text-base'>Total</p>
              <p className='text-gray-900 font-bold text-base'>
                ${invoiceData.billSummary.totalDue}
              </p>
            </div>
          </div>
        </div>
        {/* Terms & Conditions */}
        {invoiceData?.isFooterNeeded && (
          <div className='text-center pt-4 border-t border-gray-300 mb-4'>
            <h3 className='font-bold text-gray-900 text-sm mb-2'>
              Terms & Conditions
            </h3>
            <p className='text-sm text-gray-700 mb-2'>
              Please pay within 15 days of receiving this invoice.
            </p>
            <p className='font-bold text-gray-900'>Thanks for the business.</p>
          </div>
        )}
      </div>
    </div>
  );
}
