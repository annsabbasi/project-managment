import { axiosInstance } from "./axiosInstance"



export const userCheckIn = async (projectId) => {
    const { data } = await axiosInstance.post('/user/checkIn', { projectId })
    // console.log("userCheckIn (userTracker), api Frontend", data.data)
    return data;
}


export const userGetElapsedTime = async (projectId) => {
    // const { data } = await axiosInstance.get('/user/getElapsedTime')
    const { data } = await axiosInstance.get(`/user/getElapsedTime?projectId=${projectId}`)
    if (data.data.isCheckedout) {
        return { elapsedTime: data.data.totalDuration, isCheckedout: true }
    }
    // console.log("(getElapsedTime), api Frontend", data.data)
    return data;
}


export const userPauseOrResume = async (projectId) => {
    const { data } = await axiosInstance.put('/user/pauseOrResume', { projectId })
    // console.log("userCheckIn (getElapsedTime), api Frontend", data)
    return data;
}


export const userCheckOut = async (projectId) => {
    const { data } = await axiosInstance.put('/user/checkOut', { projectId });
    // console.log("userCheckOut (api Frontend)", data);
    return data;
};


export const userTimeProject = async (projectId) => {
    const { data } = await axiosInstance.get(`/user/getUserTimeProject?projectId=${projectId}`);
    return data;
};


export const usersTimeProject = async (projectId) => {
    const { data } = await axiosInstance.get('/user/getUsersTimeProject', { projectId });
    return data;
};
