import { axiosInstance } from "./axiosInstance"


export const createSubTask = async (taskData) => {
    const { data } = await axiosInstance.post('/user/create-subTask', taskData);
    return data;
};


export const getSubTask = async (projectId) => {
    const { data } = await axiosInstance.get('/user/get-subtask', { params: { projectId } })
    console.log("This is the data from the getSubTask", data)
    return data;
}