import axios from "axios";
import authService from "./authService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // ⚠️ adjust if needed
  headers: {
    "Content-Type": "application/json"
  }
});

// Optional: attach token automatically
axiosInstance.interceptors.request.use((config) => {
  const user = authService.getCurrentUser();
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default axiosInstance;
