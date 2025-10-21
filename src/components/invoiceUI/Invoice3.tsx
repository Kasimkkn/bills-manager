import { DynamicBillConfig } from "@/types/invoice";
import React from "react";

export default function Invoice3({
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
          padding: "50px 60px",
          boxSizing: "border-box",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Header */}
        <div className='flex justify-between items-start mb-12'>
          {/* Left: Company Info with Logo */}
          {invoiceData.isBusinessInfoNeeded && invoiceData.businessInfo && (
            <div className='flex items-start gap-4'>
              <div className='w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden'>
                {invoiceData.businessInfo.logo ? (
                  <img src={invoiceData.businessInfo.logo} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <span className='text-3xl'>🐼</span>
                )}
              </div>
              <div>
                <h1 className='text-2xl font-bold text-black'>
                  {invoiceData.businessInfo.name}
                </h1>
                {invoiceData.businessInfo.email && (
                  <p className='text-sm text-gray-600 mt-1'>
                    {invoiceData.businessInfo.email}
                  </p>
                )}
                {invoiceData.businessInfo.phoneNumber && (
                  <p className='text-sm text-gray-600'>
                    {invoiceData.businessInfo.phoneNumber}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Right: Invoice Info */}
          <div className='text-right'>
            <p className='text-gray-400 text-5xl font-light'>Invoice</p>
            {invoiceData.invoiceInfo?.invoiceNumber && (
              <p className='text-gray-800 font-semibold text-lg'>
                #{invoiceData.invoiceInfo.invoiceNumber}
              </p>
            )}
          </div>
        </div>

        {/* Billed To and Dates Section */}
        <div className='grid grid-cols-3 gap-8 mb-12 pb-8 border-b border-gray-200'>
          {/* Billed To */}
          {invoiceData.isCustomerInfoNeeded && invoiceData.customerInfo && (
            <div>
              <p className='text-xs font-bold text-gray-700 uppercase mb-3'>
                Billed To
              </p>
              <p className='font-bold text-gray-900 mb-2'>
                {invoiceData.customerInfo.name}
              </p>
              {invoiceData.customerInfo.address && (
                <>
                  <p className='text-sm text-gray-600 mb-1'>
                    {invoiceData.customerInfo.address.city}, {invoiceData.customerInfo.address.state}
                  </p>
                  <p className='text-sm text-gray-600 mb-2'>
                    {invoiceData.customerInfo.address.country} - {invoiceData.customerInfo.address.pincode}
                  </p>
                </>
              )}
              {(invoiceData.customerInfo.phoneNumber) && (
                <p className='text-sm text-gray-600'>
                  {invoiceData.customerInfo.phoneNumber}
                </p>
              )}
            </div>
          )}

          {/* Invoice Date */}
          {invoiceData.invoiceInfo && (
            <div>
              {invoiceData.invoiceInfo.invoiceDate && (
                <>
                  <p className='text-xs font-bold text-gray-700 uppercase mb-3'>
                    Invoice Date
                  </p>
                  <p className='text-lg font-bold text-gray-900 mb-6'>
                    {new Date(invoiceData.invoiceInfo.invoiceDate).toLocaleDateString()}
                  </p>
                </>
              )}
              {invoiceData.invoiceInfo.invoiceDueDate && (
                <>
                  <p className='text-xs font-bold text-gray-700 uppercase mb-3'>
                    Due Date
                  </p>
                  <p className='text-lg font-bold text-gray-900'>
                    {new Date(invoiceData.invoiceInfo.invoiceDueDate).toLocaleDateString()}
                  </p>
                </>
              )}
            </div>
          )}

          {/* Amount Due */}
          {invoiceData.billSummary && (
            <div className='text-right'>
              <p className='text-xs font-bold text-gray-700 uppercase mb-3'>
                Amount Due
              </p>
              <div className='bg-lime-300 px-4 py-3 rounded inline-block'>
                <p className='text-sm text-gray-600 font-semibold'>
                  ${invoiceData.billSummary.totalDue.toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Service Description Title */}
        {invoiceData.isServiceListNeeded && invoiceData.serviceList && invoiceData.serviceList.length > 0 && (
          <div className='mb-6'>
            <h2 className='text-lg font-bold text-gray-900'>
              {invoiceData.serviceList[0].description}
            </h2>
          </div>
        )}

        {/* Items Table - for services */}
        {invoiceData.isServiceListNeeded && invoiceData.serviceList && (
          <table className='w-full text-sm mb-8'>
            <thead>
              <tr className='border-b-2 border-gray-300'>
                <th className='text-left py-3 px-0 font-bold text-gray-700 text-xs uppercase w-12'>
                  #
                </th>
                <th className='text-left py-3 px-0 font-bold text-gray-700 text-xs uppercase'>
                  Title / Description
                </th>
                <th className='text-right py-3 px-0 font-bold text-gray-700 text-xs uppercase'>
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.serviceList.map((service, index) => (
                <tr key={index} className={index === invoiceData.serviceList.length - 1 ? 'border-b-2 border-gray-300' : 'border-b border-gray-200'}>
                  <td className='py-4 px-0 text-gray-900 font-semibold'>{index + 1}</td>
                  <td className='py-4 px-0'>
                    <p className='font-bold text-gray-900 mb-1'>{service.description}</p>
                    {service.hours && (
                      <p className='text-xs text-gray-500'>
                        {service.hours} hours{service.rate ? ` • $${service.rate}/hr` : ''}
                      </p>
                    )}
                  </td>
                  <td className='text-right py-4 px-0 text-gray-900 font-semibold'>
                    ${service.rate && service.hours ? (parseFloat(service.rate) * service.hours).toFixed(2) : '0.00'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Items Table - for products */}
        {invoiceData.isItemListNeeded && invoiceData.itemList && (
          <table className='w-full text-sm mb-8'>
            <thead>
              <tr className='border-b-2 border-gray-300'>
                <th className='text-left py-3 px-0 font-bold text-gray-700 text-xs uppercase w-12'>
                  #
                </th>
                <th className='text-left py-3 px-0 font-bold text-gray-700 text-xs uppercase'>
                  Title / Description
                </th>
                <th className='text-right py-3 px-0 font-bold text-gray-700 text-xs uppercase'>
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.itemList.map((item, index) => (
                <tr key={index} className={index === invoiceData.itemList.length - 1 ? 'border-b-2 border-gray-300' : 'border-b border-gray-200'}>
                  <td className='py-4 px-0 text-gray-900 font-semibold'>{index + 1}</td>
                  <td className='py-4 px-0'>
                    <p className='font-bold text-gray-900 mb-1'>{item.itemName}</p>
                    {(item.quantity || item.rate) && (
                      <p className='text-xs text-gray-500'>
                        {item.quantity ? `Qty: ${item.quantity}` : ''}{item.quantity && item.rate ? ' • ' : ''}{item.rate ? `Rate: $${item.rate.toFixed(2)}` : ''}
                      </p>
                    )}
                  </td>
                  <td className='text-right py-4 px-0 text-gray-900 font-semibold'>
                    ${((item.quantity || 1) * item.rate).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Total */}
        {invoiceData.billSummary && (
          <div className='flex justify-end mb-6'>
            <div className='w-64'>
              <div className='flex justify-between py-3 border-b-2 border-gray-300'>
                <p className='text-gray-900 font-bold'>Total</p>
                <p className='text-gray-900 font-bold'>
                  ${invoiceData.billSummary.totalDue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Payment Terms */}
        {invoiceData.footer?.paymentTerms && (
          <div className='flex items-center gap-2 text-sm text-gray-600 mb-12 py-3'>
            <svg
              className='w-5 h-5 text-gray-400 flex-shrink-0'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                clipRule='evenodd'
              />
            </svg>
            <p>{invoiceData.footer.paymentTerms}</p>
          </div>
        )}

        {/* Thank You Message */}
        {invoiceData.isFooterNeeded && invoiceData.footer?.exitMessage && (
          <div className='mb-12 text-gray-900 font-semibold'>
            <p>{invoiceData.footer.exitMessage}</p>
          </div>
        )}

        {/* Payment Info */}
        {invoiceData.isBankDetailsNeeded && invoiceData.bankDetails && (
          <div className='mt-auto pt-8 border-t border-gray-200'>
            <p className='text-xs font-bold text-gray-700 uppercase mb-4'>
              Payment Info
            </p>

            <div className='grid grid-cols-2 gap-8 mb-6'>
              <div>
                <p className='text-xs font-bold text-gray-700 uppercase mb-2'>
                  Account Name
                </p>
                <p className='text-sm text-gray-900'>
                  {invoiceData.bankDetails.accountHolderName}
                  {invoiceData.businessInfo?.address && (
                    <>, {invoiceData.businessInfo.address.city}, {invoiceData.businessInfo.address.state}, {invoiceData.businessInfo.address.country} - {invoiceData.businessInfo.address.pincode}</>
                  )}
                </p>
              </div>
              <div>
                <div className='flex gap-8'>
                  <div>
                    <p className='text-xs font-bold text-gray-700 uppercase mb-2'>
                      Bank name
                    </p>
                    <p className='text-sm text-gray-900 font-semibold'>
                      {invoiceData.bankDetails.bankName}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs font-bold text-gray-700 uppercase mb-2'>
                      IFSC code
                    </p>
                    <p className='text-sm text-gray-900 font-semibold'>
                      {invoiceData.bankDetails.ifscCode}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs font-bold text-gray-700 uppercase mb-2'>
                      Account #
                    </p>
                    <p className='text-sm text-gray-900 font-semibold'>
                      {invoiceData.bankDetails.accountNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}