import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../api/axiosInstance";

// Function to add a notification via POST request
const addNotification = async (formData) => {
  try {
    const response = await axiosInstance.post("/admin/notifications", formData);
    return response.data;
  } catch (error) {
    console.error("Error adding notification:", error);
    throw error;
  }
};

// Hook for adding a notification using a mutation
export const useAddNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addNotification,
    onSuccess: () => {
      // Optionally, invalidate notifications cache if you have a query for notifications
      queryClient.invalidateQueries(["notifications"]);
    },
  });
};
