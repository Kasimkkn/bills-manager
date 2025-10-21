# Invoice System - Complete Technical Breakdown
## Developer Documentation

---

## **Executive Summary**

A **dynamic, multi-business-type invoice system** where:
- Users select their business type (Retailer, Freelancer, Service Provider, B2B, etc.)
- System shows **only relevant form fields** for that business type
- Users can **customize by adding/removing fields**
- Custom fields appear in **Step 5 (Customization)**
- Fields can be **reordered via drag-and-drop** in preview
- **Guest users** get full access without login
- **Logged-in users** can save drafts and access history

---

## **1. Architecture Overview**

### **System Components**

```
┌─────────────────────────────────────────────────┐
│         Invoice Creation System                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  Step 1: Template & Business Type        │  │
│  │  Selection                               │  │
│  └──────────────────────────────────────────┘  │
│                    ↓                            │
│  ┌──────────────────────────────────────────┐  │
│  │  Step 2: Business Profile Setup          │  │
│  │  (Dynamic fields based on type)          │  │
│  └──────────────────────────────────────────┘  │
│                    ↓                            │
│  ┌──────────────────────────────────────────┐  │
│  │  Step 3: Invoice Details                 │  │
│  │  (Dynamic fields based on type)          │  │
│  └──────────────────────────────────────────┘  │
│                    ↓                            │
│  ┌──────────────────────────────────────────┐  │
│  │  Step 4: Items/Services                  │  │
│  │  (Dynamic array based on type)           │  │
│  └──────────────────────────────────────────┘  │
│                    ↓                            │
│  ┌──────────────────────────────────────────┐  │
│  │  Step 5: Customization & Terms           │  │
│  │  - Discount, Notes, Payment Terms        │  │
│  │  - Custom Fields (Add/Remove)            │  │
│  │  - Field Ordering (Drag & Drop)          │  │
│  └──────────────────────────────────────────┘  │
│                    ↓                            │
│  ┌──────────────────────────────────────────┐  │
│  │  Step 6: Preview & Actions               │  │
│  │  - Live Preview with reordered fields    │  │
│  │  - Download PDF                          │  │
│  │  - Share (WhatsApp, Email)               │  │
│  │  - Save (if logged-in)                   │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘
```

---


## **4. Component Architecture**

### **4.1 Component Tree**

```
InvoicePage
├── Header
│   └── StepIndicator (Step X of 6)
├── MainContainer (Grid: Form + Preview)
│   ├── FormSection
│   │   └── StepContent
│   │       ├── Step1_TemplateSelector
│   │       │   ├── TemplateCard
│   │       │   └── BusinessTypeSelector
│   │       │
│   │       ├── Step2_BusinessProfile
│   │       │   ├── TextInput
│   │       │   ├── FileUpload
│   │       │   └── DynamicFieldRenderer
│   │       │
│   │       ├── Step3_InvoiceDetails
│   │       │   ├── DatePicker
│   │       │   ├── TextInput
│   │       │   └── DynamicFieldRenderer
│   │       │
│   │       ├── Step4_Items
│   │       │   ├── ItemForm
│   │       │   ├── ItemList
│   │       │   ├── AddItemButton
│   │       │   └── DynamicItemFields
│   │       │
│   │       ├── Step5_Customization
│   │       │   ├── DiscountInput
│   │       │   ├── NotesField
│   │       │   ├── CustomFieldBuilder
│   │       │   │   ├── FieldTypeSelector
│   │       │   │   ├── FieldConfigForm
│   │       │   │   ├── AddFieldButton
│   │       │   │   └── CustomFieldsList
│   │       │   │       └── CustomFieldInput (with delete)
│   │       │   └── FieldOrderer (Drag & Drop)
│   │       │
│   │       └── Step6_Preview
│   │           ├── PreviewHeader
│   │           ├── InvoiceTemplate
│   │           │   ├── Invoice1Renderer
│   │           │   ├── Invoice2Renderer
│   │           │   └── Invoice3Renderer
│   │           ├── ActionButtons
│   │           │   ├── DownloadPDF
│   │           │   ├── Share
│   │           │   └── Save (if logged-in)
│   │           └── FieldReorderer (Drag & Drop)
│   │
│   └── PreviewSection
│       ├── LivePreview
│       │   └── CurrentTemplate
│       ├── PreviewToolbar
│       │   └── Zoom, Print, Share
│       └── ScrollableContainer
│
└── Footer
    ├── PreviousButton
    ├── NextButton
    └── ActionButtons
```

