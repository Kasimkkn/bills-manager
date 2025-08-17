
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Building, User, FileText, Calculator } from "lucide-react";
import { useInvoice } from '@/contexts/InvoiceContext';

const InvoiceForm = () => {
  const { 
    invoice, 
    updateBusinessInfo, 
    updateClientInfo, 
    updateInvoiceMeta,
    addLineItem,
    updateLineItem,
    removeLineItem,
    updateNotes,
    updateTerms,
    updateTaxRate
  } = useInvoice();

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Invoice Details */}
      <Card className="surface border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <FileText className="w-5 h-5 text-primary" />
            <span>Invoice Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="invoiceNumber" className="text-sm font-medium text-foreground">
                Invoice Number
              </Label>
              <Input
                id="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={(e) => updateInvoiceMeta('invoiceNumber', e.target.value)}
                className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
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
                className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
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
                className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Information */}
      <Card className="surface border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Building className="w-5 h-5 text-primary" />
            <span>Your Business</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="businessName" className="text-sm font-medium text-foreground">
              Business Name
            </Label>
            <Input
              id="businessName"
              value={invoice.businessInfo.name}
              onChange={(e) => updateBusinessInfo({ name: e.target.value })}
              className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
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
                className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
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
                className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
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
              className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
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
                className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
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
                className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
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
                className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
                placeholder="12345"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Information */}
      <Card className="surface border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <User className="w-5 h-5 text-primary" />
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
              className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
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
                className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
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
                className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
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
              className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
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
                className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
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
                className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
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
                className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
                placeholder="12345"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card className="surface border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-primary" />
              <span>Items & Services</span>
            </div>
            <Button
              onClick={addLineItem}
              size="sm"
              className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 hover:border-primary/30"
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
                    className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
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
                      className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground">
                      Rate ($)
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) => updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                      className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground">
                      Amount ($)
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

          <Separator className="my-6" />

          {/* Tax Rate */}
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-foreground">
              Tax Rate (%)
            </Label>
            <div className="w-24">
              <Input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={invoice.taxRate}
                onChange={(e) => updateTaxRate(parseFloat(e.target.value) || 0)}
                className="bg-input border-border/50 focus:border-primary/50 focus-ring text-center"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes & Terms */}
      <Card className="surface border-border/50">
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="notes" className="text-sm font-medium text-foreground">
              Notes
            </Label>
            <Textarea
              id="notes"
              value={invoice.notes}
              onChange={(e) => updateNotes(e.target.value)}
              className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring resize-none"
              placeholder="Additional notes for your client..."
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="terms" className="text-sm font-medium text-foreground">
              Payment Terms
            </Label>
            <Textarea
              id="terms"
              value={invoice.terms}
              onChange={(e) => updateTerms(e.target.value)}
              className="mt-1 bg-input border-border/50 focus:border-primary/50 focus-ring resize-none"
              placeholder="Payment terms and conditions..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceForm;
