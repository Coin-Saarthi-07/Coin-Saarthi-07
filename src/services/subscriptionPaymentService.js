import axios from "./axiosInstance";

export const createOrder = (userId, planId) => {
  return axios.post("/api/payments/subscription/order", null, {
    params: {
      userId,
      planId,
      paymentMethod: "UPI"
    }
  });
};

export const verifyPayment = (data) => {
  return axios.post("/api/payments/subscription/verify", data);
};
