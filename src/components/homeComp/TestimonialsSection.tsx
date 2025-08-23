import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { Testimonial } from '@/types';

const TestimonialsSection: React.FC = () => {
    const testimonials: Testimonial[] = [
        {
            name: "Sarah Johnson",
            role: "Freelance Designer",
            company: "Creative Studios",
            rating: 5,
            text: "InvoiceGen has revolutionized my billing process. What used to take me hours now takes minutes. The professional templates make my business look more established."
        },
        {
            name: "Michael Chen",
            role: "Small Business Owner",
            company: "Tech Innovations",
            rating: 5,
            text: "The payment tracking feature alone is worth it. I can see exactly when clients receive and pay their invoices. My cash flow has improved significantly."
        },
        {
            name: "Emily Rodriguez",
            role: "Consulting Manager",
            company: "Business Solutions Inc",
            rating: 5,
            text: "Our team loves how easy it is to create branded invoices. The tax compliance features save us hours of manual calculations every month."
        }
    ];

    return (
        <section id="testimonials" className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="md:text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        What Our Users Say
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-600">
                        Join thousands of satisfied businesses who trust InvoiceGen
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="border-0 shadow-lg bg-white">
                            <CardContent className="p-6 sm:p-8 text-start">
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-teal-200 mb-4" />
                                <p className="text-slate-600 mb-6 italic text-sm sm:text-base">"{testimonial.text}"</p>
                                <div>
                                    <div className="font-semibold text-slate-900 text-sm sm:text-base">{testimonial.name}</div>
                                    <div className="text-xs sm:text-sm text-slate-500">{testimonial.role}</div>
                                    <div className="text-xs sm:text-sm text-teal-600">{testimonial.company}</div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;