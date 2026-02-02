import api from "./api";

export const fetchAllPlans = () => {
  return api.get("/api/subscriptions/allplan");
};

export const subscribeUserToPlan = (userId, planId) => {
  return api.post(
    `/api/subscriptions/subscribe?userId=${userId}&planId=${planId}`
  );
};

export const fetchUserSubscriptions = (userId) => {
  return api.get(`/api/subscriptions/user/${userId}`);
};
