import { axiosInstance } from "./axiosInstance"



export const userCheckIn = async (timeEntry) => {
    const { data } = await axiosInstance.post('/user/checkIn', { timeEntry })
    // console.log("userCheckIn (userTracker), api Frontend", data.data)
    return data;
}


export const userGetElapsedTime = async () => {
    const { data } = await axiosInstance.get('/user/getElapsedTime')
    // console.log("(getElapsedTime), api Frontend", data)
    return data;
}


export const userPauseOrResume = async (timeEntry) => {
    const { data } = await axiosInstance.put('/user/pauseOrResume', { timeEntry })
    console.log("userCheckIn (getElapsedTime), api Frontend", data)
    return data;
}


export const userCheckOut = async () => {
    const { data } = await axiosInstance.put('/user/checkOut');
    console.log("userCheckOut (api Frontend)", data);
    return data;
};

// export const userCheckOut = async (timeEntry) => {
//     const { data } = await axiosInstance.put('/user/checkOut', timeEntry)
//     console.log("userCheckIn (getElapsedTime), api Frontend", data)
//     return data;
// }