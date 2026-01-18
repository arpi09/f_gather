/**
 * Pure utility functions for bakery business logic
 * Separated from components to keep them presentational
 */

/**
 * Get status chip configuration based on semlor status
 * @param {string} status - Semlor status (confirmed/unknown/not_available)
 * @param {Object} labels - Custom labels
 * @returns {Object} - Chip configuration
 */
export const getStatusChipConfig = (status = 'unknown', labels = {}) => {
  const defaultLabels = {
    confirmed: 'Has Semlor ✓',
    unknown: 'Semlor Status Unknown',
    notAvailable: 'No Semlor',
  };

  const chipLabels = { ...defaultLabels, ...labels };

  switch(status) {
    case 'confirmed':
      return {
        label: chipLabels.confirmed,
        color: 'success',
        variant: 'filled',
      };
    case 'not_available':
      return {
        label: chipLabels.notAvailable,
        color: 'error',
        variant: 'outlined',
      };
    case 'unknown':
    default:
      return {
        label: chipLabels.unknown,
        color: 'default',
        variant: 'outlined',
        showIcon: true,
      };
  }
};

/**
 * Determine if a bakery should show the scrape button
 * @param {Object} bakery - Bakery object
 * @returns {boolean}
 */
export const shouldShowScrapeButton = (bakery) => {
  return (
    bakery.semlorStatus === 'unknown' &&
    (bakery.website || bakery.instagramHandle)
  );
};

/**
 * Format last scraped date
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted date string
 */
export const formatLastScraped = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString();
};
