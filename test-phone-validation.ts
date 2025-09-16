/**
 * Test file to demonstrate Uganda phone number validation
 * This file shows how the validation works with various input formats
 */

import { validateUgandaPhoneNumber, formatUgandaPhoneNumber } from '../src/utils/phoneValidation';

// Test cases for Uganda phone number validation
const testPhoneNumbers = [
  // Valid formats
  '+256700789990',    // Standard format
  '+256 700 789 990', // With spaces
  '+256-700-789-990', // With hyphens
  '0700789990',       // National format with leading 0
  '256700789990',     // Without + but with country code
  '700789990',        // Just national number

  // Invalid formats
  '+256 0700789990',  // 0 after country code
  '+256700789',       // Too few digits
  '+25670078999012',  // Too many digits
  '+256800789990',    // Invalid prefix (80x)
  '+234700789990',    // Wrong country code (Nigeria)
  'invalid',          // Non-numeric
  '',                 // Empty
  '+256',             // Only country code
];

console.log('=== Uganda Phone Number Validation Test ===\n');

testPhoneNumbers.forEach((phoneNumber, index) => {
  console.log(`Test ${index + 1}: "${phoneNumber}"`);
  
  const validation = validateUgandaPhoneNumber(phoneNumber);
  const formatted = formatUgandaPhoneNumber(phoneNumber);
  
  console.log(`  Formatted: "${formatted}"`);
  console.log(`  Valid: ${validation.isValid}`);
  
  if (validation.isValid) {
    console.log(`  Standard Format: ${validation.formattedNumber}`);
    console.log(`  Network: ${validation.details?.network || 'Unknown'}`);
  } else {
    console.log(`  Error: ${validation.error}`);
  }
  
  console.log('');
});

console.log('=== Form Integration Example ===');
console.log('// In your React component:');
console.log(`
import { validateUgandaPhoneNumber, getPhoneNumberHelperText } from '../utils/phoneValidation';

// Yup validation schema
const schema = yup.object({
  telephoneNumber: yup
    .string()
    .required("Telephone number is required")
    .test("uganda-phone-format", "Invalid telephone number format", function(value) {
      if (!value) return false;
      const validation = validateUgandaPhoneNumber(value);
      if (!validation.isValid) {
        return this.createError({ message: validation.error });
      }
      return true;
    }),
});

// Helper text for form inputs
const helperText = getPhoneNumberHelperText(phoneValue, errorMessage);
`);

export {}; // Make this a module
