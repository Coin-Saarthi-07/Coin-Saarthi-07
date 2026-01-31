
// import axios from "axios";

// const TOKEN_KEY = "token";
// const USER_KEY = "user";

// const api = axios.create({
//   baseURL: "https://localhost:7294/crypto",
// });


// const register = async (data) => {
//   try {
//     await api.post("/auth/register", data);
//   } catch (err) {
//     throw err; // IMPORTANT – let controller message come to UI
//   }
// };


// /* LOGIN */
// const login = async (credentials) => {
//   try {
//     const res = await api.post("/auth/login", credentials);
    
//     if (res.data?.token) {
//       localStorage.setItem(TOKEN_KEY, res.data.token);
      
//       // Decode JWT token to extract user data
//       const payload = JSON.parse(atob(res.data.token.split('.')[1]));
//       const userData = {
//         username: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || payload.username,
//         role: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload.role || 'User'
//       };
      
//       localStorage.setItem(USER_KEY, JSON.stringify(userData));
//     }
    
//     return res.data;
//   } catch (error) {
//     if (error.code === 'ERR_NETWORK' || error.message.includes('ERR_EMPTY_RESPONSE')) {
//       throw new Error('Backend server is not running. Please start the server and try again.');
//     }
//     throw error;
//   }
// };

// /* LOGOUT */
// const logout = () => {
//   localStorage.removeItem(TOKEN_KEY);
//   localStorage.removeItem(USER_KEY);
// };

// /* TOKEN */
// const getToken = () => localStorage.getItem(TOKEN_KEY);

// /* SAFE CURRENT USER */
// const getCurrentUser = () => {
//   try {
//     const user = localStorage.getItem(USER_KEY);
//     if (!user || user === "undefined") return null;
//     return JSON.parse(user);
//   } catch (error) {
//     return null;
//   }
// };

// /* AUTH CHECK */
// const isAuthenticated = () => {
//   return !!(getToken() && getCurrentUser());
// };

// export default {
//   register,
//   login,
//   logout,
//   getCurrentUser,
//   getToken,
//   isAuthenticated,
// };
import axios from "axios";

const TOKEN_KEY = "token";
const USER_KEY = "user";

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

// /* LOGOUT */
// const logout = () => {
//   localStorage.removeItem(TOKEN_KEY);
//   localStorage.removeItem(USER_KEY);
//   window.location.href = "/login";
// };
/* LOGOUT — FULL CLEAN */
// const logout = () => {

//   // Auth
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");

//   // Watchlist / alerts
//   localStorage.removeItem("newWatchlistItem");
//   localStorage.removeItem("paymentSuccess");

//   // Any cached API data
//   localStorage.removeItem("watchlist");
//   localStorage.removeItem("alerts");
//   localStorage.removeItem("subscription");
//   localStorage.removeItem("plan");

//   // Completely reset browser session (safest)
//   sessionStorage.clear();

//   // Hard redirect (clears React memory too)
//   window.location.replace("/login");
// };

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
  getToken,
  isAuthenticated,
};

