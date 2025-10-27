import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { NavigationProps } from '@/types';
import { Link } from 'react-router-dom';

const Navigation: React.FC<NavigationProps> = ({ onCreateInvoice }) => {
    return (
        <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-lg border-b border-border z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold text-foreground">BillWise</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-muted-foreground hover:text-secondary transition-colors">Features</a>
                        <a href="#templates" className="text-muted-foreground hover:text-secondary transition-colors">Templates</a>
                        <a href="#pricing" className="text-muted-foreground hover:text-secondary transition-colors">Pricing</a>
                        <a href="#testimonials" className="text-muted-foreground hover:text-secondary transition-colors">Reviews</a>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <Button
                            onClick={onCreateInvoice}
                            className="max-md:hidden bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-primary-foreground text-sm md:text-base px-4 md:px-6"
                        >
                            Create Now
                        </Button>
                        <Button
                            className="bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-primary-foreground text-sm md:text-base px-4 md:px-6"
                        >
                            <Link to="/login">Log In</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;