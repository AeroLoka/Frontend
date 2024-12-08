import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/",
    timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).token : "";
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use();

export default axiosInstance;
