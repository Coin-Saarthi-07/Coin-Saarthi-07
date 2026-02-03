// services/adminSubscriptionService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/subscriptions/plan";

export const createSubscription = (data) => {
  const token = sessionStorage.getItem("token");

  return axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};
