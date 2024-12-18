import axiosInstance from "../api/axiosInstance";

const getFlightById = async (id) => {
    try {
        const response = await axiosInstance.get(`/flights/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export { getFlightById }