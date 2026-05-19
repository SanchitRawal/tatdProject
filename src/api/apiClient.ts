import axios from 'axios';

const BASE_URL = 'https://www.tatd.in/app-api/driver/trusted-driver';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor — global error handling
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    let errorMessage = 'Something went wrong. Please try again.';

    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timed out. Please check your connection.';
    } else if (!error.response) {
      errorMessage = 'Network error. Please check your internet connection.';
    } else {
      switch (error.response.status) {
        case 400:
          errorMessage = error.response.data?.message || 'Invalid request.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please login again.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage =
            error.response.data?.message || 'An unexpected error occurred.';
      }
    }

    const enhancedError = new Error(errorMessage);
    (enhancedError as any).originalError = error;
    return Promise.reject(enhancedError);
  },
);

export default apiClient;
