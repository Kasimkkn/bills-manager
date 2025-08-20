
import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Check, Palette, X, Search, FileText } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Group templates by category for better organization
  const templateCategories = useMemo(() => {
    const categories = new Set(TEMPLATES.map(t => t.category));
    return Array.from(categories).sort();
  }, []);

  // Filter templates based on search and category
  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

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
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50">
      {/* Unified Mobile-First Design */}
      <div className="h-full w-full flex flex-col bg-white md:m-4 md:rounded-2xl md:shadow-2xl md:max-w-7xl md:mx-auto md:max-h-[95vh]">
        {/* Header */}
        <div className="flex-shrink-0 p-4 md:p-6 border-b border-black/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-black">Choose Your Template</h2>
              <p className="text-black/70 text-sm mt-1">Select a template that matches your business needs</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-black/70 hover:text-black flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/40 w-4 h-4" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/5 border-black/20 focus:border-black/40"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-lg border border-black/20 bg-black/5 text-black text-sm min-w-[140px] focus:border-black/40 focus:outline-none"
            >
              <option value="all">All Categories</option>
              {templateCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-2 ${
                  currentTemplate === template.id
                    ? 'border-black/40 shadow-lg bg-black/5'
                    : 'border-black/10 hover:border-black/30 bg-white'
                }`}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardContent className="p-4">
                  {/* Template Preview */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg mb-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br" style={{
                      background: `linear-gradient(135deg, ${template.colorScheme.primary}15 0%, ${template.colorScheme.secondary}15 100%)`
                    }}>
                      <div className="flex items-center justify-center h-full">
                        <FileText className="w-6 h-6 md:w-8 md:h-8" style={{ color: template.colorScheme.primary }} />
                      </div>
                    </div>
                    
                    {/* Selection Indicator */}
                    {currentTemplate === template.id && (
                      <div className="absolute top-2 right-2 bg-black text-white rounded-full p-1.5">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                    
                    {/* Hover Effect */}
                    {hoveredTemplate === template.id && currentTemplate !== template.id && (
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <Button size="sm" className="bg-white/95 text-black hover:bg-white text-xs">
                          Select
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {/* Template Info */}
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-semibold text-black text-sm md:text-base line-clamp-1">{template.name}</h3>
                      <p className="text-black/60 text-xs md:text-sm line-clamp-2 mt-1">{template.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs bg-black/5 border-black/20 text-black/70 px-2 py-0.5">
                        {template.category}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <div 
                          className="w-3 h-3 rounded-full border border-black/20"
                          style={{ backgroundColor: template.colorScheme.primary }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full border border-black/20"
                          style={{ backgroundColor: template.colorScheme.secondary }}
                        />
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-black/5 text-black/60 px-2 py-0.5 rounded">
                          {feature}
                        </span>
                      ))}
                      {template.features.length > 2 && (
                        <span className="text-xs text-black/40">+{template.features.length - 2} more</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* No Results */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-black/20 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-black/60 mb-2">No templates found</h3>
              <p className="text-black/40 text-sm">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex-shrink-0 p-4 md:p-6 border-t border-black/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-black/70 text-center sm:text-left">
              You can switch templates anytime without losing your data
            </p>
            <Button 
              onClick={() => handleTemplateSelect(currentTemplate)}
              className="bg-black text-white hover:bg-black/90 w-full sm:w-auto"
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
