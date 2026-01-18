const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

/**
 * Handles HTTP errors and throws meaningful error messages
 * @param {Response} response - Fetch response object
 * @returns {Promise<Response>} - Response if successful
 * @throws {Error} - Error with message from response or default message
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }
  return response;
};

/**
 * Service class for bakery API operations
 * Uses native fetch API instead of external libraries
 */
class BakeryService {
  /**
   * Get all bakeries
   * @returns {Promise<Array>} - Array of bakery objects
   */
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/bakeries`);
    const checkedResponse = await handleResponse(response);
    return checkedResponse.json();
  }

  /**
   * Get a single bakery by ID
   * @param {string} id - Bakery ID
   * @returns {Promise<Object>} - Bakery object
   */
  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/bakeries/${id}`);
    const checkedResponse = await handleResponse(response);
    return checkedResponse.json();
  }

  /**
   * Create a new bakery
   * @param {Object} bakery - Bakery data object
   * @returns {Promise<Object>} - Created bakery object
   */
  async create(bakery) {
    const response = await fetch(`${API_BASE_URL}/bakeries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bakery),
    });
    const checkedResponse = await handleResponse(response);
    return checkedResponse.json();
  }

  /**
   * Update an existing bakery
   * @param {string} id - Bakery ID
   * @param {Object} bakery - Updated bakery data
   * @returns {Promise<Object>} - Updated bakery object
   */
  async update(id, bakery) {
    const response = await fetch(`${API_BASE_URL}/bakeries/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bakery),
    });
    const checkedResponse = await handleResponse(response);
    return checkedResponse.json();
  }

  /**
   * Delete a bakery
   * @param {string} id - Bakery ID
   * @returns {Promise<Object>} - Deletion confirmation object
   */
  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/bakeries/${id}`, {
      method: 'DELETE',
    });
    const checkedResponse = await handleResponse(response);
    return checkedResponse.json();
  }
}

export const bakeryService = new BakeryService();
