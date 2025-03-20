import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL: "https://hr-managment-git-main-annasabbasis-projects.vercel.app",
    baseURL: "http://localhost:6007",
    withCredentials: true,
});

// Add a request interceptor to include access token
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the request fails with 401 (Unauthorized) and it hasn't been retried
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Get refresh token from localStorage
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) throw new Error("No refresh token available");

                // Request a new access token
                const { data } = await axiosInstance.post("/user/refreshToken",
                    // "https://hr-managment-git-main-annasabbasis-projects.vercel.app/user/refresh-token",
                    { refreshToken },
                    { withCredentials: true }
                );

                console.log("Data of Refresh-Token data", data)
                // Save new tokens to localStorage
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);

                // Update request with new access token
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

                // Retry the original request with the new token
                return axiosInstance(originalRequest);
            } catch (err) {
                console.error("Refresh token failed", err);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login"; // Redirect to login if refresh fails
            }
        }

        return Promise.reject(error);
    }
);