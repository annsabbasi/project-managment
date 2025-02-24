import { axiosInstance } from "./axiosInstance"
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const updateUserProfile = async (userData) => {
    const response = await axiosInstance.put('/user/update-user', userData)
    return response.data;
}



export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateUserProfile,
        onSuccess: () => {
            queryClient.invalidateQueries(["userProfile"]);
        },
        onError: (error) => {
            console.error("Update failed:", error.response?.data?.error || "Unknown error");
        },
    });
};
