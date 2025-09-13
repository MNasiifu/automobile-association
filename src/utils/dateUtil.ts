import dayjs from 'dayjs';

/**
 * Get the current date in YYYY-MM-DD format
 * @returns {string} Current date in YYYY-MM-DD format
 * 
 * @example
 * getCurrentDateFormatted() // "2025-09-11"
 */
export const getCurrentDateFormatted = (): string => {
  return dayjs().format('YYYY-MM-DD');
};

/**
 * Format any date to YYYY-MM-DD format
 * @param {Date | string | dayjs.Dayjs} date - Date to format
 * @returns {string} Formatted date in YYYY-MM-DD format
 * 
 * @example
 * formatDateToYYYYMMDD(new Date()) // "2025-09-11"
 * formatDateToYYYYMMDD("2025-12-25") // "2025-12-25"
 */
export const formatDateToYYYYMMDD = (date: Date | string | dayjs.Dayjs): string => {
  return dayjs(date).format('YYYY-MM-DD');
};

/**
 * Get current timestamp in YYYY-MM-DD HH:mm:ss format
 * @returns {string} Current timestamp
 * 
 * @example
 * getCurrentTimestamp() // "2025-09-11 14:30:25"
 */
export const getCurrentTimestamp = (): string => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
};

/**
 * Check if a date string is in YYYY-MM-DD format
 * @param {string} dateString - Date string to validate
 * @returns {boolean} True if valid YYYY-MM-DD format
 * 
 * @example
 * isValidYYYYMMDD("2025-09-11") // true
 * isValidYYYYMMDD("11/09/2025") // false
 */
export const isValidYYYYMMDD = (dateString: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = dayjs(dateString, 'YYYY-MM-DD', true);
  return date.isValid();
};

export default {
  getCurrentDateFormatted,
  formatDateToYYYYMMDD,
  getCurrentTimestamp,
  isValidYYYYMMDD,
};