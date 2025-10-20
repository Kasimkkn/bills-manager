import React, { useRef } from "react";
import { Download } from "lucide-react";
import html2pdf from "html2pdf.js";
import { DynamicBillConfig } from "@/types/invoice";

export default function Invoice1({
  formData,
}: {
  formData: DynamicBillConfig;
}) {
  const invoiceRef = useRef();

  const handleDownloadPDF = () => {
    const element = invoiceRef.current;
    const opt = {
      margin: 0,
      filename: "invoice_#AB2324-01.pdf",
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        orientation: "portrait" as const,
        unit: "mm" as const,
        format: "a4",
      },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
      {/* Download Button */}
      <div className='absolute top-6 right-6'>
        <button
          onClick={handleDownloadPDF}
          className='flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition'
        >
          <Download size={18} />
          Download PDF
        </button>
      </div>

      {/* Invoice Container - Fixed A4 Size */}
      <div
        ref={invoiceRef}
        className='bg-white shadow-lg'
        style={{
          width: "210mm",
          height: "297mm",
          padding: "40px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        {formData?.isBusinessInfoNeeded && (
          <div className='flex justify-between items-start mb-8 pb-6 border-b border-gray-200'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 mb-3'>
                {formData.businessInfo.name}
              </h1>
              <p className='text-sm text-gray-600 mb-1'>
                {formData.businessInfo.website}
              </p>
              <p className='text-sm text-gray-600 mb-1'>
                {formData.businessInfo.email}
              </p>
              <p className='text-sm text-gray-600'>
                {formData.businessInfo.phoneNumber}
              </p>
            </div>
            <div className='text-right'>
              <p className='text-sm text-gray-600 mb-1'>Business address</p>
              <p className='text-sm text-gray-600 mb-1'>
                City, State, IN - 000 000
              </p>
              <p className='text-sm text-gray-600'>TAX ID 00XXXX1234XXXX</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className='grid grid-cols-2 gap-8 mb-8'>
          {/* Left Column */}
          <div>
            <p className='text-xs font-semibold text-gray-600 mb-3'>
              Billed to,
            </p>
            <p className='font-bold text-gray-900 mb-1'>Client Name</p>
            <p className='text-sm text-gray-600 mb-1'>Business address</p>
            <p className='text-sm text-gray-600 mb-2'>City, Country - 00000</p>
            <p className='text-sm text-gray-600'>+0 (000) 123-4567</p>

            <div className='mt-6'>
              <p className='text-xs font-semibold text-gray-600 mb-2'>
                Subject
              </p>
              <p className='font-bold text-gray-900 text-base'>Design System</p>
            </div>
          </div>

          {/* Right Column */}
          <div className='flex flex-col justify-between'>
            <div>
              <div className='mb-6'>
                <p className='text-xs font-semibold text-gray-600 mb-1'>
                  Invoice number
                </p>
                <p className='font-bold text-gray-900'>#AB2324-01</p>
              </div>
              <div className='mb-6'>
                <p className='text-xs font-semibold text-gray-600 mb-1'>
                  Reference
                </p>
                <p className='font-bold text-gray-900'>INV-057</p>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-xs font-semibold text-gray-600 mb-1'>
                    Invoice date
                  </p>
                  <p className='font-bold text-gray-900'>01 Aug, 2023</p>
                </div>
                <div>
                  <p className='text-xs font-semibold text-gray-600 mb-1'>
                    Due date
                  </p>
                  <p className='font-bold text-gray-900'>15 Aug, 2023</p>
                </div>
              </div>
            </div>

            {/* Invoice Amount */}
            <div className='text-right'>
              <p className='text-xs font-semibold text-gray-600 mb-1'>
                Invoice of (USD)
              </p>
              <p className='text-4xl font-bold text-orange-500'>$4,950.00</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className='mb-8'>
          <table className='w-full text-sm border-collapse'>
            <thead>
              <tr className='border-t border-b border-gray-300 bg-gray-50'>
                <th className='text-left py-3 px-3 font-semibold text-gray-700 text-xs uppercase'>
                  Item Detail
                </th>
                <th className='text-center py-3 px-3 font-semibold text-gray-700 text-xs uppercase w-16'>
                  QTY
                </th>
                <th className='text-right py-3 px-3 font-semibold text-gray-700 text-xs uppercase w-32'>
                  Rate
                </th>
                <th className='text-right py-3 px-3 font-semibold text-gray-700 text-xs uppercase w-32'>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b border-gray-200'>
                <td className='py-4 px-3'>
                  <p className='font-bold text-gray-900'>Item Name</p>
                  <p className='text-xs text-gray-500'>Item description</p>
                </td>
                <td className='text-center py-4 px-3 text-gray-900'>1</td>
                <td className='text-right py-4 px-3 text-gray-900'>
                  $3,000.00
                </td>
                <td className='text-right py-4 px-3 font-bold text-gray-900'>
                  $3,000.00
                </td>
              </tr>
              <tr className='border-b border-gray-200'>
                <td className='py-4 px-3'>
                  <p className='font-bold text-gray-900'>Item Name</p>
                  <p className='text-xs text-gray-500'>Item description</p>
                </td>
                <td className='text-center py-4 px-3 text-gray-900'>1</td>
                <td className='text-right py-4 px-3 text-gray-900'>
                  $1,500.00
                </td>
                <td className='text-right py-4 px-3 font-bold text-gray-900'>
                  $1,500.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className='flex justify-end mb-8'>
          <div className='w-64'>
            <div className='flex justify-between py-2 border-b border-gray-300'>
              <p className='text-gray-700'>Subtotal</p>
              <p className='text-gray-900 font-semibold'>$4,500.00</p>
            </div>
            <div className='flex justify-between py-2 border-b border-gray-300 mb-2'>
              <p className='text-gray-700'>Tax (10%)</p>
              <p className='text-gray-900 font-semibold'>$450.00</p>
            </div>
            <div className='flex justify-between py-3'>
              <p className='text-gray-900 font-bold text-base'>Total</p>
              <p className='text-gray-900 font-bold text-base'>$4,950.00</p>
            </div>
          </div>
        </div>

        {/* Thanks Message */}
        <div className='text-center py-6 border-t border-gray-300 mb-6'>
          <p className='font-bold text-gray-900'>Thanks for the business.</p>
        </div>

        {/* Terms & Conditions */}
        <div className='pt-4 border-t border-gray-300'>
          <h3 className='font-bold text-gray-900 text-sm mb-2'>
            Terms & Conditions
          </h3>
          <p className='text-sm text-gray-700'>
            Please pay within 15 days of receiving this invoice.
          </p>
        </div>
      </div>
    </div>
  );
}
