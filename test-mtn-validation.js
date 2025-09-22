// Test file to verify MTN validation logic
const { validateUgandaPhoneNumber } = require('./src/utils/phoneValidation');

const validateMTNPhoneNumber = (phoneNumber) => {
  // First validate as a general Uganda phone number
  const ugandaValidation = validateUgandaPhoneNumber(phoneNumber);
  
  if (!ugandaValidation.isValid) {
    return { isValid: false, error: ugandaValidation.error };
  }
  
  // Extract the full formatted number (should be +256xxxxxxxxx)
  const formattedNumber = ugandaValidation.formattedNumber;
  if (!formattedNumber) {
    return { isValid: false, error: "Invalid phone number format" };
  }
  
  // Check if it's a valid MTN number with specific prefixes
  // MTN Uganda uses: +25677xxxxxxx, +25678xxxxxxx, +25676xxxxxxx
  const mtnPattern = /^\+256(77|78|76)\d{7}$/;
  
  if (!mtnPattern.test(formattedNumber)) {
    return { 
      isValid: false, 
      error: "Payment requires an MTN Mobile Money number. MTN numbers must be in format +25677xxxxxxx, +25678xxxxxxx, or +25676xxxxxxx." 
    };
  }
  
  return { isValid: true };
};

// Test cases
const testNumbers = [
  '+256771234567', // Valid MTN (77 prefix)
  '+256781234567', // Valid MTN (78 prefix)
  '+256761234567', // Valid MTN (76 prefix)
  '+256701234567', // Invalid - not MTN prefix
  '+256391234567', // Invalid - Airtel number
  '+256201234567', // Invalid - Africell number
  '0771234567',    // Valid MTN but needs formatting
  '+256772345',    // Invalid - too short
  '+2567712345678', // Invalid - too long
];

console.log('MTN Phone Number Validation Tests:');
console.log('====================================');

testNumbers.forEach((number, index) => {
  const result = validateMTNPhoneNumber(number);
  console.log(`${index + 1}. ${number}`);
  console.log(`   Valid: ${result.isValid}`);
  if (!result.isValid) {
    console.log(`   Error: ${result.error}`);
  }
  console.log('');
});
