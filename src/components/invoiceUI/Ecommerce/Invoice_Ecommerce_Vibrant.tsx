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
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-8'>
      <div
        ref={invoiceRef}
        className='bg-white shadow-2xl'
        style={{
          width: "210mm",
          height: "297mm",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Vibrant Header with Gradient */}
        <div className='bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 px-10 py-8 relative overflow-hidden'>
          {/* Decorative circles */}
          <div className='absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32'></div>
          <div className='absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24'></div>

          <div className='relative z-10 flex justify-between items-start'>
            {invoiceData?.isBusinessInfoNeeded && (
              <>
                <div className='text-white'>
                  <h1 className='text-3xl font-bold mb-2'>
                    {invoiceData.businessInfo?.name}
                  </h1>
                  <div className='text-teal-50 text-sm space-y-1'>
                    <p>{invoiceData.businessInfo?.email}</p>
                    <p>{invoiceData.businessInfo?.phoneNumber}</p>
                    <p className='mt-2 font-medium'>
                      GST: {invoiceData.businessInfo?.gstNumber}
                    </p>
                  </div>
                </div>
                <div className='text-right text-white'>
                  <div className='bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-3 inline-block'>
                    <p className='text-xs text-teal-100 mb-1'>INVOICE</p>
                    <p className='text-2xl font-bold'>
                      {invoiceData?.invoiceInfo?.invoiceNumber}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Order Info Bar */}
        {invoiceData?.ecommerceInfo && (
          <div className='bg-gradient-to-r from-teal-50 to-cyan-50 px-10 py-4 border-b-2 border-teal-200'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-8'>
                <div>
                  <p className='text-xs text-teal-600 font-semibold mb-1'>
                    ORDER ID
                  </p>
                  <p className='text-sm font-bold text-teal-900'>
                    {invoiceData.ecommerceInfo.orderNumber}
                  </p>
                </div>
                <div>
                  <p className='text-xs text-teal-600 font-semibold mb-1'>
                    TRACKING
                  </p>
                  <p className='text-sm font-bold text-teal-900'>
                    {invoiceData.ecommerceInfo.trackingNumber}
                  </p>
                </div>
                <div>
                  <p className='text-xs text-teal-600 font-semibold mb-1'>
                    COURIER
                  </p>
                  <p className='text-sm font-bold text-teal-900'>
                    {invoiceData.ecommerceInfo.courierPartner}
                  </p>
                </div>
              </div>
              <div className='text-right'>
                <p className='text-xs text-teal-600 font-semibold mb-1'>
                  EST. DELIVERY
                </p>
                <p className='text-sm font-bold text-teal-900'>
                  {new Date(
                    invoiceData.ecommerceInfo.estimatedDelivery || ""
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Customer & Date Section */}
        <div className='px-10 py-6'>
          <div className='grid grid-cols-2 gap-8'>
            {invoiceData?.isCustomerInfoNeeded && (
              <div className='bg-slate-50 rounded-xl p-5 border-l-4 border-teal-500'>
                <p className='text-xs font-bold text-teal-600 mb-3 uppercase tracking-wide'>
                  Bill To
                </p>
                <p className='font-bold text-gray-900 text-lg mb-2'>
                  {invoiceData?.customerInfo?.name}
                </p>
                <p className='text-sm text-gray-600 mb-1'>
                  {invoiceData.customerInfo?.email}
                </p>
                <p className='text-sm text-gray-600 mb-1'>
                  {invoiceData.customerInfo?.phone ||
                    invoiceData.customerInfo?.phoneNumber}
                </p>
                <p className='text-sm text-gray-600 mt-2'>
                  {invoiceData.customerInfo?.address?.city},{" "}
                  {invoiceData.customerInfo?.address?.state}{" "}
                  {invoiceData.customerInfo?.address?.pincode}
                </p>
              </div>
            )}

            <div className='bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-5 border border-teal-200'>
              <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-xs font-bold text-teal-600 uppercase'>
                    Invoice Date
                  </span>
                  <span className='font-bold text-gray-900'>
                    {new Date(
                      invoiceData?.invoiceInfo?.invoiceDate || ""
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-xs font-bold text-teal-600 uppercase'>
                    Due Date
                  </span>
                  <span className='font-bold text-gray-900'>
                    {new Date(
                      invoiceData?.invoiceInfo?.invoiceDueDate || ""
                    ).toLocaleDateString()}
                  </span>
                </div>
                {invoiceData?.payment?.paymentOption && (
                  <div className='flex justify-between items-center pt-2 border-t border-teal-200'>
                    <span className='text-xs font-bold text-teal-600 uppercase'>
                      Payment
                    </span>
                    <span className='font-bold text-teal-700 bg-teal-100 px-3 py-1 rounded-full text-sm'>
                      {invoiceData.payment.paymentOption}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        {invoiceData?.isItemListNeeded && (
          <div className='px-10 py-4'>
            <div className='overflow-hidden rounded-xl border-2 border-teal-100'>
              <table className='w-full'>
                <thead>
                  <tr className='bg-gradient-to-r from-teal-500 to-cyan-500 text-white'>
                    <th className='text-left py-4 px-4 font-bold text-sm uppercase'>
                      Item Details
                    </th>
                    <th className='text-center py-4 px-4 font-bold text-sm uppercase w-20'>
                      HSN
                    </th>
                    <th className='text-center py-4 px-4 font-bold text-sm uppercase w-20'>
                      Qty
                    </th>
                    <th className='text-right py-4 px-4 font-bold text-sm uppercase w-28'>
                      Rate
                    </th>
                    <th className='text-right py-4 px-4 font-bold text-sm uppercase w-28'>
                      Tax
                    </th>
                    <th className='text-right py-4 px-4 font-bold text-sm uppercase w-32'>
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData?.itemList?.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-teal-100 ${
                        index % 2 === 0
                          ? "bg-white"
                          : "bg-teal-50 bg-opacity-30"
                      }`}
                    >
                      <td className='py-4 px-4'>
                        <p className='font-bold text-gray-900'>
                          {item.itemName}
                        </p>
                        {item.description && (
                          <p className='text-xs text-gray-500 mt-1'>
                            {item.description}
                          </p>
                        )}
                      </td>
                      <td className='text-center py-4 px-4 text-sm text-gray-600'>
                        {item.hsnCode}
                      </td>
                      <td className='text-center py-4 px-4 text-gray-900 font-semibold'>
                        {item.quantity}
                      </td>
                      <td className='text-right py-4 px-4 text-gray-900'>
                        ₹{item.rate}
                      </td>
                      <td className='text-right py-4 px-4 text-gray-600 text-sm'>
                        {item.tax}%
                      </td>
                      <td className='text-right py-4 px-4 font-bold text-gray-900'>
                        ₹{((item.quantity || 0) * item.rate).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Summary Section */}
        <div className='px-10 py-6'>
          <div className='flex justify-end'>
            <div className='w-96'>
              <div className='bg-gradient-to-br from-slate-50 to-teal-50 rounded-xl p-6 border-2 border-teal-200'>
                <div className='space-y-3'>
                  <div className='flex justify-between text-gray-700'>
                    <span>Subtotal</span>
                    <span className='font-semibold'>
                      ₹{invoiceData?.billSummary?.subTotal.toFixed(2)}
                    </span>
                  </div>

                  {invoiceData?.billSummary?.cgst && (
                    <div className='flex justify-between text-gray-700 text-sm'>
                      <span>CGST</span>
                      <span className='font-semibold'>
                        ₹{invoiceData.billSummary.cgst.toFixed(2)}
                      </span>
                    </div>
                  )}

                  {invoiceData?.billSummary?.sgst && (
                    <div className='flex justify-between text-gray-700 text-sm'>
                      <span>SGST</span>
                      <span className='font-semibold'>
                        ₹{invoiceData.billSummary.sgst.toFixed(2)}
                      </span>
                    </div>
                  )}

                  {invoiceData?.billSummary?.roundOff !== 0 && (
                    <div className='flex justify-between text-gray-700 text-sm'>
                      <span>Round Off</span>
                      <span className='font-semibold'>
                        ₹{invoiceData?.billSummary?.roundOff?.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className='border-t-2 border-teal-300 pt-3 mt-3'>
                    <div className='flex justify-between items-center'>
                      <span className='text-lg font-bold text-gray-900'>
                        Total Amount
                      </span>
                      <span className='text-2xl font-bold text-teal-600'>
                        ₹{invoiceData?.billSummary?.totalDue.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {invoiceData?.billSummary?.totalInWords && (
                    <div className='pt-2 text-xs text-gray-600 italic'>
                      {invoiceData.billSummary.totalInWords}
                    </div>
                  )}
                </div>
              </div>

              {invoiceData?.payment?.transactionId && (
                <div className='mt-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-xs text-green-600 font-semibold'>
                        PAID
                      </p>
                      <p className='text-sm font-bold text-green-700'>
                        Txn: {invoiceData.payment.transactionId}
                      </p>
                    </div>
                    <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        {invoiceData?.isFooterNeeded && (
          <div className='px-10 py-6 mt-auto'>
            <div className='bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-6 text-white'>
              <div className='grid grid-cols-2 gap-6'>
                <div>
                  <h3 className='font-bold text-lg mb-3'>
                    {invoiceData?.footer?.exitMessage}
                  </h3>
                  {invoiceData?.footer?.returnPolicy && (
                    <p className='text-sm text-teal-50 mb-2'>
                      <span className='font-semibold'>Return Policy:</span>{" "}
                      {invoiceData.footer.returnPolicy}
                    </p>
                  )}
                  {invoiceData?.footer?.termsAndConditions && (
                    <p className='text-sm text-teal-50'>
                      {invoiceData.footer.termsAndConditions}
                    </p>
                  )}
                </div>
                <div className='text-right flex flex-col justify-center'>
                  <p className='text-teal-100 text-sm mb-2'>Need help?</p>
                  <p className='font-semibold'>
                    {invoiceData?.businessInfo?.email}
                  </p>
                  <p className='font-semibold'>
                    {invoiceData?.businessInfo?.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
