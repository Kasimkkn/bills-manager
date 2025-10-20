import React, { useRef } from 'react';
import { Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';

export default function Invoice2() {
    const invoiceRef = useRef();

    const handleDownloadPDF = () => {
        const element = invoiceRef.current;
        const opt = {
            margin: 0,
            filename: 'invoice_AB2324-01.pdf',
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait' as const, unit: 'mm' as const, format: 'a4' }
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            {/* Download Button */}
            <div className="absolute top-6 right-6">
                <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                    <Download size={18} />
                    Download PDF
                </button>
            </div>

            {/* Invoice Container - Fixed A4 Size */}
            <div
                ref={invoiceRef}
                className="bg-white shadow-lg"
                style={{
                    width: '210mm',
                    height: '297mm',
                    padding: '50px 60px',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
            >

                {/* Header with Logo and Company Info */}
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">INVOICE</h1>
                    </div>
                    <div className="text-right">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-3 ml-auto">
                            <span className="text-3xl">🐼</span>
                        </div>
                        <p className="text-xl font-bold text-teal-600">Panda, Inc</p>
                        <p className="text-xs text-gray-600 mt-1">Business address</p>
                        <p className="text-xs text-gray-600">City, State, IN - 000 000</p>
                        <p className="text-xs text-gray-600">TAX ID 00XXXX1234XXXX</p>
                    </div>
                </div>

                {/* Billed To Section */}
                <div className="mb-8 pb-8 border-b-2 border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">Billed to</h3>
                    <p className="text-sm text-gray-600 mb-0.5">Company Name</p>
                    <p className="text-sm text-gray-600 mb-0.5">Company address</p>
                    <p className="text-sm text-gray-600">City, Country - 00000</p>
                </div>

                {/* Invoice Details and Table Container */}
                <div className="flex gap-12 mb-8">
                    {/* Left Sidebar - Invoice Info */}
                    <div className="w-40 flex-shrink-0">
                        <div className="mb-8">
                            <p className="text-xs font-bold text-gray-900 mb-1">Invoice #</p>
                            <p className="text-sm font-semibold text-gray-700">AB2324-01</p>
                        </div>
                        <div className="mb-8">
                            <p className="text-xs font-bold text-gray-900 mb-1">Invoice date</p>
                            <p className="text-sm font-semibold text-gray-700">01 Aug, 2023</p>
                        </div>
                        <div className="mb-8">
                            <p className="text-xs font-bold text-gray-900 mb-1">Reference</p>
                            <p className="text-sm font-semibold text-gray-700">INV-057</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-900 mb-1">Due date</p>
                            <p className="text-sm font-semibold text-gray-700">15 Aug, 2023</p>
                        </div>
                    </div>

                    {/* Right Section - Table and Totals */}
                    <div className="flex-1">
                        {/* Items Table */}
                        <table className="w-full text-sm border-collapse mb-6">
                            <thead>
                                <tr className="bg-gray-50 border-b-2 border-gray-300">
                                    <th className="text-left py-3 px-3 font-bold text-gray-900">Services</th>
                                    <th className="text-center py-3 px-3 font-bold text-gray-900 w-16">Qty</th>
                                    <th className="text-right py-3 px-3 font-bold text-gray-900 w-28">Rate</th>
                                    <th className="text-right py-3 px-3 font-bold text-gray-900 w-32">Line total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200">
                                    <td className="py-3 px-3 text-gray-900 font-semibold">Item Name</td>
                                    <td className="text-center py-3 px-3 text-gray-700">1</td>
                                    <td className="text-right py-3 px-3 text-gray-700">$3,000.00</td>
                                    <td className="text-right py-3 px-3 text-gray-900 font-semibold">$3,000.00</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-3 px-3 text-gray-900 font-semibold">Item Name</td>
                                    <td className="text-center py-3 px-3 text-gray-700">1</td>
                                    <td className="text-right py-3 px-3 text-gray-700">$3,000.00</td>
                                    <td className="text-right py-3 px-3 text-gray-900 font-semibold">$3,000.00</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="py-3 px-3 text-gray-900 font-semibold">Item Name</td>
                                    <td className="text-center py-3 px-3 text-gray-700">1</td>
                                    <td className="text-right py-3 px-3 text-gray-700">$1,500.00</td>
                                    <td className="text-right py-3 px-3 text-gray-900 font-semibold">$1,500.00</td>
                                </tr>
                                <tr className="border-b-2 border-gray-200">
                                    <td className="py-3 px-3 text-gray-900 font-semibold">Item Name</td>
                                    <td className="text-center py-3 px-3 text-gray-700">1</td>
                                    <td className="text-right py-3 px-3 text-gray-700">$1,500.00</td>
                                    <td className="text-right py-3 px-3 text-gray-900 font-semibold">$1,500.00</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Totals Section */}
                        <div className="flex justify-end">
                            <div className="w-72">
                                <div className="flex justify-between py-3 border-b-2 border-gray-300 bg-gray-50 px-4">
                                    <p className="text-gray-700 font-medium">Subtotal</p>
                                    <p className="text-gray-900 font-semibold">$9,000.00</p>
                                </div>
                                <div className="flex justify-between py-3 border-b-2 border-gray-300 bg-gray-50 px-4 mb-3">
                                    <p className="text-gray-700 font-medium">Tax (10%)</p>
                                    <p className="text-gray-900 font-semibold">$900.00</p>
                                </div>
                                <div className="flex justify-between py-3 bg-blue-50 px-4 rounded-lg border-2 border-blue-300">
                                    <p className="text-teal-600 font-bold text-base">Total due</p>
                                    <p className="text-teal-600 font-bold text-base">USS 9,900.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Terms */}
                <div className="flex items-center gap-2 text-sm text-gray-600 py-6 border-t border-gray-200">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.707 6.707a1 1 0 010 1.414L5.414 9.414a1 1 0 01-1.414-1.414l1.293-1.293a1 1 0 011.414 0zm2.828 2.829a1 1 0 010 1.414l-1.293 1.293a1 1 0 01-1.414-1.414l1.293-1.293a1 1 0 011.414 0zm2.828 2.829a1 1 0 010 1.414l-1.293 1.293a1 1 0 01-1.414-1.414l1.293-1.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <p>Please pay within 15 days of receiving this invoice.</p>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-12 py-6 border-t border-gray-200 bg-white" style={{ bottom: '0', width: '100%', boxSizing: 'border-box' }}>
                    <p className="text-sm text-gray-600">www.website.com</p>
                    <p className="text-sm text-gray-600">+91 00000 00000</p>
                    <p className="text-sm text-gray-600">hello@email.com</p>
                </div>
            </div>
        </div>
    );
}