### **4.2 Key Components**

#### **CustomFieldBuilder Component**

```javascript
// /components/invoice/Step5_Customization/CustomFieldBuilder.jsx

import React, { useState } from 'react';
import { GripVertical, Trash2, Plus } from 'lucide-react';

export const CustomFieldBuilder = ({ 
  customFields, 
  onAddField, 
  onRemoveField,
  onReorderFields 
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    label: '',
    type: 'text',
    placeholder: '',
    required: false,
    visible_in_invoice: true,
    section: 'customization',
    options: [],
  });

  const handleAddField = () => {
    if (!formData.label.trim()) {
      alert('Field label is required');
      return;
    }

    const newField = {
      id: `custom-${Date.now()}`,
      key: `custom_${Date.now()}`,
      ...formData,
      position: customFields.length,
      user_id: getUserId(), // Get from auth
      created_at: new Date(),
      updated_at: new Date(),
    };

    onAddField(newField);
    setFormData({
      label: '',
      type: 'text',
      placeholder: '',
      required: false,
      visible_in_invoice: true,
      section: 'customization',
      options: [],
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Existing Fields */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Custom Fields</h3>
        {customFields.length === 0 ? (
          <p className="text-gray-500 text-sm">No custom fields added yet</p>
        ) : (
          <div className="space-y-2 border rounded-lg p-4 bg-gray-50">
            {customFields.map((field) => (
              <div
                key={field.id}
                className="flex items-center justify-between p-3 bg-white border rounded"
              >
                <div className="flex items-center gap-3 flex-1">
                  <GripVertical size={18} className="text-gray-400 cursor-move" />
                  <div>
                    <p className="font-medium text-gray-900">{field.label}</p>
                    <p className="text-xs text-gray-500">{field.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {field.visible_in_invoice && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      In Invoice
                    </span>
                  )}
                  <button
                    onClick={() => onRemoveField(field.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add New Field Form */}
      <div>
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition w-full justify-center"
          >
            <Plus size={20} />
            Add Custom Field
          </button>
        ) : (
          <div className="border rounded-lg p-4 bg-blue-50">
            <h4 className="font-semibold mb-4">New Custom Field</h4>
            <div className="space-y-4">
              {/* Label */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Field Label *
                </label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g., Project ID, Delivery Address"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              {/* Field Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Field Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="number">Number</option>
                  <option value="email">Email</option>
                  <option value="date">Date</option>
                  <option value="select">Dropdown</option>
                  <option value="checkbox">Checkbox</option>
                </select>
              </div>

              {/* Placeholder */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Placeholder (Optional)
                </label>
                <input
                  type="text"
                  value={formData.placeholder}
                  onChange={(e) => setFormData({ ...formData, placeholder: e.target.value })}
                  placeholder="Placeholder text"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              {/* Options for Select */}
              {formData.type === 'select' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Options (comma-separated)
                  </label>
                  <input
                    type="text"
                    onChange={(e) => {
                      const options = e.target.value.split(',').map(opt => ({
                        label: opt.trim(),
                        value: opt.trim().toLowerCase(),
                      }));
                      setFormData({ ...formData, options });
                    }}
                    placeholder="Option 1, Option 2, Option 3"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              )}

              {/* Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Add to Section *
                </label>
                <select
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="customization">Customization (Step 5)</option>
                  <option value="invoice_details">Invoice Details (Step 3)</option>
                  <option value="business_profile">Business Profile (Step 2)</option>
                </select>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.required}
                    onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
                  />
                  <span className="text-sm text-gray-700">Required field</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.visible_in_invoice}
                    onChange={(e) => setFormData({ ...formData, visible_in_invoice: e.target.checked })}
                  />
                  <span className="text-sm text-gray-700">Show in invoice PDF</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleAddField}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Field
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
```

