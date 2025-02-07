import { axiosInstance } from "./axiosInstance";



export const signUpUser = async (user) => {
    const response = await axiosInstance.post("/user/signup", user)
    return response.data;
}

export const signUpCompany = async (company) => {
    const response = await axiosInstance.post("/company/signup", company)
    return response.data;
}



export const loginUser = async (user) => {
    const response = await axiosInstance.post("/user/login", user)
    console.log("response from (authApi)", response.data)
    return response.data;
}

export const loginCompany = async (user) => {
    const response = await axiosInstance.post("/company/login", user)
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


export const promoteUser = async (user) => {
    const response = await axiosInstance.post("/user/promote-user", user)
    return response.data
}