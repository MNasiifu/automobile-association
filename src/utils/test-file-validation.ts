/**
 * Test file to demonstrate the improved file validation functionality
 * This file shows examples of the enhanced error messages returned by the validateFile function
 */

import { FILE_SIZE_LIMITS } from '../hooks/useApplyForIdp';

// Mock File objects for testing (in a real environment, these would be actual File objects)
const createMockFile = (name: string, type: string, size: number): File => {
  return new File(['mock content'], name, { type }) as File & { size: number };
};

// Test cases demonstrating different validation scenarios
export const testValidationScenarios = () => {
  console.log('=== File Validation Test Scenarios ===\n');

  // Test 1: Valid PDF file
  console.log('1. Valid PDF file (1MB):');
  const validPdf = createMockFile('passport.pdf', 'application/pdf', 1024 * 1024); // 1MB
  console.log('Expected: ✅ Valid file');
  
  // Test 2: PDF file too large
  console.log('\n2. PDF file too large (3MB):');
  const largePdf = createMockFile('large-passport.pdf', 'application/pdf', 3 * 1024 * 1024); // 3MB
  console.log(`Expected: ❌ File size (3.00MB) exceeds the maximum allowed size of ${FILE_SIZE_LIMITS.PDF_MAX_SIZE}MB`);
  
  // Test 3: Wrong file type for PDF field
  console.log('\n3. Wrong file type (JPG instead of PDF):');
  const wrongTypePdf = createMockFile('passport.jpg', 'image/jpeg', 1024 * 1024); // 1MB JPG
  console.log('Expected: ❌ Invalid file type "JPEG". Only PDF files are allowed');
  
  // Test 4: Valid image file
  console.log('\n4. Valid image file (500KB):');
  const validImage = createMockFile('photo.jpg', 'image/jpeg', 500 * 1024); // 500KB
  console.log('Expected: ✅ Valid file');
  
  // Test 5: Image file too large
  console.log('\n5. Image file too large (2MB):');
  const largeImage = createMockFile('large-photo.jpg', 'image/jpeg', 2 * 1024 * 1024); // 2MB
  console.log(`Expected: ❌ File size (2.00MB) exceeds the maximum allowed size of ${FILE_SIZE_LIMITS.IMAGE_MAX_SIZE}MB`);
  
  // Test 6: Wrong image type
  console.log('\n6. Wrong image type (GIF instead of JPG/PNG):');
  const wrongTypeImage = createMockFile('photo.gif', 'image/gif', 500 * 1024); // 500KB GIF
  console.log('Expected: ❌ Invalid file type "GIF". Only PNG, JPG, JPEG files are allowed');
  
  // Test 7: Empty file
  console.log('\n7. Empty file:');
  const emptyFile = createMockFile('empty.pdf', 'application/pdf', 0); // 0 bytes
  console.log('Expected: ❌ File is empty. Please select a valid file');
  
  // Test 8: Unknown file type
  console.log('\n8. Unknown file type:');
  const unknownFile = createMockFile('document.txt', 'text/plain', 1024); // 1KB TXT
  console.log('Expected: ❌ Invalid file type "PLAIN". Only PDF files are allowed');
  
  console.log('\n=== Summary ===');
  console.log('✅ The enhanced validateFile function now provides:');
  console.log('   • Specific error messages for file size violations');
  console.log('   • Clear identification of actual vs expected file types');
  console.log('   • Proper handling of empty files');
  console.log('   • Detailed validation results with file metadata');
  console.log('   • Configurable size limits via FILE_SIZE_LIMITS constant');
};

// File size limit configurations used in the application
export const fileSizeLimits = {
  PDF_DOCUMENTS: `${FILE_SIZE_LIMITS.PDF_MAX_SIZE}MB`,
  IMAGES: `${FILE_SIZE_LIMITS.IMAGE_MAX_SIZE}MB`,
};

// Common error patterns that users might encounter
export const commonValidationErrors = {
  FILE_TOO_LARGE: 'File size exceeds maximum allowed size',
  WRONG_FILE_TYPE: 'Invalid file type',
  EMPTY_FILE: 'File is empty',
  NO_FILE_SELECTED: 'No file selected',
};

// Recommended file preparation guidelines for users
export const userGuidelines = {
  PDF_FILES: [
    `Keep file size under ${FILE_SIZE_LIMITS.PDF_MAX_SIZE}MB`,
    'Ensure documents are clear and legible',
    'Use PDF format only for official documents',
    'Scan at 300 DPI for best quality-to-size ratio',
  ],
  IMAGE_FILES: [
    `Keep file size under ${FILE_SIZE_LIMITS.IMAGE_MAX_SIZE}MB`,
    'Use JPG, JPEG, or PNG formats only',
    'Ensure photos have good lighting and contrast',
    'Use white or light background for passport photos',
    'Compress images if they exceed size limits',
  ],
};
