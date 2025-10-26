import ProfessionalLandingPage from "@/components/ProfessionalLandingPage";
import TemplatePickerModal from "@/components/TemplatePickerModal";
import { useState } from "react";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ProfessionalLandingPage onCreateInvoice={() => setIsOpen(true)} />
      <TemplatePickerModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default Index;
