import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSubTask, updateSubTask } from "../api/userSubTask";

export const useDeleteSubTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteSubTask,
        onMutate: async (taskId) => {
            // Cancel ongoing fetches
            await queryClient.cancelQueries(['userSubtask']);

            // Snapshot of the current cached data
            const previousTasks = queryClient.getQueryData(['userSubtask']);

            // Optimistically update the cache
            queryClient.setQueryData(['userSubtask'], (oldTasks = []) => {
                // Ensure `oldTasks` is an array and filter out the deleted task
                return Array.isArray(oldTasks)
                    ? oldTasks.filter((task) => task.id !== taskId)
                    : [];
            });

            // Return the snapshot for rollback
            return { previousTasks };
        },
        onError: (error, taskId, context) => {
            console.error('Error deleting task:', error.message);

            // Rollback to the previous state if mutation fails
            if (context?.previousTasks) {
                queryClient.setQueryData(['userSubtask'], context.previousTasks);
            }
        },
        onSettled: () => {
            // Ensure data is refetched after mutation to sync with server
            queryClient.invalidateQueries(['userSubtask']);
        },
    });
};



export const useUpdateSubTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ taskId, updateData }) => updateSubTask(taskId, updateData),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['userSubtask'])
            queryClient.setQueryData(['userSubtask', data.data._id], data.data);
        },
        onError: (error) => {
            console.error('Error updating task:', error.message)
        }
    })
}






// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deleteSubTask } from "../api/userSubTask";

// export const useDeleteSubTask = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: deleteSubTask,
//         onSuccess: () => {
//             queryClient.invalidateQueries(['userSubtask']);
//         },
//         onError: (error) => {
//             console.error('Error deleting task:', error.message);
//         },
//     });
// };
