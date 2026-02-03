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
    sessionStorage.setItem(TOKEN_KEY, res.data.token);

    const userData = {
      token: res.data.token,
      userId: res.data.userId,
      userName: res.data.userName,
      role: res.data.role // USER / ADMIN / SUBSCRIBER
    };

    sessionStorage.setItem(USER_KEY, JSON.stringify(userData));
  }

  return res.data;
};

/* CLEAR SUBSCRIPTION DATA */
const clearSubscriptionData = () => {
  // Clear subscription-related data from localStorage
  localStorage.removeItem('subscribedPlans');
  localStorage.removeItem('subscribedUserId');
  localStorage.removeItem('paymentSuccess');
  
  // Clear any other subscription/payment related data
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.includes('razorpay') || key.includes('subscription') || key.includes('payment'))) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key));
};

/* LOGOUT */

const logout = () => {
  // Clear all user session data
  sessionStorage.clear();
  
  // Clear subscription data
  clearSubscriptionData();
  
  // window.location.href = "/login"; // Handled by Context/Component
};

/* TOKEN */
const getToken = () => sessionStorage.getItem(TOKEN_KEY);

/* CURRENT USER */
const getCurrentUser = () => {
  try {
    const user = sessionStorage.getItem(USER_KEY);
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
  clearSubscriptionData,
  // isSubscriber

};

