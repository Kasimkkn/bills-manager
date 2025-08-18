
import { useInvoice } from '@/contexts/InvoiceContext';
import { useTemplate } from '@/contexts/TemplateContext';

import FreelancerTemplate from './templates/FreelancerTemplate';
import HospitalityTemplate from './templates/HospitalityTemplate';
import ModernTemplate from './templates/ModernTemplate';
import RetailTemplate from './templates/RetailTemplate';
import ServiceTemplate from './templates/ServiceTemplate';

// 🔥 NEW: Generic template component for any new template
import GenericTemplate from './templates/GenericTemplate';

const InvoicePreview = () => {
  const { invoice } = useInvoice();
  const { currentTemplate } = useTemplate();

  const renderTemplate = () => {
    if (!currentTemplate) {
      return <div className="p-8 text-center text-muted-foreground">No template selected</div>;
    }

    // 🔥 EXISTING TEMPLATES (with custom components)
    switch (currentTemplate.id) {
      case 'freelancer':
        return <FreelancerTemplate />;
      case 'retail':
        return <RetailTemplate />;
      case 'service':
        return <ServiceTemplate />;
      case 'hospitality':
        return <HospitalityTemplate />;
      case 'modern':
        return <ModernTemplate />;

      // 🔥 NEW TEMPLATES automatically use GenericTemplate
      default:
        return <GenericTemplate template={currentTemplate} />;
    }
  };

  return (
    <div className="invoice-preview-container">
      {renderTemplate()}
    </div>
  );
};

export default InvoicePreview;

/*
✅ ANY NEW TEMPLATE AUTOMATICALLY WORKS:
   - No need to create custom template components
   - GenericTemplate handles all template types
   - Uses template colors and styling automatically

✅ CUSTOM TEMPLATES STILL SUPPORTED:
   - Existing templates (freelancer, retail, etc.) still use custom components
   - Can override GenericTemplate for specific templates if needed

✅ AUTOMATIC FIELD RENDERING:
   - Template-specific fields automatically appear
   - Grouped logically by field.group
   - Proper formatting for different field types

✅ DYNAMIC STYLING:
   - Uses template color scheme
   - Automatically applies brand colors
   - Maintains professional appearance

✅ ZERO MAINTENANCE:
   - Add new template → Preview automatically works
   - No code changes needed
   - No switch statement updates required

RESULT: 
- Adding a medical template? Works immediately!
- Adding a construction template? Works immediately!  
- Adding 50 more templates? All work immediately!
*/