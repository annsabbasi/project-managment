import { axiosInstance } from "./axiosInstance"


export const createTask = async (taskId) => {
    try {
        const response = await axiosInstance.post('/user/create-task', taskId);
        return response.data
    } catch (error) {
        console.log("createTask taskApi error", error)
    }
}


export const fetchTask = async (taskId) => {
    try {
        const response = await axiosInstance.get('/user/get-create-task', taskId);
        return response.data || [];
    } catch (error) {
        if (axiosInstance.isCancel(error)) {
            console.log("Request canceled", error.message);
        } else {
            console.log("error", error)
            throw error;
        }
    }
}


export const deleteTask = async (taskId) => {
    try {
        const response = await axiosInstance.delete(`/user/get-delete-task/${taskId}`);
        return response.data;
    } catch (error) {
        console.log("taskApi deleteTask error", error)
    }
}


export const updateTask = async (taskId, updateData) => {
    try {
        const response = await axiosInstance.put(`/user/get-update-task/${taskId}`, updateData);
        // console.log("taskApi UpdateTask Success", response);
        return response.data;
    } catch (error) {
        console.log("taskApi updateTask error", error)
    }
}


export const fetchTaskById = async (id) => {
    try {
        const response = await axiosInstance.get(`/user/get-create-task/${id}`); // Use the taskId in the endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching task by ID:', error);
    }
};