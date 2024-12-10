import axiosInstance from "../api/axiosInstance";

const getAllFlights = async (queryParams) => {
    try {
        const response = await axiosInstance.get("/flights", {
            params: queryParams,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export { getAllFlights }