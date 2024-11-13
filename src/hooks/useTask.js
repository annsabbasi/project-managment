import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createTask, fetchTask } from "../api/taskApi";

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
        },
    });
}


export const useGetCreateTask = () => {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTask,
        initialData: [],
    });
}