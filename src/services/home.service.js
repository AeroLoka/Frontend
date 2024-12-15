import axiosInstance from "../api/axiosInstance";

const getAllFlights = async (data) => {
    try {
        const response = await axiosInstance.get("/flights", { params: data });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export { getAllFlights }