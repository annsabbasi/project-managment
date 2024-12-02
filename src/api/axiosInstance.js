import axios from 'axios';



export const axiosInstance = axios.create({
    baseURL: 'http://localhost:6007',
    withCredentials: true,
});




// Used To Get and Refresh The Token To Access Protected Routes
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { data } = await axiosInstance.post(`/user/refresh-token`, {
                    refreshToken: localStorage.getItem('refreshToken'),
                });
                // console.log("Access Token refreshed", data?.data?.accessToken)
                localStorage.setItem('accessToken', data.accessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // If refresh token also fails, logout the user
                console.error('Refresh token expired:', refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
)