### **4.3 Field Reorderer Component (Drag & Drop)**

```javascript
// /components/invoice/Step6_Preview/FieldReorderer.jsx

import React, { useState } from 'react';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableField = ({ field, onToggleVisibility }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: field.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between p-3 bg-white border rounded-lg mb-2"
    >
      <div className="flex items-center gap-3">
        <GripVertical
          size={20}
          className="text-gray-400 cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        />
        <span className="text-gray-900 font-medium">{field.label}</span>
      </div>
      <button
        onClick={() => onToggleVisibility(field.id)}
        className="p-2 hover:bg-gray-100 rounded transition"
      >
        {field.visible_in_invoice ? (
          <Eye size={20} className="text-blue-600" />
        ) : (
          <EyeOff size={20} className="text-gray-400" />
        )}
      </button>
    </div>
  );
};

export const FieldReorderer = ({ fields, onReorder, onToggleVisibility }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      distance: 8,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      const newOrder = arrayMove(fields, oldIndex, newIndex);
      onReorder(newOrder);
    }
  };

  return (
    <div className="mt-6 border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">
        📋 Reorder Fields in Invoice
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Drag fields to reorder them. Click eye icon to show/hide in invoice.
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={fields.map((f) => f.id)}>
          {fields.map((field) => (
            <SortableField
              key={field.id}
              field={field}
              onToggleVisibility={onToggleVisibility}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
```

### **4.4 Dynamic Form Generator**

