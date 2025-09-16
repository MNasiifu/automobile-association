/**
 * Uganda Phone Number Validation Utilities
 * 
 * This module provides comprehensive validation and formatting utilities
 * for Uganda phone numbers following the +256XXXXXXXXX format.
 * 
 * @author AA Uganda Development Team
 * @version 1.0.0
 */

// Uganda phone number validation result interface
export interface UgandaPhoneValidationResult {
  isValid: boolean;
  error?: string;
  formattedNumber?: string;
  details?: {
    countryCode: string;
    nationalNumber: string;
    originalInput: string;
    network?: string;
  };
}

// Uganda network mappings based on number prefixes
const UGANDA_NETWORK_MAPPINGS = {
  // MTN Uganda
  '70': 'MTN', '71': 'MTN', '72': 'MTN', '73': 'MTN', '74': 'MTN', 
  '75': 'MTN', '76': 'MTN', '77': 'MTN', '78': 'MTN', '79': 'MTN',
  
  // Airtel Uganda (formerly UTL)
  '30': 'Airtel', '31': 'Airtel', '32': 'Airtel', '33': 'Airtel', '34': 'Airtel',
  '35': 'Airtel', '36': 'Airtel', '37': 'Airtel', '38': 'Airtel', '39': 'Airtel',
  
  // Africell Uganda
  '20': 'Africell', '24': 'Africell', '25': 'Africell', '26': 'Africell', 
  '27': 'Africell', '28': 'Africell', '29': 'Africell',
  
  // Other networks/services
  '41': 'Other', '42': 'Other', '43': 'Other', '44': 'Other', '45': 'Other',
  '46': 'Other', '47': 'Other', '48': 'Other', '49': 'Other'
} as const;

/**
 * Validates a Uganda phone number format
 * 
 * Requirements:
 * - Must start with +256 (Uganda country code)
 * - Must have exactly 9 digits after the country code
 * - Must use valid Uganda mobile prefixes
 * - Should not include 0 after country code
 * 
 * @param phoneNumber - The phone number to validate
 * @returns UgandaPhoneValidationResult object
 * 
 * @example
 * ```typescript
 * const result = validateUgandaPhoneNumber('+256700789990');
 * if (result.isValid) {
 *   console.log('Valid number:', result.formattedNumber);
 * } else {
 *   console.error('Invalid:', result.error);
 * }
 * ```
 */
export const validateUgandaPhoneNumber = (phoneNumber: string): UgandaPhoneValidationResult => {
  // Input validation
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return {
      isValid: false,
      error: "Phone number is required"
    };
  }

  // Remove all whitespace, hyphens, parentheses, and dots
  const cleanNumber = phoneNumber.replace(/[\s\-\(\)\.]/g, '');

  // Check if it's empty after cleaning
  if (!cleanNumber) {
    return {
      isValid: false,
      error: "Phone number cannot be empty"
    };
  }

  // Uganda country code validation
  if (!cleanNumber.startsWith('+256')) {
    return {
      isValid: false,
      error: "Phone number must start with Uganda country code +256"
    };
  }

  // Extract the national number (part after +256)
  const nationalNumber = cleanNumber.substring(4); // Remove "+256"

  // Check if national number starts with 0 (common user error)
  if (nationalNumber.startsWith('0')) {
    return {
      isValid: false,
      error: "Do not include '0' after the country code +256"
    };
  }

  // Check if national number contains only digits
  if (!/^\d+$/.test(nationalNumber)) {
    return {
      isValid: false,
      error: "Phone number can only contain digits after the country code"
    };
  }

  // Uganda mobile numbers should have exactly 9 digits after country code
  if (nationalNumber.length !== 9) {
    return {
      isValid: false,
      error: `Uganda phone numbers must have exactly 9 digits after +256. You provided ${nationalNumber.length} digits`
    };
  }

  // Validate Uganda mobile number prefixes
  const firstTwoDigits = nationalNumber.substring(0, 2);
  const validPrefixes = Object.keys(UGANDA_NETWORK_MAPPINGS);
  
  if (!validPrefixes.includes(firstTwoDigits)) {
    const prefixList = validPrefixes.map(p => `${p}x`).join(', ');
    return {
      isValid: false,
      error: `Invalid Uganda mobile number prefix. Valid prefixes include: ${prefixList}`
    };
  }

  // Determine network provider
  const network = UGANDA_NETWORK_MAPPINGS[firstTwoDigits as keyof typeof UGANDA_NETWORK_MAPPINGS];

  // All validations passed
  return {
    isValid: true,
    formattedNumber: `+256${nationalNumber}`,
    details: {
      countryCode: "+256",
      nationalNumber: nationalNumber,
      originalInput: phoneNumber,
      network: network
    }
  };
};

