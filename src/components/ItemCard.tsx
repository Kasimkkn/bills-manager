import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

interface ItemCardItem {
  itemName: string;
  hsnCode?: string;
  quantity?: number;
  unit?: string;
  rate: number;
  discount?: number;
  tax?: number;
}

interface ItemCardProps {
  item: ItemCardItem;
  index: number;
  onUpdate: (index: number, field: string, value: any) => void;
  onDelete: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, index, onUpdate, onDelete }) => {
  return (
    <div className="rounded-lg p-4 space-y-4 bg-card">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm md:text-base">Item {index + 1}</h4>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 md:col-span-2">
          <Label>
            Item Name <span className="text-red-500">*</span>
          </Label>
          <Input
            value={item.itemName}
            onChange={(e) => onUpdate(index, "itemName", e.target.value)}
            placeholder="Enter item name"
          />
        </div>

        <div className="space-y-2">
          <Label>HSN Code</Label>
          <Input
            value={item.hsnCode || ""}
            onChange={(e) => onUpdate(index, "hsnCode", e.target.value)}
            placeholder="Enter HSN"
          />
        </div>

        <div className="space-y-2">
          <Label>Quantity</Label>
          <Input
            type="number"
            value={item.quantity || 0}
            onChange={(e) => onUpdate(index, "quantity", Number(e.target.value))}
            placeholder="0"
            min="0"
          />
        </div>

        <div className="space-y-2">
          <Label>Rate</Label>
          <Input
            type="number"
            value={item.rate}
            onChange={(e) => onUpdate(index, "rate", Number(e.target.value))}
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>

        <div className="space-y-2">
          <Label>Tax (%)</Label>
          <Input
            type="number"
            value={item.tax || 0}
            onChange={(e) => onUpdate(index, "tax", Number(e.target.value))}
            placeholder="0"
            min="0"
            max="100"
          />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;