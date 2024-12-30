import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../api/axiosInstance"

export const addVideo = async (data) => {
    try {
        const response = await axiosInstance.post('/user/video-upload', data);
        const result = response.data;
        console.log(result);
        return response.data;
    } catch (error) {
        console.log("Error from addVideo (Dashboard/AddVideos)", error);
    }
}


export const useAddVideo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addVideo,
        onSuccess: (data) => {
            queryClient.setQueryData(['useUploadVideo'], data)
            console.log("Data is from the useAddVideo (Dashboard/AddVideos)", data);
        }
    })
}




export const fetchVideos = async () => {
    try {
        const response = await axiosInstance.get('/user/get-video-upload');
        return response.data;
    } catch (error) {
        console.error("Error fetching videos:", error);
        throw error;
    }
};

export const useFetchVideos = () => {
    return useQuery({
        queryKey: ['useUploadVideo'],
        queryFn: fetchVideos,
    })
}


// export const useFetchVideos = () => {
//     return useQuery(['videos'], fetchVideos, {
//         staleTime: 1000 * 60 * 5, // Cache videos for 5 minutes
//     });
// };