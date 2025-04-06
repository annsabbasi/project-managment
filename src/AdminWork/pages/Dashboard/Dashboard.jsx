import { useDashboardApi } from "../AdminApis/DashboardApi";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import { AttachMoney, People, Business, TrendingUp } from "@mui/icons-material";
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

import { useFetchUsers } from "../AdminApis/UsersApi";
import { useAuth } from "../../../context/AuthProvider";
// import { useAuth } from "../../context/AuthProvider"; // 👈 Theme hook added

const COLORS = ["#0088FE", "#FF8042"];

export const Dashboard = () => {
  const { data: usersResponse } = useFetchUsers();
  const { data, isLoading, error } = useDashboardApi();
  const { theme, mode } = useAuth(); // 👈 Get theme/mode

  const users = usersResponse?.data || [];
  const UsersNumbersCount = users.filter((user) => user.role === "admin").length;

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

  const paperBaseStyle = {
    p: 2,
    boxShadow: 3,
    backgroundColor: mode === "light" ? theme.palette.background.paper : theme.palette.background.default,
    color: mode === "light" ? theme.palette.text.primary : theme.palette.text.primary,
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" color="primary" style={{
          color:
            mode === "light"
              ? theme.palette.primary.main
              : theme.palette.secondary.main,
        }}>
          Dashboard
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {[
          { icon: <AttachMoney />, title: "Total Revenue", value: `$${totalRevenue}` },
          { icon: <TrendingUp />, title: "Monthly Revenue", value: `$${currentMonthRevenue}` },
          { icon: <Business />, title: "Total Companies", value: UsersNumbersCount },
          { icon: <People />, title: "Total Users", value: totalUsers },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Paper
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                borderRadius: 3,
                backgroundColor:
                  mode === "light"
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(255, 255, 255, 0.05)",
                border: `1px solid ${mode === "light" ? "#e0e0e0" : "rgba(255,255,255,0.1)"
                  }`,
                boxShadow:
                  mode === "light"
                    ? "0 4px 20px rgba(0,0,0,0.05)"
                    : "0 4px 20px rgba(255,255,255,0.06)",
                backdropFilter: "blur(6px)",
              }}
            >
              <Box
                sx={{
                  mr: 2,
                  fontSize: 32,
                  color:
                    mode === "light"
                      ? theme.palette.primary.main
                      : theme.palette.secondary.main,
                }}
              >
                {item.icon}
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 500,
                    color:
                      mode === "light"
                        ? theme.palette.text.secondary
                        : theme.palette.text.secondary,
                    textTransform: "uppercase",
                    fontSize: "0.85rem",
                    letterSpacing: 0.5,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color:
                      mode === "light"
                        ? theme.palette.text.primary
                        : theme.palette.text.primary,
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}



        {/* Line Chart */}
        <Grid item xs={12} lg={8}>
          <Paper sx={paperBaseStyle}>
            <Typography variant="h6" gutterBottom>
              Monthly Subscriptions & Company Growth
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={line}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="subscriptions" stroke="#8884d8" />
                <Line type="monotone" dataKey="companies" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} lg={4}>
          <Paper sx={paperBaseStyle}>
            <Typography variant="h6" gutterBottom>
              User Activity
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pie} dataKey="value" nameKey="name" outerRadius={80} label>
                  {pie.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={paperBaseStyle}>
            <Typography variant="h6" gutterBottom>
              Revenue by Plans
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bar}>
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

        {/* Area Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={paperBaseStyle}>
            <Typography variant="h6" gutterBottom>
              Monthly Sales Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={important}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container >
  );
};

export default Dashboard;
