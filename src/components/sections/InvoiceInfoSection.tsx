import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DynamicBillConfig } from "@/types/invoice";
import DatePicker from "../DatePicker";

interface InvoiceInfoSectionProps {
  formData: DynamicBillConfig;
  updateFormData: (path: string, value: any) => void;
}

const InvoiceInfoSection: React.FC<InvoiceInfoSectionProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <Card className='border-border'>
      <CardHeader>
        <CardTitle className='text-lg md:text-xl'>
          Invoice Information
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 gap-4'>
          <div className='space-y-2'>
            <Label>Invoice Number</Label>
            <Input
              value={formData.invoiceInfo?.invoiceNumber || ""}
              onChange={(e) =>
                updateFormData("invoiceInfo.invoiceNumber", e.target.value)
              }
              placeholder='#INV-001'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label>Invoice Date</Label>
              <DatePicker
                value={formData.invoiceInfo?.invoiceDate || ""}
                onChange={(date) =>
                  updateFormData("invoiceInfo.invoiceDate", date)
                }
                placeholder='Select invoice date'
              />
            </div>
            <div className='space-y-2'>
              <Label>Due Date</Label>
              <DatePicker
                value={formData.invoiceInfo?.invoiceDueDate || ""}
                onChange={(date) =>
                  updateFormData("invoiceInfo.invoiceDueDate", date)
                }
                placeholder='Select due date'
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceInfoSection;
