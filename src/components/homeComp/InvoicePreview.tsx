import React from 'react';
import { FileText, CheckCircle, DollarSign, Send } from "lucide-react";

const InvoicePreview: React.FC = () => {
    return (
        <div className="relative">
            {/* Main Invoice with Enhanced Design */}
            <div className="bg-white rounded-2xl lg:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 transform rotate-1 hover:rotate-0 transition-all duration-500 hover:shadow-3xl border border-slate-100">
                <div className="space-y-4 lg:space-y-6">
                    {/* Enhanced Header */}
                    <div className="flex justify-between items-start">
                        <div className="text-start">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                INVOICE
                            </h2>
                            <div className="flex items-center space-x-2 mt-1">
                                <span className="text-slate-500 text-xs sm:text-sm">#INV-2024-</span>
                                <div className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs font-medium">001</div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-teal-500 to-sky-500 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg">
                                <FileText className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                <CheckCircle className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Company Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
                        <div className="space-y-2 text-start">
                            <h3 className="font-bold  text-xs sm:text-sm uppercase tracking-wide text-teal-600">From:</h3>
                            <div className="bg-teal-50 rounded-lg p-3 border border-teal-100">
                                <div className="space-y-1 text-xs sm:text-sm">
                                    <div className="font-bold text-slate-900">Design Studio Pro</div>
                                    <div className="text-slate-600">123 Creative Street</div>
                                    <div className="text-slate-600">San Francisco, CA 94102</div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 text-start">
                            <h3 className="font-bold  text-xs sm:text-sm uppercase tracking-wide text-teal-600">To:</h3>
                            <div className="bg-sky-50 rounded-lg p-3 border border-sky-100">
                                <div className="space-y-1 text-xs sm:text-sm">
                                    <div className="font-bold text-slate-900">TechCorp Inc.</div>
                                    <div className="text-slate-600">456 Business Ave</div>
                                    <div className="text-slate-600">New York, NY 10001</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Invoice Details */}
                    <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div className="bg-slate-50 rounded-lg p-3 text-start">
                            <div className="text-slate-500 font-medium">Invoice Date</div>
                            <div className="font-bold text-slate-900">Jan 15, 2024</div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3 text-start">
                            <div className="text-slate-500 font-medium">Due Date</div>
                            <div className="font-bold text-slate-900">Feb 14, 2024</div>
                        </div>
                    </div>

                    {/* Enhanced Invoice Items */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-teal-500 to-sky-500 px-4 py-3">
                            <div className="grid grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm font-semibold text-white">
                                <div className="text-start">Description</div>
                                <div className="text-start">Qty</div>
                                <div className="text-start">Rate</div>
                                <div className="text-right">Amount</div>
                            </div>
                        </div>
                        <div className="divide-y divide-slate-100">
                            <div className="px-4 py-4 grid grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm hover:bg-slate-50 transition-colors">
                                <div className="font-medium text-slate-900 text-start">UI/UX Design</div>
                                <div className="text-slate-600 text-start">1</div>
                                <div className="text-slate-600 text-start">$2,500</div>
                                <div className="text-right font-semibold text-slate-900">$2,500</div>
                            </div>
                            <div className="px-4 py-4 grid grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm hover:bg-slate-50 transition-colors">
                                <div className="font-medium text-slate-900 text-start">Development</div>
                                <div className="text-slate-600 text-start">40hrs</div>
                                <div className="text-slate-600 text-start">$75</div>
                                <div className="text-right font-semibold text-slate-900">$3,000</div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Total Section */}
                    <div className="bg-gradient-to-br from-slate-50 to-teal-50 rounded-xl p-4 border border-teal-100">
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs sm:text-sm">
                                <span className="text-slate-600">Subtotal:</span>
                                <span className="font-medium text-slate-900">$6,250.00</span>
                            </div>
                            <div className="flex justify-between text-xs sm:text-sm">
                                <span className="text-slate-600">Tax (8.5%):</span>
                                <span className="font-medium text-slate-900">$531.25</span>
                            </div>
                            <div className="border-t border-teal-200 pt-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-base sm:text-lg font-bold text-slate-900">Total:</span>
                                    <span className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent">
                                        $6,781.25
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Floating Elements */}
            <div className="absolute -top-4 -right-4 sm:-top-0 sm:right-32 bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 border border-green-200 animate-bounce">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm font-semibold text-green-700">PDF Ready</span>
                </div>
            </div>

            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 border border-teal-200 animate-pulse">
                <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" />
                    <span className="text-xs sm:text-sm font-semibold text-teal-700">Tax Calculated</span>
                </div>
            </div>

            <div className="absolute top-1/2 -left-3 sm:-left-4 bg-white rounded-lg sm:rounded-xl shadow-lg p-2 sm:p-3 border border-sky-200">
                <div className="flex items-center space-x-2">
                    <Send className="w-3 h-3 sm:w-4 sm:h-4 text-sky-500" />
                    <span className="text-xs font-medium text-sky-700 hidden sm:block">Send Email</span>
                </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute -z-10 top-10 right-10 w-24 h-24 sm:w-32 sm:h-32 bg-teal-100 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -z-10 bottom-10 left-10 w-20 h-20 sm:w-24 sm:h-24 bg-sky-100 rounded-full opacity-20 blur-xl"></div>
        </div>
    );
};

export default InvoicePreview;