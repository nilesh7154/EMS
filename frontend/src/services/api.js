import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Helper to extract human-readable error messages from Axios responses
 */
export function getErrorMessage(error) {
  if (!error) return 'An unexpected error occurred.';
  
  if (error.response?.data) {
    const data = error.response.data;
    // Spring Boot validation errors map
    if (data.validationErrors && Object.keys(data.validationErrors).length > 0) {
      return Object.values(data.validationErrors).join('. ');
    }
    if (data.message) {
      return data.message;
    }
    if (typeof data === 'string') {
      return data;
    }
  }

  if (error.message === 'Network Error') {
    return 'Unable to reach backend server. Please check if the Spring Boot service is running.';
  }

  if (error.code === 'ECONNABORTED') {
    return 'Server request timed out. Please try again.';
  }

  return error.message || 'Something went wrong.';
}

export default api;
