// String manipulation utilities

/**
 * Concatenates an array of strings with commas and spaces
 * @param {string[]} items - Array of strings to concatenate
 * @param {string} separator - Custom separator to use (defaults to ', ')
 * @returns {string} Concatenated string with items separated by commas
 * 
 * @example
 * concatenateWithCommas(['B', 'C', 'D']) // "B, C, D"
 * concatenateWithCommas(['apple', 'banana', 'cherry']) // "apple, banana, cherry"
 * concatenateWithCommas(['single']) // "single"
 * concatenateWithCommas([]) // ""
 * concatenateWithCommas(['A', 'B', 'C'], ' | ') // "A | B | C"
 */
export const concatenateWithCommas = (items: string[], separator: string = ', '): string => {
  if (!Array.isArray(items)) {
    console.warn('concatenateWithCommas: Expected an array but received:', typeof items);
    return '';
  }

  // Filter out empty strings and null/undefined values
  const validItems = items.filter(item => 
    typeof item === 'string' && item.trim().length > 0
  );

  return validItems.join(separator);
};

/**
 * Concatenates an array of strings with commas and adds "and" before the last item
 * @param {string[]} items - Array of strings to concatenate
 * @returns {string} Concatenated string with proper grammar
 * 
 * @example
 * concatenateWithAnd(['B', 'C', 'D']) // "B, C and D"
 * concatenateWithAnd(['apple', 'banana']) // "apple and banana"
 * concatenateWithAnd(['single']) // "single"
 * concatenateWithAnd([]) // ""
 */
export const concatenateWithAnd = (items: string[]): string => {
  if (!Array.isArray(items)) {
    console.warn('concatenateWithAnd: Expected an array but received:', typeof items);
    return '';
  }

  // Filter out empty strings and null/undefined values
  const validItems = items.filter(item => 
    typeof item === 'string' && item.trim().length > 0
  );

  if (validItems.length === 0) return '';
  if (validItems.length === 1) return validItems[0];
  if (validItems.length === 2) return `${validItems[0]} and ${validItems[1]}`;

  const lastItem = validItems.pop();
  return `${validItems.join(', ')} and ${lastItem}`;
};

/**
 * Capitalizes the first letter of each word in a string
 * @param {string} str - String to capitalize
 * @returns {string} String with first letter of each word capitalized
 * 
 * @example
 * capitalizeWords('hello world') // "Hello World"
 * capitalizeWords('aa uganda services') // "Aa Uganda Services"
 * capitalizeWords('') // ""
 */
export const capitalizeWords = (str: string): string => {
  if (typeof str !== 'string') {
    console.warn('capitalizeWords: Expected a string but received:', typeof str);
    return '';
  }

  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Truncates a string to a specified length and adds ellipsis
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @param {string} suffix - Suffix to add when truncated (defaults to '...')
 * @returns {string} Truncated string with ellipsis if needed
 * 
 * @example
 * truncateString('This is a very long string', 15) // "This is a ver..."
 * truncateString('Short', 20) // "Short"
 * truncateString('Custom suffix', 10, ' [more]') // "Custom suf [more]"
 */
export const truncateString = (str: string, maxLength: number, suffix: string = '...'): string => {
  if (typeof str !== 'string') {
    console.warn('truncateString: Expected a string but received:', typeof str);
    return '';
  }

  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
};

/**
 * Removes extra whitespace and normalizes spacing in a string
 * @param {string} str - String to normalize
 * @returns {string} String with normalized whitespace
 * 
 * @example
 * normalizeWhitespace('  hello   world  ') // "hello world"
 * normalizeWhitespace('multiple\n\nlines\t\twith\ttabs') // "multiple lines with tabs"
 */
export const normalizeWhitespace = (str: string): string => {
  if (typeof str !== 'string') {
    console.warn('normalizeWhitespace: Expected a string but received:', typeof str);
    return '';
  }

  return str.replace(/\s+/g, ' ').trim();
};

/**
 * Converts a string to kebab-case (URL-friendly format)
 * @param {string} str - String to convert
 * @returns {string} String in kebab-case format
 * 
 * @example
 * toKebabCase('Hello World') // "hello-world"
 * toKebabCase('AA Uganda Services') // "aa-uganda-services"
 * toKebabCase('camelCaseString') // "camel-case-string"
 */
export const toKebabCase = (str: string): string => {
  if (typeof str !== 'string') {
    console.warn('toKebabCase: Expected a string but received:', typeof str);
    return '';
  }

  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Add hyphens before uppercase letters
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '') // Remove special characters except hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

export default {
  concatenateWithCommas,
  concatenateWithAnd,
  capitalizeWords,
  truncateString,
  normalizeWhitespace,
  toKebabCase,
};
