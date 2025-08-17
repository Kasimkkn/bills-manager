
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Zap, Smartphone, Shield } from "lucide-react";

interface LandingHeroProps {
  onGetStarted: () => void;
}

const LandingHero = ({ onGetStarted }: LandingHeroProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-background" />
            </div>
            <span className="text-xl font-display font-bold">InvoiceGen</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm text-muted-foreground">
            <span className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>3 Free Downloads</span>
            </span>
          </div>
        </header>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl heading-display text-foreground">
              Professional
              <span className="block text-primary animate-glow">
                Invoices
              </span>
              <span className="block text-2xl md:text-4xl lg:text-5xl text-muted-foreground font-medium">
                in seconds
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Create stunning, professional invoices instantly. Perfect for suppliers, freelancers, 
              shops, hotels, and businesses of all sizes. Mobile-first design with real-time preview.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-in">
            <Button 
              size="lg"
              onClick={onGetStarted}
              className="bg-gradient-primary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-lg px-8 py-6 rounded-xl interactive text-background font-semibold"
            >
              Start Creating Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground">
              No signup required • 3 free downloads
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 animate-fade-in">
            <div className="glass rounded-2xl p-6 hover:surface-elevated transition-all duration-300 interactive">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-time Preview</h3>
              <p className="text-sm text-muted-foreground">
                See your invoice update instantly as you type. What you see is what you get.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 hover:surface-elevated transition-all duration-300 interactive">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Mobile Optimized</h3>
              <p className="text-sm text-muted-foreground">
                Perfect on any device. Create invoices on-the-go with our mobile-first design.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 hover:surface-elevated transition-all duration-300 interactive">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Professional PDFs</h3>
              <p className="text-sm text-muted-foreground">
                Download high-quality PDF invoices that look great and work everywhere.
              </p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">Trusted by businesses worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-xs font-medium px-4 py-2 bg-surface rounded-lg">Freelancers</div>
              <div className="text-xs font-medium px-4 py-2 bg-surface rounded-lg">Suppliers</div>
              <div className="text-xs font-medium px-4 py-2 bg-surface rounded-lg">Hotels</div>
              <div className="text-xs font-medium px-4 py-2 bg-surface rounded-lg">Retail Shops</div>
              <div className="text-xs font-medium px-4 py-2 bg-surface rounded-lg">Dealers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
