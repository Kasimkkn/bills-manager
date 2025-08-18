
import { useTemplate } from '@/contexts/TemplateContext';
import FreelancerTemplate from './templates/FreelancerTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ServiceTemplate from './templates/ServiceTemplate';
import HospitalityTemplate from './templates/HospitalityTemplate';
import RetailTemplate from './templates/RetailTemplate';

const InvoicePreview = () => {
  const { currentTemplate } = useTemplate();

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

export default InvoicePreview;
