import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
    Zap,
    Palette,
    FileCheck,
    Send,
    CreditCard,
    BarChart3
} from "lucide-react";
import { Feature } from '@/types';

const FeaturesSection: React.FC = () => {
    const features: Feature[] = [
        {
            icon: Zap,
            title: "Lightning Fast Generation",
            description: "Create professional invoices in under 30 seconds with our intuitive interface",
            color: "from-sky-400 to-teal-500"
        },
        {
            icon: Palette,
            title: "Beautiful Templates",
            description: "Choose from dozens of professionally designed templates that match your brand",
            color: "from-teal-400 to-sky-500"
        },
        {
            icon: FileCheck,
            title: "Tax Compliance Ready",
            description: "Built-in tax calculations and compliance features for different regions",
            color: "from-sky-500 to-teal-600"
        },
        {
            icon: Send,
            title: "Send & Track",
            description: "Email invoices directly and track when they're opened and paid",
            color: "from-teal-500 to-sky-400"
        },
        {
            icon: CreditCard,
            title: "Payment Integration",
            description: "Accept payments online with integrated payment gateway support",
            color: "from-sky-600 to-teal-500"
        },
        {
            icon: BarChart3,
            title: "Analytics Dashboard",
            description: "Track your invoicing performance with detailed analytics and reports",
            color: "from-teal-600 to-sky-600"
        }
    ];

    return (
        <section id="features" className="py-20 bg-muted">
            <div className="container mx-auto px-4">
                <div className="md:text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Everything You Need to Invoice Like a Pro
                    </h2>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Our comprehensive invoice generator comes packed with features designed to streamline your billing process and get you paid faster.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card">
                            <CardContent className="p-6 lg:p-8 text-start">
                                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 lg:mb-6`}>
                                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;