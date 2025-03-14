import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:6007', // Adjust this if needed
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response, // Pass through successful responses
    async (error) => {
        const originalRequest = error.config;

        // Retrieve role and corresponding refresh token
        const role = localStorage.getItem('role'); // 'user' or 'company'
        const refreshToken = role === 'admin' 
            ? localStorage.getItem('refreshTokenC') 
            : localStorage.getItem('refreshToken');

        // Handle Unauthorized (401) errors
        if (error.response?.status === 401 && !originalRequest._retry) {
            console.log('i am here');
            originalRequest._retry = true;

            // Check for refresh token expiration
            if (error.response.data?.message === "Refresh Token Expired") {
                localStorage.clear(); // Clear all session storage
                window.location.href = '/login'; // Redirect to login page
                return Promise.reject(error);
            }
            
            try {
                // Determine refresh token endpoint based on role
                const refreshEndpoint = role === 'admin' 
                    ? '/company/refresh-token' 
                    : '/user/refresh-token';

                // Request new access token
                const { data } = await axiosInstance.post(refreshEndpoint, { token: refreshToken });

                if(role === 'admin'){                    
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    // Store new access token and update Axios headers
                    localStorage.setItem('accessTokenC', data?.accessToken);
                } else{
                    localStorage.removeItem('accessTokenC');
                    localStorage.removeItem('refreshTokenC');
                    // Store new access token and update Axios headers
                    localStorage.setItem('accessToken', data?.accessToken);
                }
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                console.log('orignal request', originalRequest.headers['Authorization']);
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
