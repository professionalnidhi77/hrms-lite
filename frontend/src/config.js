// Runtime config - read from window object that's injected by server
window.API_CONFIG = window.API_CONFIG || {
  baseURL: import.meta.env.VITE_API_URL || '/api'
};

export const API_BASE_URL = window.API_CONFIG.baseURL;
