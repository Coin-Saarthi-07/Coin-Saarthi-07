import axios from "axios";

const TOKEN_KEY = "token";
const USER_KEY = "user";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // ✅ SPRING BOOT
});

/* REGISTER */
const register = async (data) => {
  return api.post("/auth/register", data);
};

/* LOGIN */
const login = async (credentials) => {
  const res = await api.post("/auth/login", credentials);

  if (res.data?.token) {
    localStorage.setItem(TOKEN_KEY, res.data.token);

    const userData = {
      userId: res.data.userId,
      userName: res.data.userName,
      role: res.data.role // USER / ADMIN / SUBSCRIBER
    };

    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  }

  return res.data;
};

/* LOGOUT */
const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/login";
};

/* TOKEN */
const getToken = () => localStorage.getItem(TOKEN_KEY);

/* CURRENT USER */
const getCurrentUser = () => {
  try {
    const user = localStorage.getItem(USER_KEY);
    if (!user) return null;
    return JSON.parse(user);
  } catch {
    return null;
  }
};

/* USER ID */
const getUserId = () => {
  const user = getCurrentUser();
  return user ? user.userId : null;
};

/* AUTH CHECK */
const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  } catch {
    return false;
  }
};

/* ROLE CHECKS */
const hasRole = (role) => {
  try {
    const user = getCurrentUser();
    return user?.role === role;
  } catch {
    return false;
  }
};

const isAdmin = () => hasRole("ADMIN");
const isSubscriber = () => hasRole("SUBSCRIBER");

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getUserId,
  getToken,
  isAuthenticated,
  isAdmin,
  isSubscriber
};
