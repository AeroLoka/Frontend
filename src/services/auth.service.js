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

const forgetPassword = async (data) => {
    try {
        const response = await axiosInstance.post("/forget-password", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const resetPassword = async(token, data)=> {
    try {
        const response = await axiosInstance.post(`/reset-password?token=${token}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export { login, register, forgetPassword, resetPassword };
