import React, { useState, useEffect } from 'react';

// Import all components
import Navigation from '@/components/homeComp/Navigation';
import HeroSection from '@/components/homeComp/HeroSection';
import TrustSection from '@/components/homeComp/TrustSection';
import FeaturesSection from '@/components/homeComp/FeaturesSection';
import TemplatesSection from '@/components/homeComp/TemplatesSection';
import BentoGridSection from '@/components/homeComp/BentoGridSection';
import TestimonialsSection from '@/components/homeComp/TestimonialsSection';
import FAQSection from '@/components/homeComp/FAQSection';
import CTASection from '@/components/homeComp/CTASection';
import Footer from '@/components/homeComp/Footer';

// Import types
import { LandingHeroProps } from '@/types';

const ProfessionalLandingPage: React.FC<LandingHeroProps> = ({ onCreateInvoice }) => {
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

  return (
    <div className="min-h-screen bg-slate-50 font-display">
      <Navigation
        onCreateInvoice={onCreateInvoice}
      />

      <HeroSection
        isVisible={isVisible}
        onCreateInvoice={onCreateInvoice}
      />

      <TrustSection />

      <FeaturesSection />

      <TemplatesSection
        onCreateInvoice={onCreateInvoice}
      />

      <BentoGridSection />

      <TestimonialsSection />

      <FAQSection
        openFaq={openFaq}
        setOpenFaq={setOpenFaq}

      />

      <CTASection
        onCreateInvoice={onCreateInvoice}
      />

      <Footer />
    </div>
  );
};

export default ProfessionalLandingPage;