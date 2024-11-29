import axios from 'axios';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';

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

            try {
                const { data } = await axiosInstance.post(`/user/refresh-token`, {
                    refreshToken: localStorage.getItem('refreshToken'),
                });
                console.log("This is the Axios Data", data)
                console.log("Access Token refreshed", data?.data?.accessToken)
                // console.log("Access Token refreshed", data.getToken)
                localStorage.setItem('accessToken', data.accessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // console.error('Refresh token failed:', err);
                // window.location.href = '/login';
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

// This is all working fine I am just making it to remain unchanged for my testing purpose
// axiosInstance.interceptors.response.use(
//     response => response,
//     async (error) => {
//         if (error.response && error.response.status === 401) {
//             try {
//                 // Attempt to refresh the access token
//                 const refreshResponse = await axiosInstance.post('/user/refresh-token');
//                 const { accessToken } = refreshResponse.data;
//                 const getToken = refreshResponse.data

//                 console.log("Access Token refreshed", accessToken)
//                 console.log("Access Token refreshed", getToken)
//                 // Save the new access token to localStorage
//                 localStorage.setItem('accessToken', accessToken);

//                 // Retry the original request with the new token
//                 error.config.headers['Authorization'] = `Bearer ${accessToken}`;
//                 return axiosInstance.request(error.config);
//                 // eslint-disable-next-line no-unused-vars
//             } catch (refreshError) {
//                 window.location.href = '/login'
//                 // If refresh fails, navigate to login
//                 // const navigate = useNavigate();
//                 // navigate('/login');
//                 // <Navigate to={'/login'} />
//             }
//         }
//         return Promise.reject(error);
//     }
// );
