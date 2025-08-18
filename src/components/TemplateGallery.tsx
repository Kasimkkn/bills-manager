
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
  onTemplateSelect?: () => void;
}

const TemplateGallery = ({ isOpen, onClose, onTemplateSelect }: TemplateGalleryProps) => {
  const { currentTemplate, setCurrentTemplate } = useTemplate();
  const [hoveredTemplate, setHoveredTemplate] = useState<TemplateType | null>(null);

  if (!isOpen) return null;

  const handleTemplateSelect = (templateId: TemplateType) => {
    setCurrentTemplate(templateId);
    if (onTemplateSelect) {
      onTemplateSelect();
    } else {
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Desktop Modal */}
      <div
        className="hidden md:flex items-center justify-center w-full h-full"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-2 border-b border-border/50">
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
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 ${currentTemplate === template.id
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
              <Button onClick={() => handleTemplateSelect(currentTemplate)}>
                Continue with {TEMPLATES.find(t => t.id === currentTemplate)?.name}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      <div className="md:hidden fixed inset-0 z-50">
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-lg"
          onClick={onClose}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-surface-elevated rounded-t-3xl max-h-[85vh] overflow-hidden animate-slide-in-right">
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-border rounded-full" />
          </div>

          {/* Header */}
          <div className="px-6 py-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Choose Template</h2>
                <p className="text-sm text-muted-foreground">Select your invoice style</p>
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

          {/* Templates Grid */}
          <div className="p-4 overflow-y-auto max-h-[60vh]">
            <div className="grid grid-cols-1 gap-4">
              {TEMPLATES.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all duration-300 border-2 ${currentTemplate === template.id
                    ? 'border-primary shadow-lg shadow-primary/25'
                    : 'border-border/50'
                    }`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${template.colorScheme.primary}20, ${template.colorScheme.accent}20)`
                        }}
                      >
                        <Palette
                          className="w-8 h-8 opacity-60"
                          style={{ color: template.colorScheme.primary }}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground">{template.name}</h3>
                          {currentTemplate === template.id && (
                            <div className="bg-primary text-background rounded-full p-1">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {template.features.slice(0, 2).map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {template.features.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{template.features.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border/50 bg-surface/50">
            <Button
              onClick={() => handleTemplateSelect(currentTemplate)}
              className="w-full"
            >
              Continue with {TEMPLATES.find(t => t.id === currentTemplate)?.name}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateGallery;
