import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../api/axiosInstance";

// Fetch Subscriptions Data using axiosInstance
const fetchSubscriptions = async () => {
  try {
    const response = await axiosInstance.get("/admin/subscriptions");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    throw error;
  }
};

export const useFetchSubscriptions = () => {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: fetchSubscriptions,
  });
};

// Add a new subscription using axiosInstance
const addSubscription = async (newSubscription) => {
  try {
    const response = await axiosInstance.post(
      "/admin/subscriptions",
      newSubscription
    );
    return response.data;
  } catch (error) {
    console.error("Error adding subscription:", error);
    throw error;
  }
};

export const useAddSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSubscription,
    onSuccess: () => {
      // Invalidate and refetch the subscriptions data after adding a new subscription
      queryClient.invalidateQueries(["subscriptions"]);
    },
  });
};

// update a subscription
const updateSubscription = async (updatedSubscription) => {
  try {
    const response = await axiosInstance.put(
      `/admin/subscriptions/${updatedSubscription.id}/update`,
      updatedSubscription
    );
    return response.data;
  } catch (error) {
    console.error("Error updating subscription:", error);
    throw error;
  }
};

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSubscription,
    onSuccess: () => {
      // Invalidate and refetch the subscriptions data after updating a subscription
      queryClient.invalidateQueries(["subscriptions"]);
    },
  });
};
