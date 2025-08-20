import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { NavigationProps } from '@/types';

const Navigation: React.FC<NavigationProps> = ({ onCreateInvoice, onViewDashboard }) => {
    return (
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg border-b border-slate-200 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-sky-500 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-800">InvoiceGen</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-slate-600 hover:text-teal-600 transition-colors">Features</a>
                        <a href="#templates" className="text-slate-600 hover:text-teal-600 transition-colors">Templates</a>
                        <a href="#pricing" className="text-slate-600 hover:text-teal-600 transition-colors">Pricing</a>
                        <a href="#testimonials" className="text-slate-600 hover:text-teal-600 transition-colors">Reviews</a>
                        {onViewDashboard && (
                            <a href="/dashboard" className="text-slate-600 hover:text-teal-600 transition-colors">
                                Dashboard
                            </a>
                        )}
                    </div>

                    <Button
                        onClick={onCreateInvoice}
                        className="max-md:hidden bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white text-sm md:text-base px-4 md:px-6"
                    >
                        Get Started Free
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;