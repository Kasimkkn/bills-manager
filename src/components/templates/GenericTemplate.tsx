import { useInvoice } from '@/contexts/InvoiceContext';
import { useTemplate } from '@/contexts/TemplateContext';
import { Template, CURRENCIES } from '@/types/core';
import { Separator } from "@/components/ui/separator";

interface GenericTemplateProps {
    template: Template;
}

const GenericTemplate: React.FC<GenericTemplateProps> = ({ template }) => {
    const { invoice } = useInvoice();
    const { templateData } = useTemplate();

    const currency = CURRENCIES.find(c => c.code === invoice.currency) || CURRENCIES[0];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat(currency.locale, {
            style: 'currency',
            currency: invoice.currency,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(currency.locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // 🔥 AUTOMATICALLY RENDER TEMPLATE-SPECIFIC FIELDS
    const renderTemplateFields = () => {
        const fields = template.fields.filter(field =>
            templateData[field.id] &&
            field.category === 'templateSpecific'
        );

        if (fields.length === 0) return null;

        // Group fields by their group property
        const groupedFields: { [key: string]: typeof fields } = {};
        fields.forEach(field => {
            const group = field.group || 'Additional Information';
            if (!groupedFields[group]) groupedFields[group] = [];
            groupedFields[group].push(field);
        });

        return (
            <div className="mb-8 space-y-6">
                {Object.entries(groupedFields).map(([groupName, groupFields]) => (
                    <div key={groupName} className="p-6 rounded-xl" style={{
                        background: `linear-gradient(135deg, ${template.colorScheme.primary}10, ${template.colorScheme.accent}10)`
                    }}>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 capitalize">
                            {groupName}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {groupFields.map(field => {
                                const value = templateData[field.id];

                                // Format different field types appropriately
                                let displayValue = value;
                                if (field.type === 'date' && value) {
                                    displayValue = formatDate(value);
                                } else if (field.type === 'number' && value) {
                                    displayValue = Number(value).toLocaleString();
                                } else if (field.type === 'checkbox') {
                                    displayValue = value ? 'Yes' : 'No';
                                }

                                return (
                                    <div key={field.id}>
                                        <p className="text-sm font-medium text-gray-600">{field.label}</p>
                                        <p className="text-lg font-semibold" style={{ color: template.colorScheme.primary }}>
                                            {displayValue}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="p-4 lg:p-8 bg-surface min-h-full">
            <div className="max-w-4xl mx-auto">
                <div
                    className="invoice-paper rounded-2xl shadow-invoice p-8 lg:p-12 animate-fade-in"
                    style={{
                        background: `linear-gradient(135deg, white, ${template.colorScheme.background || template.colorScheme.primary}08)`
                    }}
                >
                    {/* Dynamic Header with Template Colors */}
                    <div className="flex flex-col lg:flex-row justify-between items-start mb-12">
                        <div className="mb-6 lg:mb-0">
                            <h1
                                className="text-4xl lg:text-5xl font-bold mb-2"
                                style={{ color: template.colorScheme.primary }}
                            >
                                INVOICE
                            </h1>
                            <div className="text-gray-600 space-y-1">
                                <p className="font-medium">#{invoice.invoiceNumber}</p>
                                <p>Date: {formatDate(invoice.invoiceDate)}</p>
                                <p>Due: {formatDate(invoice.dueDate)}</p>
                            </div>
                        </div>

                        {invoice.businessInfo.logo ? (
                            <img
                                src={invoice.businessInfo.logo}
                                alt="Business Logo"
                                className="w-24 h-24 object-contain rounded-xl shadow-lg"
                            />
                        ) : (
                            <div
                                className="w-24 h-24 rounded-xl flex items-center justify-center shadow-lg"
                                style={{
                                    background: `linear-gradient(135deg, ${template.colorScheme.primary}, ${template.colorScheme.accent})`
                                }}
                            >
                                <span className="text-white font-bold text-2xl">
                                    {invoice.businessInfo.name.charAt(0) || template.name.charAt(0)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* 🔥 DYNAMIC TEMPLATE-SPECIFIC FIELDS */}
                    {renderTemplateFields()}

                    {/* Business & Client Info */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-12">
                        <div>
                            <h3
                                className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 pb-2"
                                style={{ borderBottom: `2px solid ${template.colorScheme.primary}` }}
                            >
                                From
                            </h3>
                            <div className="text-gray-700 space-y-1">
                                <p className="font-semibold text-lg">{invoice.businessInfo.name || 'Your Business Name'}</p>
                                {invoice.businessInfo.address && <p>{invoice.businessInfo.address}</p>}
                                {(invoice.businessInfo.city || invoice.businessInfo.state || invoice.businessInfo.zipCode) && (
                                    <p>
                                        {[invoice.businessInfo.city, invoice.businessInfo.state, invoice.businessInfo.zipCode]
                                            .filter(Boolean)
                                            .join(', ')}
                                    </p>
                                )}
                                {invoice.businessInfo.phone && <p>Phone: {invoice.businessInfo.phone}</p>}
                                {invoice.businessInfo.email && <p>Email: {invoice.businessInfo.email}</p>}

                                {/* 🔥 SHOW BUSINESS-SPECIFIC TEMPLATE FIELDS */}
                                {template.fields
                                    .filter(field => field.category === 'business' && templateData[field.id])
                                    .map(field => (
                                        <p key={field.id}>
                                            {field.label}: {templateData[field.id]}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>

                        <div>
                            <h3
                                className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 pb-2"
                                style={{ borderBottom: `2px solid ${template.colorScheme.accent}` }}
                            >
                                Bill To
                            </h3>
                            <div className="text-gray-700 space-y-1">
                                <p className="font-semibold text-lg">{invoice.clientInfo.name || 'Client Name'}</p>
                                {invoice.clientInfo.address && <p>{invoice.clientInfo.address}</p>}
                                {(invoice.clientInfo.city || invoice.clientInfo.state || invoice.clientInfo.zipCode) && (
                                    <p>
                                        {[invoice.clientInfo.city, invoice.clientInfo.state, invoice.clientInfo.zipCode]
                                            .filter(Boolean)
                                            .join(', ')}
                                    </p>
                                )}
                                {invoice.clientInfo.phone && <p>Phone: {invoice.clientInfo.phone}</p>}
                                {invoice.clientInfo.email && <p>Email: {invoice.clientInfo.email}</p>}

                                {/* 🔥 SHOW CLIENT-SPECIFIC TEMPLATE FIELDS */}
                                {template.fields
                                    .filter(field => field.category === 'client' && templateData[field.id])
                                    .map(field => (
                                        <p key={field.id}>
                                            {field.label}: {templateData[field.id]}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    {/* Line Items Table */}
                    <div className="mb-8">
                        <div
                            className="rounded-t-lg px-6 py-4"
                            style={{
                                background: `linear-gradient(135deg, ${template.colorScheme.primary}, ${template.colorScheme.accent})`
                            }}
                        >
                            <div className="grid grid-cols-12 gap-4 text-sm font-bold text-white uppercase tracking-wide">
                                <div className="col-span-6">Description</div>
                                <div className="col-span-2 text-center">Qty</div>
                                <div className="col-span-2 text-center">Rate</div>
                                <div className="col-span-2 text-right">Amount</div>
                            </div>
                        </div>

                        <div className="bg-white">
                            {invoice.lineItems.map((item, index) => (
                                <div key={item.id} className={`px-6 py-4 ${index < invoice.lineItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                                    <div className="grid grid-cols-12 gap-4 text-gray-700">
                                        <div className="col-span-6">
                                            <p className="font-medium">{item.description || `Item ${index + 1}`}</p>
                                        </div>
                                        <div className="col-span-2 text-center">{item.quantity}</div>
                                        <div className="col-span-2 text-center">{formatCurrency(item.rate)}</div>
                                        <div className="col-span-2 text-right font-medium">{formatCurrency(item.amount)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Totals */}
                    <div className="flex justify-end mb-8">
                        <div className="w-80">
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal:</span>
                                    <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
                                </div>

                                {invoice.taxRate > 0 && (
                                    <div className="flex justify-between text-gray-700">
                                        <span>Tax ({invoice.taxRate}%):</span>
                                        <span className="font-medium">{formatCurrency(invoice.taxAmount)}</span>
                                    </div>
                                )}

                                <Separator className="bg-gray-300" />

                                <div className="flex justify-between text-xl font-bold text-gray-900">
                                    <span>Total:</span>
                                    <span style={{ color: template.colorScheme.primary }}>
                                        {formatCurrency(invoice.total)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    {invoice.notes && (
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
                                Notes
                            </h3>
                            <p
                                className="text-gray-700 p-4 rounded-lg"
                                style={{
                                    backgroundColor: `${template.colorScheme.primary}08`,
                                    borderLeft: `4px solid ${template.colorScheme.primary}`
                                }}
                            >
                                {invoice.notes}
                            </p>
                        </div>
                    )}

                    {/* Terms */}
                    {invoice.terms && (
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
                                Payment Terms
                            </h3>
                            <p
                                className="text-gray-700 p-4 rounded-lg"
                                style={{
                                    backgroundColor: `${template.colorScheme.accent}08`,
                                    borderLeft: `4px solid ${template.colorScheme.accent}`
                                }}
                            >
                                {invoice.terms}
                            </p>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="text-center pt-8 border-t border-gray-200">
                        <p className="text-gray-500 text-sm">
                            Thank you for your business!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenericTemplate;