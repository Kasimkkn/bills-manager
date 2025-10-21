import { DynamicBillConfig } from "@/types/invoice";
import React from "react";

export default function Invoice5({
    invoiceData,
    invoiceRef,
}: {
    invoiceData: DynamicBillConfig;
    invoiceRef: React.Ref<null>;
}) {
    return (
        <div className='min-h-screen flex items-center justify-center p-4 bg-gray-100'>
            <div
                ref={invoiceRef}
                className='bg-white shadow-xl'
                style={{
                    width: "210mm",
                    height: "297mm",
                    padding: "0",
                    boxSizing: "border-box",
                    overflow: "hidden",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                }}
            >
                <div className='h-3 bg-gradient-to-r from-green-500 via-green-600 to-green-500'></div>

                <div className='px-10 pt-8 pb-6 border-b-4 border-dashed border-gray-300'>
                    <div className='flex justify-between items-start mb-6'>
                        {invoiceData.isBusinessInfoNeeded && invoiceData.businessInfo && (
                            <div className='flex items-start gap-4'>
                                {invoiceData.businessInfo.logo && (
                                    <div className='w-20 h-20 border-4 border-green-500 rounded-full flex items-center justify-center overflow-hidden bg-white'>
                                        <img src={invoiceData.businessInfo.logo} alt="Logo" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div>
                                    <h1 className='text-3xl font-bold text-gray-900 mb-1'>
                                        {invoiceData.businessInfo.name}
                                    </h1>
                                    {invoiceData.businessInfo.address && (
                                        <p className='text-sm text-gray-600'>
                                            {invoiceData.businessInfo.address.city}, {invoiceData.businessInfo.address.state}, {invoiceData.businessInfo.address.country} - {invoiceData.businessInfo.address.pincode}
                                        </p>
                                    )}
                                    <div className='flex gap-4 mt-2 text-sm text-gray-600'>
                                        {invoiceData.businessInfo.phoneNumber && (
                                            <span>📞 {invoiceData.businessInfo.phoneNumber}</span>
                                        )}
                                        {invoiceData.businessInfo.email && (
                                            <span>✉️ {invoiceData.businessInfo.email}</span>
                                        )}
                                    </div>
                                    {invoiceData.businessInfo.gstNumber && (
                                        <p className='text-xs text-gray-500 mt-1'>
                                            <span className='font-semibold'>GSTIN:</span> {invoiceData.businessInfo.gstNumber}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className='text-right bg-green-50 px-6 py-4 rounded-lg border-2 border-green-200'>
                            <p className='text-sm text-gray-500 uppercase font-semibold mb-1'>Tax Invoice</p>
                            {invoiceData.invoiceInfo?.invoiceNumber && (
                                <p className='text-2xl font-bold text-green-700 mb-2'>
                                    #{invoiceData.invoiceInfo.invoiceNumber}
                                </p>
                            )}
                            {invoiceData.invoiceInfo?.invoiceDate && (
                                <p className='text-sm text-gray-600'>
                                    {new Date(invoiceData.invoiceInfo.invoiceDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            )}
                        </div>
                    </div>

                    {invoiceData.isCustomerInfoNeeded && invoiceData.customerInfo && (
                        <div className='bg-gray-50 px-4 py-3 rounded-lg'>
                            <p className='text-xs font-bold text-gray-500 uppercase mb-2'>Customer Details</p>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <p className='font-bold text-gray-900 text-base'>{invoiceData.customerInfo.name}</p>
                                    {(invoiceData.customerInfo.phoneNumber) && (
                                        <p className='text-sm text-gray-600'>
                                            {invoiceData.customerInfo.phoneNumber}
                                        </p>
                                    )}
                                </div>
                                {invoiceData.customerInfo.email && (
                                    <p className='text-sm text-gray-600'>{invoiceData.customerInfo.email}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className='px-10 py-6'>
                    {invoiceData.isItemListNeeded && invoiceData.itemList && (
                        <table className='w-full text-sm mb-6'>
                            <thead>
                                <tr className='bg-green-600 text-white'>
                                    <th className='py-3 px-3 text-left font-bold uppercase text-xs'>#</th>
                                    <th className='py-3 px-3 text-left font-bold uppercase text-xs'>Item</th>
                                    <th className='py-3 px-3 text-center font-bold uppercase text-xs'>Qty</th>
                                    <th className='py-3 px-3 text-right font-bold uppercase text-xs'>Price</th>
                                    <th className='py-3 px-3 text-center font-bold uppercase text-xs'>Disc%</th>
                                    <th className='py-3 px-3 text-center font-bold uppercase text-xs'>Tax%</th>
                                    <th className='py-3 px-3 text-right font-bold uppercase text-xs'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoiceData.itemList.map((item, index) => {
                                    const qty = item.quantity || 1;
                                    const baseAmount = qty * item.rate;
                                    const discountAmount = item.discount ? (baseAmount * item.discount / 100) : 0;
                                    const taxableAmount = baseAmount - discountAmount;
                                    const taxAmount = item.tax ? (taxableAmount * item.tax / 100) : 0;
                                    const total = taxableAmount + taxAmount;

                                    return (
                                        <tr key={index} className='border-b border-gray-200 hover:bg-gray-50'>
                                            <td className='py-3 px-3 text-gray-600 font-semibold'>{index + 1}</td>
                                            <td className='py-3 px-3'>
                                                <p className='font-semibold text-gray-900'>{item.itemName}</p>
                                                {item.hsnCode && (
                                                    <p className='text-xs text-gray-500'>HSN: {item.hsnCode}</p>
                                                )}
                                            </td>
                                            <td className='py-3 px-3 text-center text-gray-900 font-semibold'>{qty}</td>
                                            <td className='py-3 px-3 text-right text-gray-700'>₹{item.rate.toFixed(2)}</td>
                                            <td className='py-3 px-3 text-center text-gray-600'>
                                                {item.discount ? `${item.discount}%` : '-'}
                                            </td>
                                            <td className='py-3 px-3 text-center text-gray-600'>
                                                {item.tax ? `${item.tax}%` : '-'}
                                            </td>
                                            <td className='py-3 px-3 text-right font-bold text-gray-900'>₹{total.toFixed(2)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}

                    <div className='flex justify-between gap-8'>
                        {invoiceData.isBankDetailsNeeded && invoiceData.bankDetails && (
                            <div className='flex-1 bg-blue-50 p-4 rounded-lg border border-blue-200'>
                                <p className='font-bold text-gray-800 mb-3 text-sm uppercase'>Bank Details</p>
                                <div className='space-y-1 text-xs'>
                                    <p><span className='font-semibold text-gray-700'>Bank:</span> {invoiceData.bankDetails.bankName}</p>
                                    <p><span className='font-semibold text-gray-700'>A/C Holder:</span> {invoiceData.bankDetails.accountHolderName}</p>
                                    <p><span className='font-semibold text-gray-700'>A/C Number:</span> {invoiceData.bankDetails.accountNumber}</p>
                                    <p><span className='font-semibold text-gray-700'>IFSC:</span> {invoiceData.bankDetails.ifscCode}</p>
                                    {invoiceData.bankDetails.upiId && (
                                        <p><span className='font-semibold text-gray-700'>UPI ID:</span> {invoiceData.bankDetails.upiId}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {invoiceData.billSummary && (
                            <div className='w-80'>
                                <div className='bg-gray-50 rounded-lg p-4 border-2 border-gray-200'>
                                    <div className='space-y-2 text-sm'>
                                        <div className='flex justify-between'>
                                            <span className='text-gray-600'>Subtotal:</span>
                                            <span className='font-semibold text-gray-900'>₹{invoiceData.billSummary.subTotal.toFixed(2)}</span>
                                        </div>

                                        {invoiceData.billSummary.discount && (
                                            <div className='flex justify-between'>
                                                <span className='text-gray-600'>Discount:</span>
                                                <span className='text-red-600 font-semibold'>-₹{invoiceData.billSummary.discount}</span>
                                            </div>
                                        )}

                                        {invoiceData.billSummary.cgst && (
                                            <div className='flex justify-between'>
                                                <span className='text-gray-600'>CGST:</span>
                                                <span className='text-gray-900'>₹{invoiceData.billSummary.cgst.toFixed(2)}</span>
                                            </div>
                                        )}

                                        {invoiceData.billSummary.sgst && (
                                            <div className='flex justify-between'>
                                                <span className='text-gray-600'>SGST:</span>
                                                <span className='text-gray-900'>₹{invoiceData.billSummary.sgst.toFixed(2)}</span>
                                            </div>
                                        )}

                                        {invoiceData.billSummary.igst && (
                                            <div className='flex justify-between'>
                                                <span className='text-gray-600'>IGST:</span>
                                                <span className='text-gray-900'>₹{invoiceData.billSummary.igst.toFixed(2)}</span>
                                            </div>
                                        )}

                                        {invoiceData.billSummary.shippingCharge && (
                                            <div className='flex justify-between'>
                                                <span className='text-gray-600'>Shipping:</span>
                                                <span className='text-gray-900'>₹{invoiceData.billSummary.shippingCharge.toFixed(2)}</span>
                                            </div>
                                        )}

                                        {invoiceData.billSummary.packingCharge && (
                                            <div className='flex justify-between'>
                                                <span className='text-gray-600'>Packing:</span>
                                                <span className='text-gray-900'>₹{invoiceData.billSummary.packingCharge.toFixed(2)}</span>
                                            </div>
                                        )}

                                        <div className='border-t-2 border-dashed border-gray-300 pt-2 mt-2'>
                                            <div className='flex justify-between items-center'>
                                                <span className='font-bold text-gray-800 text-base'>Total Amount:</span>
                                                <span className='font-bold text-green-700 text-xl'>₹{invoiceData.billSummary.totalDue.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        {invoiceData.billSummary.totalInWords && (
                                            <p className='text-xs text-gray-600 italic mt-2 pt-2 border-t border-gray-200'>
                                                Amount in words: <span className='font-semibold'>{invoiceData.billSummary.totalInWords}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {invoiceData.isPaymentSectionNeeded && invoiceData.payment && (
                                    <div className='mt-4 bg-green-50 rounded-lg p-4 border border-green-200'>
                                        <p className='font-bold text-gray-800 mb-2 text-sm uppercase'>Payment Info</p>
                                        <div className='space-y-1 text-xs'>
                                            <p><span className='font-semibold'>Method:</span> {invoiceData.payment.paymentOption}</p>
                                            {invoiceData.payment.transactionId && (
                                                <p><span className='font-semibold'>Transaction ID:</span> {invoiceData.payment.transactionId}</p>
                                            )}
                                            {invoiceData.payment.amountPaid !== undefined && (
                                                <p><span className='font-semibold'>Amount Paid:</span> ₹{invoiceData.payment.amountPaid.toFixed(2)}</p>
                                            )}
                                            {invoiceData.payment.balanceDue !== undefined && invoiceData.payment.balanceDue > 0 && (
                                                <p className='text-red-600'><span className='font-semibold'>Balance Due:</span> ₹{invoiceData.payment.balanceDue.toFixed(2)}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {invoiceData.isFooterNeeded && invoiceData.footer && (
                    <div className='px-10 pb-8 mt-auto'>
                        <div className='border-t-2 border-dashed border-gray-300 pt-4'>
                            {invoiceData.footer.returnPolicy && (
                                <div className='mb-3'>
                                    <p className='text-xs font-bold text-gray-700 mb-1'>Return Policy:</p>
                                    <p className='text-xs text-gray-600'>{invoiceData.footer.returnPolicy}</p>
                                </div>
                            )}

                            {invoiceData.footer.warrantyInfo && (
                                <div className='mb-3'>
                                    <p className='text-xs font-bold text-gray-700 mb-1'>Warranty:</p>
                                    <p className='text-xs text-gray-600'>{invoiceData.footer.warrantyInfo}</p>
                                </div>
                            )}

                            {invoiceData.footer.paymentTerms && (
                                <div className='mb-3'>
                                    <p className='text-xs font-bold text-gray-700 mb-1'>Payment Terms:</p>
                                    <p className='text-xs text-gray-600'>{invoiceData.footer.paymentTerms}</p>
                                </div>
                            )}

                            <div className='flex justify-between items-end mt-4'>
                                <p className='text-sm text-gray-700 italic'>
                                    {invoiceData.footer.exitMessage}
                                </p>
                                {invoiceData.footer.signature && (
                                    <div className='text-center'>
                                        <div className='border-t-2 border-gray-400 w-40 mb-1'></div>
                                        <p className='text-xs text-gray-600'>Authorized Signature</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className='h-2 bg-gradient-to-r from-green-500 via-green-600 to-green-500 mt-auto'></div>
            </div>
        </div>
    );
}