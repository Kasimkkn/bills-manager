import ProfessionalLandingPage from "@/components/ProfessionalLandingPage";
import TemplatePickerModal from "@/components/TemplatePickerModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedTeStyles, setSelectedTemplateStyles] = useState("");
  const handleCreateInvoice = () => {
    // navigate('/create');
    setIsOpen(true);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      navigate(
        `/create?template=${selectedTemplate}&style=${selectedTeStyles}`
      );
      setIsOpen(false);
    }
  };
  return (
    <>
      <ProfessionalLandingPage onCreateInvoice={handleCreateInvoice} />
      <TemplatePickerModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        handleContinue={handleContinue}
        setSelectedTemplateStyles={setSelectedTemplateStyles}
        selectedTeStyles={selectedTeStyles}
      />
    </>
  );
};

export default Index;
