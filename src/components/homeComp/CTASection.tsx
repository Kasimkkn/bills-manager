import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { CTASectionProps } from '@/types';

const CTASection: React.FC<CTASectionProps> = ({ onCreateInvoice }) => {
    return (
        <section className="py-20 bg-gradient-to-br from-teal-500 to-sky-500">
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        Ready to Create Professional Invoices?
                    </h2>
                    <p className="text-lg sm:text-xl text-teal-100 mb-8">
                        Join 25,000+ businesses who trust BillWise for their invoicing needs.
                        Start creating beautiful invoices today - no credit card required.
                    </p>

                    <div className="space-y-4">
                        <Button
                            size="lg"
                            onClick={onCreateInvoice}
                            className="bg-white text-teal-600 hover:bg-slate-50 text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                        >
                            Start Creating Free Invoices
                            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                        </Button>

                        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-teal-100">
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-sm sm:text-base">3 Free Downloads</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-sm sm:text-base">No Signup Required</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-sm sm:text-base">Instant Access</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;