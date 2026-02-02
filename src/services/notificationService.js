import api from "./api";

export const getUserNotifications = (userId) => {
    return api.get(`/api/notification/user/${userId}`);
};

export const updateNotificationStatus = (id, status) => {
    return api.put(`/api/notification/${id}/status`, { status });
};
