// Small, dependency-free sanitizer that escapes HTML special characters
// and trims whitespace. This prevents basic stored XSS when rendering
// values as text (not for rich HTML rendering - for that use DOMPurify).

export const escapeHTML = (unsafe = "") => {
    return String(unsafe)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
};

export const sanitizeString = (value = "") => {
    if (value === null || value === undefined) return "";
    return escapeHTML(String(value).trim());
};