# Uganda Phone Number Validation Implementation

## Summary of Changes

As a senior React.js developer, I have thoroughly audited the codebase and implemented comprehensive Uganda phone number validation for both `telephoneNumber` and `mobileNumber` fields in the IDP application form. The implementation ensures that all entered phone numbers must have the Uganda country code `+256` followed by exactly 9 digits.

## Key Features Implemented

### 1. Comprehensive Phone Validation Utility (`src/utils/phoneValidation.ts`)

Created a dedicated utility module with the following features:

- **Format Validation**: Ensures numbers follow `+256XXXXXXXXX` format
- **Network Detection**: Identifies network providers (MTN, Airtel, Africell, etc.)
- **Smart Formatting**: Automatically formats various input formats to standard format
- **User-Friendly Errors**: Provides specific error messages for different validation failures
- **Prefix Validation**: Validates against actual Uganda mobile prefixes

### 2. Integration with Form Validation (`src/hooks/useApplyForIdp.ts`)

Updated the Yup validation schema with:

```typescript
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

mobileNumber: yup
  .string()
  .required("Mobile number is required")
  .test("uganda-phone-format", "Invalid mobile number format", function(value) {
    if (!value) return false;
    
    const validation = validateUgandaPhoneNumber(value);
    if (!validation.isValid) {
      return this.createError({ message: validation.error });
    }
    return true;
  }),
```

### 3. API-Level Validation (`src/api/index.ts`)

Updated server-side validation to use the same validation rules, ensuring consistency between frontend and backend validation.

### 4. Member Data Auto-Population

Enhanced the member verification system to automatically format phone numbers when populating form data from existing member records.

## Validation Rules

### Required Format
- **Must start with**: `+256` (Uganda country code)
- **Must have**: Exactly 9 digits after the country code
- **Total length**: 13 characters (`+256` + 9 digits)
- **Example**: `+256700789990`

### Supported Input Formats (Auto-Converted)
- `+256700789990` → `+256700789990` ✓
- `0700789990` → `+256700789990` ✓
- `256700789990` → `+256700789990` ✓
- `700789990` → `+256700789990` ✓
- `+256 700 789 990` → `+256700789990` ✓
- `+256-700-789-990` → `+256700789990` ✓

### Common Error Prevention
- ❌ `+256 0700789990` - Cannot include '0' after country code
- ❌ `+256700789` - Must have exactly 9 digits
- ❌ `+25670078999012` - Too many digits
- ❌ `+256800789990` - Invalid network prefix
- ❌ `+234700789990` - Wrong country code

### Valid Uganda Mobile Prefixes
- **MTN**: 70x, 71x, 72x, 73x, 74x, 75x, 76x, 77x, 78x, 79x
- **Airtel**: 30x, 31x, 32x, 33x, 34x, 35x, 36x, 37x, 38x, 39x
- **Africell**: 20x, 24x, 25x, 26x, 27x, 28x, 29x
- **Others**: 41x, 42x, 43x, 44x, 45x, 46x, 47x, 48x, 49x

## User Experience Enhancements

### Real-Time Validation Feedback
- Provides immediate feedback as users type
- Shows specific error messages for different validation failures
- Displays network provider when number is valid

### Helper Text Examples
- **Empty field**: "Format: +256700789990 (must include +256 and 9 digits)"
- **Valid number**: "✓ Valid Uganda number: +256700789990 (MTN)"
- **Invalid format**: "Phone number must start with Uganda country code +256"

## Code Quality & Maintainability

### Type Safety
- Full TypeScript implementation with comprehensive interfaces
- Proper error handling and validation result types

### Reusability
- Shared utility functions that can be used across the entire application
- Consistent validation logic between form validation and API validation

### Documentation
- Comprehensive JSDoc comments
- Usage examples and integration guides
- Clear error messages for developers and users

## Testing & Validation

Created test file (`test-phone-validation.ts`) demonstrating:
- Various input formats and their validation results
- Error handling for invalid inputs
- Integration examples for form components

## Files Modified/Created

### New Files
1. `src/utils/phoneValidation.ts` - Main validation utility
2. `test-phone-validation.ts` - Test and demonstration file

### Modified Files
1. `src/hooks/useApplyForIdp.ts` - Updated form validation schema
2. `src/api/index.ts` - Enhanced API validation
3. `src/utils/index.ts` - Added phone validation exports

## Impact on Application Security

- **Input Sanitization**: All phone numbers are cleaned and validated before processing
- **Consistent Validation**: Same rules applied on frontend and backend
- **Error Prevention**: Prevents common user input errors
- **Data Integrity**: Ensures all phone numbers in the database follow consistent format

## Future Enhancements

The implementation is designed to be easily extensible for:
- Additional country codes if needed
- New Uganda network prefixes
- Integration with international phone validation libraries
- Real-time network status checking

## Example Usage in Components

```typescript
import { validateUgandaPhoneNumber, getPhoneNumberHelperText } from '../utils/phoneValidation';

// In form validation
const validation = validateUgandaPhoneNumber(phoneNumber);
if (!validation.isValid) {
  setError(validation.error);
}

// For helper text
const helperText = getPhoneNumberHelperText(value, error);
```

This implementation provides a robust, user-friendly, and maintainable solution for Uganda phone number validation throughout the AA Uganda IDP application system.
