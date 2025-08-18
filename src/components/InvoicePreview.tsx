
import { useTemplate } from '@/contexts/TemplateContext';
import FreelancerTemplate from './templates/FreelancerTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ServiceTemplate from './templates/ServiceTemplate';
import HospitalityTemplate from './templates/HospitalityTemplate';
import RetailTemplate from './templates/RetailTemplate';

const InvoicePreview = () => {
  const { currentTemplate } = useTemplate();

  const renderTemplate = () => {
    switch (currentTemplate) {
      case 'freelancer':
        return <FreelancerTemplate />;
      case 'retail':
        return <RetailTemplate />;
      case 'service':
        return <ServiceTemplate />;
      case 'hospitality':
        return <HospitalityTemplate />;
      case 'modern':
      default:
        return <ModernTemplate />;
    }
  };

  return (
    <div className="invoice-preview-container">
      {renderTemplate()}
    </div>
  );
};

export default InvoicePreview;
