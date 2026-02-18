import axios from "axios";

// Use Vite-provided environment variable when available.
// Fallback to your Render backend URL so deployed frontend works even if Vercel env isn't set.
const FALLBACK_BACKEND = "https://hrms-lite-backend-6h37.onrender.com";
const API_BASE_URL = import.meta.env.VITE_API_URL || FALLBACK_BACKEND;

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default API;
