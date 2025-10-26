import React from 'react';
import { Building, Users, FileText, Globe, Award } from "lucide-react";

const TrustSection: React.FC = () => {
    const companies = [
        { name: "TechCorp", logo: "TC" },
        { name: "DesignPro", logo: "DP" },
        { name: "BuildMax", logo: "BM" },
        { name: "CreativeHub", logo: "CH" },
        { name: "InnovateLab", logo: "IL" },
        { name: "GlobalTech", logo: "GT" },
        { name: "SmartSolutions", logo: "SS" },
        { name: "NextGen", logo: "NG" }
    ];

    const businessTypes = [
        { name: "Freelancers", icon: "💼", count: "12K+", color: "from-blue-500 to-purple-500" },
        { name: "Agencies", icon: "🎯", count: "3.2K+", color: "from-teal-500 to-cyan-500" },
        { name: "Consultants", icon: "💡", count: "4.8K+", color: "from-green-500 to-teal-500" },
        { name: "Suppliers", icon: "📦", count: "2.1K+", color: "from-orange-500 to-red-500" },
        { name: "Contractors", icon: "🔧", count: "1.9K+", color: "from-purple-500 to-pink-500" },
        { name: "Startups", icon: "🚀", count: "1.0K+", color: "from-indigo-500 to-blue-500" }
    ];

    const testimonialMarquee = [
        { text: "Cut my invoicing time by 80%", author: "Sarah K.", role: "Designer" },
        { text: "Professional invoices that impress clients", author: "Mike R.", role: "Developer" },
        { text: "Finally, invoicing that doesn't suck", author: "Emma L.", role: "Consultant" },
        { text: "My clients pay faster now", author: "David C.", role: "Agency Owner" },
        { text: "Seamless and beautifully designed", author: "Lisa M.", role: "Freelancer" },
        { text: "Best invoicing tool I've used", author: "Tom H.", role: "Contractor" },
        { text: "Cut my invoicing time by 80%", author: "Sarah K.", role: "Designer" },
        { text: "Professional invoices that impress clients", author: "Mike R.", role: "Developer" }
    ];

    return (
        <section className="py-20 bg-gradient-to-r from-slate-50 via-white to-slate-50 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="md:text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-100 to-sky-100 text-teal-700 rounded-full px-6 py-2 text-sm font-medium mb-4">
                        <Building className="w-4 h-4" />
                        <span>Trusted Worldwide</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                        Join 25,000+ Happy Businesses
                    </h2>
                    <p className="text-slate-600">From startups to enterprises, businesses trust BillWise</p>
                </div>

                {/* Company Types Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
                    {businessTypes.map((type, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-teal-200 hover:-translate-y-1">
                                <div className="text-center">
                                    <div className="text-2xl mb-3">{type.icon}</div>
                                    <div className="text-lg font-bold text-slate-900 mb-1">{type.count}</div>
                                    <div className="text-sm text-slate-600 font-medium">{type.name}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Achievement Stats */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        <div className="text-center group">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-500 to-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">25,000+</div>
                            <div className="text-xs sm:text-sm text-slate-600 font-medium">Happy Users</div>
                        </div>
                        <div className="text-center group">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-sky-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">2.5M+</div>
                            <div className="text-xs sm:text-sm text-slate-600 font-medium">Invoices Created</div>
                        </div>
                        <div className="text-center group">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-500 to-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">180+</div>
                            <div className="text-xs sm:text-sm text-slate-600 font-medium">Countries</div>
                        </div>
                        <div className="text-center group">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-sky-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">99.9%</div>
                            <div className="text-xs sm:text-sm text-slate-600 font-medium">Uptime</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;