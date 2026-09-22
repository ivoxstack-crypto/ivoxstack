import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats an amount into Indian Rupees (INR) format.
 * Examples: ₹99, ₹2,999, ₹39,969, ₹6,999/month
 */
export function formatINR(amount: number, isMonthly = false): string {
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

  return isMonthly ? `${formatted}/month` : formatted;
}

/**
 * Builds a direct WhatsApp chat URL with pre-filled message text.
 */
export function buildWhatsAppUrl(message: string, whatsappNumber = '918252257405'): string {
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
}

/**
 * Generates a unique Lead ID in the format LEAD-XXXXXX
 */
export function generateLeadId(): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `LEAD-${randomNum}`;
}

/**
 * Basic sanitization to prevent script injection
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>?/gm, '')
    .trim();
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  const clean = phone.replace(/[^0-9]/g, '');
  return clean.length >= 10;
}