```javascript
// /components/invoice/DynamicFormGenerator.jsx

import React from 'react';
import { useInvoiceContext } from '/context/InvoiceContext';
import { BUSINESS_TYPES } from '/constants/businessTypes';
import TextInput from './fields/TextInput';
import TextArea from './fields/TextArea';
import DatePicker from './fields/DatePicker';
import FileUpload from './fields/FileUpload';
import SelectField from './fields/SelectField';
import NumberInput from './fields/NumberInput';

export const DynamicFormGenerator = ({ step, section }) => {
  const { state, updateBusinessProfile, updateInvoiceDetails, updateCustomFieldData } = useInvoiceContext();
  const businessType = BUSINESS_TYPES[state.selectedBusinessType];
  
  if (!businessType) return null;

  // Get visible fields for this step
  const visibleFields = businessType.default_fields[section] || [];
  const hiddenFields = businessType.hidden_fields || [];
  
  const fieldsToShow = visibleFields.filter(
    (field) => !hiddenFields.includes(field)
  );

  // Map field name to component and handler
  const fieldComponents = {
    // Business Profile Fields
    company_name: {
      component: TextInput,
      props: { label: 'Company Name', required: true, placeholder: 'Your Business Name' },
      value: state.businessProfile.company_name,
      handler: (value) => updateBusinessProfile({ company_name: value }),
    },
    email: {
      component: TextInput,
      props: { label: 'Email', type: 'email', required: true, placeholder: 'business@example.com' },
      value: state.businessProfile.email,
      handler: (value) => updateBusinessProfile({ email: value }),
    },
    phone: {
      component: TextInput,
      props: { label: 'Phone', type: 'tel', required: true, placeholder: '+91 9876543210' },
      value: state.businessProfile.phone,
      handler: (value) => updateBusinessProfile({ phone: value }),
    },
    website: {
      component: TextInput,
      props: { label: 'Website (Optional)', type: 'url', placeholder: 'https://yoursite.com' },
      value: state.businessProfile.website,
      handler: (value) => updateBusinessProfile({ website: value }),
    },
    logo: {
      component: FileUpload,
      props: { label: 'Logo', accept: 'image/*', maxSize: 2 * 1024 * 1024 },
      value: state.businessProfile.logo_url,
      handler: (file) => {
        // Convert to base64 for guests, upload for logged-in users
        const reader = new FileReader();
        reader.onloadend = () => {
          updateBusinessProfile({ logo_url: reader.result });
        };
        reader.readAsDataURL(file);
      },
    },
    business_address: {
      component: TextInput,
      props: { label: 'Business Address', required: true },
      value: state.businessProfile.business_address,
      handler: (value) => updateBusinessProfile({ business_address: value }),
    },
    city_state_pincode: {
      component: TextInput,
      props: { label: 'City, State - Pincode', required: true, placeholder: 'Mumbai, Maharashtra - 400001' },
      value: state.businessProfile.city_state_pincode,
      handler: (value) => updateBusinessProfile({ city_state_pincode: value }),
    },
    gstin: {
      component: TextInput,
      props: { 
        label: 'GSTIN', 
        required: businessType.features.gst_applicable,
        placeholder: '18AABCU9603R1Z5',
        pattern: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      },
      value: state.businessProfile.gstin,
      handler: (value) => updateBusinessProfile({ gstin: value }),
    },
    pan: {
      component: TextInput,
      props: { 
        label: 'PAN (Optional)',
        placeholder: 'AAAPN5055K',
      },
      value: state.businessProfile.pan,
      handler: (value) => updateBusinessProfile({ pan: value }),
    },
    bank_account_name: {
      component: TextInput,
      props: { label: 'Account Holder Name', required: businessType.features.bank_details },
      value: state.businessProfile.bank_account_name,
      handler: (value) => updateBusinessProfile({ bank_account_name: value }),
    },
    bank_account_number: {
      component: TextInput,
      props: { 
        label: 'Account Number', 
        required: businessType.features.bank_details,
        placeholder: '1234567890'
      },
      value: state.businessProfile.bank_account_number,
      handler: (value) => updateBusinessProfile({ bank_account_number: value }),
    },
    bank_ifsc: {
      component: TextInput,
      props: { 
        label: 'IFSC Code', 
        required: businessType.features.bank_details,
        placeholder: 'SBIN0001234'
      },
      value: state.businessProfile.bank_ifsc,
      handler: (value) => updateBusinessProfile({ bank_ifsc: value }),
    },
    bank_swift_code: {
      component: TextInput,
      props: { label: 'Swift Code (Optional)', placeholder: 'SBININBB' },
      value: state.businessProfile.bank_swift_code,
      handler: (value) => updateBusinessProfile({ bank_swift_code: value }),
    },
    payment_terms: {
      component: TextArea,
      props: { 
        label: 'Payment Terms', 
        required: businessType.features.payment_terms,
        placeholder: '50% advance, 50% on completion',
        rows: 3
      },
      value: state.businessProfile.payment_terms,
      handler: (value) => updateBusinessProfile({ payment_terms: value }),
    },

    // Invoice Details Fields
    invoice_number: {
      component: TextInput,
      props: { label: 'Invoice Number', disabled: true, value: 'Auto-generated' },
      value: state.invoiceDetails.invoice_number,
      handler: () => {}, // Auto-generated
    },
    invoice_date: {
      component: DatePicker,
      props: { label: 'Invoice Date', required: true },
      value: state.invoiceDetails.invoice_date,
      handler: (value) => updateInvoiceDetails({ invoice_date: value }),
    },
    due_date: {
      component: DatePicker,
      props: { label: 'Due Date (Optional)' },
      value: state.invoiceDetails.due_date,
      handler: (value) => updateInvoiceDetails({ due_date: value }),
    },
    customer_name: {
      component: TextInput,
      props: { label: 'Customer Name', required: true },
      value: state.invoiceDetails.customer_name,
      handler: (value) => updateInvoiceDetails({ customer_name: value }),
    },
    customer_email: {
      component: TextInput,
      props: { label: 'Customer Email (Optional)', type: 'email' },
      value: state.invoiceDetails.customer_email,
      handler: (value) => updateInvoiceDetails({ customer_email: value }),
    },
    customer_phone: {
      component: TextInput,
      props: { label: 'Customer Phone', required: true, type: 'tel' },
      value: state.invoiceDetails.customer_phone,
      handler: (value) => updateInvoiceDetails({ customer_phone: value }),
    },
    customer_address: {
      component: TextArea,
      props: { label: 'Customer Address (Optional)', rows: 2 },
      value: state.invoiceDetails.customer_address,
      handler: (value) => updateInvoiceDetails({ customer_address: value }),
    },
    customer_gstin: {
      component: TextInput,
      props: { 
        label: 'Customer GSTIN (Optional)',
        placeholder: '18AABCU9603R1Z5'
      },
      value: state.invoiceDetails.customer_gstin,
      handler: (value) => updateInvoiceDetails({ customer_gstin: value }),
    },
  };

  return (
    <div className="space-y-4">
      {fieldsToShow.map((fieldName) => {
        const fieldConfig = fieldComponents[fieldName];
        if (!fieldConfig) return null;

        const { component: Component, props, value, handler } = fieldConfig;

        return (
          <div key={fieldName}>
            <Component
              {...props}
              value={value}
              onChange={handler}
            />
          </div>
        );
      })}

      {/* Render Custom Fields for this section */}
      {state.customFields
        .filter((field) => field.section === section)
        .map((field) => (
          <CustomFieldInput
            key={field.id}
            field={field}
            value={state.custom_fields_data[field.key]}
            onChange={(value) =>
              updateCustomFieldData({ [field.key]: value })
            }
          />
        ))}
    </div>
  );
};

const CustomFieldInput = ({ field, value, onChange }) => {
  switch (field.type) {
    case 'text':
      return (
        <TextInput
          label={field.label}
          placeholder={field.placeholder}
          value={value || ''}
          onChange={onChange}
          required={field.required}
        />
      );
    case 'textarea':
      return (
        <TextArea
          label={field.label}
          placeholder={field.placeholder}
          value={value || ''}
          onChange={onChange}
          required={field.required}
          rows={4}
        />
      );
    case 'number':
      return (
        <NumberInput
          label={field.label}
          placeholder={field.placeholder}
          value={value || ''}
          onChange={onChange}
          required={field.required}
        />
      );
    case 'email':
      return (
        <TextInput
          label={field.label}
          type="email"
          placeholder={field.placeholder}
          value={value || ''}
          onChange={onChange}
          required={field.required}
        />
      );
    case 'date':
      return (
        <DatePicker
          label={field.label}
          value={value || ''}
          onChange={onChange}
          required={field.required}
        />
      );
    case 'select':
      return (
        <SelectField
          label={field.label}
          options={field.options}
          value={value || ''}
          onChange={onChange}
          required={field.required}
        />
      );
    case 'checkbox':
      return (
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            required={field.required}
          />
          <span className="text-sm text-gray-700">{field.label}</span>
        </label>
      );
    default:
      return null;
  }
};
```

