import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL: 'http://localhost:6007',
    withCredentials: true,
});



axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refreshToken')
            try {
                const { data } = await axiosInstance.post(`/user/refresh-token`, { token: refreshToken });
                // console.log("This is the Axios Data", data);
                // console.log("Access Token refreshed", data?.data?.accessToken);
                // console.log("Access Token refreshed", data.getToken);
                localStorage.setItem('accessToken', data?.accessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // console.error('Refresh token failed:', err);
                // window.location.href = '/login';
                // If refresh token also fails, logout the user
                // console.error('Refresh token expired:', refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)
