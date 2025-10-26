import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    AlertCircle,
    ArrowRight,
    ArrowLeft,
    Building2,
    User,
    Phone,
    Mail,
    MapPin,
    Upload,
    CheckCircle2,
    FileText,
    Settings,
    X
} from 'lucide-react';
import {
    BusinessProfileFormData,
    BusinessProfileFormErrors,
    DEFAULT_BUSINESS_PROFILE_FORM_DATA
} from '@/types/buissnessSetupTypes';
import AuthLayout from '@/components/layout/AuthLayout';

const BusinessProfileSetup = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState<BusinessProfileFormData>(
        DEFAULT_BUSINESS_PROFILE_FORM_DATA
    );
    const [errors, setErrors] = useState<BusinessProfileFormErrors>({});

    const businessTypes = [
        'Contractor', 'Hardware Shop', 'Electrician', 'Garage', 'Mobile Shop',
        'Tailor', 'Clinic', 'Salon', 'Laundry', 'General Store', 'Other'
    ];

    const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
        'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
        'Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
    ];

    // Validation functions
    const validateStep1 = () => {
        const newErrors: BusinessProfileFormErrors = {};
        if (!formData.businessName.trim()) {
            newErrors.businessName = 'Business name is required';
        } else if (formData.businessName.trim().length < 3) {
            newErrors.businessName = 'Business name must be at least 3 characters';
        }

        if (!formData.businessType) {
            newErrors.businessType = 'Please select a business type';
        }

        if (!formData.contactNumber) {
            newErrors.contactNumber = 'Contact number is required';
        } else if (!/^\d{10}$/.test(formData.contactNumber)) {
            newErrors.contactNumber = 'Contact number must be exactly 10 digits';
        } else if (!/^[6-9]\d{9}$/.test(formData.contactNumber)) {
            newErrors.contactNumber = 'Invalid Indian mobile number (must start with 6-9)';
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors: BusinessProfileFormErrors = {};
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        } else if (formData.address.trim().length < 10) {
            newErrors.address = 'Please provide a complete address (min 10 characters)';
        }

        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.city)) {
            newErrors.city = 'City name should contain only letters';
        }

        if (!formData.state) {
            newErrors.state = 'Please select a state';
        }

        if (!formData.pinCode) {
            newErrors.pinCode = 'PIN code is required';
        } else if (!/^\d{6}$/.test(formData.pinCode)) {
            newErrors.pinCode = 'PIN code must be exactly 6 digits';
        }

        if (formData.gstRegistered && !formData.gstin) {
            newErrors.gstin = 'GSTIN is required when GST registered';
        }

        if (formData.gstin && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstin)) {
            newErrors.gstin = 'Invalid GSTIN format (e.g., 22AAAAA0000A1Z5)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors: BusinessProfileFormErrors = {};
        if (!formData.invoicePrefix.trim()) {
            newErrors.invoicePrefix = 'Invoice prefix is required';
        } else if (!/^[A-Z0-9-_]+$/i.test(formData.invoicePrefix)) {
            newErrors.invoicePrefix = 'Invoice prefix can only contain letters, numbers, hyphens, and underscores';
        }

        const invoiceNum = parseInt(formData.startingInvoiceNumber);
        if (!formData.startingInvoiceNumber || invoiceNum < 1) {
            newErrors.startingInvoiceNumber = 'Starting number must be at least 1';
        } else if (invoiceNum > 999999) {
            newErrors.startingInvoiceNumber = 'Starting number cannot exceed 999999';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input changes
    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        // Clear error for this field
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    // Handle logo upload
    const handleLogoUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setErrors({ ...errors, businessLogo: 'File size must be less than 2MB' });
                return;
            }
            if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
                setErrors({ ...errors, businessLogo: 'Only JPG and PNG files are allowed' });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    businessLogo: file,
                    logoPreview: reader.result as string
                });
                setErrors({ ...errors, businessLogo: '' });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setFormData({
            ...formData,
            businessLogo: null,
            logoPreview: null
        });
    };

    // Navigation
    const handleNext = () => {
        let isValid = false;

        if (currentStep === 1) {
            isValid = validateStep1();
        } else if (currentStep === 2) {
            isValid = validateStep2();
        }

        if (isValid) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateStep3()) {
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            console.log('Business profile setup completed:', formData);
            alert('Business profile setup completed successfully!');
            setIsLoading(false);
        }, 1500);
    };

    // Progress indicator
    const steps = [
        { number: 1, title: 'Business Info', icon: Building2 },
        { number: 2, title: 'Details & Address', icon: FileText },
        { number: 3, title: 'Preferences', icon: Settings }
    ];

    return (
        <AuthLayout>
            <div>

                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => (
                            <div key={step.number} className="flex items-center flex-1">
                                <div className="flex flex-col items-center flex-1">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${currentStep === step.number
                                            ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200'
                                            : currentStep > step.number
                                                ? 'bg-green-500 border-green-500 text-white'
                                                : 'bg-white border-slate-300 text-slate-400'
                                            }`}
                                    >
                                        {currentStep > step.number ? (
                                            <CheckCircle2 className="w-6 h-6" />
                                        ) : (
                                            <step.icon className="w-6 h-6" />
                                        )}
                                    </div>
                                    <p
                                        className={`text-xs mt-2 font-medium text-center ${currentStep === step.number ? 'text-blue-600' : 'text-slate-500'
                                            }`}
                                    >
                                        {step.title}
                                    </p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`h-1 flex-1 -mt-8 transition-all rounded ${currentStep > step.number ? 'bg-green-500' : 'bg-slate-200'
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1: Business Information */}
                    {currentStep === 1 && (
                        <div className="space-y-5 animate-in fade-in duration-500">
                            <div className="space-y-2">
                                <Label htmlFor="businessName" className="text-sm font-medium text-slate-700">
                                    Business Name <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <Input
                                        id="businessName"
                                        placeholder="Enter your business name"
                                        value={formData.businessName}
                                        onChange={(e) => handleChange('businessName', e.target.value)}
                                        className={`pl-11 h-12 ${errors.businessName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                    />
                                </div>
                                {errors.businessName && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.businessName}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="businessType" className="text-sm font-medium text-slate-700">
                                    Business Type <span className="text-red-500">*</span>
                                </Label>
                                <Select value={formData.businessType} onValueChange={(value) => handleChange('businessType', value)}>
                                    <SelectTrigger className={`h-12 ${errors.businessType ? 'border-red-500' : ''}`}>
                                        <SelectValue placeholder="Select business type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {businessTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.businessType && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.businessType}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ownerName" className="text-sm font-medium text-slate-700">
                                    Owner Name
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <Input
                                        id="ownerName"
                                        placeholder="Kasim K"
                                        value={formData.ownerName}
                                        onChange={(e) => handleChange('ownerName', e.target.value)}
                                        className="pl-11 h-12"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="contactNumber" className="text-sm font-medium text-slate-700">
                                    Contact Number <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <Input
                                        id="contactNumber"
                                        type="tel"
                                        placeholder="10-digit mobile number"
                                        value={formData.contactNumber}
                                        onChange={(e) =>
                                            handleChange('contactNumber', e.target.value.replace(/\D/g, '').slice(0, 10))
                                        }
                                        className={`pl-11 h-12 ${errors.contactNumber ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                    />
                                </div>
                                {errors.contactNumber && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.contactNumber}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="kasim@gmail.com"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        className={`pl-11 h-12 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Business Details */}
                    {currentStep === 2 && (
                        <div className="space-y-5 animate-in fade-in duration-500">
                            <div className="text-center mb-6">
                                <FileText className="w-12 h-12 mx-auto text-blue-600 mb-3" />
                                <h2 className="text-2xl font-bold text-slate-900">Business Details</h2>
                                <p className="text-sm text-slate-600 mt-1">Provide your business location and GST details</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-sm font-medium text-slate-700">
                                    Complete Address <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <Textarea
                                        id="address"
                                        placeholder="Enter complete business address"
                                        value={formData.address}
                                        onChange={(e) => handleChange('address', e.target.value)}
                                        rows={3}
                                        className={`pl-11 pt-3 resize-none ${errors.address ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                    />
                                </div>
                                {errors.address && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.address}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city" className="text-sm font-medium text-slate-700">
                                        City <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="city"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={(e) => handleChange('city', e.target.value)}
                                        className={`h-12 ${errors.city ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                    />
                                    {errors.city && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.city}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="pinCode" className="text-sm font-medium text-slate-700">
                                        PIN Code <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="pinCode"
                                        placeholder="6-digit PIN"
                                        value={formData.pinCode}
                                        onChange={(e) => handleChange('pinCode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        className={`h-12 ${errors.pinCode ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                    />
                                    {errors.pinCode && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.pinCode}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="state" className="text-sm font-medium text-slate-700">
                                    State <span className="text-red-500">*</span>
                                </Label>
                                <Select value={formData.state} onValueChange={(value) => handleChange('state', value)}>
                                    <SelectTrigger className={`h-12 ${errors.state ? 'border-red-500' : ''}`}>
                                        <SelectValue placeholder="Select state" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {indianStates.map((state) => (
                                            <SelectItem key={state} value={state}>
                                                {state}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.state && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.state}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-slate-700">GST Registered?</Label>
                                <div className="flex gap-4">
                                    <Button
                                        type="button"
                                        onClick={() => handleChange('gstRegistered', true)}
                                        variant={formData.gstRegistered ? 'default' : 'outline'}
                                        className={`flex-1 h-12 ${formData.gstRegistered ? 'bg-blue-600 hover:bg-blue-700' : ''
                                            }`}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            handleChange('gstRegistered', false);
                                            handleChange('gstin', '');
                                        }}
                                        variant={!formData.gstRegistered ? 'default' : 'outline'}
                                        className={`flex-1 h-12 ${!formData.gstRegistered ? 'bg-blue-600 hover:bg-blue-700' : ''
                                            }`}
                                    >
                                        No
                                    </Button>
                                </div>
                            </div>

                            {formData.gstRegistered && (
                                <div className="space-y-2 animate-in fade-in duration-300">
                                    <Label htmlFor="gstin" className="text-sm font-medium text-slate-700">
                                        GSTIN <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="gstin"
                                        placeholder="22AAAAA0000A1Z5"
                                        value={formData.gstin}
                                        onChange={(e) => handleChange('gstin', e.target.value.toUpperCase())}
                                        maxLength={15}
                                        className={`h-12 ${errors.gstin ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                    />
                                    {errors.gstin && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.gstin}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="logo" className="text-sm font-medium text-slate-700">
                                    Business Logo (Optional)
                                </Label>
                                <div className="space-y-3">
                                    {formData.logoPreview && (
                                        <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg bg-slate-50">
                                            <img
                                                src={formData.logoPreview}
                                                alt="Logo preview"
                                                className="w-16 h-16 object-cover rounded border border-slate-200"
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-slate-700">{formData.businessLogo?.name}</p>
                                                <p className="text-xs text-slate-500">
                                                    {(formData.businessLogo?.size / 1024).toFixed(2)} KB
                                                </p>
                                            </div>
                                            <Button type="button" variant="ghost" size="sm" onClick={removeLogo}>
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    )}
                                    <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all">
                                        <Upload className="w-8 h-8 text-slate-400 mb-2" />
                                        <p className="text-sm text-slate-600">Click to upload logo</p>
                                        <p className="text-xs text-slate-500 mt-1">JPG, PNG up to 2MB</p>
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/jpg"
                                            onChange={handleLogoUpload}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {errors.businessLogo && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.businessLogo}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Preferences */}
                    {currentStep === 3 && (
                        <div className="space-y-5 animate-in fade-in duration-500">
                            <div className="text-center mb-6">
                                <Settings className="w-12 h-12 mx-auto text-blue-600 mb-3" />
                                <h2 className="text-2xl font-bold text-slate-900">Preferences</h2>
                                <p className="text-sm text-slate-600 mt-1">Customize your invoice settings</p>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-slate-700">Default Currency</Label>
                                <Input value="INR (₹)" disabled className="h-12 bg-slate-50" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="invoicePrefix" className="text-sm font-medium text-slate-700">
                                        Invoice Prefix <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="invoicePrefix"
                                        placeholder="INV-"
                                        value={formData.invoicePrefix}
                                        onChange={(e) => handleChange('invoicePrefix', e.target.value)}
                                        className={`h-12 ${errors.invoicePrefix ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                    />
                                    {errors.invoicePrefix && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.invoicePrefix}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="startingInvoiceNumber" className="text-sm font-medium text-slate-700">
                                        Starting Number <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="startingInvoiceNumber"
                                        type="number"
                                        min="1"
                                        value={formData.startingInvoiceNumber}
                                        onChange={(e) => handleChange('startingInvoiceNumber', e.target.value)}
                                        className={`h-12 ${errors.startingInvoiceNumber ? 'border-red-500 focus-visible:ring-red-500' : ''
                                            }`}
                                    />
                                    {errors.startingInvoiceNumber && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.startingInvoiceNumber}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="defaultTaxRate" className="text-sm font-medium text-slate-700">
                                    Default Tax Rate
                                </Label>
                                <Select
                                    value={formData.defaultTaxRate}
                                    onValueChange={(value) => handleChange('defaultTaxRate', value)}
                                >
                                    <SelectTrigger className="h-12">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">No Tax (0%)</SelectItem>
                                        <SelectItem value="5">GST 5%</SelectItem>
                                        <SelectItem value="12">GST 12%</SelectItem>
                                        <SelectItem value="18">GST 18%</SelectItem>
                                        <SelectItem value="28">GST 28%</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dateFormat" className="text-sm font-medium text-slate-700">
                                    Date Format
                                </Label>
                                <Select value={formData.dateFormat} onValueChange={(value) => handleChange('dateFormat', value)}>
                                    <SelectTrigger className="h-12">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="language" className="text-sm font-medium text-slate-700">
                                    Language Preference
                                </Label>
                                <Select value={formData.language} onValueChange={(value) => handleChange('language', value)}>
                                    <SelectTrigger className="h-12">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="English">English (Default)</SelectItem>
                                        <SelectItem value="Hindi" disabled>
                                            Hindi (Coming Soon)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Alert className="bg-blue-50 border-blue-200">
                                <AlertCircle className="h-4 w-4 text-blue-600" />
                                <AlertDescription className="text-sm text-blue-800">
                                    You can change these preferences anytime from your account settings.
                                </AlertDescription>
                            </Alert>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 pt-6">
                        {currentStep > 1 && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleBack}
                                className="flex-1 h-12 border-2"
                            >
                                <ArrowLeft className="mr-2 w-5 h-5" />
                                Back
                            </Button>
                        )}

                        {currentStep < 3 ? (
                            <Button
                                type="button"
                                onClick={handleNext}
                                className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-200 transition-all duration-300 group"
                            >
                                <span>Next Step</span>
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-semibold text-base shadow-lg shadow-green-200 transition-all duration-300 group"
                            >
                                <span>{isLoading ? 'Setting up...' : 'Complete Setup'}</span>
                                {!isLoading && (
                                    <CheckCircle2 className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                                )}
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
};

export default BusinessProfileSetup