---

## **8. Step-by-Step Implementation Plan**

### **Phase 1: Foundation (Week 1-2)**

#### **Sprint 1.1: Setup & Context**
- [ ] Create business types configuration
- [ ] Setup InvoiceContext with reducer
- [ ] Create basic form structure

**Deliverables:**
- `/constants/businessTypes.js` (fully configured)
- `/context/InvoiceContext.jsx` (with all actions)
- Basic form component skeleton

#### **Sprint 1.2: Form Components**
- [ ] Create reusable input components (TextInput, DatePicker, FileUpload)
- [ ] Create DynamicFormGenerator component
- [ ] Implement Step 1 (Template Selection)
- [ ] Implement Step 2 (Business Profile)

**Deliverables:**
- Form field components
- Steps 1-2 working with dynamic field visibility
- localStorage persistence

---

### **Phase 2: Core Functionality (Week 3-4)**

#### **Sprint 2.1: Items & Calculations**
- [ ] Implement Step 4 (Items/Services with dynamic array)
- [ ] Build calculations engine
- [ ] Auto-update totals

**Deliverables:**
- Dynamic item management
- Real-time calculation
- Tax calculations (India GST)

#### **Sprint 2.2: Customization & Custom Fields**
- [ ] Implement Step 5 (Customization)
- [ ] Build CustomFieldBuilder component
- [ ] Implement drag-and-drop field reordering

