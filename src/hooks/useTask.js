import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createTask, deleteTask, fetchTask, updateTask } from "../api/taskApi";

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTask,
        onSuccess: (newData) => {
            queryClient.setQueryData(['tasks'], (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [
                        ...oldQueryData.data,
                        {
                            ...newData.data,
                            username: 'Loading...',
                        }
                    ]
                };
            });

            // Optionally, prefetch or refetch username if required
            queryClient.invalidateQueries(['username', newData.data.userId]); // Assuming you have userId
        },
    });
    //     onSuccess: (newData) => {
    //         queryClient.setQueryData(['tasks'], (oldQueryData) => {
    //             console.log("useCreateTask data", newData.data)
    //             return {
    //                 ...oldQueryData,
    //                 data: [...oldQueryData.data, newData.data]
    //             }
    //         })
    //         // queryClient.invalidateQueries(['tasks']);
    //     },
    // });
}


export const useGetCreateTask = () => {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTask,
        initialData: [],
    });
}


export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
        },
        onError: (error) => {
            console.error('Error deleting task:', error.message)
        }
    })
}


export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks'])
        },
        onError: (error) => {
            console.error('Error updating task:', error.message)
        }
    })
}