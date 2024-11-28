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
        console.log("Task Api response", response)
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
        const response = await axiosInstance.get(`/user/get-create-task/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching task by ID:', error);
    }
};


export const submitTask = async (taskId, status) => {
    try {
        const response = await axiosInstance.put(`/user/submit-task/${taskId}`, { status });
        // console.log("submitTask (taskApi) success", response);
        return response.data;
    } catch (error) {
        console.log("submitTask (taskApi) error:", error)
    }
}


export const projectApproval = async (taskId, projectStatus) => {
    try {
        const response = await axiosInstance.put(`/user/project-approval/${taskId}`, { projectStatus });
        console.log("submitTask (taskApi) success", response);
        return response.data;
    } catch (error) {
        console.log("submitTask (taskApi) error:", error);
        throw error; // Ensure errors bubble up
    }
};