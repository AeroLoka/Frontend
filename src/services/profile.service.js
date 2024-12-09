import axiosInstance from "../api/axiosInstance";


const getUserById = async (id) => {
    try {
        const response = await axiosInstance.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const updateUser = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/users/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

const deleteUser = async (id) => {
    try {
        const response = await axiosInstance.delete(`/users/${id}`);
        return response
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export { getUserById, updateUser, deleteUser };
