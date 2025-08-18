
import { useState } from 'react';
import LandingHero from '@/components/LandingHero';
import InvoiceCreator from '@/components/InvoiceCreator';
import { InvoiceProvider } from '@/contexts/InvoiceContext';
import { TemplateProvider } from '@/contexts/TemplateContext';

const Index = () => {
  const [showCreator, setShowCreator] = useState(false);

  const handleGetStarted = () => {
    setShowCreator(true);
  };

  const handleBackToHome = () => {
    setShowCreator(false);
  };

  if (showCreator) {
    return (
      <TemplateProvider>
        <InvoiceProvider>
          <InvoiceCreator onBack={handleBackToHome} />
        </InvoiceProvider>
      </TemplateProvider>
    );
  }

  return <LandingHero onGetStarted={handleGetStarted} />;
};

export default Index;
