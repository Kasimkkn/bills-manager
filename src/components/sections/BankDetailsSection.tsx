import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DynamicBillConfig } from "@/types/invoice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface BankDetailsSectionProps {
  formData: DynamicBillConfig;
  updateFormData: (path: string, value: any) => void;
}

const BankDetailsSection: React.FC<BankDetailsSectionProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <Card className='border-border'>
      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='bank-details' className='border-none'>
          <AccordionTrigger className='px-6 hover:no-underline'>
            <div className='flex items-center justify-between w-full pr-4'>
              <h3 className='text-lg md:text-xl font-semibold'>Bank Details</h3>
              <Switch
                checked={formData.isBankDetailsNeeded}
                onCheckedChange={(checked) => {
                  updateFormData("isBankDetailsNeeded", checked);
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </AccordionTrigger>
          {formData.isBankDetailsNeeded && (
            <AccordionContent className='px-6 pb-6'>
              <div className='space-y-4 pt-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label>Bank Name</Label>
                    <Input
                      value={formData.bankDetails?.bankName || ""}
                      onChange={(e) =>
                        updateFormData("bankDetails.bankName", e.target.value)
                      }
                      placeholder='Enter bank name'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label>Account Holder Name</Label>
                    <Input
                      value={formData.bankDetails?.accountHolderName || ""}
                      onChange={(e) =>
                        updateFormData(
                          "bankDetails.accountHolderName",
                          e.target.value
                        )
                      }
                      placeholder='Enter account holder name'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label>Account Number</Label>
                    <Input
                      value={formData.bankDetails?.accountNumber || ""}
                      onChange={(e) =>
                        updateFormData(
                          "bankDetails.accountNumber",
                          e.target.value
                        )
                      }
                      placeholder='Enter account number'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label>IFSC Code</Label>
                    <Input
                      value={formData.bankDetails?.ifscCode || ""}
                      onChange={(e) =>
                        updateFormData("bankDetails.ifscCode", e.target.value)
                      }
                      placeholder='Enter IFSC code'
                    />
                  </div>

                  <div className='space-y-2 md:col-span-2'>
                    <Label>UPI ID</Label>
                    <Input
                      value={formData.bankDetails?.upiId || ""}
                      onChange={(e) =>
                        updateFormData("bankDetails.upiId", e.target.value)
                      }
                      placeholder='Enter UPI ID'
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          )}
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default BankDetailsSection;
