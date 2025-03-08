/**
 * Sanitizes input string by removing potentially harmful characters and HTML tags
 * @param input The input string to sanitize
 * @returns The sanitized string
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // Convert to string if not already
  const str = String(input);
  
  // Remove HTML tags
  const withoutTags = str.replace(/<[^>]*>/g, '');
  
  // Remove special characters that could be used for XSS
  const sanitized = withoutTags
    .replace(/[&<>"'`=]/g, '')
    // Replace multiple spaces with single space
    .replace(/\s+/g, ' ')
    // Trim whitespace
    .trim();
  
  return sanitized;
}

/**
 * Sanitizes an object's string properties recursively
 * @param obj The object to sanitize
 * @returns A new object with sanitized string properties
 */
export function sanitizeObject<T extends object>(obj: T): T {
  const result = {} as T;
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[key as keyof T] = sanitizeInput(value) as T[keyof T];
    } else if (value && typeof value === 'object') {
      result[key as keyof T] = sanitizeObject(value) as T[keyof T];
    } else {
      result[key as keyof T] = value as T[keyof T];
    }
  }
  
  return result;
} 