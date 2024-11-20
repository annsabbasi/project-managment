import { axiosInstance } from "./axiosInstance"


export const createSubTask = async (taskData) => {
    const { data } = await axiosInstance.post('/user/create-subTask', taskData);
    return data;
};