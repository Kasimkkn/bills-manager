import ProfessionalLandingPage from "@/components/ProfessionalLandingPage";
import TemplateGallery from "@/components/TemplateGallery";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);
  const navigate = useNavigate();

  const handleCreateInvoice = () => {
    setShowTemplateGallery(true);
  };

  const handleTemplateSelected = () => {
    setShowTemplateGallery(false);
    navigate('/editor');
  };

  const handleViewDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <ProfessionalLandingPage
        onCreateInvoice={handleCreateInvoice}
        onViewDashboard={handleViewDashboard}
      />
      <TemplateGallery
        isOpen={showTemplateGallery}
        onClose={() => setShowTemplateGallery(false)}
        onTemplateSelect={handleTemplateSelected}
      />
    </>
  );
};

export default Index;
