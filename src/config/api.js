import axios from "axios";
import { BACKEND_URL } from "./index";

const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    async (response) => {
        const _response = response.data;

        if (_response?.data) {
            const { accessToken, refreshToken } = _response.data;

            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
            }

            if (refreshToken) {
                localStorage.setItem("refreshToken", refreshToken);
            }
        }

        if (_response?.statusCode !== 200) {
            throw new Error(_response.message);
        }

        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newToken = await refreshToken();
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;

/*
 * Support functions
 */
const refreshToken = async () => {
    try {
        const response = await axiosInstance.post("/refresh-token", {});
        if (response.status !== 200) {
            //TODO: clear local storage
            localStorage.clear();
            throw new Error("Error refreshing token");
        }
        const newToken = response.data.accessToken;
        localStorage.setItem("accessToken", newToken);
        return newToken;
    } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
    }
};
