/**
 * Formats a phone number to (XXX) XXX-XXXX format
 * @param phoneNumber - Phone number as a number or string
 * @returns Formatted phone number string
 */
export function formatPhoneNumber(phoneNumber: number | string): string {
  const phoneStr = phoneNumber.toString();
  
  // Remove any non-digit characters
  const digits = phoneStr.replace(/\D/g, '');
  
  // Handle different length phone numbers
  if (digits.length === 10) {
    // Standard US format: (XXX) XXX-XXXX
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length === 11 && digits[0] === '1') {
    // Handle with country code: 1 (XXX) XXX-XXXX
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  } else if (digits.length === 7) {
    // Local format: XXX-XXXX
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }
  
  // Fallback: return original if format is unrecognized
  return phoneStr;
}

