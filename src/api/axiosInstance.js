import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:6007',
    withCredentials: true,
});

// Interceptor to handle token refresh
axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            try {
                // Attempt to refresh the access token
                const refreshResponse = await axiosInstance.get('/user/refresh-token');
                const { accessToken } = refreshResponse.data;

                // Save the new access token to localStorage
                localStorage.setItem('accessToken', accessToken);

                // Retry the original request with the new token
                error.config.headers['Authorization'] = `Bearer ${accessToken}`;
                return axiosInstance.request(error.config);
                // eslint-disable-next-line no-unused-vars
            } catch (refreshError) {
                // If refresh fails, navigate to login
                const navigate = useNavigate();
                navigate('/login');
            }
        }
        return Promise.reject(error);
    }
);
