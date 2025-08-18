import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  FileText,
  Zap,
  Smartphone,
  Shield,
  Star,
  Users,
  Download,
  Clock,
  CheckCircle,
  DollarSign,
  Building,
  Globe,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  Quote,
  Award,
  TrendingUp,
  BarChart3,
  CreditCard,
  Save,
  Palette,
  FileCheck,
  Printer,
  Send,
  Lock
} from "lucide-react";
import { useState, useEffect } from "react";

interface LandingHeroProps {
  onCreateInvoice: () => void;
  onViewDashboard: () => void
}

const ProfessionalLandingPage = ({ onCreateInvoice, onViewDashboard }: LandingHeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);

    // Add marquee animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        animation: marquee 30s linear infinite;
      }
      .animate-marquee:hover {
        animation-play-state: paused;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

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

  const features = [
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

  const testimonials = [
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

  const faqs = [
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
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
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
              {onViewDashboard && <a href="/dashboard" className="text-slate-600 hover:text-teal-600 transition-colors">Dashboard</a>}
            </div>

            <Button
              onClick={onCreateInvoice}
              className="bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white"
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-slate-50 via-white to-teal-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="space-y-6">
                <Badge className="bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-100">
                  <Star className="w-4 h-4 mr-2" />
                  Trusted by 25,000+ businesses worldwide
                </Badge>

                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Create Professional{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-sky-500">
                    Invoices
                  </span>{" "}
                  in Seconds
                </h1>

                <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                  Generate beautiful, tax-compliant invoices that get you paid faster.
                  Perfect for freelancers, small businesses, and enterprises.
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  size="lg"
                  onClick={onCreateInvoice}
                  className="bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Start Creating Free Invoices
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="flex items-center space-x-6 text-sm text-slate-500">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    <span>3 free downloads</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">25K+</div>
                  <div className="text-sm text-slate-500">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">1M+</div>
                  <div className="text-sm text-slate-500">Invoices Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">99.9%</div>
                  <div className="text-sm text-slate-500">Uptime</div>
                </div>
              </div>
            </div>

            {/* Right - Interactive Invoice Preview */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="relative">
                {/* Main Invoice with Enhanced Design */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-all duration-500 hover:shadow-3xl border border-slate-100">
                  <div className="space-y-6">
                    {/* Enhanced Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">INVOICE</h2>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-slate-500 text-sm">#INV-2024-</span>
                          <div className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs font-medium">001</div>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-sky-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <FileText className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <CheckCircle className="w-2 h-2 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Company Info */}
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide text-teal-600">From:</h3>
                        <div className="bg-teal-50 rounded-lg p-3 border border-teal-100">
                          <div className="space-y-1 text-sm">
                            <div className="font-bold text-slate-900">Design Studio Pro</div>
                            <div className="text-slate-600">123 Creative Street</div>
                            <div className="text-slate-600">San Francisco, CA 94102</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide text-teal-600">To:</h3>
                        <div className="bg-sky-50 rounded-lg p-3 border border-sky-100">
                          <div className="space-y-1 text-sm">
                            <div className="font-bold text-slate-900">TechCorp Inc.</div>
                            <div className="text-slate-600">456 Business Ave</div>
                            <div className="text-slate-600">New York, NY 10001</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Invoice Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-slate-500 font-medium">Invoice Date</div>
                        <div className="font-bold text-slate-900">Jan 15, 2024</div>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-slate-500 font-medium">Due Date</div>
                        <div className="font-bold text-slate-900">Feb 14, 2024</div>
                      </div>
                    </div>

                    {/* Enhanced Invoice Items */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      <div className="bg-gradient-to-r from-teal-500 to-sky-500 px-4 py-3">
                        <div className="grid grid-cols-4 gap-4 text-sm font-semibold text-white">
                          <div>Description</div>
                          <div>Qty</div>
                          <div>Rate</div>
                          <div className="text-right">Amount</div>
                        </div>
                      </div>
                      <div className="divide-y divide-slate-100">
                        <div className="px-4 py-4 grid grid-cols-4 gap-4 text-sm hover:bg-slate-50 transition-colors">
                          <div className="font-medium text-slate-900">UI/UX Design</div>
                          <div className="text-slate-600">1</div>
                          <div className="text-slate-600">$2,500</div>
                          <div className="text-right font-semibold text-slate-900">$2,500</div>
                        </div>
                        <div className="px-4 py-4 grid grid-cols-4 gap-4 text-sm hover:bg-slate-50 transition-colors">
                          <div className="font-medium text-slate-900">Development</div>
                          <div className="text-slate-600">40hrs</div>
                          <div className="text-slate-600">$75</div>
                          <div className="text-right font-semibold text-slate-900">$3,000</div>
                        </div>
                        <div className="px-4 py-4 grid grid-cols-4 gap-4 text-sm hover:bg-slate-50 transition-colors">
                          <div className="font-medium text-slate-900">Consultation</div>
                          <div className="text-slate-600">5hrs</div>
                          <div className="text-slate-600">$150</div>
                          <div className="text-right font-semibold text-slate-900">$750</div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Total Section */}
                    <div className="bg-gradient-to-br from-slate-50 to-teal-50 rounded-xl p-4 border border-teal-100">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Subtotal:</span>
                          <span className="font-medium">$6,250.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Tax (8.5%):</span>
                          <span className="font-medium">$531.25</span>
                        </div>
                        <div className="border-t border-teal-200 pt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-slate-900">Total:</span>
                            <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent">$6,781.25</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Floating Elements */}
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-green-200 animate-bounce">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-green-700">PDF Ready</span>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-teal-200 animate-pulse">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-teal-500" />
                    <span className="text-sm font-semibold text-teal-700">Tax Calculated</span>
                  </div>
                </div>

                <div className="absolute top-1/2 -left-4 bg-white rounded-xl shadow-lg p-3 border border-sky-200">
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4 text-sky-500" />
                    <span className="text-xs font-medium text-sky-700">Send Email</span>
                  </div>
                </div>

                {/* Background decorative elements */}
                <div className="absolute -z-10 top-10 right-10 w-32 h-32 bg-teal-100 rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -z-10 bottom-10 left-10 w-24 h-24 bg-sky-100 rounded-full opacity-20 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Social Proof Section */}
      <section className="py-20 bg-gradient-to-r from-slate-50 via-white to-slate-50 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-100 to-sky-100 text-teal-700 rounded-full px-6 py-2 text-sm font-medium mb-4">
              <Building className="w-4 h-4" />
              <span>Trusted Worldwide</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Join 25,000+ Happy Businesses
            </h2>
            <p className="text-slate-600">From startups to enterprises, businesses trust InvoiceGen</p>
          </div>

          {/* Company Types Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
            {[
              { name: "Freelancers", icon: "💼", count: "12K+", color: "from-blue-500 to-purple-500" },
              { name: "Agencies", icon: "🎯", count: "3.2K+", color: "from-teal-500 to-cyan-500" },
              { name: "Consultants", icon: "💡", count: "4.8K+", color: "from-green-500 to-teal-500" },
              { name: "Suppliers", icon: "📦", count: "2.1K+", color: "from-orange-500 to-red-500" },
              { name: "Contractors", icon: "🔧", count: "1.9K+", color: "from-purple-500 to-pink-500" },
              { name: "Startups", icon: "🚀", count: "1.0K+", color: "from-indigo-500 to-blue-500" }
            ].map((type, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-teal-200 hover:-translate-y-1">
                  <div className="text-center">
                    <div className="text-2xl mb-3">{type.icon}</div>
                    <div className="text-lg font-bold text-slate-900 mb-1">{type.count}</div>
                    <div className="text-sm text-slate-600 font-medium">{type.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Animated Testimonial Marquee */}
          <div className="relative mb-16">
            <div className="flex space-x-8 animate-marquee">
              {[
                { text: "Cut my invoicing time by 80%", author: "Sarah K.", role: "Designer" },
                { text: "Professional invoices that impress clients", author: "Mike R.", role: "Developer" },
                { text: "Finally, invoicing that doesn't suck", author: "Emma L.", role: "Consultant" },
                { text: "My clients pay faster now", author: "David C.", role: "Agency Owner" },
                { text: "Seamless and beautifully designed", author: "Lisa M.", role: "Freelancer" },
                { text: "Best invoicing tool I've used", author: "Tom H.", role: "Contractor" },
                { text: "Cut my invoicing time by 80%", author: "Sarah K.", role: "Designer" },
                { text: "Professional invoices that impress clients", author: "Mike R.", role: "Developer" }
              ].map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 bg-white rounded-xl p-6 shadow-sm border border-slate-100 min-w-80">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-sky-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{testimonial.author.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-700 font-medium mb-2">"{testimonial.text}"</p>
                      <div className="text-sm">
                        <span className="font-semibold text-slate-900">{testimonial.author}</span>
                        <span className="text-slate-500"> • {testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-10"></div>
          </div>

          {/* Achievement Stats */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">25,000+</div>
                <div className="text-sm text-slate-600 font-medium">Happy Users</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">2.5M+</div>
                <div className="text-sm text-slate-600 font-medium">Invoices Created</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">180+</div>
                <div className="text-sm text-slate-600 font-medium">Countries</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">99.9%</div>
                <div className="text-sm text-slate-600 font-medium">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Invoice Like a Pro
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our comprehensive invoice generator comes packed with features designed to streamline your billing process and get you paid faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      <section id="templates" className="py-20 bg-gradient-to-br from-slate-50 via-white to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-100 to-sky-100 text-teal-700 rounded-full px-6 py-2 text-sm font-medium mb-6">
              <Palette className="w-4 h-4" />
              <span>Beautiful Templates</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Professional Templates for Every Business
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose from our collection of stunning, professionally designed invoice templates.
              Each template is fully customizable to match your brand.
            </p>
          </div>

          {/* Template Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All Templates', 'Modern', 'Classic', 'Creative', 'Minimal', 'Corporate'].map((category, index) => (
              <Button
                key={category}
                variant={index === 0 ? "default" : "outline"}
                className={index === 0
                  ? "bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white"
                  : "border-slate-300 bg-white text-slate-600 hover:border-teal-500 hover:text-teal-600"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
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
            ].map((template, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border-0 shadow-lg">
                <CardContent className="p-0">
                  {/* Template Preview */}
                  <div className="bg-white p-6 relative overflow-hidden">
                    {/* Mini Invoice Preview */}
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden transform scale-90 group-hover:scale-95 transition-transform duration-300">
                      {/* Header */}
                      <div className={`${template.preview.headerColor} p-3`}>
                        <div className="flex justify-between items-center">
                          <div className="text-white text-sm font-bold">INVOICE</div>
                          <div className="w-6 h-6 bg-white/20 rounded"></div>
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
                        className="bg-white text-slate-900 hover:bg-slate-50 shadow-lg"
                        onClick={onCreateInvoice}
                      >
                        Preview Template
                      </Button>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-6 border-t border-slate-100 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">{template.name}</h3>
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
                      <div className="flex items-center space-x-2 text-sm text-slate-500">
                        <Download className="w-4 h-4" />
                        <span>1.2k downloads</span>
                      </div>
                      <Button
                        size="sm"
                        className={`bg-gradient-to-r ${template.color} hover:shadow-lg text-white`}
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
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Every Template Includes</h3>
              <p className="text-slate-600">Professional features built into every design</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-sky-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={onCreateInvoice}
              className="bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white text-lg px-12 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Browse All Templates
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>


      {/* Bento Grid Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Powerful Features for Modern Businesses
            </h2>
            <p className="text-xl text-slate-600">
              Discover the tools that make invoicing effortless and professional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Large Card */}
            <Card className="md:col-span-2 lg:row-span-2 bg-gradient-to-br from-teal-50 to-sky-50 border-0 shadow-lg">
              <CardContent className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-sky-500 flex items-center justify-center mb-6">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Analytics & Insights</h3>
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
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Mobile Ready</h3>
                <p className="text-slate-600 text-sm">Create invoices on any device, anywhere</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-sky-500 flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Secure & Private</h3>
                <p className="text-slate-600 text-sm">Bank-level security for your data</p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 bg-gradient-to-r from-sky-500 to-teal-500 border-0 shadow-lg text-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Multi-Currency Support</h3>
                    <p className="opacity-90">Invoice clients worldwide in their preferred currency</p>
                  </div>
                  <Globe className="w-16 h-16 opacity-20" />
                </div>
                <div className="mt-6 flex space-x-4">
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="font-bold">150+</div>
                    <div className="text-xs opacity-80">Currencies</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="font-bold">Real-time</div>
                    <div className="text-xs opacity-80">Exchange</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-sky-400 flex items-center justify-center mb-4">
                  <Save className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Auto-Save</h3>
                <p className="text-slate-600 text-sm">Never lose your work again</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-teal-400 flex items-center justify-center mb-4">
                  <Printer className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Print Ready</h3>
                <p className="text-slate-600 text-sm">Perfect formatting for printing</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-slate-600">
              Join thousands of satisfied businesses who trust InvoiceGen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-teal-200 mb-4" />
                  <p className="text-slate-600 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                    <div className="text-sm text-teal-600">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-teal-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-teal-100 text-teal-700 rounded-full px-6 py-2 text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              <span>Got Questions? We've Got Answers</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about creating professional invoices
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`group ${openFaq === index
                  ? 'bg-gradient-to-br from-teal-50 to-sky-50 border-teal-200 shadow-lg'
                  : 'bg-white border-slate-200 hover:border-teal-200 hover:shadow-md'
                  } border-2 rounded-2xl overflow-hidden transition-all duration-300`}
              >
                <button
                  className="w-full text-left p-6 transition-all duration-300"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <div className="flex justify-between items-start gap-4">
                    <h3 className={`font-bold text-lg leading-tight ${openFaq === index ? 'text-teal-700' : 'text-slate-900 group-hover:text-teal-600'
                      } transition-colors`}>
                      {faq.question}
                    </h3>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === index
                      ? 'bg-teal-500 text-white rotate-180'
                      : 'bg-slate-100 text-slate-400 group-hover:bg-teal-100 group-hover:text-teal-500'
                      }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                  <div className="px-6 pb-6">
                    <div className="w-full h-px bg-gradient-to-r from-teal-200 to-sky-200 mb-4"></div>
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Help Section */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-teal-500 to-sky-500 border-0 shadow-xl text-white max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
                <p className="text-teal-100 mb-6 text-lg">
                  Our support team is here to help you get the most out of InvoiceGen
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-white text-teal-600 hover:bg-slate-50 font-semibold"
                    size="lg"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Support
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-teal-600 font-semibold"
                    size="lg"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    View Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-500 to-sky-500">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Create Professional Invoices?
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Join 25,000+ businesses who trust InvoiceGen for their invoicing needs.
              Start creating beautiful invoices today - no credit card required.
            </p>

            <div className="space-y-4">
              <Button
                size="lg"
                onClick={onCreateInvoice}
                className="bg-white text-teal-600 hover:bg-slate-50 text-xl px-12 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Creating Free Invoices
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <div className="flex justify-center items-center space-x-6 text-teal-100">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>3 Free Downloads</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>No Signup Required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Instant Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-sky-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">InvoiceGen</span>
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
            <div>
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
            <div>
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
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-400">
                  <Mail className="w-4 h-4" />
                  <span>support@invoicegen.com</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-400">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-400">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-6">
                <h5 className="font-medium mb-3">Stay Updated</h5>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-l-lg text-white placeholder-slate-400 focus:outline-none focus:border-teal-500"
                  />
                  <Button className="bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 rounded-l-none">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm">
              © 2024 InvoiceGen. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-slate-400 mt-4 md:mt-0">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#cookies" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalLandingPage;