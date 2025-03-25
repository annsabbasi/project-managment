import { axiosInstance } from "./axiosInstance"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


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



export const getUserProfileData = async () => {
    const response = await axiosInstance.get('/user/get-profile-data');
    return response.data;
}

export const useGetUserProfileData = () => {
    return useQuery({
        queryKey: ["userProfile"],
        queryFn: getUserProfileData,
    })
}



export const getTeamProfileData = async (id) => {
    const response = await axiosInstance.get(`/user/get-user-data/${id}`);
    console.log("Response from getTeamProfileData", response)
    return response.data;
};

export const useGetTeamProfileData = (id) => {
    return useQuery({
        queryKey: ["userProfile", id],
        queryFn: () => getTeamProfileData(id),
        enabled: !!id,
    });
};
