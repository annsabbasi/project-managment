import { axiosInstance } from "./axiosInstance"



export const createSubTask = async (taskData) => {
    const { data } = await axiosInstance.post('/user/create-subTask', taskData);
    return data;
};



export const getSubTask = async (projectId) => {
    const { data } = await axiosInstance.get('/user/get-subtask', { params: { projectId } })
    return data;
}



export const deleteSubTask = async (taskId) => {
    try {
        const response = await axiosInstance.delete(`/user/delete-subTask/${taskId}`);
        return response.data;
    } catch (error) {
        console.log("taskApi deleteTask error", error)
    }
}



export const updateSubTask = async (taskId, updateData) => {
    try {
        const response = await axiosInstance.put(`/user/update-subTask/${taskId}`, updateData);
        console.log("taskApi UpdateSubTask Success", response);
        return response.data;
    } catch (error) {
        console.log("taskApi updateTask error", error)
    }
}