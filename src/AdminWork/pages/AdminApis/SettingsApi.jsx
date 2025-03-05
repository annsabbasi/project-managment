import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../api/axiosInstance";

// Fetch Admin Settings using axiosInstance
const fetchAdminSettings = async () => {
  try {
    const response = await axiosInstance.get("/admin/settings");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching admin settings:", error);
    throw error;
  }
};

export const useFetchAdminSettings = () => {
  return useQuery({
    queryKey: ["adminSettings"],
    queryFn: fetchAdminSettings,
  });
};

const updateApplicationInfo = async (data) => {
  const response = await axiosInstance.patch(
    "/admin/settings/application",
    data
  );
  return response.data;
};

export const useUpdateApplicationInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateApplicationInfo,
    onSuccess: () => {
      queryClient.invalidateQueries(["adminSettings"]);
    },
  });
};

const updateContactInfo = async (data) => {
  const response = await axiosInstance.patch("/admin/settings/contact", data);
  return response.data;
};

export const useUpdateContactInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateContactInfo,
    onSuccess: () => {
      queryClient.invalidateQueries(["adminSettings"]);
    },
  });
};

const updateMaintenance = async (data) => {
  const response = await axiosInstance.patch(
    "/admin/settings/maintenance",
    data
  );
  return response.data;
};

export const useUpdateMaintenance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMaintenance,
    onSuccess: () => {
      queryClient.invalidateQueries(["adminSettings"]);
    },
  });
};
