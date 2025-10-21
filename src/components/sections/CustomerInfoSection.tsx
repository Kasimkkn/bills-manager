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

interface CustomerInfoSectionProps {
    formData: DynamicBillConfig;
    updateFormData: (path: string, value: any) => void;
}

const CustomerInfoSection: React.FC<CustomerInfoSectionProps> = ({
    formData,
    updateFormData,
}) => {
    return (
        <Card>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="customer-info" className="border-none">
                    <AccordionTrigger className="px-6 hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-4">
                            <h3 className="text-lg md:text-xl font-semibold">
                                Customer Information
                            </h3>
                            <Switch
                                checked={formData.isCustomerInfoNeeded}
                                onCheckedChange={(checked) => {
                                    updateFormData("isCustomerInfoNeeded", checked);
                                    if (!checked) updateFormData("customerInfo", undefined);
                                }}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </AccordionTrigger>
                    {formData.isCustomerInfoNeeded && (
                        <AccordionContent className="px-6 pb-6">
                            <div className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label>
                                        Customer Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        value={formData.customerInfo?.name || ""}
                                        onChange={(e) =>
                                            updateFormData("customerInfo.name", e.target.value)
                                        }
                                        placeholder="Enter customer name"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Phone</Label>
                                        <Input
                                            value={formData.customerInfo?.phone || ""}
                                            onChange={(e) =>
                                                updateFormData("customerInfo.phone", e.target.value)
                                            }
                                            placeholder="Enter phone"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            value={formData.customerInfo?.email || ""}
                                            onChange={(e) =>
                                                updateFormData("customerInfo.email", e.target.value)
                                            }
                                            placeholder="Enter email"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Address</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            value={formData.customerInfo?.address?.city || ""}
                                            onChange={(e) =>
                                                updateFormData("customerInfo.address.city", e.target.value)
                                            }
                                            placeholder="City"
                                        />
                                        <Input
                                            value={formData.customerInfo?.address?.state || ""}
                                            onChange={(e) =>
                                                updateFormData("customerInfo.address.state", e.target.value)
                                            }
                                            placeholder="State"
                                        />
                                        <Input
                                            value={formData.customerInfo?.address?.country || ""}
                                            onChange={(e) =>
                                                updateFormData("customerInfo.address.country", e.target.value)
                                            }
                                            placeholder="Country"
                                        />
                                        <Input
                                            value={formData.customerInfo?.address?.pincode || ""}
                                            onChange={(e) =>
                                                updateFormData("customerInfo.address.pincode", e.target.value)
                                            }
                                            placeholder="Pincode"
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

export default CustomerInfoSection;