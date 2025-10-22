import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    ArrowRight,
    Briefcase,
    Check,
    Hotel,
    Package,
    ShoppingCart,
    Store,
    Stethoscope,
    Scissors,
    Home,
    GraduationCap,
    Dumbbell,
    Truck,
    Scale
} from "lucide-react";
import React, { Dispatch } from 'react';
import ResponsiveModal from './ui/responsive-modal';
import { ALL_TEMPLATES } from '@/constant/templateJson';

const TemplatePickerModal = ({
    isOpen,
    setIsOpen,
    selectedTemplate,
    setSelectedTemplate,
    handleContinue,
    setSelectedTemplateStyles,
    selectedTeStyles
}: {
    isOpen: boolean,
    setIsOpen: Dispatch<React.SetStateAction<boolean>>,
    selectedTemplate: string,
    setSelectedTemplate: Dispatch<React.SetStateAction<string>>,
    handleContinue: () => void,
    setSelectedTemplateStyles: Dispatch<React.SetStateAction<string>>,
    selectedTeStyles: string
}) => {

    // Icon mapping
    const iconMap = {
        Hotel,
        Briefcase,
        Package,
        Store,
        ShoppingCart,
        Stethoscope,
        Scissors,
        Home,
        GraduationCap,
        Dumbbell,
        Truck,
        Scale
    };

    // Generate templates from ALL_TEMPLATES using uiMetadata
    const templates = Object.keys(ALL_TEMPLATES).map(billType => {
        const templateKey = billType as keyof typeof ALL_TEMPLATES;
        const firstStyleKey = Object.keys(ALL_TEMPLATES[templateKey])[0];
        const templateData = ALL_TEMPLATES[templateKey][firstStyleKey];

        // Use uiMetadata from template if available
        const uiMeta = templateData.uiMetadata || {
            displayName: billType,
            description: `${billType} billing template`,
            icon: "Package",
            colorGradient: "from-gray-500 to-slate-500",
            features: ["Standard billing", "Customer details", "Payment tracking"],
            headerColor: "bg-gradient-to-r from-gray-500 to-slate-500",
            accentColor: "border-gray-200 bg-gray-50",
            textColor: "text-gray-700"
        };

        const IconComponent = iconMap[uiMeta.icon] || Package;

        return {
            billType: templateData.billType,
            name: uiMeta.displayName,
            templateStyle: templateData.templateStyle,
            description: uiMeta.description,
            icon: IconComponent,
            color: uiMeta.colorGradient,
            features: uiMeta.features,
            preview: {
                headerColor: uiMeta.headerColor,
                accentColor: uiMeta.accentColor,
                textColor: uiMeta.textColor
            },
            templateData: templateData
        };
    });

    const handleSelectTemplate = (billType, styles) => {
        console.log("styles", styles)
        setSelectedTemplate(billType);
        setSelectedTemplateStyles(styles);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <ResponsiveModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Pick Your Bill Template"
            >
                <div className="p-6">
                    {/* Description */}
                    <div className="mb-8">
                        <p className="text-lg text-slate-600">
                            Choose the template that best fits your business type. Each template is customized with relevant fields and features.
                        </p>
                    </div>

                    {/* Templates Grid */}
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 mb-8">
                        {templates.map((template, index) => (
                            <Card
                                key={index}
                                className={`group border-white/80 cursor-pointer hover:shadow-xl transition-shadow`}
                                onClick={() => handleSelectTemplate(template.billType, template.templateStyle)}
                            >
                                <CardContent className="p-0">
                                    {/* Template Preview */}
                                    <div className="bg-white p-6 relative">
                                        {/* Selected Indicator */}
                                        {selectedTemplate === template.billType && (
                                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center shadow-lg z-10">
                                                <Check className="w-5 h-5 text-white" />
                                            </div>
                                        )}

                                        {/* Mini Bill Preview */}
                                        <div className="bg-white border-2 border-slate-200 rounded-lg overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
                                            {/* Header */}
                                            <div className={`${template.preview.headerColor} p-3`}>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center space-x-2">
                                                        <template.icon className="w-5 h-5 text-white" />
                                                        <div className="text-white text-sm font-bold">INVOICE</div>
                                                    </div>
                                                    <div className="w-6 h-6 bg-white/20 rounded"></div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-3 space-y-2">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className={`${template.preview.accentColor} border rounded p-2`}>
                                                        <div className="h-1.5 bg-slate-300 rounded mb-1"></div>
                                                        <div className="h-1 bg-slate-200 rounded w-3/4"></div>
                                                    </div>
                                                    <div className={`${template.preview.accentColor} border rounded p-2`}>
                                                        <div className="h-1.5 bg-slate-300 rounded mb-1"></div>
                                                        <div className="h-1 bg-slate-200 rounded w-2/3"></div>
                                                    </div>
                                                </div>

                                                {/* Items */}
                                                <div className="space-y-1">
                                                    <div className="h-1 bg-slate-200 rounded"></div>
                                                    <div className="h-1 bg-slate-200 rounded w-5/6"></div>
                                                    <div className="h-1 bg-slate-200 rounded w-4/5"></div>
                                                </div>

                                                {/* Total */}
                                                <div className={`${template.preview.accentColor} border rounded p-2 flex justify-between items-center`}>
                                                    <div className="h-1.5 bg-slate-300 rounded w-1/4"></div>
                                                    <div className={`h-2 ${template.preview.headerColor} rounded w-1/3`}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Template Info */}
                                    <div className="p-6 border-t border-slate-100 bg-white">
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-bold text-slate-900 text-lg">{template.name}</h3>
                                                <Badge variant="outline" className={`${template.preview.textColor} border-current`}>
                                                    {template.billType}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-slate-600">{template.description}</p>
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-2 mb-4">
                                            {template.features.slice(0, 3).map((feature, idx) => (
                                                <div key={idx} className="flex items-center text-xs text-slate-600">
                                                    <div className={`w-1.5 h-1.5 ${template.preview.headerColor} rounded-full mr-2`}></div>
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Select Button */}
                                        <Button
                                            className={`w-full bg-gradient-to-r ${template.color} hover:shadow-lg text-white transition-all duration-300`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelectTemplate(template.billType, template.templateStyle);
                                            }}
                                        >
                                            {selectedTemplate === template.billType ? (
                                                <>
                                                    <Check className="w-4 h-4 mr-2" />
                                                    Selected
                                                </>
                                            ) : (
                                                'Select Template'
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="absolute top-4 right-4">
                        <Button
                            onClick={handleContinue}
                            disabled={!selectedTemplate}
                            className="bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white px-8 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Continue with {selectedTemplate || 'Template'}
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </ResponsiveModal>
        </div>
    );
};

export default TemplatePickerModal;