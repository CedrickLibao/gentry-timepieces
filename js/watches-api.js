/**
 * Watch API Module
 * Handles all interactions with thewatchapi.com
 */

class WatchAPI {
  constructor(apiToken) {
    this.apiToken = apiToken;
    this.baseURL = 'https://api.thewatchapi.com/v1';
    this.cache = {}; // Cache results to reduce API calls
  }

  /**
   * Fetch brands list
   * @returns {Promise<Array>} Array of brand names
   */
  async getBrands() {
    if (this.cache.brands) {
      return this.cache.brands;
    }

    try {
      const url = `${this.baseURL}/brand/list?api_token=${this.apiToken}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch brands: ${response.statusText}`);
      }

      const data = await response.json();
      this.cache.brands = data.data || [];
      return this.cache.brands;
    } catch (error) {
      console.error('Error fetching brands:', error);
      return [];
    }
  }

  /**
   * Search for watches by model, brand, material, etc.
   * @param {string} searchQuery - Search query (e.g., "rolex daytona")
   * @param {Object} filters - Additional filters (brand, case_material, case_diameter, movement)
   * @returns {Promise<Array>} Array of watch objects
   */
  async searchWatches(searchQuery, filters = {}) {
    try {
      let url = `${this.baseURL}/model/search?api_token=${this.apiToken}&search=${encodeURIComponent(searchQuery)}`;

      // Add optional filters
      if (filters.brand) {
        url += `&brand=${encodeURIComponent(filters.brand)}`;
      }
      if (filters.case_material) {
        url += `&case_material=${encodeURIComponent(filters.case_material)}`;
      }
      if (filters.case_diameter) {
        url += `&case_diameter=${encodeURIComponent(filters.case_diameter)}`;
      }
      if (filters.movement) {
        url += `&movement=${encodeURIComponent(filters.movement)}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 400) {
          console.warn('Search query might be too broad. Try refining your search.');
        }
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error searching watches:', error);
      return [];
    }
  }

  /**
   * Get models by brand
   * @param {string} brand - Brand name (e.g., "rolex")
   * @returns {Promise<Array>} Array of model names
   */
  async getModelsByBrand(brand) {
    try {
      const url = `${this.baseURL}/model/list?api_token=${this.apiToken}&brand=${encodeURIComponent(brand)}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching models:', error);
      return [];
    }
  }

  /**
   * Get price history for a brand
   * @param {string} brand - Brand name
   * @returns {Promise<Object>} Price history data
   */
  async getBrandPriceHistory(brand) {
    try {
      const url = `${this.baseURL}/brand/price/history?api_token=${this.apiToken}&brand=${encodeURIComponent(brand)}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch price history: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching price history:', error);
      return null;
    }
  }

  /**
   * Get price history for a watch model
   * @param {string} model - Model name (e.g., "Rolex Daytona")
   * @returns {Promise<Object>} Price history data
   */
  async getModelPriceHistory(model) {
    try {
      const url = `${this.baseURL}/model/price/history?api_token=${this.apiToken}&model=${encodeURIComponent(model)}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch model price history: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching model price history:', error);
      return null;
    }
  }

  /**
   * Search reference numbers
   * @param {string} searchQuery - Reference number to search
   * @returns {Promise<Array>} Array of reference objects
   */
  async searchReferences(searchQuery) {
    try {
      const url = `${this.baseURL}/reference/search?api_token=${this.apiToken}&search=${encodeURIComponent(searchQuery)}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to search references: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error searching references:', error);
      return [];
    }
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache = {};
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WatchAPI;
}
