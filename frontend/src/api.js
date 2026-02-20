import axios from "axios";

// Build-time environment variable (set via VITE_API_URL during build)
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Determine API base URL based on environment
let API_BASE_URL;

if (VITE_API_URL) {
  // Production: use explicitly configured backend URL
  API_BASE_URL = VITE_API_URL;
} else if (typeof window !== 'undefined') {
  // Local development/preview: try common ports
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  
  // Try to detect if we're on localhost or a production domain
  if (hostname.includes('localhost') || hostname === '127.0.0.1') {
    // Local: try port 8001 first (local preview port), then 9000
    API_BASE_URL = `${protocol}//${hostname}:8001`;
  } else {
    // Production: assume API is on same domain, port 80/443
    API_BASE_URL = `${protocol}//${hostname}`;
  }
} else {
  // Fallback
  API_BASE_URL = 'http://localhost:8001';
}

console.log(`[API Config] Using backend URL: ${API_BASE_URL}`);

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add error handler for debugging
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      console.warn(`[API] 404 - Endpoint not found:`, error.response.config.url);
    }
    if (error.message === 'Network Error' && !error.response) {
      console.warn(`[API] Network error - Backend may be unreachable at: ${API_BASE_URL}`);
    }
    return Promise.reject(error);
  }
);

export default API;
