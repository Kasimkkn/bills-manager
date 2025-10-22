import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DynamicBillConfig } from "@/types/invoice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ItemCard from "../ItemCard";

interface ItemListSectionProps {
  formData: DynamicBillConfig;
  updateFormData: (path: string, value: any) => void;
  showDeleteDialog: (
    title: string,
    description: string,
    onConfirm: () => void
  ) => void;
}

const ItemListSection: React.FC<ItemListSectionProps> = ({
  formData,
  updateFormData,
  showDeleteDialog,
}) => {
  const addItem = () => {
    const newItem = {
      itemName: "",
      hsnCode: "",
      quantity: 1,
      unit: "pcs",
      rate: 0,
      discount: 0,
      tax: 0,
    };
    const newItems = [...(formData.itemList || []), newItem];
    updateFormData("itemList", newItems);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...(formData.itemList || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    updateFormData("itemList", newItems);
  };

  const deleteItem = (index: number) => {
    showDeleteDialog(
      "Delete Item",
      `Are you sure you want to delete "${
        formData.itemList?.[index]?.itemName || "this item"
      }"? This action cannot be undone.`,
      () => {
        const newItems = formData.itemList?.filter((_, i) => i !== index);
        updateFormData("itemList", newItems);
      }
    );
  };

  const calculateSubtotal = () => {
    return (
      formData.itemList?.reduce((sum, item) => {
        const itemTotal = (item.quantity || 0) * item.rate;
        const discount = item.discount || 0;
        return sum + itemTotal - discount;
      }, 0) || 0
    );
  };

  return (
    <Card className='border-border'>
      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='item-list' className='border-none'>
          <AccordionTrigger className='px-6 hover:no-underline'>
            <div className='flex items-center justify-between w-full pr-4'>
              <h3 className='text-lg md:text-xl font-semibold'>
                Items / Services
              </h3>
              <Switch
                checked={formData.isItemListNeeded}
                onCheckedChange={(checked) => {
                  updateFormData("isItemListNeeded", checked);
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </AccordionTrigger>
          {formData.isItemListNeeded && (
            <AccordionContent className='px-6 pb-6'>
              <div className='space-y-4 pt-4'>
                {formData.itemList?.map((item, index) => (
                  <ItemCard
                    key={index}
                    item={item}
                    index={index}
                    onUpdate={updateItem}
                    onDelete={() => deleteItem(index)}
                  />
                ))}

                <Button onClick={addItem} variant='outline' className='w-full'>
                  <Plus className='h-4 w-4 mr-2' />
                  Add Item
                </Button>

                {formData.itemList && formData.itemList.length > 0 && (
                  <Alert>
                    <AlertDescription>
                      Subtotal: ₹{calculateSubtotal().toFixed(2)}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </AccordionContent>
          )}
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default ItemListSection;
