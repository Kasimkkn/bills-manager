import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { DynamicBillConfig } from "@/types/invoice";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";

interface BusinessInfoSectionProps {
    formData: DynamicBillConfig;
    updateFormData: (path: string, value: any) => void;
}

const BusinessInfoSection: React.FC<BusinessInfoSectionProps> = ({
    formData,
    updateFormData,
}) => {
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateFormData("businessInfo.logo", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Card>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="business-info" className="border-none">
                    <AccordionTrigger className="px-6 hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-4">
                            <h3 className="text-lg md:text-xl font-semibold">
                                Business Information
                            </h3>
                            <Switch
                                checked={formData.isBusinessInfoNeeded}
                                onCheckedChange={(checked) => {
                                    updateFormData("isBusinessInfoNeeded", checked);
                                }}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </AccordionTrigger>
                    {formData.isBusinessInfoNeeded && (
                        <AccordionContent className="px-6 pb-6">
                            <div className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label>
                                        Business Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        value={formData.businessInfo?.name || ""}
                                        onChange={(e) =>
                                            updateFormData("businessInfo.name", e.target.value)
                                        }
                                        placeholder="Enter business name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Logo</Label>
                                    <div className="flex items-center gap-4">
                                        {formData.businessInfo?.logo && (
                                            <div className="relative h-16 w-16 rounded border">
                                                <img
                                                    src={formData.businessInfo.logo}
                                                    alt="Logo"
                                                    className="h-full w-full object-contain p-1"
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-red-500 hover:bg-red-600"
                                                    onClick={() =>
                                                        updateFormData("businessInfo.logo", undefined)
                                                    }
                                                >
                                                    <X className="h-3 w-3 text-white" />
                                                </Button>
                                            </div>
                                        )}
                                        <label className="cursor-pointer">
                                            <div className="flex items-center gap-2 rounded-md border border-input px-4 py-2 hover:bg-accent">
                                                <Upload className="h-4 w-4" />
                                                <span className="text-sm">Upload Logo</span>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleLogoUpload}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Phone Number</Label>
                                        <Input
                                            value={formData.businessInfo?.phoneNumber || ""}
                                            onChange={(e) =>
                                                updateFormData("businessInfo.phoneNumber", e.target.value)
                                            }
                                            placeholder="Enter phone"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            value={formData.businessInfo?.email || ""}
                                            onChange={(e) =>
                                                updateFormData("businessInfo.email", e.target.value)
                                            }
                                            placeholder="Enter email"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>GST Number</Label>
                                        <Input
                                            value={formData.businessInfo?.gstNumber || ""}
                                            onChange={(e) =>
                                                updateFormData("businessInfo.gstNumber", e.target.value)
                                            }
                                            placeholder="Enter GST number"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Tax ID</Label>
                                        <Input
                                            value={formData.businessInfo?.taxId || ""}
                                            onChange={(e) =>
                                                updateFormData("businessInfo.taxId", e.target.value)
                                            }
                                            placeholder="Enter tax ID"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Address</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            value={formData.businessInfo?.address?.city || ""}
                                            onChange={(e) =>
                                                updateFormData("businessInfo.address.city", e.target.value)
                                            }
                                            placeholder="City"
                                        />
                                        <Input
                                            value={formData.businessInfo?.address?.state || ""}
                                            onChange={(e) =>
                                                updateFormData("businessInfo.address.state", e.target.value)
                                            }
                                            placeholder="State"
                                        />
                                        <Input
                                            value={formData.businessInfo?.address?.country || ""}
                                            onChange={(e) =>
                                                updateFormData("businessInfo.address.country", e.target.value)
                                            }
                                            placeholder="Country"
                                        />
                                        <Input
                                            value={formData.businessInfo?.address?.pincode || ""}
                                            onChange={(e) =>
                                                updateFormData("businessInfo.address.pincode", e.target.value)
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

export default BusinessInfoSection;