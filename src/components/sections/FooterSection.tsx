import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { DynamicBillConfig } from "@/types/invoice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FooterSectionProps {
  formData: DynamicBillConfig;
  updateFormData: (path: string, value: unknown) => void;
}

const FooterSection: React.FC<FooterSectionProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <Card className='border-border'>
      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='footer' className='border-none'>
          <AccordionTrigger className='px-6 hover:no-underline'>
            <div className='flex items-center justify-between w-full pr-4'>
              <h3 className='text-lg md:text-xl font-semibold'>
                Footer & Terms
              </h3>
              <Switch
                checked={formData.isFooterNeeded}
                onCheckedChange={(checked) => {
                  updateFormData("isFooterNeeded", checked);
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </AccordionTrigger>
          {formData.isFooterNeeded && (
            <AccordionContent className='px-6 pb-6'>
              <div className='space-y-4 pt-4'>
                <div className='space-y-2'>
                  <Label>Thank You Message</Label>
                  <Textarea
                    value={formData.footer?.exitMessage || ""}
                    onChange={(e) =>
                      updateFormData("footer.exitMessage", e.target.value)
                    }
                    placeholder='Thank you for your business!'
                    rows={2}
                    className='resize-none'
                  />
                </div>

                <div className='space-y-2'>
                  <Label>Return Policy</Label>
                  <Textarea
                    value={formData.footer?.returnPolicy || ""}
                    onChange={(e) =>
                      updateFormData("footer.returnPolicy", e.target.value)
                    }
                    placeholder='Enter return policy'
                    rows={2}
                    className='resize-none'
                  />
                </div>

                <div className='space-y-2'>
                  <Label>Payment Terms</Label>
                  <Textarea
                    value={formData.footer?.paymentTerms || ""}
                    onChange={(e) =>
                      updateFormData("footer.paymentTerms", e.target.value)
                    }
                    placeholder='Enter payment terms'
                    rows={2}
                    className='resize-none'
                  />
                </div>
              </div>
            </AccordionContent>
          )}
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default FooterSection;
