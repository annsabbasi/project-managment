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

const COLORS = ["#0088FE", "#FF8042"];
import { useFetchUsers } from "../AdminApis/UsersApi";

export const Dashboard = () => {
  const { data: usersResponse } = useFetchUsers();
  const users = usersResponse?.data || [];
  const UsersNumbersCount = users.filter((user) => user.role === "admin").length;
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
      <Grid container spacing={4}>
        {/* Revenue Summary */}
        {[
          { icon: <AttachMoney />, title: "Total Revenue", value: `$${totalRevenue}` },
          { icon: <TrendingUp />, title: "This Month Revenue", value: `$${currentMonthRevenue}` },
          { icon: <Business />, title: "Total Companies", value: UsersNumbersCount },
          { icon: <People />, title: "Total Users", value: totalUsers },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Paper sx={{ p: 2, display: "flex", alignItems: "center", boxShadow: 3 }}>
              <Box sx={{ mr: 2, color: "primary.main" }}>{item.icon}</Box>
              <Box>
                <Typography variant="subtitle1">{item.title}</Typography>
                <Typography variant="h5" color="primary">
                  {item.value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}

        {/* Line Chart */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 2, boxShadow: 3 }}>
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
          <Paper sx={{ p: 2, boxShadow: 3 }}>
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
          <Paper sx={{ p: 2, boxShadow: 3 }}>
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
          <Paper sx={{ p: 2, boxShadow: 3 }}>
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
    </Container>
  );
};

export default Dashboard;
