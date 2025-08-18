
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useInvoice } from '@/contexts/InvoiceContext';

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
];

const CurrencySelector = () => {
  const { invoice, updateCurrency } = useInvoice();

  return (
    <div className="space-y-2">
      <Label htmlFor="currency" className="text-sm font-medium text-foreground">
        Currency
      </Label>
      <Select value={invoice.currency} onValueChange={updateCurrency}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent className="bg-background border border-border shadow-lg z-50">
          {CURRENCIES.map((currency) => (
            <SelectItem 
              key={currency.code} 
              value={currency.code}
              className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm">{currency.symbol}</span>
                <span>{currency.code}</span>
                <span className="text-muted-foreground">- {currency.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;
