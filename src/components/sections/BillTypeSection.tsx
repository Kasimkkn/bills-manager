import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DynamicBillConfig } from "@/types/invoice";

interface BillTypeSectionProps {
  formData: DynamicBillConfig;
  updateFormData: (path: string, value: any) => void;
}

const BillTypeSection: React.FC<BillTypeSectionProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <Card className='border-border'>
      <CardHeader>
        <CardTitle className='text-lg md:text-xl'>Invoice Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          <Label>Bill Type</Label>
          <Select
            value={formData.billType}
            onValueChange={(value) => updateFormData("billType", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='ECOMMERCE'>E-Commerce</SelectItem>
              <SelectItem value='HOTEL'>Hotel</SelectItem>
              <SelectItem value='FREELANCER'>Freelancer</SelectItem>
              <SelectItem value='SUPPLIER'>Supplier</SelectItem>
              <SelectItem value='RETAILER'>Retailer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillTypeSection;
