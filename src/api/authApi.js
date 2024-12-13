import { axiosInstance } from "./axiosInstance";



export const signUpUser = async (user) => {
    const response = await axiosInstance.post("/user/signup", user)
    return response.data;
}



export const loginUser = async (user) => {
    const response = await axiosInstance.post("/user/login", user)
    return response.data;
}



export const logoutUser = async (user) => {
    try {
        const response = await axiosInstance.post("/user/logout", user)
        return response.data
    } catch (error) {
        console.log("Error from the logout AuthApi.js", error)
    }
}
