import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Award,
    ChevronDown,
    Mail,
    FileText
} from "lucide-react";
import { FAQ, FAQSectionProps } from '@/types';

const FAQSection: React.FC<FAQSectionProps> = ({ openFaq, setOpenFaq }) => {
    const faqs: FAQ[] = [
        {
            question: "How many invoices can I create for free?",
            answer: "You can create and download up to 3 professional invoices completely free, with no signup required. After that, our affordable premium plans start at just $9/month."
        },
        {
            question: "Are my invoice data secure?",
            answer: "Absolutely. We use bank-level encryption to protect your data. All invoices are processed securely and we never store sensitive client information without your permission."
        },
        {
            question: "Can I customize the invoice templates?",
            answer: "Yes! You can fully customize colors, fonts, logos, and layout. Add your business branding, custom fields, and even create your own templates from scratch."
        },
        {
            question: "Do you support multiple currencies?",
            answer: "Yes, we support over 150 currencies with real-time exchange rates. You can also set up automatic tax calculations for different regions."
        },
        {
            question: "Can I track payment status?",
            answer: "With our premium features, you can send invoices directly via email, track when they're opened, and receive notifications when payments are made."
        },
        {
            question: "Is there mobile app available?",
            answer: "While we don't have a dedicated mobile app yet, our web platform is fully responsive and works perfectly on all mobile devices and tablets."
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-muted via-background to-secondary/10">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="md:text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary rounded-full px-6 py-2 text-sm font-medium mb-6">
                        <Award className="w-4 h-4" />
                        <span>Got Questions? We've Got Answers</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg sm:text-xl text-muted-foreground">
                        Everything you need to know about creating professional invoices
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`group ${openFaq === index
                                ? 'bg-gradient-to-br from-secondary/10 to-primary/10 border-secondary shadow-lg'
                                : 'bg-card border-border hover:border-secondary hover:shadow-md'
                                } border-2 rounded-2xl overflow-hidden transition-all duration-300`}
                        >
                            <button
                                className="w-full text-left p-4 sm:p-6 transition-all duration-300"
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <h3 className={`font-bold text-base sm:text-lg leading-tight text-start ${openFaq === index ? 'text-secondary' : 'text-foreground group-hover:text-secondary'
                                        } transition-colors`}>
                                        {faq.question}
                                    </h3>
                                    <div className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === index
                                        ? 'bg-secondary text-secondary-foreground rotate-180'
                                        : 'bg-muted text-muted-foreground group-hover:bg-secondary/10 group-hover:text-secondary'
                                        }`}>
                                        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </div>
                                </div>
                            </button>

                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}>
                                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                                    <div className="w-full h-px bg-gradient-to-r from-secondary to-primary mb-4"></div>
                                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base text-start">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Help Section */}
                <div className="mt-16 text-center">
                    <Card className="bg-gradient-to-r from-secondary to-primary border-0 shadow-xl text-primary-foreground max-w-2xl mx-auto">
                        <CardContent className="p-6 sm:p-8">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                                    <Mail className="w-6 h-6 sm:w-8 sm:h-8" />
                                </div>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-3">Still Have Questions?</h3>
                            <p className="text-primary-foreground/90 mb-6 text-base sm:text-lg">
                                Our support team is here to help you get the most out of BillWise
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    className="bg-background text-primary hover:bg-background/90 font-semibold"
                                    size="lg"
                                >
                                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    Contact Support
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold"
                                    size="lg"
                                >
                                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    View Documentation
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;