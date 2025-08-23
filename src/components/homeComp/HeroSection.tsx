import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, CheckCircle } from "lucide-react";
import InvoicePreview from './InvoicePreview';
import { HeroSectionProps } from '@/types';

const HeroSection: React.FC<HeroSectionProps> = ({ isVisible, onCreateInvoice }) => {
    return (
        <section className="pt-20 pb-16 bg-gradient-to-br from-slate-50 via-white to-teal-50">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
                    {/* Left Content */}
                    <div className={`space-y-6 lg:space-y-8 text-start transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                        }`}>
                        <div className="space-y-4 lg:space-y-6">
                            <Badge className="bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-100 w-fit">
                                <Star className="w-4 h-4 mr-2" />
                                Trusted by 25,000+ businesses worldwide
                            </Badge>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                                Create Professional{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-sky-500">
                                    Invoices
                                </span>{" "}
                                in Seconds
                            </h1>

                            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-lg">
                                Generate beautiful, tax-compliant invoices that get you paid faster.
                                Perfect for freelancers, small businesses, and enterprises.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Button
                                size="lg"
                                onClick={onCreateInvoice}
                                className="bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto"
                            >
                                Start Creating Free Invoices
                                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-slate-500">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4 text-teal-500" />
                                    <span>No credit card required</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4 text-teal-500" />
                                    <span>3 free downloads</span>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 lg:gap-6 pt-6 lg:pt-8 border-t border-slate-200">
                            <div className="text-start">
                                <div className="text-xl lg:text-2xl font-bold text-slate-900">25K+</div>
                                <div className="text-xs lg:text-sm text-slate-500">Happy Users</div>
                            </div>
                            <div className="text-start">
                                <div className="text-xl lg:text-2xl font-bold text-slate-900">1M+</div>
                                <div className="text-xs lg:text-sm text-slate-500">Invoices Created</div>
                            </div>
                            <div className="text-start">
                                <div className="text-xl lg:text-2xl font-bold text-slate-900">99.9%</div>
                                <div className="text-xs lg:text-sm text-slate-500">Uptime</div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Interactive Invoice Preview */}
                    <div className={`relative transition-all duration-1000 delay-300 order-last ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                        }`}>
                        <InvoicePreview />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;