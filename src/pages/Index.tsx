
import InvoiceCreator from '@/components/InvoiceCreator';
import ProfessionalLandingPage from '@/components/ProfessionalLandingPage';
import { InvoiceProvider } from '@/contexts/InvoiceContext';
import { useState } from 'react';

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
      <InvoiceProvider>
        <InvoiceCreator onBack={handleBackToHome} />
      </InvoiceProvider>
    );
  }

  return <ProfessionalLandingPage onGetStarted={handleGetStarted} />;
};

export default Index;