**Deliverables:**
- Custom field creation
- Field drag-and-drop
- Validation for custom fields

---

### **Phase 3: Preview & Export (Week 5-6)**

#### **Sprint 3.1: Preview & PDF**
- [ ] Integrate Invoice 1, 2, 3 templates into preview
- [ ] Implement pdf download with html2pdf
- [ ] Show live preview while editing

**Deliverables:**
- Live preview component
- PDF generation working
- Field reordering reflected in preview

#### **Sprint 3.2: Guest vs User Flows**
- [ ] Implement guest user flow
- [ ] Add login-required prompts
- [ ] Setup draft saving for logged-in users
- [ ] Implement auto-save (30 seconds debounce)

**Deliverables:**
- Guest can create and download
- Users can save drafts
- Auto-save working

---

### **Phase 4: Sharing & Polish (Week 7-8)**

#### **Sprint 4.1: Share Features**
- [ ] Implement WhatsApp share
- [ ] Implement Email share
- [ ] Create shareable links for guests (JWT tokens)

**Deliverables:**
- Share functionality working
- Temporary links with 24h expiry

#### **Sprint 4.2: Testing & Optimization**
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] Responsive design refinement
- [ ] Mobile testing

**Deliverables:**
- Fully functional system
- All devices tested
- Performance optimized

---


## **11. Error Handling & Edge Cases**

### **Common Edge Cases**

```javascript
// 1. Freelancer with GST (high turnover)
if (businessType === 'FREELANCER' && totalTurnover > 4000000) {
  showGSTOptionalField();
}

// 2. Multi-service freelancer with different rates
items.forEach((item) => {
  if (item.type === 'SERVICE') {
    item.rate_per_hour = getServiceRate(item.service_name);
  }
});

// 3. Invalid GSTIN format
const validateGSTIN = (gstin) => {
  const pattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return pattern.test(gstin);
};

// 4. Discount exceeds total
if (discountAmount > subtotal) {
  showError('Discount cannot exceed subtotal');
}

// 5. Inter-state GST detection
const isInterState = (sellerState, buyerState) => {
  return sellerState !== buyerState;
};

// 6. Guest invoice expiry
const isInvoiceExpired = (createdAt) => {
  const expiryDate = new Date(createdAt);
  expiryDate.setDate(expiryDate.getDate() + 7);
  return new Date() > expiryDate;
};

// 7. Offline mode
if (!navigator.onLine) {
  saveToLocalStorage(invoiceData);
  showNotification('Offline - saved locally');
  syncWhenOnline();
}
```

---


1. What backend framework? (Node.js, Django, etc.)
2. What database? (MongoDB, PostgreSQL, etc.)
3. File upload service? (AWS S3, Firebase, Cloudinary?)
4. Email service? (SendGrid, Nodemailer, etc.)
5. Authentication? (JWT, OAuth2, etc.)
6. Deployment platform? (AWS, Heroku, DigitalOcean, etc.)