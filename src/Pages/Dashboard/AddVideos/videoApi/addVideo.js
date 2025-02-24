/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../api/axiosInstance"


// Upload The Video Code 
const addVideo = async (data) => {
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


// Get All Videos Data Code
const fetchVideos = async () => {
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


// Get Single Video Data Code
const getSingleVideo = async (videoId) => {
    const response = await axiosInstance.get(`/user/get-single-video-upload/${videoId}`)
    return response.data
}
export const usegetSingleVideo = (videoId) => {
    return useQuery({
        queryKey: ['useUploadVideo', videoId],
        queryFn: () => getSingleVideo(videoId),
        enabled: !!videoId,
    })
}



// Upload PDF
const addPdf = async (data) => {
    try {
        const response = await axiosInstance.post('/user/pdf-upload', data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading PDF:", error);
        throw error;
    }
};

export const useAddPdf = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addPdf,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['pdfUploads']);
            console.log("PDF uploaded successfully:", data);
        },
    });
};


// Get All PDFs
const fetchPdfs = async () => {
    try {
        const response = await axiosInstance.get('/user/get-all-pdfs');
        return response.data;
    } catch (error) {
        console.error("Error fetching PDFs:", error);
        throw error;
    }
};

export const useFetchPdfs = () => {
    return useQuery({
        queryKey: ['pdfUploads'],
        queryFn: fetchPdfs,
    });
};


// Delete PDF
const deletePdf = async (publicId) => {
    try {
        const response = await axiosInstance.delete(`/user/delete-pdf/${publicId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting PDF:", error);
        throw error;
    }
};

export const useDeletePdf = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deletePdf,
        onSuccess: () => {
            queryClient.invalidateQueries(["pdfUploads"]);
            console.log("PDF deleted successfully");
        },
    });
};