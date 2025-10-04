// Updated: Now uses DOMPurify for strong XSS protection
import DOMPurify from "dompurify";

/**
 * Sanitize a string to remove any malicious HTML or scripts.
 * @param {string} value - Input string to sanitize
 * @returns {string} - Safe, sanitized string
 */
export const sanitizeString = (value = "") => {
    if (value === null || value === undefined) return "";
    return DOMPurify.sanitize(String(value).trim(), { USE_PROFILES: { html: true } });
};