import React, { useRef } from "react";
import { Download } from "lucide-react";
import html2pdf from "html2pdf.js";

export default function Invoice3() {
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
          className='flex items-center gap-2 bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-lg font-medium transition'
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
          padding: "50px 60px",
          boxSizing: "border-box",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Header */}
        <div className='flex justify-between items-start mb-12'>
          {/* Left: Company Info with Logo */}
          <div className='flex items-start gap-4'>
            <div className='w-16 h-16 bg-white border-2 border-black rounded-full flex items-center justify-center flex-shrink-0'>
              <span className='text-3xl'>🐼</span>
            </div>
            <div>
              <h1 className='text-2xl font-bold text-black'>Panda, Inc</h1>
              <p className='text-sm text-gray-600 mt-1'>hello@email.com</p>
              <p className='text-sm text-gray-600'>+91 00000 00000</p>
            </div>
          </div>

          {/* Right: Invoice Info */}
          <div className='text-right'>
            <p className='text-gray-400 text-5xl font-light'>Invoice</p>
            <p className='text-gray-800 font-semibold text-lg'>#AB2324-01</p>
          </div>
        </div>

        {/* Billed To and Dates Section */}
        <div className='grid grid-cols-3 gap-8 mb-12 pb-8 border-b border-gray-200'>
          {/* Billed To */}
          <div>
            <p className='text-xs font-bold text-gray-700 uppercase mb-3'>
              Billed To
            </p>
            <p className='font-bold text-gray-900 mb-2'>Company Name</p>
            <p className='text-sm text-gray-600 mb-1'>Company address</p>
            <p className='text-sm text-gray-600 mb-2'>City, Country - 00000</p>
            <p className='text-sm text-gray-600'>+0 (000) 123-4567</p>
          </div>

          {/* Invoice Date */}
          <div>
            <p className='text-xs font-bold text-gray-700 uppercase mb-3'>
              Invoice Date
            </p>
            <p className='text-lg font-bold text-gray-900 mb-6'>01.08.2023</p>
            <p className='text-xs font-bold text-gray-700 uppercase mb-3'>
              Due Date
            </p>
            <p className='text-lg font-bold text-gray-900'>15.08.2023</p>
          </div>

          {/* Amount Due */}
          <div className='text-right'>
            <p className='text-xs font-bold text-gray-700 uppercase mb-3'>
              Amount Due
            </p>
            <div className='bg-lime-300 px-4 py-3 rounded inline-block'>
              <p className='text-sm text-gray-600 font-semibold'>
                USS 4,500.00
              </p>
            </div>
          </div>
        </div>

        {/* Service Description Title */}
        <div className='mb-6'>
          <h2 className='text-lg font-bold text-gray-900'>
            Digital product design
          </h2>
        </div>

        {/* Items Table */}
        <table className='w-full text-sm mb-8'>
          <thead>
            <tr className='border-b-2 border-gray-300'>
              <th className='text-left py-3 px-0 font-bold text-gray-700 text-xs uppercase w-12'>
                #
              </th>
              <th className='text-left py-3 px-0 font-bold text-gray-700 text-xs uppercase'>
                Title / Description
              </th>
              <th className='text-right py-3 px-0 font-bold text-gray-700 text-xs uppercase'>
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b border-gray-200'>
              <td className='py-4 px-0 text-gray-900 font-semibold'>1</td>
              <td className='py-4 px-0'>
                <p className='font-bold text-gray-900 mb-1'>Service name</p>
                <p className='text-xs text-gray-500'>
                  01 Jul - 20 Jul • Hours log ↗
                </p>
              </td>
              <td className='text-right py-4 px-0 text-gray-900 font-semibold'>
                $3,000.00
              </td>
            </tr>
            <tr className='border-b-2 border-gray-300'>
              <td className='py-4 px-0 text-gray-900 font-semibold'>2</td>
              <td className='py-4 px-0'>
                <p className='font-bold text-gray-900 mb-1'>Service name</p>
                <p className='text-xs text-gray-500'>21 Jul - 31 Jul</p>
              </td>
              <td className='text-right py-4 px-0 text-gray-900 font-semibold'>
                $1,500.00
              </td>
            </tr>
          </tbody>
        </table>

        {/* Total */}
        <div className='flex justify-end mb-6'>
          <div className='w-64'>
            <div className='flex justify-between py-3 border-b-2 border-gray-300'>
              <p className='text-gray-900 font-bold'>Total</p>
              <p className='text-gray-900 font-bold'>$4,500.00</p>
            </div>
          </div>
        </div>

        {/* Payment Terms */}
        <div className='flex items-center gap-2 text-sm text-gray-600 mb-12 py-3'>
          <svg
            className='w-5 h-5 text-gray-400 flex-shrink-0'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
              clipRule='evenodd'
            />
          </svg>
          <p>Please pay within 15 days of receiving this invoice.</p>
        </div>

        {/* Thank You Message */}
        <div className='mb-12 text-gray-900 font-semibold'>
          <p>Thank you for the business!</p>
        </div>

        {/* Payment Info */}
        <div className='mt-auto pt-8 border-t border-gray-200'>
          <p className='text-xs font-bold text-gray-700 uppercase mb-4'>
            Payment Info
          </p>

          <div className='grid grid-cols-2 gap-8 mb-6'>
            <div>
              <p className='text-xs font-bold text-gray-700 uppercase mb-2'>
                Account Name
              </p>
              <p className='text-sm text-gray-900'>
                Business address, City, State, IN - 000 000
              </p>
            </div>
            <div>
              <div className='flex gap-8'>
                <div>
                  <p className='text-xs font-bold text-gray-700 uppercase mb-2'>
                    Bank name
                  </p>
                  <p className='text-sm text-gray-900 font-semibold'>
                    ABCD BANK
                  </p>
                </div>
                <div>
                  <p className='text-xs font-bold text-gray-700 uppercase mb-2'>
                    Swift code
                  </p>
                  <p className='text-sm text-gray-900 font-semibold'>
                    ABCDUSBXXXX
                  </p>
                </div>
                <div>
                  <p className='text-xs font-bold text-gray-700 uppercase mb-2'>
                    Account #
                  </p>
                  <p className='text-sm text-gray-900 font-semibold'>
                    3747489230011
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
