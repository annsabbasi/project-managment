import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    const response = await axiosInstance.delete(`/user/delete-subTask/${taskId}`);
    return response.data;
}



export const updateSubTask = async (taskId, updateData) => {
    const response = await axiosInstance.put(`/user/update-subTask/${taskId}`, updateData);
    return response.data;
}



// ----------- Creating Docs and Videos Links API's -------------

// Create the Docs Link Code
export const createDocsLink = async (value) => {
    const response = await axiosInstance.post('/user/create-docslink', value);
    return response.data;
}

export const useCreateDocsLink = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createDocsLink,
        onSuccess: (newData) => {
            queryClient.setQueryData(['docsCreateLinks'], (oldQueryData = { data: [] }) => {
                return {
                    ...oldQueryData,
                    data: [
                        ...oldQueryData.data,
                        {
                            ...newData.data,
                            status: 'Creating...',
                        }
                    ]
                };
            });

            queryClient.invalidateQueries(['docsCreateLinks']);
            queryClient.invalidateQueries(['relatedQuery', newData.data.someId]);
        },
        onError: (error) => {
            console.error('Error creating DocsLink:', error);
        },
    });
};



// Fetch the Docs Link Code
export const fetchDocsLinks = async (projectId) => {
    try {
        const response = await axiosInstance.get('/user/fetch-docslink', { params: { projectId } });
        return response.data;
    } catch (error) {
        console.error('Error fetching docs links:', error);
        throw error;
    }
};

export const useFetchDocsLinks = (projectId) => {
    return useQuery({
        queryKey: ['docsCreateLinks', projectId],
        queryFn: () => fetchDocsLinks(projectId),
        // staleTime: 300000,
        onError: (error) => {
            console.error('Error fetching docs links:', error);
        },
    });
};


// Delete the Docs Link Code
export const deleteDocsLinks = async (projectId) => {
    try {
        const response = await axiosInstance.delete(`/user/delete-docslink/${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting docs links:', error);
        throw error;
    }
};


export const useDeleteDocsLinks = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteDocsLinks,

        onMutate: async (taskId) => {
            await queryClient.cancelQueries(['docsCreateLinks']);
            const previousTasks = queryClient.getQueryData(['docsCreateLinks']);
            queryClient.setQueryData(['docsCreateLinks'], (oldData = { data: [] }) => {
                return {
                    ...oldData,
                    data: oldData.data.filter((task) => task._id !== taskId),
                };
            });

            return { previousTasks };
        },

        onError: (error, taskId, context) => {
            console.error('Error deleting task:', error.message);
            if (context?.previousTasks) {
                queryClient.setQueryData(['docsCreateLinks'], context.previousTasks);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries(['docsCreateLinks']);
        },
    });
};