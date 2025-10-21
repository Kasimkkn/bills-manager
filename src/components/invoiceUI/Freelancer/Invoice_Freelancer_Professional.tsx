import React from "react";
import { DynamicBillConfig } from "@/types/invoice";

interface InvoiceProps {
  invoiceData: DynamicBillConfig;
  invoiceRef: React.Ref<HTMLDivElement>;
}

export default function Invoice_Freelancer_Professional({ invoiceData, invoiceRef }: InvoiceProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div
        ref={invoiceRef}
        className="bg-white shadow-xl"
        style={{
          width: "210mm",
          height: "297mm",
          padding: "0",
          boxSizing: "border-box",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div className="p-8">
          <h1 className="text-2xl font-bold">Freelancer Invoice - Professional Style</h1>
          {/* Design your Freelancer Professional template here */}
        </div>
      </div>
    </div>
  );
}
