import axios from "axios";
import authService from "./authService";

const API = "https://localhost:7294/api/WatchList";

export const getMyWatchlist = async (userId) => {
  const token = authService.getToken();
  return axios.get(`${API}/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteWatch = async (id) => {
  const token = authService.getToken();
  return axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const addToWatchlist = async (data) => {
  const token = authService.getToken();
  return axios.post(API, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
