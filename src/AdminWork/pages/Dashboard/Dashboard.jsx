import React from "react";
import { useDashboardApi } from "../AdminApis/DashboardApi";
import { Container, Grid, Paper, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";

const COLORS = ["#0088FE", "#FF8042"];
import { useFetchUsers } from "../AdminApis/UsersApi";

export const Dashboard = () => {
  const { data: usersResponse, isError } = useFetchUsers();
  const users = usersResponse?.data || [];
  // Filter users based on search text
  const UsersNumbersCount = users.filter(
    (user) => user.role === "admin"
  ).length;
  const { data, isLoading, error } = useDashboardApi();

  if (isLoading) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h6">Loading dashboard data...</Typography>
      </Container>
    );
  }
  if (error) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Error loading dashboard data
        </Typography>
      </Container>
    );
  }

  const {
    line,
    pie,
    bar,
    important,
    totalRevenue,
    totalUsers,
    currentMonthRevenue,
  } = data;

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {/* Total Revenue Box */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Total Revenue
            </Typography>
            <Typography variant="h4" color="primary">
              ${totalRevenue}
            </Typography>
          </Paper>
        </Grid>
        {/* Current Month revenu Box */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              This Month Revenue
            </Typography>
            <Typography variant="h4" color="primary">
              ${currentMonthRevenue}
            </Typography>
          </Paper>
        </Grid>
        {/* Total Companies Box */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Total Companies
            </Typography>
            <Typography variant="h4" color="primary">
              {UsersNumbersCount}
            </Typography>
          </Paper>
        </Grid>
        {/* Total Users Box */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Total Users
            </Typography>
            <Typography variant="h4" color="primary">
              {totalUsers}
            </Typography>
          </Paper>
        </Grid>

        {/* Line Chart for Monthly Subscriptions & User Growth */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Subscriptions & Company Growth
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={line}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="subscriptions"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />

                <Line type="monotone" dataKey="companies" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        {/* Pie Chart for User Activity */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Activity
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pie}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pie.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        {/* Bar Chart for Revenue by Plans */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Revenue by Plans
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={bar}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        {/* Area Chart for Monthly Sales Trends */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Sales Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={important}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
