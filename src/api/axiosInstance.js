import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:6007',
    withCredentials: true,
});

// Intercept responses to handle token refresh
axiosInstance.interceptors.response.use(
    (response) => response, // Pass through if the response is successful
    async (error) => {
        const originalRequest = error.config;

        // If the error is a 401 and it's not a retry, attempt to refresh the token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Call the refresh token endpoint
                const res = await axiosInstance.post(`/user/refresh-token`);

                // Update the headers with the new access token
                const getToken = res.data?.accessToken;
                localStorage.setItem('accessToken', getToken);
                console.log("This is the accessToken", getToken)
                originalRequest.headers['Authorization'] = `Bearer ${getToken}`;

                // Retry the original request with the new token
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
                // Optionally handle logout or redirect to login
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;










// import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// export const axiosInstance = axios.create({
//     baseURL: 'http://localhost:6007',
//     withCredentials: true,
// });

// // Interceptor to handle token refresh
// axiosInstance.interceptors.response.use(
//     response => response,
//     async (error) => {
//         if (error.response && error.response.status === 401) {
//             try {
//                 // Attempt to refresh the access token
//                 const refreshResponse = await axiosInstance.post('/user/refresh-token');
//                 const { accessToken } = refreshResponse.data;
//                 console.log("Thisi s the accessToken from axiosInstance", accessToken)
//                 // Save the new access token to localStorage
//                 localStorage.setItem('accessToken', accessToken);

//                 // Retry the original request with the new token
//                 error.config.headers['Authorization'] = `Bearer ${accessToken}`;
//                 return axiosInstance.request(error.config);
//                 // eslint-disable-next-line no-unused-vars
//             } catch (error) {
//                 // If refresh fails, navigate to login
//                 // const navigate = useNavigate();
//                 // navigate('/login');
//                 console.log("This error is from the axiosInstance", error)
//             }
//         }
//         return Promise.reject(error);
//     }
// );
