import axios from "axios";

const API_URL = "http://localhost:8080/crypto/admin";

const getAuthHeader = () => {
  const stored = sessionStorage.getItem("user");

  if (!stored) {
    console.error("❌ No user in localStorage");
    return {};
  }

  const user = JSON.parse(stored);

  if (!user.token) {
    console.error("❌ Token missing in user object:", user);
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  };
};

export const fetchUsers = () => {
  return axios.get(API_URL, getAuthHeader());
};

export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`, getAuthHeader());
};


export const updateUser = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data, getAuthHeader());
};
