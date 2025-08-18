// contexts/TemplateContext.tsx - Super Flexible Context

import React, { createContext, useContext, useState, useEffect } from 'react';
import { FormField, Template, TemplateData } from '@/types/core';
import { TemplateRegistry } from '@/types/templates';

interface TemplateContextType {
  currentTemplate: Template | null;
  setCurrentTemplate: (templateId: string) => void;
  availableTemplates: Template[];
  templateData: TemplateData;
  updateTemplateData: (field: string, value: any) => void;
  resetTemplateData: () => void;
  getTemplateFields: () => FormField[];
  validateTemplateData: () => { isValid: boolean; errors: string[] };
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};

interface TemplateProviderProps {
  children: React.ReactNode;
}

export const TemplateProvider: React.FC<TemplateProviderProps> = ({ children }) => {
  const [currentTemplate, setCurrentTemplateState] = useState<Template | null>(null);
  const [templateData, setTemplateData] = useState<TemplateData>({});
  const [availableTemplates] = useState<Template[]>(TemplateRegistry.getActiveTemplates());

  // Set current template and reset data
  const setCurrentTemplate = (templateId: string) => {
    const template = TemplateRegistry.getById(templateId);
    if (template) {
      setCurrentTemplateState(template);
      // Reset to default data for this template
      setTemplateData({ ...template.defaultData });
    }
  };

  // Update template-specific data
  const updateTemplateData = (field: string, value: any) => {
    setTemplateData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Reset template data to defaults
  const resetTemplateData = () => {
    if (currentTemplate) {
      setTemplateData({ ...currentTemplate.defaultData });
    }
  };

  // Get current template fields
  const getTemplateFields = () => {
    return currentTemplate?.fields || [];
  };

  // Validate current template data
  const validateTemplateData = () => {
    if (!currentTemplate) {
      return { isValid: false, errors: ['No template selected'] };
    }
    return TemplateRegistry.validateData(currentTemplate.id, templateData);
  };

  // Set default template on mount
  useEffect(() => {
    if (!currentTemplate && availableTemplates.length > 0) {
      setCurrentTemplate('modern'); // Default template
    }
  }, [availableTemplates, currentTemplate]);

  const value: TemplateContextType = {
    currentTemplate,
    setCurrentTemplate,
    availableTemplates,
    templateData,
    updateTemplateData,
    resetTemplateData,
    getTemplateFields,
    validateTemplateData
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};
