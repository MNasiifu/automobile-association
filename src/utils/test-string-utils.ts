// Test file for string utilities
import { concatenateWithCommas, concatenateWithAnd, capitalizeWords, truncateString, normalizeWhitespace, toKebabCase } from './stringUtils';

// Test concatenateWithCommas - main function requested
console.log('=== Testing concatenateWithCommas ===');
console.log('Test 1:', concatenateWithCommas(['B', 'C', 'D'])); // Expected: "B, C, D"
console.log('Test 2:', concatenateWithCommas(['apple', 'banana', 'cherry'])); // Expected: "apple, banana, cherry"
console.log('Test 3:', concatenateWithCommas(['single'])); // Expected: "single"
console.log('Test 4:', concatenateWithCommas([])); // Expected: ""
console.log('Test 5:', concatenateWithCommas(['A', 'B', 'C'], ' | ')); // Expected: "A | B | C"
console.log('Test 6:', concatenateWithCommas(['', 'B', '', 'D'])); // Expected: "B, D"

// Test other utilities
console.log('\n=== Testing concatenateWithAnd ===');
console.log('Test 1:', concatenateWithAnd(['B', 'C', 'D'])); // Expected: "B, C and D"
console.log('Test 2:', concatenateWithAnd(['apple', 'banana'])); // Expected: "apple and banana"
console.log('Test 3:', concatenateWithAnd(['single'])); // Expected: "single"

console.log('\n=== Testing capitalizeWords ===');
console.log('Test 1:', capitalizeWords('hello world')); // Expected: "Hello World"
console.log('Test 2:', capitalizeWords('aa uganda services')); // Expected: "Aa Uganda Services"

console.log('\n=== Testing truncateString ===');
console.log('Test 1:', truncateString('This is a very long string', 15)); // Expected: "This is a ver..."
console.log('Test 2:', truncateString('Short', 20)); // Expected: "Short"

console.log('\n=== Testing normalizeWhitespace ===');
console.log('Test 1:', normalizeWhitespace('  hello   world  ')); // Expected: "hello world"

console.log('\n=== Testing toKebabCase ===');
console.log('Test 1:', toKebabCase('Hello World')); // Expected: "hello-world"
console.log('Test 2:', toKebabCase('AA Uganda Services')); // Expected: "aa-uganda-services"
