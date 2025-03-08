/**
 * Validates an email address
 * @param email The email address to validate
 * @returns boolean indicating if the email is valid
 */
export function validateEmail(email: string): boolean {
  if (!email) return false;
  
  // RFC 5322 compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

/**
 * Validates a phone number
 * @param phone The phone number to validate
 * @returns boolean indicating if the phone number is valid
 */
export function validatePhone(phone: string): boolean {
  if (!phone) return false;
  
  // Accepts formats:
  // +1 (555) 555-5555
  // 1-555-555-5555
  // 555-555-5555
  // 5555555555
  const phoneRegex = /^(\+?\d{1,3}[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
}

/**
 * Validates a date string
 * @param date The date string to validate
 * @returns boolean indicating if the date is valid and not in the past
 */
export function validateDate(date: string): boolean {
  if (!date) return false;
  
  const inputDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return inputDate >= today && !isNaN(inputDate.getTime());
}

/**
 * Validates required fields in a form data object
 * @param data Object containing form field values
 * @param requiredFields Array of required field names
 * @returns Object with validation errors, if any
 */
export function validateRequiredFields(
  data: Record<string, any>,
  requiredFields: string[]
): Record<string, string> {
  const errors: Record<string, string> = {};
  
  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      errors[field] = `${field} is required`;
    }
  }
  
  return errors;
}

/**
 * Validates the length of a string
 * @param value The string to validate
 * @param min Minimum length
 * @param max Maximum length
 * @returns boolean indicating if the string length is within range
 */
export function validateLength(value: string, min: number, max: number): boolean {
  if (!value) return min === 0;
  return value.length >= min && value.length <= max;
} 