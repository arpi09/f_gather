const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Handles HTTP errors
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }
  return response;
};

/**
 * Service class for scraping operations
 */
class ScrapingService {
  /**
   * Scrape a single bakery
   * @param {string} bakeryId - Bakery ID
   * @returns {Promise<Object>} - Scraping results
   */
  async scrapeBakery(bakeryId) {
    const response = await fetch(`${API_BASE_URL}/scraping/bakery/${bakeryId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const checkedResponse = await handleResponse(response);
    return checkedResponse.json();
  }

  /**
   * Scrape all bakeries
   * @returns {Promise<Object>} - Scraping results for all bakeries
   */
  async scrapeAll() {
    const response = await fetch(`${API_BASE_URL}/scraping/all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const checkedResponse = await handleResponse(response);
    return checkedResponse.json();
  }
}

export const scrapingService = new ScrapingService();
