import axiosInstance from "../api/axiosInstance";

const login = async (data) => {
    try {
        const response = await axiosInstance.post("/login", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const register = async (data) => {
    try {
        const response = await axiosInstance.post("/register", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export { login, register };
