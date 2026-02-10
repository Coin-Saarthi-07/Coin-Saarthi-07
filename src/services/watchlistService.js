
import api from "./api"; // <-- use your axios instance
import authService from "./authService";

/* GET user watchlist */
export const getMyWatchlist = (userId) => {
  return api.get(`/crypto/watchlist/user/${userId}`);
};

/* ADD to watchlist */
export const addToWatchlist = (data) => {
  return api.post("/crypto/watchlist", data);
};

/* DELETE from watchlist */
export const deleteWatch = (id) => {
  return api.delete(`/crypto/watchlist/${id}`);
};
