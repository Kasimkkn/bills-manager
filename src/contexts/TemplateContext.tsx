
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TemplateType, TEMPLATES } from '@/types/templates';

interface TemplateContextType {
  currentTemplate: TemplateType;
  setCurrentTemplate: (template: TemplateType) => void;
  templateData: Record<string, any>;
  updateTemplateData: (field: string, value: any) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTemplate, setCurrentTemplate] = useState<TemplateType>('modern');
  const [templateData, setTemplateData] = useState<Record<string, any>>({});

  // Load saved template from localStorage
  useEffect(() => {
    const savedTemplate = localStorage.getItem('selected-template');
    if (savedTemplate && TEMPLATES.find(t => t.id === savedTemplate)) {
      setCurrentTemplate(savedTemplate as TemplateType);
    }
  }, []);

  // Save template selection
  useEffect(() => {
    localStorage.setItem('selected-template', currentTemplate);
  }, [currentTemplate]);

  // Auto-save template data
  useEffect(() => {
    localStorage.setItem('template-data', JSON.stringify(templateData));
  }, [templateData]);

  const updateTemplateData = (field: string, value: any) => {
    setTemplateData(prev => ({ ...prev, [field]: value }));
  };

  const value = {
    currentTemplate,
    setCurrentTemplate,
    templateData,
    updateTemplateData,
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};
