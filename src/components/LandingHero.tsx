import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Eye } from "lucide-react";

interface LandingHeroProps {
  onCreateInvoice: () => void;
  onViewDashboard: () => void;
}

const LandingHero = ({ onCreateInvoice, onViewDashboard }: LandingHeroProps) => {
  const handleGetStarted = () => {
    onCreateInvoice();
  };

  const handleViewDashboard = () => {
    onViewDashboard();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-surface-elevated relative overflow-hidden">
      {/* Background Gradient and Circles */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl -translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-accent/10 blur-3xl translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative z-20">
        {/* Navigation */}
        <nav className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-background" />
              </div>
              <span className="text-xl font-bold text-foreground">InvoicePro</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Templates
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </button>
              <button 
                onClick={handleViewDashboard}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </button>
              <Button 
                onClick={handleGetStarted}
                className="bg-gradient-primary text-background hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                Get Started
              </Button>
            </div>
            
            <Button 
              onClick={handleGetStarted}
              size="sm" 
              className="md:hidden bg-gradient-primary text-background"
            >
              Start
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Create Professional Invoices <span className="text-primary">Effortlessly</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Generate beautiful invoices in seconds with our easy-to-use invoice creator.
            Perfect for freelancers, small businesses, and enterprises.
          </p>

          {/* Update the CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="bg-gradient-primary text-background hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-lg px-8 py-6 rounded-xl font-semibold"
            >
              Create Your First Invoice
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleViewDashboard}
              className="border-primary/20 text-foreground hover:bg-primary/5 transition-all duration-300 text-lg px-8 py-6 rounded-xl font-semibold backdrop-blur-sm"
            >
              <Eye className="mr-2 h-5 w-5" />
              View Dashboard
            </Button>
          </div>

          {/* Features Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {/* Feature 1 */}
            <div className="p-6 bg-surface rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-foreground mb-2">Customizable Templates</h3>
              <p className="text-muted-foreground">
                Choose from a variety of professionally designed templates to match your brand.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-surface rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-foreground mb-2">Automated Calculations</h3>
              <p className="text-muted-foreground">
                Automatically calculate totals, taxes, and discounts for accurate invoicing.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-surface rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-foreground mb-2">Secure Cloud Storage</h3>
              <p className="text-muted-foreground">
                Access your invoices from anywhere with our secure cloud storage.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="p-6 bg-surface rounded-xl shadow-md">
              <p className="text-muted-foreground italic mb-4">
                "InvoicePro has revolutionized my invoicing process. It's so easy to use and saves me hours every month!"
              </p>
              <p className="font-semibold text-foreground">- John Doe, Freelancer</p>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 bg-surface rounded-xl shadow-md">
              <p className="text-muted-foreground italic mb-4">
                "As a small business owner, InvoicePro has been a game-changer. I can now create professional invoices in minutes."
              </p>
              <p className="font-semibold text-foreground">- Jane Smith, Business Owner</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingHero;
