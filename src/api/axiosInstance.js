import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL: 'http://localhost:6007',
    withCredentials: true,
});


axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('refreshToken');

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (error.response.data?.message === "Refresh Token Expired") {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(error);
            }
            
            try {
                const { data } = await axiosInstance.post(`/user/refresh-token`, { token: refreshToken });
                localStorage.setItem('accessToken', data?.accessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                console.log("Original Request of Headers", originalRequest.headers['Authorization']);
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.alert("Your session has expired. Please log in again.");
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
