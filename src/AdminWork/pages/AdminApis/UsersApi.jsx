import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../api/axiosInstance";
// Fetch Users Data using axiosInstance
const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get("/admin/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

// update a user
const updateUser = async (updatedUser) => {
  try {
    const response = await axiosInstance.patch(
      `/admin/users/${updatedUser._id}/update`,
      updatedUser
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