/**
 * Formats a phone number to the standard Uganda format
 * 
 * This function attempts to clean and format various input formats
 * to the standard +256XXXXXXXXX format.
 * 
 * @param phoneNumber - The phone number to format
 * @returns Formatted phone number or original input if cannot be formatted
 * 
 * @example
 * ```typescript
 * formatUgandaPhoneNumber('0700789990') // Returns '+256700789990'
 * formatUgandaPhoneNumber('256700789990') // Returns '+256700789990'
 * formatUgandaPhoneNumber('+256 700 789 990') // Returns '+256700789990'
 * ```
 */
export const formatUgandaPhoneNumber = (phoneNumber: string | null | undefined): string => {
  if (!phoneNumber) return "";
  
  // Clean the phone number
  const cleaned = phoneNumber.replace(/[\s\-\(\)\.]/g, '');
  
  // If it already has +256, clean and return
  if (cleaned.startsWith('+256')) {
    const nationalPart = cleaned.substring(4);
    if (/^\d{9}$/.test(nationalPart)) {
      return `+256${nationalPart}`;
    }
  }
  
  // If it starts with '0', replace with +256
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    const nationalPart = cleaned.substring(1);
    if (/^\d{9}$/.test(nationalPart)) {
      return `+256${nationalPart}`;
    }
  }
  
  // If it starts with '256', add the +
  if (cleaned.startsWith('256') && cleaned.length === 12) {
    const nationalPart = cleaned.substring(3);
    if (/^\d{9}$/.test(nationalPart)) {
      return `+${cleaned}`;
    }
  }
  
  // If it's just the national number (9 digits), add +256
  if (/^\d{9}$/.test(cleaned)) {
    return `+256${cleaned}`;
  }
  
  // Return original if cannot be formatted
  return phoneNumber;
};

/**
 * Validates multiple phone numbers at once
 * 
 * @param phoneNumbers - Object with phone number fields to validate
 * @returns Object with validation results for each field
 * 
 * @example
 * ```typescript
 * const results = validatePhoneNumbers({
 *   telephone: '+256700789990',
 *   mobile: '+256712345678'
 * });
 * ```
 */
export const validatePhoneNumbers = (phoneNumbers: Record<string, string>): Record<string, UgandaPhoneValidationResult> => {
  const results: Record<string, UgandaPhoneValidationResult> = {};
  
  for (const [fieldName, phoneNumber] of Object.entries(phoneNumbers)) {
    results[fieldName] = validateUgandaPhoneNumber(phoneNumber);
  }
  
  return results;
};

/**
 * Gets user-friendly helper text for phone number input fields
 * 
 * @param phoneNumber - Current phone number value
 * @param error - Current validation error message
 * @returns Appropriate helper text
 */
export const getPhoneNumberHelperText = (phoneNumber: string, error?: string): string => {
  if (error) {
    return error;
  }
  
  if (!phoneNumber) {
    return "Format: +256700789990 (must include +256 and 9 digits)";
  }
  
  const validation = validateUgandaPhoneNumber(phoneNumber);
  if (validation.isValid) {
    const networkInfo = validation.details?.network ? ` (${validation.details.network})` : '';
    return `✓ Valid Uganda number: ${validation.formattedNumber}${networkInfo}`;
  }
  
  return "Format: +256700789990 (must include +256 and 9 digits)";
};

/**
 * Creates a regex pattern for Uganda phone number validation
 * For use in HTML5 pattern attribute or other regex-based validations
 * 
 * @returns RegExp object for Uganda phone number validation
 */
export const createUgandaPhoneRegExp = (): RegExp => {
  const validPrefixes = Object.keys(UGANDA_NETWORK_MAPPINGS).join('|');
  return new RegExp(`^\\+256(${validPrefixes})\\d{7}$`);
};

/**
 * Checks if a string might be a Uganda phone number (loose validation)
 * Useful for input preprocessing before strict validation
 * 
 * @param value - String to check
 * @returns boolean indicating if it might be a Uganda phone number
 */
export const isLikelyUgandaPhoneNumber = (value: string): boolean => {
  if (!value) return false;
  
  const cleaned = value.replace(/[\s\-\(\)\.]/g, '');
  
  // Check various common formats
  return (
    cleaned.startsWith('+256') ||
    cleaned.startsWith('256') ||
    (cleaned.startsWith('0') && cleaned.length === 10) ||
    (cleaned.length === 9 && /^\d+$/.test(cleaned))
  );
};
