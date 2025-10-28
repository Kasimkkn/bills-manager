import { Address } from "@/types/invoice";

/**
 * Formats an address object into a readable string
 */
export function formatAddress(address?: Address): string {
  if (!address) return "";
  
  const parts = [];
  if (address.street) parts.push(address.street);
  parts.push(address.city);
  parts.push(address.state);
  parts.push(address.pincode);
  if (address.country) parts.push(address.country);
  
  return parts.filter(Boolean).join(", ");
}

/**
 * Formats a date to string, handling both string and Date types
 */
export function formatDate(date?: string | Date): string {
  if (!date) return "";
  if (typeof date === "string") return date;
  return date.toLocaleDateString();
}

/**
 * Calculates total tax from GST components
 */
export function calculateTotalTax(cgst?: number, sgst?: number, igst?: number): number {
  return (cgst || 0) + (sgst || 0) + (igst || 0);
}
