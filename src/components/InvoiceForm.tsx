// components/InvoiceForm.tsx - Updated to work with flexible template system

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Minus, Building, User, FileText, Calculator, Palette } from "lucide-react";
import { useInvoice } from '@/contexts/InvoiceContext';
import { useTemplate } from '@/contexts/TemplateContext';
import { FormField } from '@/types/core';
import LogoUpload from './LogoUpload';
import TemplateGallery from './TemplateGallery';
import CurrencySelector from './CurrencySelector';
import { useState } from 'react';

const InvoiceForm = () => {
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);
  const {
    invoice,
    updateBusinessInfo,
    updateClientInfo,
    updateInvoiceMeta,
    updateTemplateData,
    addLineItem,
    updateLineItem,
    removeLineItem,
    updateNotes,
    updateTerms,
    updateTaxRate,
    setTemplate
  } = useInvoice();

  const { currentTemplate, templateData } = useTemplate();

  // 🔥 DYNAMIC FIELD RENDERER - Works with any field type!
  const renderField = (field: FormField) => {
    const value = templateData[field.id] || '';

    const baseProps = {
      id: field.id,
      value,
      onChange: (e: any) => updateTemplateData(field.id, e.target?.value || e),
      className: "mt-1 bg-input border-border/50",
      placeholder: field.placeholder,
      required: field.required
    };

    switch (field.type) {
      case 'select':
        return (
          <div key={field.id}>
            <Label className="text-sm font-medium text-foreground">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select value={value} onValueChange={(val) => updateTemplateData(field.id, val)}>
              <SelectTrigger className="mt-1 bg-input border-border/50">
                <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => {
                  const optionValue = typeof option === 'string' ? option : option.value;
                  const optionLabel = typeof option === 'string' ? option : option.label;
                  return (
                    <SelectItem key={optionValue} value={optionValue}>
                      {optionLabel}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {field.helpText && (
              <p className="text-xs text-muted-foreground mt-1">{field.helpText}</p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id}>
            <Label className="text-sm font-medium text-foreground">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              {...baseProps}
              rows={3}
              className="mt-1 bg-input border-border/50 resize-none"
            />
            {field.helpText && (
              <p className="text-xs text-muted-foreground mt-1">{field.helpText}</p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={!!value}
              onCheckedChange={(checked) => updateTemplateData(field.id, checked)}
            />
            <Label htmlFor={field.id} className="text-sm font-medium text-foreground">
              {field.label}
            </Label>
            {field.helpText && (
              <p className="text-xs text-muted-foreground">{field.helpText}</p>
            )}
          </div>
        );

      case 'number':
        return (
          <div key={field.id}>
            <Label className="text-sm font-medium text-foreground">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              {...baseProps}
              type="number"
              min={field.validation?.min}
              max={field.validation?.max}
              step="0.01"
            />
            {field.helpText && (
              <p className="text-xs text-muted-foreground mt-1">{field.helpText}</p>
            )}
          </div>
        );

      case 'date':
        return (
          <div key={field.id}>
            <Label className="text-sm font-medium text-foreground">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input {...baseProps} type="date" />
            {field.helpText && (
              <p className="text-xs text-muted-foreground mt-1">{field.helpText}</p>
            )}
          </div>
        );

      default: // text, email, tel
        return (
          <div key={field.id}>
            <Label className="text-sm font-medium text-foreground">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input {...baseProps} type={field.type} />
            {field.helpText && (
              <p className="text-xs text-muted-foreground mt-1">{field.helpText}</p>
            )}
          </div>
        );
    }
  };

  // Group fields by category and group
  const getFieldsByCategory = (category: string) => {
    if (!currentTemplate) return [];
    return currentTemplate.fields.filter(field => field.category === category);
  };

  const groupFieldsByGroup = (fields: FormField[]) => {
    const grouped: { [key: string]: FormField[] } = {};
    fields.forEach(field => {
      const group = field.group || 'default';
      if (!grouped[group]) grouped[group] = [];
      grouped[group].push(field);
    });
    return grouped;
  };

  const handleTemplateChange = () => {
    setShowTemplateGallery(true);
  };

  const handleTemplateSelected = (templateId: string) => {
    setTemplate(templateId);
    setShowTemplateGallery(false);
  };

  return (
    <div className="p-3 lg:p-6 space-y-6 animate-fade-in">
      {/* Template Selection */}
      <Card className="surface border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Palette className="w-5 h-5 text-white" />
              <span>Template: {currentTemplate?.name || 'None Selected'}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleTemplateChange}
            >
              Change Template
            </Button>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Invoice Details */}
      <Card className="surface border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <FileText className="w-5 h-5 text-white" />
            <span>Invoice Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="invoiceNumber" className="text-sm font-medium text-foreground">
                Invoice Number
              </Label>
              <Input
                id="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={(e) => updateInvoiceMeta('invoiceNumber', e.target.value)}
                className="mt-1 bg-input border-border/50"
                placeholder="INV-001"
              />
            </div>
            <div>
              <Label htmlFor="invoiceDate" className="text-sm font-medium text-foreground">
                Invoice Date
              </Label>
              <Input
                id="invoiceDate"
                type="date"
                value={invoice.invoiceDate}
                onChange={(e) => updateInvoiceMeta('invoiceDate', e.target.value)}
                className="mt-1 bg-input border-border/50"
              />
            </div>
            <div>
              <Label htmlFor="dueDate" className="text-sm font-medium text-foreground">
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={invoice.dueDate}
                onChange={(e) => updateInvoiceMeta('dueDate', e.target.value)}
                className="mt-1 bg-input border-border/50"
              />
            </div>
            <div>
              <CurrencySelector />
            </div>
          </div>

          {/* 🔥 DYNAMIC INVOICE-SPECIFIC FIELDS */}
          {(() => {
            const invoiceFields = getFieldsByCategory('invoice');
            if (invoiceFields.length === 0) return null;

            return (
              <div className="space-y-4 pt-4 border-t border-border/50">
                <h4 className="text-sm font-medium text-foreground">Additional Invoice Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {invoiceFields.map(renderField)}
                </div>
              </div>
            );
          })()}
        </CardContent>
      </Card>

      {/* Business Information */}
      <Card className="surface border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Building className="w-5 h-5 text-white" />
            <span>Your Business</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <LogoUpload />

          <div>
            <Label htmlFor="businessName" className="text-sm font-medium text-foreground">
              Business Name
            </Label>
            <Input
              id="businessName"
              value={invoice.businessInfo.name}
              onChange={(e) => updateBusinessInfo({ name: e.target.value })}
              className="mt-1 bg-input border-border/50"
              placeholder="Your Business Name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessEmail" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                id="businessEmail"
                type="email"
                value={invoice.businessInfo.email}
                onChange={(e) => updateBusinessInfo({ email: e.target.value })}
                className="mt-1 bg-input border-border/50"
                placeholder="business@example.com"
              />
            </div>
            <div>
              <Label htmlFor="businessPhone" className="text-sm font-medium text-foreground">
                Phone
              </Label>
              <Input
                id="businessPhone"
                type="tel"
                value={invoice.businessInfo.phone}
                onChange={(e) => updateBusinessInfo({ phone: e.target.value })}
                className="mt-1 bg-input border-border/50"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="businessAddress" className="text-sm font-medium text-foreground">
              Address
            </Label>
            <Input
              id="businessAddress"
              value={invoice.businessInfo.address}
              onChange={(e) => updateBusinessInfo({ address: e.target.value })}
              className="mt-1 bg-input border-border/50"
              placeholder="123 Business St"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="businessCity" className="text-sm font-medium text-foreground">
                City
              </Label>
              <Input
                id="businessCity"
                value={invoice.businessInfo.city}
                onChange={(e) => updateBusinessInfo({ city: e.target.value })}
                className="mt-1 bg-input border-border/50"
                placeholder="City"
              />
            </div>
            <div>
              <Label htmlFor="businessState" className="text-sm font-medium text-foreground">
                State
              </Label>
              <Input
                id="businessState"
                value={invoice.businessInfo.state}
                onChange={(e) => updateBusinessInfo({ state: e.target.value })}
                className="mt-1 bg-input border-border/50"
                placeholder="State"
              />
            </div>
            <div>
              <Label htmlFor="businessZip" className="text-sm font-medium text-foreground">
                ZIP Code
              </Label>
              <Input
                id="businessZip"
                value={invoice.businessInfo.zipCode}
                onChange={(e) => updateBusinessInfo({ zipCode: e.target.value })}
                className="mt-1 bg-input border-border/50"
                placeholder="12345"
              />
            </div>
          </div>

          {/* 🔥 DYNAMIC BUSINESS-SPECIFIC FIELDS */}
          {(() => {
            const businessFields = getFieldsByCategory('business');
            if (businessFields.length === 0) return null;

            const groupedFields = groupFieldsByGroup(businessFields);

            return (
              <div className="space-y-4 pt-4 border-t border-border/50">
                {Object.entries(groupedFields).map(([groupName, fields]) => (
                  <div key={groupName}>
                    {groupName !== 'default' && (
                      <h4 className="text-sm font-medium text-foreground mb-3 capitalize">
                        {groupName} Information
                      </h4>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {fields.map(renderField)}
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </CardContent>
      </Card>

      {/* Client Information */}
      <Card className="surface border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <User className="w-5 h-5 text-white" />
            <span>Bill To</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="clientName" className="text-sm font-medium text-foreground">
              Client Name
            </Label>
            <Input
              id="clientName"
              value={invoice.clientInfo.name}
              onChange={(e) => updateClientInfo({ name: e.target.value })}
              className="mt-1 bg-input border-border/50"
              placeholder="Client Name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientEmail" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                id="clientEmail"
                type="email"
                value={invoice.clientInfo.email}
                onChange={(e) => updateClientInfo({ email: e.target.value })}
                className="mt-1 bg-input border-border/50"
                placeholder="client@example.com"
              />
            </div>
            <div>
              <Label htmlFor="clientPhone" className="text-sm font-medium text-foreground">
                Phone
              </Label>
              <Input
                id="clientPhone"
                type="tel"
                value={invoice.clientInfo.phone}
                onChange={(e) => updateClientInfo({ phone: e.target.value })}
                className="mt-1 bg-input border-border/50"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="clientAddress" className="text-sm font-medium text-foreground">
              Address
            </Label>
            <Input
              id="clientAddress"
              value={invoice.clientInfo.address}
              onChange={(e) => updateClientInfo({ address: e.target.value })}
              className="mt-1 bg-input border-border/50"
              placeholder="123 Client St"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="clientCity" className="text-sm font-medium text-foreground">
                City
              </Label>
              <Input
                id="clientCity"
                value={invoice.clientInfo.city}
                onChange={(e) => updateClientInfo({ city: e.target.value })}
                className="mt-1 bg-input border-border/50"
                placeholder="City"
              />
            </div>
            <div>
              <Label htmlFor="clientState" className="text-sm font-medium text-foreground">
                State
              </Label>
              <Input
                id="clientState"
                value={invoice.clientInfo.state}
                onChange={(e) => updateClientInfo({ state: e.target.value })}
                className="mt-1 bg-input border-border/50"
                placeholder="State"
              />
            </div>
            <div>
              <Label htmlFor="clientZip" className="text-sm font-medium text-foreground">
                ZIP Code
              </Label>
              <Input
                id="clientZip"
                value={invoice.clientInfo.zipCode}
                onChange={(e) => updateClientInfo({ zipCode: e.target.value })}
                className="mt-1 bg-input border-border/50"
                placeholder="12345"
              />
            </div>
          </div>

          {/* 🔥 DYNAMIC CLIENT-SPECIFIC FIELDS */}
          {(() => {
            const clientFields = getFieldsByCategory('client');
            if (clientFields.length === 0) return null;

            return (
              <div className="space-y-4 pt-4 border-t border-border/50">
                <h4 className="text-sm font-medium text-foreground">Additional Client Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {clientFields.map(renderField)}
                </div>
              </div>
            );
          })()}
        </CardContent>
      </Card>

      {/* Line Items - Same as before */}
      <Card className="surface border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-white" />
              <span>Items & Services</span>
            </div>
            <Button
              onClick={addLineItem}
              size="sm"
              className="bg-black text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoice.lineItems.map((item, index) => (
              <div key={item.id} className="glass rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Item #{index + 1}
                  </span>
                  {invoice.lineItems.length > 1 && (
                    <Button
                      onClick={() => removeLineItem(item.id)}
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground">
                    Description
                  </Label>
                  <Input
                    value={item.description}
                    onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                    className="mt-1 bg-input border-border/50"
                    placeholder="Item or service description"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label className="text-sm font-medium text-foreground">
                      Quantity
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.quantity}
                      onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="mt-1 bg-input border-border/50"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground">
                      Rate
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) => updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                      className="mt-1 bg-input border-border/50"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground">
                      Amount
                    </Label>
                    <Input
                      value={item.amount.toFixed(2)}
                      readOnly
                      className="mt-1 bg-muted border-border/50 text-foreground font-medium"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceForm;