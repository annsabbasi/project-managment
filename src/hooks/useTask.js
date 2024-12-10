import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createTask, deleteTask, fetchTask, projectApproval, submitTask, updateTask } from "../api/taskApi";
import { toast } from "react-toastify";

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
            queryClient.invalidateQueries(['username', newData.data.userId]);
        },
        // onError: (error) => {
        // console.error("(useAuth) Login failed:", error.response?.data || error.message)
        // console.error("(useTask) useCreate Task:", error)
        // },
    });
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
        onMutate: async (taskId) => {
            await queryClient.cancelQueries(['tasks']);

            // Snapshot the previous value
            const previousTasks = queryClient.getQueryData(['tasks']);

            // Optimistically update the cache
            queryClient.setQueryData(['tasks'], (oldQueryData) => ({
                ...oldQueryData,
                data: oldQueryData.data.filter((task) => task._id !== taskId),
            }));

            // Return a rollback function in case of error
            return { previousTasks };
        },
        onError: (error, taskId, context) => {
            // Rollback the cache to the previous value
            queryClient.setQueryData(['tasks'], context.previousTasks);
            console.error('Error deleting task:', error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['tasks']);
        },
    });
};


export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ taskId, updateData }) => updateTask(taskId, updateData),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['tasks'])
            queryClient.setQueryData(['task', data.data._id], data.data);
            toast.success("The task updated successfully", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: false,
            })
        },
        onError: (error) => {
            console.error('Error updating task:', error.message)
        }
    })
}

export const useSubmitTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ taskId, status }) => submitTask(taskId, status),
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
            // queryClient.invalidateQueries(['tasks', taskId]);
        },
    });
};


// export const useSubmitTask = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: ({ taskId }) => submitTask(taskId),
//         onSuccess: () => {
//             // queryClient.invalidateQueries(['task', taskId]);
//             queryClient.invalidateQueries(['tasks']);
//         },
//     });
// }


export const useProjectApproval = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ taskId, projectStatus }) => projectApproval(taskId, projectStatus),
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
        },
    });
};




// <--------- FOR THE REFERENCE ---------->
// <--------- THIS WILL REFETCH AND SHOW ONLY THE DATA WHICH IS CREATED NOT REFETCHES ALL THE DATA THEY WILL STAY SAME FROM CACHE ---------->
//     onSuccess: (newData) => {
//         queryClient.setQueryData(['tasks'], (oldQueryData) => {
//             console.log("useCreateTask data", newData.data)
//             return {
//                 ...oldQueryData,
//                 data: [...oldQueryData.data, newData.data]
//             }
//         })
//     },
// });

// <--------- THIS WILL REFETCH ALL THE DATA AGAIN AFTER CREATING A TASK THEN SHOW IT ON THE SCREEN ---------->
// queryClient.invalidateQueries(['tasks']);


// <--------- THIS WILL DELETE THE DATA BUT TAKES A LITTLE TIME TO SHOW UPDATED DATA ---------->
// export const useDeleteTask = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: deleteTask,
//         onSuccess: () => {
//             queryClient.invalidateQueries(['tasks']);
//         },
//         onError: (error) => {
//             console.error('Error deleting task:', error.message)
//         }
//     })
// }