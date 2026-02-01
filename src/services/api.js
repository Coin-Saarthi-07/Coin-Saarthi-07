import axios from "axios";
import authService from "./authService";

const api = axios.create({
  baseURL: "http://localhost:8080",

});

api.interceptors.request.use((config) => {

  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

