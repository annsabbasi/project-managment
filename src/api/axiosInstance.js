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
            try {
                const { data } = await axiosInstance.post(`/user/refresh-token`, { token: refreshToken });
                localStorage.setItem('accessToken', data?.accessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                console.log("This is the axiosInstance RefreshToken Data", data)
                console.log("This is the Authorization Headers", axiosInstance.defaults.headers)
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);



// Try
// console.log("This is the Axios Data", data);
// console.log("Access Token refreshed", data?.data?.accessToken);
// console.log("Access Token refreshed", data.getToken);



// Catch
// console.error('Refresh token failed:', err);
// window.location.href = '/login';
// If refresh token also fails, logout the user;
// console.error('Refresh token expired:', refreshError);
