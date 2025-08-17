
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Zap, Smartphone, Shield, Star, Users, Download, Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface LandingHeroProps {
  onGetStarted: () => void;
}

const LandingHero = ({ onGetStarted }: LandingHeroProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Floating geometric elements */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary/30 rounded-full animate-pulse delay-500" />
        <div className="absolute top-40 right-32 w-3 h-3 bg-primary/20 rounded-full animate-pulse delay-700" />
        <div className="absolute bottom-40 left-16 w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse delay-300" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <header className="flex justify-between items-center mb-20">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg animate-glow">
                <FileText className="w-7 h-7 text-background" />
              </div>
              <div className="absolute -inset-1 bg-gradient-primary rounded-xl opacity-20 blur animate-pulse" />
            </div>
            <span className="text-2xl font-display font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              InvoiceGen
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2 glass rounded-full px-4 py-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="font-medium">3 Free Downloads</span>
              </div>
              <div className="flex items-center space-x-2 glass rounded-full px-4 py-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-medium">10k+ Users</span>
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Hero Content */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-12 mb-20">
            <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 text-sm font-medium text-primary border border-primary/20">
                <Star className="w-4 h-4" />
                <span>Trusted by 10,000+ businesses worldwide</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl heading-display text-foreground">
                <span className="block">Beautiful</span>
                <span className="block text-primary animate-glow bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
                  Invoices
                </span>
                <span className="block text-3xl md:text-5xl lg:text-6xl text-muted-foreground font-medium mt-4">
                  in 30 seconds
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                Create stunning, professional invoices that get you paid faster. 
                Perfect for <span className="text-primary font-medium">freelancers</span>, 
                <span className="text-primary font-medium"> suppliers</span>, and 
                <span className="text-primary font-medium"> businesses</span> of all sizes.
              </p>
            </div>

            {/* Enhanced CTA Section */}
            <div className={`flex flex-col items-center space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Button 
                size="lg"
                onClick={onGetStarted}
                className="bg-gradient-primary hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 text-xl px-12 py-8 rounded-2xl interactive text-background font-semibold group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center">
                  Create Your First Invoice
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
              
              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>No signup required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4 text-primary" />
                  <span>3 free downloads</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Secure & private</span>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Preview */}
          <div className={`relative mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="glass-elevated rounded-3xl p-8 mx-auto max-w-4xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="glass rounded-2xl p-6 space-y-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-primary/20 rounded animate-pulse" />
                      <div className="h-3 bg-muted rounded animate-pulse delay-100" />
                      <div className="h-3 bg-muted rounded animate-pulse delay-200 w-3/4" />
                    </div>
                  </div>
                  <p className="text-center text-sm text-muted-foreground font-medium">
                    Real-time Form Editor
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-gray-900">INVOICE</h3>
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded" />
                        <div className="h-2 bg-gray-200 rounded w-2/3" />
                      </div>
                      <div className="h-12 bg-amber-50 rounded border border-amber-200" />
                      <div className="text-right">
                        <div className="text-lg font-bold text-amber-600">$1,234.56</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-muted-foreground font-medium">
                    Professional PDF Output
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Feature Cards */}
          <div className={`grid md:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Real-time preview updates as you type. See your invoice come to life instantly.",
                gradient: "from-yellow-400 to-orange-500"
              },
              {
                icon: Smartphone,
                title: "Mobile Perfect",
                description: "Optimized for every device. Create professional invoices anywhere, anytime.",
                gradient: "from-blue-400 to-purple-500"
              },
              {
                icon: FileText,
                title: "PDF Ready",
                description: "Download high-quality PDFs that look amazing and work everywhere.",
                gradient: "from-green-400 to-blue-500"
              }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="glass-elevated rounded-3xl p-8 hover:scale-105 transition-all duration-500 interactive group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">{feature.title}</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Enhanced Social Proof */}
          <div className={`text-center space-y-8 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground mb-6 font-medium">
                Join thousands of businesses creating beautiful invoices
              </p>
              <div className="flex flex-wrap justify-center items-center gap-6">
                {[
                  { name: "Freelancers", count: "2.5k+", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
                  { name: "Suppliers", count: "1.8k+", color: "bg-green-500/10 text-green-400 border-green-500/20" },
                  { name: "Hotels", count: "900+", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
                  { name: "Retail Shops", count: "3.2k+", color: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
                  { name: "Dealers", count: "1.5k+", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" }
                ].map((category) => (
                  <div key={category.name} className={`px-6 py-3 rounded-xl border ${category.color} backdrop-blur-sm font-medium`}>
                    <div className="text-sm opacity-80">{category.name}</div>
                    <div className="text-lg font-bold">{category.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
