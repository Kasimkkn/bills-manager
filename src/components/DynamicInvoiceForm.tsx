import React, { useState } from "react";
import { DynamicBillConfig } from "@/types/invoice";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import BillTypeSection from "./sections/BillTypeSection";
import BusinessInfoSection from "./sections/BusinessInfoSection";
import InvoiceInfoSection from "./sections/InvoiceInfoSection";
import CustomerInfoSection from "./sections/CustomerInfoSection";
import ItemListSection from "./sections/ItemListSection";
import PaymentSection from "./sections/PaymentSection";
import BankDetailsSection from "./sections/BankDetailsSection";
import FooterSection from "./sections/FooterSection";

interface DynamicInvoiceFormProps {
  formData: DynamicBillConfig;
  onChange: (data: DynamicBillConfig) => void;
}

const DynamicInvoiceForm: React.FC<DynamicInvoiceFormProps> = ({
  formData,
  onChange,
}) => {
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    open: false,
    title: "",
    description: "",
    onConfirm: () => { },
  });

  const updateFormData = (path: string, value: any) => {
    const keys = path.split(".");
    const newData = JSON.parse(JSON.stringify(formData));
    let current = newData;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    onChange(newData);
  };

  const showDeleteDialog = (
    title: string,
    description: string,
    onConfirm: () => void
  ) => {
    setDeleteDialog({
      open: true,
      title,
      description,
      onConfirm,
    });
  };

  return (
    <div className="space-y-4 p-4 md:p-6 max-w-7xl mx-auto">
      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
        onConfirm={deleteDialog.onConfirm}
        title={deleteDialog.title}
        description={deleteDialog.description}
      />

      <BillTypeSection formData={formData} updateFormData={updateFormData} />

      <BusinessInfoSection formData={formData} updateFormData={updateFormData} />

      <InvoiceInfoSection formData={formData} updateFormData={updateFormData} />

      <CustomerInfoSection formData={formData} updateFormData={updateFormData} />

      <ItemListSection
        formData={formData}
        updateFormData={updateFormData}
        showDeleteDialog={showDeleteDialog}
      />

      <PaymentSection formData={formData} updateFormData={updateFormData} />

      <BankDetailsSection formData={formData} updateFormData={updateFormData} />

      <FooterSection formData={formData} updateFormData={updateFormData} />
    </div>
  );
};

export default DynamicInvoiceForm;