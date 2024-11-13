import { axiosInstance } from "./axiosInstance"


export const createTask = async (taskId) => {
    try {
        const response = await axiosInstance.post('/user/create-task', taskId);
        console.log("createTask taskApi success", response.data);
        return response.data
    } catch (error) {
        console.log("createTask taskApi error", error)
    }
}


export const fetchTask = async (taskId) => {
    try {
        const response = await axiosInstance.get('/user/get-create-task', taskId);
        console.log("fetchTask taskApi success", response.data);
        return response.data || [];
    } catch (error) {
        console.log("fetchTask taskApi error", error)
        return [];
    }
}