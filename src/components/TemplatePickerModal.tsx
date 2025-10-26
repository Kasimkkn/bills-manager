import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ALL_TEMPLATES } from "@/constant/templateJson";
import {
  Briefcase,
  Dumbbell,
  GraduationCap,
  Home,
  Hotel,
  Package,
  Scale,
  Scissors,
  ShoppingCart,
  Stethoscope,
  Store,
  Truck
} from "lucide-react";
import React, { Dispatch, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import ResponsiveModal from "./ui/responsive-modal";

const TemplatePickerModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

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
    Scale,
  };

  // Generate template data from constant
  const templates = Object.keys(ALL_TEMPLATES).map((billType) => {
    const templateKey = billType as keyof typeof ALL_TEMPLATES;
    const firstStyleKey = Object.keys(ALL_TEMPLATES[templateKey])[0];
    const templateData = ALL_TEMPLATES[templateKey][firstStyleKey];
    const uiMeta = templateData.uiMetadata || {
      displayName: billType,
      description: `${billType} billing template`,
      icon: "Package",
      colorGradient: "from-gray-500 to-slate-500",
      features: ["Standard billing", "Customer details", "Payment tracking"],
      headerColor: "bg-gradient-to-r from-gray-500 to-slate-500",
      accentColor: "border-gray-200 bg-gray-50",
      textColor: "text-gray-700",
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
        textColor: uiMeta.textColor,
      },
    };
  });

  // 🔍 State for search & filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // 🔎 Filter templates
  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        selectedFilter === "all" || template.billType === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [templates, searchTerm, selectedFilter]);

  const handleSelectTemplate = (billType: string, styles: string) => {
    if (billType) {
      navigate(`/create?template=${billType}&style=${styles}`);
      setIsOpen(false);
    }
  };

  // Unique bill types for dropdown filter
  const billTypes = Array.from(new Set(templates.map((t) => t.billType)));

  return (
    <ResponsiveModal
      open={isOpen}
      onOpenChange={setIsOpen}
      title='Pick Your Bill Template'
    >
      <div className='py-2'>
        {/* Search + Filter */}
        <div className='flex flex-col sm:flex-row gap-3 justify-between items-center mb-6'>
          <Input
            placeholder='Search templates here...'
            className='bg-white sm:w-2/3 w-full text-black'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className='w-full sm:w-1/3 bg-white text-black'>
              <SelectValue placeholder='Filter by Bill Type' />
            </SelectTrigger>
            <SelectContent className='bg-white text-black '>
              <SelectItem
                value='all'
                className='focus:text-white focus:bg-black'
              >
                All Bill Types
              </SelectItem>
              {billTypes.map((type) => (
                <SelectItem
                  className='focus:text-white focus:bg-black'
                  key={type}
                  value={type}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Templates Grid */}
        <div className='grid sm:grid-cols-3 grid-cols-1 gap-6 mb-8'>
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template, index) => (
              <Card
                key={index}
                className={`group cursor-pointer bg-white h-72 hover:shadow-lg transition-shadow`}
                onClick={() =>
                  handleSelectTemplate(
                    template.billType,
                    template.templateStyle
                  )
                }
              >
                <CardContent className='p-0'>
                  <div className='bg-white relative'>
                    <div className='bg-white rounded-lg overflow-hidden'>
                      {/* Header */}
                      <div className={`${template.preview.headerColor} p-3`}>
                        <div className='flex justify-between items-center'>
                          <div className='flex items-center space-x-2'>
                            <template.icon className='w-5 h-5 text-white' />
                            <div className='text-white text-sm font-bold'>
                              INVOICE
                            </div>
                          </div>
                          <div className='w-6 h-6 bg-white/20 rounded'></div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className='p-3 space-y-2'>
                        <div className='grid grid-cols-2 gap-2'>
                          <div
                            className={`${template.preview.accentColor} rounded p-2`}
                          >
                            <div className='h-1.5 bg-slate-300 rounded mb-1'></div>
                            <div className='h-1 bg-slate-200 rounded w-3/4'></div>
                          </div>
                          <div
                            className={`${template.preview.accentColor} rounded p-2`}
                          >
                            <div className='h-1.5 bg-slate-300 rounded mb-1'></div>
                            <div className='h-1 bg-slate-200 rounded w-2/3'></div>
                          </div>
                        </div>
                        <div className='space-y-1'>
                          <div className='h-1 bg-slate-200 rounded'></div>
                          <div className='h-1 bg-slate-200 rounded w-5/6'></div>
                          <div className='h-1 bg-slate-200 rounded w-4/5'></div>
                        </div>
                        <div
                          className={`${template.preview.accentColor} rounded p-2 flex justify-between items-center`}
                        >
                          <div className='h-1.5 bg-slate-300 rounded w-1/4'></div>
                          <div
                            className={`h-2 ${template.preview.headerColor} rounded w-1/3`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='p-2 bg-white'>
                    <div className='mb-4'>
                      <h3 className='font-bold text-slate-900 text-lg'>
                        {template.name}
                      </h3>
                      <p className='text-sm text-slate-600'>
                        {template.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className='text-center text-slate-500 col-span-full'>
              No templates found.
            </p>
          )}
        </div>
      </div>
    </ResponsiveModal>
  );
};

export default TemplatePickerModal;
