import axios from "axios";

// Automatically use your backend URL or fallback to local development
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://your-backend-name.onrender.com/api"; // 🔹 Replace with your actual Render backend URL

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // allow cookies/JWT if you enable credentials in backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
