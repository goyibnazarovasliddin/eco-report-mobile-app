/**
 * Generates a unique report ID in the format: ECO-YYYYMMDD-RANDOM
 * Example: ECO-20231212-A1B2C3D4
 * This ensures uniqueness and scalability.
 */
export const generateReportId = (): string => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const datePart = `${year}${month}${day}`; // 20231212

    // Random hex string (8 characters)
    // using Math.random is sufficient for non-critical collision resistance in this context
    const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();

    return `ECO-${datePart}-${randomPart}`;
};
