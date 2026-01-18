/**
 * Utility functions for social media URLs
 * Pure functions with no side effects
 */

/**
 * Converts an Instagram handle to a full URL
 * @param {string} handle - Instagram handle (with or without @)
 * @returns {string|null} - Full Instagram URL or null if handle is invalid
 */
export const getInstagramUrl = (handle) => {
  if (!handle) return null;
  const cleanHandle = handle.replace('@', '').trim();
  if (!cleanHandle) return null;
  return `https://instagram.com/${cleanHandle}`;
};
