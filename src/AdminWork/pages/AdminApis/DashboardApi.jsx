import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../api/axiosInstance";

// Fetch Dashboard Data using axiosInstance
const fetchDashboardData = async () => {
  try {
    const response = await axiosInstance.get("/admin/dashboard");
    console.log("Dashboard Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const useDashboardApi = () => {
  return useQuery({
    queryKey: ["dashboardData"],
    queryFn: fetchDashboardData,
  });
};
