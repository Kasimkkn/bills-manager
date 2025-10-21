import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DynamicBillConfig } from "@/types/invoice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PaymentSectionProps {
  formData: DynamicBillConfig;
  updateFormData: (path: string, value: any) => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <Card>
      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='payment' className='border-none'>
          <AccordionTrigger className='px-6 hover:no-underline'>
            <div className='flex items-center justify-between w-full pr-4'>
              <h3 className='text-lg md:text-xl font-semibold'>
                Payment Details
              </h3>
              <Switch
                checked={formData.isPaymentSectionNeeded}
                onCheckedChange={(checked) => {
                  updateFormData("isPaymentSectionNeeded", checked);
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </AccordionTrigger>
          {formData.isPaymentSectionNeeded && (
            <AccordionContent className='px-6 pb-6'>
              <div className='space-y-4 pt-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label>Payment Method</Label>
                    <Select
                      value={formData.payment?.paymentOption || "CASH"}
                      onValueChange={(value) =>
                        updateFormData("payment.paymentOption", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='CASH'>Cash</SelectItem>
                        <SelectItem value='UPI'>UPI</SelectItem>
                        <SelectItem value='CARD'>Card</SelectItem>
                        <SelectItem value='BANK_TRANSFER'>
                          Bank Transfer
                        </SelectItem>
                        <SelectItem value='COD'>Cash on Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label>Transaction ID</Label>
                    <Input
                      value={formData.payment?.transactionId || ""}
                      onChange={(e) =>
                        updateFormData("payment.transactionId", e.target.value)
                      }
                      placeholder='Enter transaction ID'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label>Amount Paid</Label>
                  <Input
                    type='number'
                    value={formData.payment?.amountPaid || 0}
                    onChange={(e) =>
                      updateFormData(
                        "payment.amountPaid",
                        Number(e.target.value)
                      )
                    }
                    placeholder='0.00'
                    min='0'
                    step='0.01'
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

export default PaymentSection;
