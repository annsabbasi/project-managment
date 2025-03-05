import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { axiosInstance } from "../../../api/axiosInstance";

// Fetch all departments
const fetchDepartments = async () => {
  const response = await axiosInstance.get("/department/get-departments");
  return response.data.data;
};

export const useFetchDepartments = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
    staleTime: 1000 * 60 * 5, // Cache departments for 5 minutes
  });
};

// Fetch a single department by ID
const getSingleDepartment = async (departmentId) => {
  const response = await axiosInstance.get(
    `/department/get-department/${departmentId}`
  );
  return response.data;
};

export const useGetSingleDepartment = (departmentId) => {
  return useQuery({
    queryKey: ["department", departmentId],
    queryFn: () => getSingleDepartment(departmentId),
    enabled: !!departmentId, // Ensures query only runs if departmentId exists
  });
};

// Add a new department
const addDepartment = async (department) => {
  const response = await axiosInstance.post(
    "/department/add-department",
    department
  );
  return response.data;
};

export const useAddDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries(["departments"]);
    },
  });
};

// Update a department
const updateDepartment = async ({ departmentId, department }) => {
  const response = await axiosInstance.put(
    `/department/update-department/${departmentId}`,
    department
  );
  return response.data;
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries(["departments"]);
    },
  });
};

// Delete a department
const deleteDepartment = async (departmentId) => {
  const response = await axiosInstance.delete(
    `/department/delete-department/${departmentId}`
  );
  return response.data;
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries(["departments"]);
    },
  });
};

// Get number of users in a department
const getNumberOfUsers = async (departmentId) => {
  const response = await axiosInstance.get(
    `/department/get-number-of-users/${departmentId}`
  );
  return response.data.data.count;
};

export const useGetNumberOfUsers = (departmentId) => {
  return useQuery({
    queryKey: ["number-of-users", departmentId],
    queryFn: () => getNumberOfUsers(departmentId),
    enabled: !!departmentId,
  });
};

export { getNumberOfUsers, fetchDepartments };
