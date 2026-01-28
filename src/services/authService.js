
import axios from "axios";

const TOKEN_KEY = "token";
const USER_KEY = "user";
const ROLE_CLAIM =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";


const api = axios.create({
  baseURL: "https://localhost:7294/crypto",
});

/* REGISTER */
const register = async (data) => {
  await api.post("/auth/register", data);
};

/* LOGIN */
const login = async (credentials) => {
  const res = await api.post("/auth/login", credentials);

  if (res.data?.token) {
    localStorage.setItem(TOKEN_KEY, res.data.token);

    const userData = {
      userId: res.data.userId,
      userName: res.data.userName,
      role: res.data.role
    };

    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  }

  return res.data;
};
const isAdmin = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.[ROLE_CLAIM] === "1";
  } catch {
    return false;
  }
};




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
    if (!user || user === "undefined") return null;
    return JSON.parse(user);
  } catch {
    return null;
  }
};
/* USER ID (FOR ALERT ONLY) */
const getUserId = () => {
  const user = getCurrentUser();
  return user ? user.userId : null;
};


/* AUTH CHECK */
// const isAuthenticated = () => {
//   return !!(getToken() && getCurrentUser());
// };
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);

    return payload.exp > now;
  } catch {
    return false;
  }
};


export default {
  register,
  login,
  logout,
  getCurrentUser,
  getUserId,
  getToken,
  isAuthenticated,
  isAdmin
};


