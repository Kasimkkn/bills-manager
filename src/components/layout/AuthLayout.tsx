
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, FileText, Shield, Zap } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
    isFormRightSide?: boolean;
    rightContent?: React.ReactNode;
}
const AuthLayout = ({ children, isFormRightSide = false, rightContent }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-background overflow-hidden">
            {/* Form Section */}
            <div
                className={`flex-1 flex items-center justify-center p-6 md:p-12 relative ${isFormRightSide ? 'lg:order-2' : 'lg:order-1'
                    }`}
            >
                <div className="w-full max-w-md relative z-10">
                    {children}
                </div>
            </div>

            {/* Brand/Feature Section */}
            <div
                className={`max-md:hidden flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-hidden ${isFormRightSide ? 'lg:order-1' : 'lg:order-2'
                    }`}
                style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary-700)) 0%, hsl(var(--primary-600)) 50%, hsl(var(--primary)) 100%)'
                }}
            >
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white rounded-full blur-3xl" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '1s' }} />
                </div>

                <div className="relative z-10 max-w-xl text-foreground">
                    {rightContent || (
                        <div className="space-y-8">
                            {/* Logo & Tagline */}
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                                    <FileText className="w-6 h-6" />
                                    <span className="text-2xl font-bold">BillWise</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                    Bill Banayein,<br />Business Badhaayein
                                </h1>
                                <p className="text-xl text-foreground">
                                    India's simplest invoice generator for small businesses
                                </p>
                            </div>

                            {/* Feature highlights */}
                            <div className="space-y-4">
                                {[
                                    { icon: Zap, text: 'Generate invoices in seconds' },
                                    { icon: Shield, text: 'GST-compliant & professional' },
                                    { icon: CheckCircle2, text: 'No signup needed to start' }
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm px-5 py-4 rounded-xl border border-white/20 transform hover:scale-105 transition-transform duration-300">
                                        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                                            <feature.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-lg font-medium">{feature.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Trust indicator */}
                            <div className="pt-6 border-t border-foreground/60">
                                <p className="text-sm text-foreground">
                                    Trusted by <span className="font-bold text-foreground">10,000+</span> Indian businesses
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;