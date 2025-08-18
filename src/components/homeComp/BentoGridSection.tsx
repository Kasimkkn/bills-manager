// components/BentoGridSection.tsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
    TrendingUp,
    Smartphone,
    Lock,
    Globe,
    Save,
    Printer
} from "lucide-react";

const BentoGridSection: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="md:text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        Powerful Features for Modern Businesses
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-600">
                        Discover the tools that make invoicing effortless and professional
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {/* Large Card */}
                    <Card className="sm:col-span-2 lg:row-span-2 bg-gradient-to-br from-teal-50 to-sky-50 border-0 shadow-lg">
                        <CardContent className="p-6 sm:p-8 h-full flex flex-col justify-between">
                            <div className="text-start">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-sky-500 flex items-center justify-center mb-6">
                                    <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Analytics & Insights</h3>
                                <p className="text-slate-600 mb-6">Track your invoicing performance with detailed analytics, payment trends, and client insights.</p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                                    <span className="text-sm text-slate-600">Paid Invoices</span>
                                    <span className="font-bold text-green-600">87%</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                                    <span className="text-sm text-slate-600">Avg. Payment Time</span>
                                    <span className="font-bold text-teal-600">12 days</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Medium Cards */}
                    <Card className="bg-white border-0 shadow-lg">
                        <CardContent className="p-4 sm:p-6 text-start">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center mb-4">
                                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Mobile Ready</h3>
                            <p className="text-slate-600 text-sm">Create invoices on any device, anywhere</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-0 shadow-lg">
                        <CardContent className="p-4 sm:p-6 text-start">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-teal-400 to-sky-500 flex items-center justify-center mb-4">
                                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Secure & Private</h3>
                            <p className="text-slate-600 text-sm">Bank-level security for your data</p>
                        </CardContent>
                    </Card>

                    <Card className="sm:col-span-2 bg-gradient-to-r from-sky-500 to-teal-500 border-0 shadow-lg text-white">
                        <CardContent className="p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="text-start mb-4 sm:mb-0">
                                    <h3 className="text-xl sm:text-2xl font-bold mb-2">Multi-Currency Support</h3>
                                    <p className="opacity-90">Invoice clients worldwide in their preferred currency</p>
                                </div>
                                <Globe className="w-12 h-12 sm:w-16 sm:h-16 opacity-20 self-start sm:self-auto" />
                            </div>
                            <div className="mt-6 flex space-x-4">
                                <div className="bg-white/20 rounded-lg p-3 text-center">
                                    <div className="font-bold text-sm sm:text-base">150+</div>
                                    <div className="text-xs opacity-80">Currencies</div>
                                </div>
                                <div className="bg-white/20 rounded-lg p-3 text-center">
                                    <div className="font-bold text-sm sm:text-base">Real-time</div>
                                    <div className="text-xs opacity-80">Exchange</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-0 shadow-lg">
                        <CardContent className="p-4 sm:p-6 text-start">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-teal-500 to-sky-400 flex items-center justify-center mb-4">
                                <Save className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Auto-Save</h3>
                            <p className="text-slate-600 text-sm">Never lose your work again</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-0 shadow-lg">
                        <CardContent className="p-4 sm:p-6 text-start">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-sky-500 to-teal-400 flex items-center justify-center mb-4">
                                <Printer className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Print Ready</h3>
                            <p className="text-slate-600 text-sm">Perfect formatting for printing</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default BentoGridSection;