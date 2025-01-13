import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance"


// Cerate User Sub Task inside Project
export const createSubTask = async (taskData) => {
    const { data } = await axiosInstance.post('/user/create-subTask', taskData);
    return data;
};


// Get User Sub Task inside Project
export const getSubTask = async (projectId) => {
    const { data } = await axiosInstance.get('/user/get-subtask', { params: { projectId } })
    return data;
}


// Get User Name & Detail Task inside Project
export const getUserForSubTask = async (projectId) => {
    const response = await axiosInstance.get(`/user/get-userOfSubTask/${projectId}`)
    return response.data;
}


// Delete User Sub Task for Project
export const deleteSubTask = async (taskId) => {
    const response = await axiosInstance.delete(`/user/delete-subTask/${taskId}`);
    return response.data;
}


// Update User Sub Task for Project
export const updateSubTask = async (taskId, updateData) => {
    const response = await axiosInstance.put(`/user/update-subTask/${taskId}`, updateData);
    return response.data;
}



// Filtering the SubTask Data
export const filterSubTask = async (searchText, filterField) => {
    const response = await axiosInstance.get('/user/search-subTask', { params: { searchText: searchText, filterField: filterField } })
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
            queryClient.setQueryData(['docsCreateLinks', newData.data.projectId], (oldQueryData = { data: [] }) => {
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

            // queryClient.invalidateQueries(['docsCreateLinks']);
            // queryClient.invalidateQueries(['status', newData.data.someId]);
            queryClient.invalidateQueries(['docsCreateLinks', newData.data.projectId]);
        },
        onError: (error) => {
            console.error('Error creating DocsLink:', error);
        },
    });
};


// Delete the Docs Link Code
export const deleteDocsLinks = async (projectId) => {
    const response = await axiosInstance.delete(`/user/delete-docslink/${projectId}`);
    return response.data;
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
            // console.error('Error deleting task:', error.message);
            // queryClient.setQueryData(['docsCreateLinks'], context.previousTasks);
            if (context?.previousTasks) {
                queryClient.setQueryData(['docsCreateLinks'], context.previousTasks);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries(['docsCreateLinks']);
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
        // initialData: { data: [] },
        initialData: [],
        onError: (error) => {
            console.error('Error fetching docs links:', error);
        },
    });
};





// ----------- Creating Videos Links API's -------------
// Create the Video Link Code
export const createVideoLink = async (value) => {
    const response = await axiosInstance.post('/user/create-videolink', value);
    return response.data;
}

export const useCreateVideoLink = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createVideoLink,
        onSuccess: (newData) => {
            queryClient.setQueryData(['videoCreateLinks'], (oldQueryData = { data: [] }) => {
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

            queryClient.invalidateQueries(['videoCreateLinks']);
            queryClient.invalidateQueries(['relatedVideoQuery', newData.data.someId]);
        },
        // onError: (error) => {
        //     console.error('Error creating VideoLink:', error);
        // },
    });
};



// Fetch the Video Link Code
export const fetchVideoLinks = async (projectId) => {
    try {
        const response = await axiosInstance.get('/user/fetch-videolink', { params: { projectId } });
        return response.data;
    } catch (error) {
        console.error('Error fetching video links:', error);
        throw error;
    }
};

export const useFetchVideoLinks = (projectId) => {
    return useQuery({
        queryKey: ['videoCreateLinks', projectId],
        queryFn: () => fetchVideoLinks(projectId),
        // staleTime: 300000,
        onError: (error) => {
            console.error('Error fetching video links:', error);
        },
    });
};


// Delete the Video Link Code
export const deleteVideoLinks = async (projectId) => {
    try {
        const response = await axiosInstance.delete(`/user/delete-videolink/${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting video links:', error);
        throw error;
    }
};


export const useDeleteVideoLinks = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteVideoLinks,

        onMutate: async (taskId) => {
            await queryClient.cancelQueries(['videoCreateLinks']);
            const previousTasks = queryClient.getQueryData(['videoCreateLinks']);
            queryClient.setQueryData(['videoCreateLinks'], (oldData = { data: [] }) => {
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
                queryClient.setQueryData(['videoCreateLinks'], context.previousTasks);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries(['videoCreateLinks']);
        },
    });
};