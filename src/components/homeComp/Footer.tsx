import React from 'react';
import { Button } from "@/components/ui/button";
import {
    FileText,
    Globe,
    Mail,
    Phone,
    MapPin
} from "lucide-react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4 text-start">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-sky-500 rounded-xl flex items-center justify-center">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold">BillWise</span>
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            The professional way to create, send, and track invoices.
                            Trusted by businesses worldwide.
                        </p>
                        <div className="flex space-x-4">
                            <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors">
                                <Globe className="w-4 h-4" />
                            </div>
                            <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors">
                                <Phone className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div className="text-start">
                        <h4 className="font-semibold mb-4">Product</h4>
                        <div className="space-y-3">
                            <a href="#features" className="block text-slate-400 hover:text-white transition-colors">Features</a>
                            <a href="#templates" className="block text-slate-400 hover:text-white transition-colors">Templates</a>
                            <a href="#pricing" className="block text-slate-400 hover:text-white transition-colors">Pricing</a>
                            <a href="#integrations" className="block text-slate-400 hover:text-white transition-colors">Integrations</a>
                            <a href="#api" className="block text-slate-400 hover:text-white transition-colors">API</a>
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="text-start">
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <div className="space-y-3">
                            <a href="#help" className="block text-slate-400 hover:text-white transition-colors">Help Center</a>
                            <a href="#guides" className="block text-slate-400 hover:text-white transition-colors">Guides</a>
                            <a href="#blog" className="block text-slate-400 hover:text-white transition-colors">Blog</a>
                            <a href="#community" className="block text-slate-400 hover:text-white transition-colors">Community</a>
                            <a href="#status" className="block text-slate-400 hover:text-white transition-colors">Status</a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="text-start">
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-slate-400">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">support@BillWise.com</span>
                            </div>
                            <div className="flex items-center space-x-3 text-slate-400">
                                <Phone className="w-4 h-4" />
                                <span className="text-sm">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-3 text-slate-400">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">San Francisco, CA</span>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="mt-6">
                            <h5 className="font-medium mb-3">Stay Updated</h5>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 text-sm"
                                />
                                <Button className="bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 rounded-lg">
                                    <Mail className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center text-center lg:text-left">
                    <div className="text-slate-400 text-sm">
                        © 2024 BillWise. All rights reserved.
                    </div>
                    <div className="flex flex-wrap justify-center lg:justify-end space-x-6 text-sm text-slate-400 mt-4 lg:mt-0">
                        <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#cookies" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;