import { DynamicBillConfig } from "@/types/invoice";
import React from "react";

export default function Invoice4({
    invoiceData,
    invoiceRef,
}: {
    invoiceData: DynamicBillConfig;
    invoiceRef: React.Ref<null>;
}) {
    return (
        <div className='min-h-screen flex items-center justify-center p-4 bg-gray-50'>
            {/* Invoice Container - Fixed A4 Size */}
            <div
                ref={invoiceRef}
                className='bg-white shadow-2xl'
                style={{
                    width: "210mm",
                    height: "297mm",
                    padding: "0",
                    boxSizing: "border-box",
                    overflow: "hidden",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                }}
            >
                {/* Header with Blue Background */}
                <div className='bg-blue-600 text-white px-12 py-8'>
                    <div className='flex justify-between items-start'>
                        <div className='flex items-center gap-4'>
                            {invoiceData.isBusinessInfoNeeded && invoiceData.businessInfo?.logo && (
                                <div className='w-14 h-14 bg-white rounded-lg flex items-center justify-center overflow-hidden'>
                                    <img src={invoiceData.businessInfo.logo} alt="Logo" className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div>
                                <h1 className='text-3xl font-bold mb-1'>PURCHASE ORDER</h1>
                                {invoiceData.invoiceInfo?.invoiceNumber && (
                                    <p className='text-blue-100 text-sm'>
                                        PO #{invoiceData.invoiceInfo.invoiceNumber}
                                    </p>
                                )}
                            </div>
                        </div>
                        {invoiceData.isBusinessInfoNeeded && invoiceData.businessInfo && (
                            <div className='text-right'>
                                <p className='font-bold text-lg'>{invoiceData.businessInfo.name}</p>
                                {invoiceData.businessInfo.address && (
                                    <p className='text-blue-100 text-sm mt-1'>
                                        {invoiceData.businessInfo.address.city}, {invoiceData.businessInfo.address.state}
                                    </p>
                                )}
                                {invoiceData.businessInfo.gstNumber && (
                                    <p className='text-blue-100 text-sm'>GST: {invoiceData.businessInfo.gstNumber}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className='px-12 py-8'>
                    {/* Supplier and Date Info */}
                    <div className='grid grid-cols-2 gap-12 mb-8'>
                        {/* Supplier Details */}
                        {invoiceData.isCustomerInfoNeeded && invoiceData.customerInfo && (
                            <div className='border-l-4 border-blue-600 pl-4'>
                                <p className='text-xs font-bold text-gray-500 uppercase mb-2'>Supplier</p>
                                <h3 className='text-xl font-bold text-gray-900 mb-2'>
                                    {invoiceData.customerInfo.name}
                                </h3>
                                {invoiceData.customerInfo.address && (
                                    <p className='text-sm text-gray-600 mb-1'>
                                        {invoiceData.customerInfo.address.city}, {invoiceData.customerInfo.address.state}<br />
                                        {invoiceData.customerInfo.address.country} - {invoiceData.customerInfo.address.pincode}
                                    </p>
                                )}
                                {invoiceData.customerInfo.email && (
                                    <p className='text-sm text-gray-600'>{invoiceData.customerInfo.email}</p>
                                )}
                                {(invoiceData.customerInfo.phoneNumber) && (
                                    <p className='text-sm text-gray-600'>
                                        {invoiceData.customerInfo.phoneNumber}
                                    </p>
                                )}
                                {invoiceData.customerInfo.gstin && (
                                    <p className='text-sm text-gray-600 mt-2'>
                                        <span className='font-semibold'>GSTIN:</span> {invoiceData.customerInfo.gstin}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Order Details */}
                        <div className='bg-gray-50 p-5 rounded-lg'>
                            {invoiceData.invoiceInfo?.invoiceDate && (
                                <div className='mb-4'>
                                    <p className='text-xs font-bold text-gray-500 uppercase mb-1'>Order Date</p>
                                    <p className='text-base font-semibold text-gray-900'>
                                        {new Date(invoiceData.invoiceInfo.invoiceDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            )}
                            {invoiceData.invoiceInfo?.invoiceDueDate && (
                                <div className='mb-4'>
                                    <p className='text-xs font-bold text-gray-500 uppercase mb-1'>Expected Delivery</p>
                                    <p className='text-base font-semibold text-gray-900'>
                                        {new Date(invoiceData.invoiceInfo.invoiceDueDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            )}
                            {invoiceData.businessInfo?.placeOfSupply && (
                                <div>
                                    <p className='text-xs font-bold text-gray-500 uppercase mb-1'>Place of Supply</p>
                                    <p className='text-base font-semibold text-gray-900'>
                                        {invoiceData.businessInfo.placeOfSupply}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Items Table */}
                    {invoiceData.isItemListNeeded && invoiceData.itemList && (
                        <div className='mb-8'>
                            <table className='w-full text-sm border-collapse'>
                                <thead>
                                    <tr className='bg-gray-100'>
                                        <th className='py-4 px-4 text-left font-bold text-gray-700 uppercase text-xs border-b-2 border-gray-300'>
                                            Item Description
                                        </th>
                                        <th className='py-4 px-4 text-center font-bold text-gray-700 uppercase text-xs border-b-2 border-gray-300'>
                                            HSN
                                        </th>
                                        <th className='py-4 px-4 text-center font-bold text-gray-700 uppercase text-xs border-b-2 border-gray-300'>
                                            Qty
                                        </th>
                                        <th className='py-4 px-4 text-center font-bold text-gray-700 uppercase text-xs border-b-2 border-gray-300'>
                                            Unit
                                        </th>
                                        <th className='py-4 px-4 text-right font-bold text-gray-700 uppercase text-xs border-b-2 border-gray-300'>
                                            Rate
                                        </th>
                                        <th className='py-4 px-4 text-right font-bold text-gray-700 uppercase text-xs border-b-2 border-gray-300'>
                                            Tax %
                                        </th>
                                        <th className='py-4 px-4 text-right font-bold text-gray-700 uppercase text-xs border-b-2 border-gray-300'>
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoiceData.itemList.map((item, index) => (
                                        <tr key={index} className='border-b border-gray-200 hover:bg-gray-50'>
                                            <td className='py-4 px-4 text-gray-900 font-medium'>{item.itemName}</td>
                                            <td className='py-4 px-4 text-center text-gray-600 text-xs'>
                                                {item.hsnCode || '-'}
                                            </td>
                                            <td className='py-4 px-4 text-center text-gray-900 font-semibold'>
                                                {item.quantity || 1}
                                            </td>
                                            <td className='py-4 px-4 text-center text-gray-600 text-xs uppercase'>
                                                {item.unit || 'PCS'}
                                            </td>
                                            <td className='py-4 px-4 text-right text-gray-900'>
                                                ${item.rate.toFixed(2)}
                                            </td>
                                            <td className='py-4 px-4 text-center text-gray-600'>
                                                {item.tax ? `${item.tax}%` : '-'}
                                            </td>
                                            <td className='py-4 px-4 text-right text-gray-900 font-semibold'>
                                                ${((item.quantity || 1) * item.rate).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Summary Section */}
                    <div className='grid grid-cols-2 gap-12 mb-8'>
                        {/* Left: Terms and Conditions */}
                        <div>
                            {invoiceData.footer?.paymentTerms && (
                                <div className='mb-6'>
                                    <h4 className='text-sm font-bold text-gray-700 uppercase mb-3 border-b border-gray-300 pb-2'>
                                        Terms & Conditions
                                    </h4>
                                    <p className='text-sm text-gray-600 leading-relaxed'>
                                        {invoiceData.footer.paymentTerms}
                                    </p>
                                </div>
                            )}
                            {invoiceData.footer?.returnPolicy && (
                                <div className='mb-4'>
                                    <h4 className='text-xs font-bold text-gray-500 uppercase mb-2'>Return Policy</h4>
                                    <p className='text-sm text-gray-600'>{invoiceData.footer.returnPolicy}</p>
                                </div>
                            )}
                        </div>

                        {/* Right: Bill Summary */}
                        {invoiceData.billSummary && (
                            <div>
                                <div className='bg-gray-50 border-2 border-gray-200 rounded-lg p-6'>
                                    <h4 className='text-sm font-bold text-gray-700 uppercase mb-4'>Order Summary</h4>
                                    <div className='space-y-3 text-sm'>
                                        <div className='flex justify-between text-gray-700'>
                                            <span>Subtotal</span>
                                            <span className='font-semibold'>${invoiceData.billSummary.subTotal.toFixed(2)}</span>
                                        </div>
                                        {invoiceData.billSummary.discount && (
                                            <div className='flex justify-between text-red-600'>
                                                <span>Discount</span>
                                                <span className='font-semibold'>-{invoiceData.billSummary.discount}</span>
                                            </div>
                                        )}
                                        {invoiceData.billSummary.cgst !== undefined && (
                                            <div className='flex justify-between text-gray-700'>
                                                <span>CGST</span>
                                                <span className='font-semibold'>${invoiceData.billSummary.cgst.toFixed(2)}</span>
                                            </div>
                                        )}
                                        {invoiceData.billSummary.sgst !== undefined && (
                                            <div className='flex justify-between text-gray-700'>
                                                <span>SGST</span>
                                                <span className='font-semibold'>${invoiceData.billSummary.sgst.toFixed(2)}</span>
                                            </div>
                                        )}
                                        {invoiceData.billSummary.igst !== undefined && (
                                            <div className='flex justify-between text-gray-700'>
                                                <span>IGST</span>
                                                <span className='font-semibold'>${invoiceData.billSummary.igst.toFixed(2)}</span>
                                            </div>
                                        )}
                                        {invoiceData.billSummary.shippingCharge !== undefined && (
                                            <div className='flex justify-between text-gray-700'>
                                                <span>Shipping</span>
                                                <span className='font-semibold'>${invoiceData.billSummary.shippingCharge.toFixed(2)}</span>
                                            </div>
                                        )}
                                        {invoiceData.billSummary.packingCharge !== undefined && (
                                            <div className='flex justify-between text-gray-700'>
                                                <span>Packing</span>
                                                <span className='font-semibold'>${invoiceData.billSummary.packingCharge.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className='flex justify-between pt-4 border-t-2 border-gray-300 text-lg font-bold text-gray-900'>
                                            <span>Total Amount</span>
                                            <span className='text-blue-600'>${invoiceData.billSummary.totalDue.toFixed(2)}</span>
                                        </div>
                                        {invoiceData.billSummary.totalInWords && (
                                            <p className='text-xs text-gray-600 italic pt-2'>
                                                {invoiceData.billSummary.totalInWords}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bank Details */}
                    {invoiceData.isBankDetailsNeeded && invoiceData.bankDetails && (
                        <div className='bg-blue-50 border-l-4 border-blue-600 p-5 mb-8'>
                            <h4 className='text-sm font-bold text-gray-700 uppercase mb-3'>Bank Details for Payment</h4>
                            <div className='grid grid-cols-4 gap-6 text-sm'>
                                <div>
                                    <p className='text-xs text-gray-500 uppercase mb-1'>Bank Name</p>
                                    <p className='font-semibold text-gray-900'>{invoiceData.bankDetails.bankName}</p>
                                </div>
                                <div>
                                    <p className='text-xs text-gray-500 uppercase mb-1'>Account Holder</p>
                                    <p className='font-semibold text-gray-900'>{invoiceData.bankDetails.accountHolderName}</p>
                                </div>
                                <div>
                                    <p className='text-xs text-gray-500 uppercase mb-1'>Account Number</p>
                                    <p className='font-semibold text-gray-900'>{invoiceData.bankDetails.accountNumber}</p>
                                </div>
                                <div>
                                    <p className='text-xs text-gray-500 uppercase mb-1'>IFSC Code</p>
                                    <p className='font-semibold text-gray-900'>{invoiceData.bankDetails.ifscCode}</p>
                                </div>
                            </div>
                            {invoiceData.bankDetails.upiId && (
                                <div className='mt-3'>
                                    <p className='text-xs text-gray-500 uppercase mb-1'>UPI ID</p>
                                    <p className='font-semibold text-gray-900'>{invoiceData.bankDetails.upiId}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Signature */}
                    {invoiceData.footer?.signature && (
                        <div className='flex justify-between items-end pt-8 border-t border-gray-300'>
                            {invoiceData.isFooterNeeded && invoiceData.footer?.exitMessage && (
                                <div className='text-sm text-gray-600 max-w-md'>
                                    <p className='italic'>{invoiceData.footer.exitMessage}</p>
                                </div>
                            )}
                            <div className='text-center'>
                                <div className='mb-8'>
                                    <svg width='150' height='60' viewBox='0 0 150 60' className='opacity-60'>
                                        <path
                                            d='M10,40 Q30,20 50,35 T90,30 Q110,35 130,25'
                                            fill='none'
                                            stroke='#1f2937'
                                            strokeWidth='2'
                                            strokeLinecap='round'
                                        />
                                    </svg>
                                </div>
                                <div className='border-t-2 border-gray-900 pt-2 min-w-48'>
                                    {invoiceData.footer.signature.split("\n").map((line, i) => (
                                        <p key={i} className='text-sm font-semibold text-gray-900'>
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}