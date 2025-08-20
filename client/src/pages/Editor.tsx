
import InvoiceCreator from '@/components/InvoiceCreator';
import { useNavigate } from 'react-router-dom';

const Editor = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard');
  };

  return <InvoiceCreator onBack={handleBack} />;
};

export default Editor;
