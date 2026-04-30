/**
 * API Configuration
 * Store your API token here (or use environment variables in production)
 */

// IMPORTANT: Replace 'YOUR_API_TOKEN' with your actual token from https://www.thewatchapi.com/register
const API_CONFIG = {
  WATCH_API_TOKEN: '0eHqHueTvODqjA0o7IeqQZd9bHT8lYHogszvsplp'
};

// Initialize Watch API
let watchAPI = null;

function initializeWatchAPI() {
  if (API_CONFIG.WATCH_API_TOKEN === '0eHqHueTvODqjA0o7IeqQZd9bHT8lYHogszvsplp' || !API_CONFIG.WATCH_API_TOKEN) {
    console.warn('Warning: API token not configured. Please set your token in js/api-config.js');
    return false;
  }
  watchAPI = new WatchAPI(API_CONFIG.WATCH_API_TOKEN);
  return true;
}

// Auto-initialize when script loads
if (typeof WatchAPI !== 'undefined') {
  initializeWatchAPI();
}
