
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Palette, X } from "lucide-react";
import { TEMPLATES, TemplateType } from '@/types/templates';
import { useTemplate } from '@/contexts/TemplateContext';

interface TemplateGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

const TemplateGallery = ({ isOpen, onClose }: TemplateGalleryProps) => {
  const { currentTemplate, setCurrentTemplate } = useTemplate();
  const [hoveredTemplate, setHoveredTemplate] = useState<TemplateType | null>(null);

  if (!isOpen) return null;

  const handleTemplateSelect = (templateId: TemplateType) => {
    setCurrentTemplate(templateId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="bg-surface-elevated rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Choose Your Template</h2>
              <p className="text-muted-foreground mt-1">Select a template that matches your business needs</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 ${
                  currentTemplate === template.id
                    ? 'border-primary shadow-lg shadow-primary/25'
                    : 'border-border/50 hover:border-primary/50'
                }`}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardContent className="p-0">
                  {/* Template Preview */}
                  <div className="relative h-48 bg-gradient-to-br from-surface to-surface-elevated rounded-t-lg overflow-hidden">
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: `linear-gradient(135deg, ${template.colorScheme.primary}20, ${template.colorScheme.accent}20)`
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Palette 
                          className="w-12 h-12 mx-auto mb-4 opacity-60"
                          style={{ color: template.colorScheme.primary }}
                        />
                        <div className="text-sm font-medium text-foreground">{template.name}</div>
                        <div className="text-xs text-muted-foreground">{template.category}</div>
                      </div>
                    </div>
                    
                    {/* Selection Indicator */}
                    {currentTemplate === template.id && (
                      <div className="absolute top-3 right-3 bg-primary text-background rounded-full p-1">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="font-semibold text-foreground">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {template.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: template.colorScheme.primary }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: template.colorScheme.secondary }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: template.colorScheme.accent }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">Color Scheme</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-border/50 bg-surface/50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              You can switch templates anytime without losing your data
            </p>
            <Button onClick={onClose}>
              Continue with {TEMPLATES.find(t => t.id === currentTemplate)?.name}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateGallery;
