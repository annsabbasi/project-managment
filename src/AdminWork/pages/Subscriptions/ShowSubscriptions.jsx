import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Modal,
  TextField,
  TablePagination,
} from "@mui/material";
import { useFetchPlans } from "../AdminApis/PlanApi";
import {
  useAddSubscription,
  useFetchSubscriptions,
  useUpdateSubscription,
} from "../AdminApis/SubscriptionsApi"; // Ensure there's an API hook for updating subscriptions.

export const ShowSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [newSubscription, setNewSubscription] = useState({
    id: "",
    userEmail: "",
    activePlanId: "",
    startAt: "",
    endAt: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editMode, setEditMode] = useState(false); // Flag to track edit mode

  // Fetch plans from API
  const { isError, isLoading, data: plans = [] } = useFetchPlans();
  const { data: subscriptionsData = [] } = useFetchSubscriptions();
  const addSubscriptionMutation = useAddSubscription();
  const updateSubscriptionMutation = useUpdateSubscription();

  useEffect(() => {
    setSubscriptions([]);
    if (subscriptionsData.length > 0) {
      setSubscriptions(subscriptionsData);
    }
  }, [subscriptionsData]);

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleAddSubscriptionClick = () => {
    setOpenModal(true);
    setEditMode(false);
  };

  const handleEditSubscriptionClick = (subscription) => {
    setNewSubscription({
      id: subscription._id,
      userEmail: subscription.user.email,
      activePlanId: subscription.plan._id,
      startAt: new Date(subscription.startAt).toISOString().slice(0, 10),
      endAt: new Date(subscription.endsAt).toISOString().slice(0, 10),
    });
    setEditMode(true);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewSubscription({
      id: "",
      userEmail: "",
      activePlanId: "",
      startAt: "",
      endAt: "",
    });
  };

  const handleSaveSubscription = async () => {
    try {
      if (editMode) {
        // Update existing subscription
        await updateSubscriptionMutation.mutateAsync(newSubscription);
      } else {
        // Add new subscription
        await addSubscriptionMutation.mutateAsync(newSubscription);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving subscription:", error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredSubscriptions = subscriptions.filter((sub) => {
    if (filterStatus === "All") {
      return true;
    }
    return sub.status.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <Container
      maxWidth="xl"
      sx={{ mt: 4, borderRadius: 1, border: 1, borderColor: "divider", p: 2 }}
    >
      {/* Top Actions Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5"></Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormControl sx={{ mr: 2, minWidth: 120 }} size="small">
            <InputLabel id="filter-label">Filter</InputLabel>
            <Select
              labelId="filter-label"
              id="filter-select"
              variant="outlined"
              value={filterStatus}
              onChange={handleFilterChange}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
              <MenuItem value="Expired">Expired</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSubscriptionClick}
          >
            Add Subscription
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Active Plans</TableCell>
              <TableCell>Start At</TableCell>
              <TableCell>End At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell> {/* Added Actions Column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSubscriptions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((sub) => (
                <TableRow key={sub._id}>
                  <TableCell>{sub.user.name}</TableCell>
                  <TableCell>{sub.plan.title}</TableCell>
                  <TableCell>
                    {new Date(sub.startAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(sub.endsAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{sub.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditSubscriptionClick(sub)} // Edit button
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 15, 50, 100]}
        component="div"
        count={filteredSubscriptions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {/* Modal for Adding/Editing Subscription */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            {editMode ? "Edit Subscription" : "Add Subscription"}{" "}
            {/* Dynamic title */}
          </Typography>

          {/* User Email Text Field */}
          <TextField
            fullWidth
            label="Companies Email"
            variant="outlined"
            margin="dense"
            value={newSubscription.userEmail}
            onChange={(e) =>
              setNewSubscription({
                ...newSubscription,
                userEmail: e.target.value,
              })
            }
          />

          {/* Active Plan Dropdown */}
          <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel>Active Plan</InputLabel>
            <Select
              value={newSubscription.activePlanId}
              onChange={(e) =>
                setNewSubscription({
                  ...newSubscription,
                  activePlanId: e.target.value,
                })
              }
              label="Active Plan"
            >
              {plans?.map((plan) => (
                <MenuItem key={plan._id} value={plan._id}>
                  {plan.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Start Date */}
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            variant="outlined"
            margin="dense"
            InputLabelProps={{ shrink: true }}
            value={newSubscription.startAt}
            onChange={(e) =>
              setNewSubscription({
                ...newSubscription,
                startAt: e.target.value,
              })
            }
          />

          {/* End Date */}
          <TextField
            fullWidth
            label="End Date"
            type="date"
            variant="outlined"
            margin="dense"
            InputLabelProps={{ shrink: true }}
            value={newSubscription.endAt}
            onChange={(e) =>
              setNewSubscription({
                ...newSubscription,
                endAt: e.target.value,
              })
            }
          />

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveSubscription}
            >
              {editMode ? "Update" : "Add"} {/* Dynamic button */}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default ShowSubscriptions;
