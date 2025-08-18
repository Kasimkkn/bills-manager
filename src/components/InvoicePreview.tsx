import { useTemplate } from '@/contexts/TemplateContext';
import FreelancerTemplate from './templates/FreelancerTemplate';
import ModernTemplate from './templates/ModernTemplate';

const InvoicePreview = () => {
  const { currentTemplate } = useTemplate();

  switch (currentTemplate) {
    case 'freelancer':
      return <FreelancerTemplate />;
    case 'retail':
      // Return retail template component when created
      return <ModernTemplate />;
    case 'service':
      // Return service template component when created  
      return <ModernTemplate />;
    case 'hospitality':
      // Return hospitality template component when created
      return <ModernTemplate />;
    case 'modern':
    default:
      return <ModernTemplate />;
  }
};

export default InvoicePreview;
