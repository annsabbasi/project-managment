import { axiosInstance } from "./axiosInstance"


export const createTask = async (taskId) => {
    const response = await axiosInstance.post('/user/create-task', taskId);
    return response.data
}



export const fetchTask = async (taskId) => {
        const response = await axiosInstance.get('/user/get-create-task', taskId);
        return response.data || [];
}



export const deleteTask = async (taskId) => {
        const response = await axiosInstance.delete(`/user/get-delete-task/${taskId}`);
        return response.data;
}



export const updateTask = async (taskId, updateData) => {
        const response = await axiosInstance.put(`/user/get-update-task/${taskId}`, updateData);
        return response.data;
}



export const fetchTaskById = async (id) => {
        const response = await axiosInstance.get(`/user/get-create-task/${id}`);
        return response.data;
};



export const submitTask = async (taskId, status) => {
    const response = await axiosInstance.put(`/user/submit-task/${taskId}`, { status });
    return response.data;
}



export const projectApproval = async (taskId, projectStatus) => {
    const response = await axiosInstance.put(`/user/project-approval/${taskId}`, { projectStatus });
    return response.data;
};