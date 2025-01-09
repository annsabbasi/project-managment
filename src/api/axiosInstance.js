import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:6007', // Adjust this if needed
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response, // Pass through successful responses
    async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('refreshToken');
        const role = localStorage.getItem('role'); // 'user' or 'company'

        // Handle Unauthorized (401) errors
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (error.response.data?.message === "Refresh Token Expired") {
                localStorage.clear(); // Clear all session storage
                window.location.href = '/login'; // Redirect to login page
                return Promise.reject(error);
            }

            try {
                // Determine refresh token endpoint based on role
                const refreshEndpoint = role === 'company' 
                    ? '/company/refresh-token' 
                    : '/user/refresh-token';

                // Request new access token
                const { data } = await axiosInstance.post(refreshEndpoint, { token: refreshToken });

                // Update localStorage and Axios headers with the new token
                localStorage.setItem('accessToken', data?.accessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

                // Retry the original request with the new token
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Handle failed token refresh
                localStorage.clear(); // Clear all session storage
                window.alert("Your session has expired. Please log in again.");
                window.location.href = '/login'; // Redirect to login page
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
