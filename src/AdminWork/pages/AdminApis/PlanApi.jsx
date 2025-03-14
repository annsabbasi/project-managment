import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../api/axiosInstance";

// Fetch Plans using axiosInstance
const fetchPlans = async () => {
  try {
    const response = await axiosInstance.get("/admin/plans");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
};

export const useFetchPlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: fetchPlans,
  });
};

// Add a new plan using axiosInstance
const addPlan = async (newPlan) => {
  try {
    const response = await axiosInstance.post("/admin/plans", newPlan);
    return response.data;
  } catch (error) {
    console.error("Error adding plan:", error);
    throw error;
  }
};

export const useAddPlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPlan,
    onSuccess: () => {
      // Invalidate and refetch plans data after adding a new plan
      queryClient.invalidateQueries(["plans"]);
    },
  });
};

// update a plan
const updatePlan = async (updatedPlan) => {
  try {
    const response = await axiosInstance.put(
      `/admin/plans/${updatedPlan.id}/update`,
      updatedPlan
    );
    return response.data;
  } catch (error) {
    console.error("Error updating plan:", error);
    throw error;
  }
};

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePlan,
    onSuccess: () => {
      // Invalidate and refetch plans data after updating a plan
      queryClient.invalidateQueries(["plans"]);
    },
  });
};
