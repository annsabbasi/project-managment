import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { RouteNames } from '../Constants/route';


export const axiosInstance = axios.create({
    baseURL: 'http://localhost:6007',
    withCredentials: true,
});


// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const { data } = await axiosInstance.post(`/user/refresh-token`, {
//                     refreshToken: localStorage.getItem('refreshToken'),
//                 });
//                 localStorage.setItem('accessToken', data.accessToken);
//                 localStorage.setItem('refreshToken', data.refreshToken);
//                 axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
//                 console.log("This is data", data)
//                 return axiosInstance(originalRequest);
//             } catch (refreshError) {
//                 console.error("Error refreshing access token", refreshError);

//                 // Clear stored tokens and navigate to login
//                 localStorage.removeItem('accessToken');
//                 localStorage.removeItem('refreshToken');

//                 window.location.href = '/login';
//                 return Promise.reject(refreshError);
//             }
//         }

//         // Redirect to login if not authenticated
//         if (error.response?.status === 403 || error.response?.status === 401) {
//             localStorage.removeItem('accessToken');
//             localStorage.removeItem('refreshToken');
//             window.location.href = '/login';
//         }
//         console.log("Error last", error)
//         return Promise.reject(error);
//     }
// );


axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('refreshToken');

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (error.response.data?.message === "Refresh Token Expired") {
                // Clear tokens and redirect to login
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                const { data } = await axiosInstance.post(`/user/refresh-token`, { token: refreshToken });
                localStorage.setItem('accessToken', data?.accessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                console.log("TokenRefresh Successfully", data?.accessToken)
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.log("Error refreshing token:", refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                // window.alert("Your session has expired. Please log in again.");
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);




// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         // const navigate = useNavigate();
//         const originalRequest = error.config;
//         const refreshToken = localStorage.getItem('refreshToken');

//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const { data } = await axiosInstance.post(`/user/refresh-token`, { token: refreshToken });
//                 localStorage.setItem('accessToken', data?.accessToken);
//                 axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
//                 console.log("This is the axiosInstance RefreshToken Data", data)
//                 // console.log("This is the Authorization Headers", axiosInstance.defaults.headers)
//                 return axiosInstance(originalRequest);
//             } catch (refreshError) {
//                 console.log("This is error from (axiosInstance) Frontend", error)
//                 localStorage.removeItem('accessToken');
//                 localStorage.removeItem('refreshToken');

//                 // if (refreshError) {
//                 //     navigate(`/${RouteNames.LOGIN}`)
//                 // }
//                 window.location.href = '/login';
//                 return Promise.reject(refreshError);
//             }
//         }
//         return Promise.reject(error);
//     }
// );
