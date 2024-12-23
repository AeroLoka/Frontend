import axiosInstance from "../api/axiosInstance";

const getAllFlights = async (data) => {
    try {
        const response = await axiosInstance.get("/flights", { params: data });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const getFlights = async (data) => {
    try {
        const response = await axiosInstance.get("/search-flights", { params: data });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

const getAllNotificationByUser = async (email) => {
    try {
        const response = await axiosInstance.get(`/notifications/${email}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

const markNotificationRead = async (id) => {
    try {
        const response = await axiosInstance.put(`/notifications/read/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export { getAllFlights, getFlights, getAllNotificationByUser, markNotificationRead }