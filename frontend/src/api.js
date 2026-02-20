import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-lite-backend-6h37.onrender.com"
});

export default API;