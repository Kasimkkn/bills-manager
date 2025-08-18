import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Palette,
    Download,
    Star,
    ArrowRight,
    Globe,
    FileCheck,
    Smartphone
} from "lucide-react";
import { Template, TemplatesSectionProps } from '@/types';

const TemplatesSection: React.FC<TemplatesSectionProps> = ({ onCreateInvoice }) => {
    const templates: Template[] = [
        {
            name: "Modern Professional",
            category: "Modern",
            color: "from-teal-500 to-sky-500",
            preview: {
                headerColor: "bg-gradient-to-r from-teal-500 to-sky-500",
                accentColor: "border-teal-200 bg-teal-50",
                textColor: "text-teal-700"
            }
        },
        {
            name: "Classic Business",
            category: "Classic",
            color: "from-slate-600 to-slate-800",
            preview: {
                headerColor: "bg-gradient-to-r from-slate-600 to-slate-800",
                accentColor: "border-slate-200 bg-slate-50",
                textColor: "text-slate-700"
            }
        },
        {
            name: "Creative Studio",
            category: "Creative",
            color: "from-purple-500 to-pink-500",
            preview: {
                headerColor: "bg-gradient-to-r from-purple-500 to-pink-500",
                accentColor: "border-purple-200 bg-purple-50",
                textColor: "text-purple-700"
            }
        },
        {
            name: "Minimal Clean",
            category: "Minimal",
            color: "from-gray-400 to-gray-600",
            preview: {
                headerColor: "bg-gradient-to-r from-gray-400 to-gray-600",
                accentColor: "border-gray-200 bg-gray-50",
                textColor: "text-gray-700"
            }
        },
        {
            name: "Bold Impact",
            category: "Creative",
            color: "from-orange-500 to-red-500",
            preview: {
                headerColor: "bg-gradient-to-r from-orange-500 to-red-500",
                accentColor: "border-orange-200 bg-orange-50",
                textColor: "text-orange-700"
            }
        },
        {
            name: "Corporate Elite",
            category: "Corporate",
            color: "from-blue-600 to-indigo-600",
            preview: {
                headerColor: "bg-gradient-to-r from-blue-600 to-indigo-600",
                accentColor: "border-blue-200 bg-blue-50",
                textColor: "text-blue-700"
            }
        }
    ];

    return (
        <section id="templates" className="py-20 bg-gradient-to-br from-slate-50 via-white to-teal-50">
            <div className="container mx-auto px-4">
                <div className="md:text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-100 to-sky-100 text-teal-700 rounded-full px-6 py-2 text-sm font-medium mb-6">
                        <Palette className="w-4 h-4" />
                        <span>Beautiful Templates</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        Professional Templates for Every Business
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
                        Choose from our collection of stunning, professionally designed invoice templates.
                        Each template is fully customizable to match your brand.
                    </p>
                </div>

                {/* Templates Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
                    {templates.map((template, index) => (
                        <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border-0 shadow-lg">
                            <CardContent className="p-0">
                                {/* Template Preview */}
                                <div className="bg-white p-4 sm:p-6 relative overflow-hidden">
                                    {/* Mini Invoice Preview */}
                                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden transform scale-90 group-hover:scale-95 transition-transform duration-300">
                                        {/* Header */}
                                        <div className={`${template.preview.headerColor} p-3`}>
                                            <div className="flex justify-between items-center">
                                                <div className="text-white text-xs sm:text-sm font-bold">INVOICE</div>
                                                <div className="w-4 h-4 sm:w-6 sm:h-6 bg-white/20 rounded"></div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-3 space-y-2">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className={`${template.preview.accentColor} border rounded p-2`}>
                                                    <div className="h-1 bg-slate-300 rounded mb-1"></div>
                                                    <div className="h-1 bg-slate-200 rounded w-3/4"></div>
                                                </div>
                                                <div className={`${template.preview.accentColor} border rounded p-2`}>
                                                    <div className="h-1 bg-slate-300 rounded mb-1"></div>
                                                    <div className="h-1 bg-slate-200 rounded w-2/3"></div>
                                                </div>
                                            </div>

                                            {/* Items */}
                                            <div className="space-y-1">
                                                <div className="h-1 bg-slate-200 rounded"></div>
                                                <div className="h-1 bg-slate-200 rounded w-5/6"></div>
                                                <div className="h-1 bg-slate-200 rounded w-4/5"></div>
                                            </div>

                                            {/* Total */}
                                            <div className={`${template.preview.accentColor} border rounded p-2 flex justify-between items-center`}>
                                                <div className="h-1 bg-slate-300 rounded w-1/4"></div>
                                                <div className={`h-2 ${template.preview.headerColor} rounded w-1/3`}></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                        <Button
                                            size="sm"
                                            className="bg-white text-slate-900 hover:bg-slate-50 shadow-lg text-xs sm:text-sm"
                                            onClick={onCreateInvoice}
                                        >
                                            Preview Template
                                        </Button>
                                    </div>
                                </div>

                                {/* Template Info */}
                                <div className="p-4 sm:p-6 border-t border-slate-100 bg-white text-start">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">{template.name}</h3>
                                            <Badge variant="outline" className={`text-xs ${template.preview.textColor} border-current`}>
                                                {template.category}
                                            </Badge>
                                        </div>
                                        <div className="flex space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500">
                                            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                                            <span>1.2k downloads</span>
                                        </div>
                                        <Button
                                            size="sm"
                                            className={`bg-gradient-to-r ${template.color} hover:shadow-lg text-white text-xs sm:text-sm`}
                                            onClick={onCreateInvoice}
                                        >
                                            Use Template
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Template Features */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
                    <div className="text-center mb-8">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Every Template Includes</h3>
                        <p className="text-slate-600">Professional features built into every design</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Palette,
                                title: "Brand Customization",
                                description: "Add your logo, colors, and fonts"
                            },
                            {
                                icon: Globe,
                                title: "Multi-Currency",
                                description: "Support for 150+ currencies"
                            },
                            {
                                icon: FileCheck,
                                title: "Tax Compliance",
                                description: "Built-in tax calculations"
                            },
                            {
                                icon: Smartphone,
                                title: "Mobile Optimized",
                                description: "Perfect on any device"
                            }
                        ].map((feature, index) => (
                            <div key={index} className="text-center group">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-500 to-sky-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <h4 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">{feature.title}</h4>
                                <p className="text-xs sm:text-sm text-slate-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Button
                        size="lg"
                        onClick={onCreateInvoice}
                        className="bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Browse All Templates
                        <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default TemplatesSection;