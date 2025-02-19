import { axiosInstance } from './axiosInstance';

// Fetch Screenshots by Project ID
export const getScreenshots = async (projectId) => {
    const { data } = await axiosInstance.get(`/user/get-user-screenshots?projectId=${projectId}`);
    console.log("getScreenShots", data)
    return data.data;
};

// Fetch User Tracker Status
// export const getAllUserScreenShot = async (projectId) => {
//     const { data } = await axiosInstance.get(`/user/get-user-screenshots?projectId=${projectId}`);
//     console.log("getUserTrackerStatus", data)
//     return data.data;
// };

export const getAllUserScreenShot = async (projectId) => {
    const { data } = await axiosInstance.get(`/user/get-all-screenshots?projectId=${projectId}`);
    console.log("getAllUserScreenShot", data)
    return data.data;
};
