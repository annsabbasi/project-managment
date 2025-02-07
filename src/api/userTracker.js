import { axiosInstance } from "./axiosInstance";

export const userCheckIn = async (projectId) => {
    const { data } = await axiosInstance.post('/user/checkIn', { projectId });
    return data;
}

export const userGetElapsedTime = async (projectId) => {
    const { data } = await axiosInstance.get(`/user/getElapsedTime?projectId=${projectId}`);
    if (data.data.isCheckedOut) {
        return { elapsedTime: data.data.totalDuration, isCheckedOut: true };
    }
    // console.log("userTracker Data of userFetElapsedTime", data)
    return data;
}

export const userPauseOrResume = async (projectId) => {
    const response = await axiosInstance.put('/user/pauseOrResume', { projectId });
    // console.log("API Response:", response);
    return response; // Ensure full response is returned
};


export const userCheckOut = async (projectId) => {
    const { data } = await axiosInstance.put('/user/checkOut', { projectId });
    return data;
}

export const userTimeProject = async (projectId) => {
    const { data } = await axiosInstance.get(`/user/getUserTimeProject?projectId=${projectId}`);
    return data;
}

export const usersTimeProject = async (projectId) => {
    const { data } = await axiosInstance.get(`/user/getUsersTimeProject?projectId=${projectId}`);
    return data;
};
// export const usersTimeProject = async (projectId) => {
//     const { data } = await axiosInstance.get('/user/getUsersTimeProject', { params: { projectId } });
//     return data;
// };
