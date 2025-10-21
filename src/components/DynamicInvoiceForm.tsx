import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { AlertCircle, Plus, Trash2, Upload, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DynamicBillConfig } from '@/types/invoice';
import DeleteConfirmDialog from './DeleteConfirmDialog';


interface DynamicInvoiceFormProps {
    formData: DynamicBillConfig;
    onChange: (data: DynamicBillConfig) => void;
}

const DynamicInvoiceForm: React.FC<DynamicInvoiceFormProps> = ({ formData, onChange }) => {
    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        title: string;
        description: string;
        onConfirm: () => void;
    }>({
        open: false,
        title: '',
        description: '',
        onConfirm: () => { },
    });

    const updateFormData = (path: string, value: any) => {
        const keys = path.split('.');
        const newData = JSON.parse(JSON.stringify(formData));
        let current = newData;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
        }

        current[keys[keys.length - 1]] = value;
        onChange(newData);
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateFormData('businessInfo.logo', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addItem = () => {
        const newItem = {
            itemName: '',
            hsnCode: '',
            quantity: 1,
            unit: 'pcs',
            rate: 0,
            discount: 0,
            tax: 0,
        };
        const newItems = [...(formData.itemList || []), newItem];
        updateFormData('itemList', newItems);
    };

    const updateItem = (index: number, field: string, value: any) => {
        const newItems = [...(formData.itemList || [])];
        newItems[index] = { ...newItems[index], [field]: value };
        updateFormData('itemList', newItems);
    };

    const deleteItem = (index: number) => {
        setDeleteDialog({
            open: true,
            title: 'Delete Item',
            description: `Are you sure you want to delete "${formData.itemList?.[index]?.itemName || 'this item'}"? This action cannot be undone.`,
            onConfirm: () => {
                const newItems = formData.itemList?.filter((_, i) => i !== index);
                updateFormData('itemList', newItems);
            },
        });
    };

    const calculateSubtotal = () => {
        return formData.itemList?.reduce((sum, item) => {
            const itemTotal = (item.quantity || 0) * item.rate;
            const discount = item.discount || 0;
            return sum + itemTotal - discount;
        }, 0) || 0;
    };

    return (
        <div className="space-y-6 p-6">
            <DeleteConfirmDialog
                open={deleteDialog.open}
                onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
                onConfirm={deleteDialog.onConfirm}
                title={deleteDialog.title}
                description={deleteDialog.description}
            />

            {/* Bill Type */}
            <Card>
                <CardHeader>
                    <CardTitle>Invoice Type</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label>Bill Type</Label>
                        <Select
                            value={formData.billType}
                            onValueChange={(value) => updateFormData('billType', value)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ECOMMERCE">E-Commerce</SelectItem>
                                <SelectItem value="HOTEL">Hotel</SelectItem>
                                <SelectItem value="FREELANCER">Freelancer</SelectItem>
                                <SelectItem value="SUPPLIER">Supplier</SelectItem>
                                <SelectItem value="RETAILER">Retailer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Business Information */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle>Business Information</CardTitle>
                    <Switch
                        checked={formData.isBusinessInfoNeeded}
                        onCheckedChange={(checked) => {
                            updateFormData('isBusinessInfoNeeded', checked);
                            if (!checked) updateFormData('businessInfo', undefined);
                        }}
                    />
                </CardHeader>
                {formData.isBusinessInfoNeeded && (
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Business Name *</Label>
                            <Input
                                value={formData.businessInfo?.name || ''}
                                onChange={(e) => updateFormData('businessInfo.name', e.target.value)}
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
                                            onClick={() => updateFormData('businessInfo.logo', undefined)}
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

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Phone Number</Label>
                                <Input
                                    value={formData.businessInfo?.phoneNumber || ''}
                                    onChange={(e) => updateFormData('businessInfo.phoneNumber', e.target.value)}
                                    placeholder="Enter phone"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    value={formData.businessInfo?.email || ''}
                                    onChange={(e) => updateFormData('businessInfo.email', e.target.value)}
                                    placeholder="Enter email"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>GST Number</Label>
                                <Input
                                    value={formData.businessInfo?.gstNumber || ''}
                                    onChange={(e) => updateFormData('businessInfo.gstNumber', e.target.value)}
                                    placeholder="Enter GST number"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Tax ID</Label>
                                <Input
                                    value={formData.businessInfo?.taxId || ''}
                                    onChange={(e) => updateFormData('businessInfo.taxId', e.target.value)}
                                    placeholder="Enter tax ID"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Address</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    value={formData.businessInfo?.address?.city || ''}
                                    onChange={(e) => updateFormData('businessInfo.address.city', e.target.value)}
                                    placeholder="City"
                                />
                                <Input
                                    value={formData.businessInfo?.address?.state || ''}
                                    onChange={(e) => updateFormData('businessInfo.address.state', e.target.value)}
                                    placeholder="State"
                                />
                                <Input
                                    value={formData.businessInfo?.address?.country || ''}
                                    onChange={(e) => updateFormData('businessInfo.address.country', e.target.value)}
                                    placeholder="Country"
                                />
                                <Input
                                    value={formData.businessInfo?.address?.pincode || ''}
                                    onChange={(e) => updateFormData('businessInfo.address.pincode', e.target.value)}
                                    placeholder="Pincode"
                                />
                            </div>
                        </div>
                    </CardContent>
                )}
            </Card>

            {/* Invoice Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Invoice Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Invoice Number</Label>
                            <Input
                                value={formData.invoiceInfo?.invoiceNumber || ''}
                                onChange={(e) => updateFormData('invoiceInfo.invoiceNumber', e.target.value)}
                                placeholder="#INV-001"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Invoice Date</Label>
                            <Input
                                type="date"
                                value={formData.invoiceInfo?.invoiceDate || ''}
                                onChange={(e) => updateFormData('invoiceInfo.invoiceDate', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Due Date</Label>
                            <Input
                                type="date"
                                value={formData.invoiceInfo?.invoiceDueDate || ''}
                                onChange={(e) => updateFormData('invoiceInfo.invoiceDueDate', e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle>Customer Information</CardTitle>
                    <Switch
                        checked={formData.isCustomerInfoNeeded}
                        onCheckedChange={(checked) => {
                            updateFormData('isCustomerInfoNeeded', checked);
                            if (!checked) updateFormData('customerInfo', undefined);
                        }}
                    />
                </CardHeader>
                {formData.isCustomerInfoNeeded && (
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Customer Name *</Label>
                            <Input
                                value={formData.customerInfo?.name || ''}
                                onChange={(e) => updateFormData('customerInfo.name', e.target.value)}
                                placeholder="Enter customer name"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input
                                    value={formData.customerInfo?.phone || ''}
                                    onChange={(e) => updateFormData('customerInfo.phone', e.target.value)}
                                    placeholder="Enter phone"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    value={formData.customerInfo?.email || ''}
                                    onChange={(e) => updateFormData('customerInfo.email', e.target.value)}
                                    placeholder="Enter email"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Address</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    value={formData.customerInfo?.address?.city || ''}
                                    onChange={(e) => updateFormData('customerInfo.address.city', e.target.value)}
                                    placeholder="City"
                                />
                                <Input
                                    value={formData.customerInfo?.address?.state || ''}
                                    onChange={(e) => updateFormData('customerInfo.address.state', e.target.value)}
                                    placeholder="State"
                                />
                                <Input
                                    value={formData.customerInfo?.address?.country || ''}
                                    onChange={(e) => updateFormData('customerInfo.address.country', e.target.value)}
                                    placeholder="Country"
                                />
                                <Input
                                    value={formData.customerInfo?.address?.pincode || ''}
                                    onChange={(e) => updateFormData('customerInfo.address.pincode', e.target.value)}
                                    placeholder="Pincode"
                                />
                            </div>
                        </div>
                    </CardContent>
                )}
            </Card>

            {/* Item List */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle>Items / Services</CardTitle>
                    <Switch
                        checked={formData.isItemListNeeded}
                        onCheckedChange={(checked) => {
                            updateFormData('isItemListNeeded', checked);
                            if (!checked) updateFormData('itemList', undefined);
                        }}
                    />
                </CardHeader>
                {formData.isItemListNeeded && (
                    <CardContent className="space-y-4">
                        {formData.itemList?.map((item, index) => (
                            <div key={index} className="rounded-lg border p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium">Item {index + 1}</h4>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteItem(index)}
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2 col-span-2">
                                        <Label>Item Name *</Label>
                                        <Input
                                            value={item.itemName}
                                            onChange={(e) => updateItem(index, 'itemName', e.target.value)}
                                            placeholder="Enter item name"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>HSN Code</Label>
                                        <Input
                                            value={item.hsnCode || ''}
                                            onChange={(e) => updateItem(index, 'hsnCode', e.target.value)}
                                            placeholder="Enter HSN"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Quantity</Label>
                                        <Input
                                            type="number"
                                            value={item.quantity || 0}
                                            onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                                            placeholder="0"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Rate</Label>
                                        <Input
                                            type="number"
                                            value={item.rate}
                                            onChange={(e) => updateItem(index, 'rate', Number(e.target.value))}
                                            placeholder="0.00"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Tax (%)</Label>
                                        <Input
                                            type="number"
                                            value={item.tax || 0}
                                            onChange={(e) => updateItem(index, 'tax', Number(e.target.value))}
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Button onClick={addItem} variant="outline" className="w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Item
                        </Button>

                        {formData.itemList && formData.itemList.length > 0 && (
                            <Alert>
                                <AlertDescription>
                                    Subtotal: ₹{calculateSubtotal().toFixed(2)}
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                )}
            </Card>

            {/* Payment Section */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle>Payment Details</CardTitle>
                    <Switch
                        checked={formData.isPaymentSectionNeeded}
                        onCheckedChange={(checked) => {
                            updateFormData('isPaymentSectionNeeded', checked);
                            if (!checked) updateFormData('payment', undefined);
                        }}
                    />
                </CardHeader>
                {formData.isPaymentSectionNeeded && (
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Payment Method</Label>
                                <Select
                                    value={formData.payment?.paymentOption || 'CASH'}
                                    onValueChange={(value) => updateFormData('payment.paymentOption', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="CASH">Cash</SelectItem>
                                        <SelectItem value="UPI">UPI</SelectItem>
                                        <SelectItem value="CARD">Card</SelectItem>
                                        <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                                        <SelectItem value="COD">Cash on Delivery</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Transaction ID</Label>
                                <Input
                                    value={formData.payment?.transactionId || ''}
                                    onChange={(e) => updateFormData('payment.transactionId', e.target.value)}
                                    placeholder="Enter transaction ID"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Amount Paid</Label>
                            <Input
                                type="number"
                                value={formData.payment?.amountPaid || 0}
                                onChange={(e) => updateFormData('payment.amountPaid', Number(e.target.value))}
                                placeholder="0.00"
                            />
                        </div>
                    </CardContent>
                )}
            </Card>

            {/* Bank Details */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle>Bank Details</CardTitle>
                    <Switch
                        checked={formData.isBankDetailsNeeded}
                        onCheckedChange={(checked) => {
                            updateFormData('isBankDetailsNeeded', checked);
                            if (!checked) updateFormData('bankDetails', undefined);
                        }}
                    />
                </CardHeader>
                {formData.isBankDetailsNeeded && (
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Bank Name</Label>
                                <Input
                                    value={formData.bankDetails?.bankName || ''}
                                    onChange={(e) => updateFormData('bankDetails.bankName', e.target.value)}
                                    placeholder="Enter bank name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Account Holder Name</Label>
                                <Input
                                    value={formData.bankDetails?.accountHolderName || ''}
                                    onChange={(e) => updateFormData('bankDetails.accountHolderName', e.target.value)}
                                    placeholder="Enter account holder name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Account Number</Label>
                                <Input
                                    value={formData.bankDetails?.accountNumber || ''}
                                    onChange={(e) => updateFormData('bankDetails.accountNumber', e.target.value)}
                                    placeholder="Enter account number"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>IFSC Code</Label>
                                <Input
                                    value={formData.bankDetails?.ifscCode || ''}
                                    onChange={(e) => updateFormData('bankDetails.ifscCode', e.target.value)}
                                    placeholder="Enter IFSC code"
                                />
                            </div>

                            <div className="space-y-2 col-span-2">
                                <Label>UPI ID</Label>
                                <Input
                                    value={formData.bankDetails?.upiId || ''}
                                    onChange={(e) => updateFormData('bankDetails.upiId', e.target.value)}
                                    placeholder="Enter UPI ID"
                                />
                            </div>
                        </div>
                    </CardContent>
                )}
            </Card>

            {/* Footer */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle>Footer & Terms</CardTitle>
                    <Switch
                        checked={formData.isFooterNeeded}
                        onCheckedChange={(checked) => {
                            updateFormData('isFooterNeeded', checked);
                            if (!checked) updateFormData('footer', undefined);
                        }}
                    />
                </CardHeader>
                {formData.isFooterNeeded && (
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Thank You Message</Label>
                            <Textarea
                                value={formData.footer?.exitMessage || ''}
                                onChange={(e) => updateFormData('footer.exitMessage', e.target.value)}
                                placeholder="Thank you for your business!"
                                rows={2}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Return Policy</Label>
                            <Textarea
                                value={formData.footer?.returnPolicy || ''}
                                onChange={(e) => updateFormData('footer.returnPolicy', e.target.value)}
                                placeholder="Enter return policy"
                                rows={2}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Payment Terms</Label>
                            <Textarea
                                value={formData.footer?.paymentTerms || ''}
                                onChange={(e) => updateFormData('footer.paymentTerms', e.target.value)}
                                placeholder="Enter payment terms"
                                rows={2}
                            />
                        </div>
                    </CardContent>
                )}
            </Card>
        </div>
    );
};

export default DynamicInvoiceForm;