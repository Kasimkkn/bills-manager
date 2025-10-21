import ProfessionalLandingPage from "@/components/ProfessionalLandingPage";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleCreateInvoice = () => {
    navigate('/create');
  };

  return (
    <ProfessionalLandingPage onCreateInvoice={handleCreateInvoice} />
  );
};

export default Index;
