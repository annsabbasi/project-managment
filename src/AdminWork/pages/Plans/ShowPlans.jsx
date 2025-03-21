import { useState } from "react";
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
  TablePagination,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Add,
  Edit,
  Payment,
  AccessTime,
  People,
} from "@mui/icons-material";
import { useFetchPlans, useAddPlan, useUpdatePlan } from "../AdminApis/PlanApi";

export const ShowPlans = () => {
  const { data: plans = [], isLoading, isError } = useFetchPlans();
  const addPlanMutation = useAddPlan();
  const updatePlanMutation = useUpdatePlan();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPlan, setCurrentPlan] = useState({
    title: "",
    description: "",
    price: "",
    interval: "month",
    maxUsers: "",
    paymentGatewayPlanId: "",
    mostPopular: false,
  });

  const handlePageChange = (_, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleAddPlanClick = () => {
    setEditMode(false);
    setOpenModal(true);
  };
  const handleEditPlanClick = (plan) => {
    setEditMode(true);
    setCurrentPlan({
      ...currentPlan,
      id: plan._id,
      title: plan.title,
      description: plan.description,
      price: plan.price,
      interval: plan.interval,
      maxUsers: plan.maxUsers,
      paymentGatewayPlanId: plan.paymentGatewayPlanId,
      mostPopular: plan.mostPopular,
    });
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentPlan({
      id: "",
      title: "",
      description: "",
      price: "",
      interval: "month",
      maxUsers: "",
      paymentGatewayPlanId: "",
      mostPopular: false,
    });
  };

  const handleSavePlan = async () => {
    try {
      if (editMode) {
        await updatePlanMutation.mutateAsync(currentPlan); // Update the plan
      } else {
        await addPlanMutation.mutateAsync(currentPlan); // Add a new plan
      }
      handleCloseModal();
    } catch (error) {
      console.error("Failed to save plan:", error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" color="primary">
          Plans Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddPlanClick}
        >
          Add Plan
        </Button>
      </Box>

      {isLoading ? (
        <Typography textAlign="center">Loading plans...</Typography>
      ) : isError ? (
        <Typography textAlign="center" color="error">
          Failed to load plans.
        </Typography>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell><b>Title</b></TableCell>
                  <TableCell><b>Price</b></TableCell>
                  <TableCell><b>Interval</b></TableCell>
                  <TableCell><b>Max Users</b></TableCell>
                  <TableCell><b>Popular</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(plans) &&
                  plans
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((plan) => (
                      <TableRow key={plan.id} hover>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Payment sx={{ color: "primary.main", mr: 1 }} />
                            {plan.title}
                          </Box>
                        </TableCell>
                        <TableCell>${plan.price}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <AccessTime sx={{ color: "primary.main", mr: 1 }} />
                            {plan.interval}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <People sx={{ color: "primary.main", mr: 1 }} />
                            {plan.maxUsers}
                          </Box>
                        </TableCell>
                        <TableCell>
                          {plan.mostPopular ? "Yes" : "No"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<Edit />}
                            onClick={() => handleEditPlanClick(plan)}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={Array.isArray(plans) ? plans.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </>
      )}

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
            {editMode ? "Edit Plan" : "Add Plan"}
          </Typography>
          <TextField
            fullWidth
            label="Title"
            margin="dense"
            value={currentPlan.title}
            onChange={(e) => setCurrentPlan({ ...currentPlan, title: e.target.value })}
          />
          <TextField
            fullWidth
            label="Description"
            margin="dense"
            value={currentPlan.description}
            multiline
            minRows={3}
            onChange={(e) => setCurrentPlan({ ...currentPlan, description: e.target.value })}
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            margin="dense"
            value={currentPlan.price}
            onChange={(e) => setCurrentPlan({ ...currentPlan, price: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Interval</InputLabel>
            <Select
              value={currentPlan.interval}
              onChange={(e) => setCurrentPlan({ ...currentPlan, interval: e.target.value })}
            >
              <MenuItem value="month">Monthly</MenuItem>
              <MenuItem value="year">Yearly</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Max Users"
            type="number"
            margin="dense"
            value={currentPlan.maxUsers}
            onChange={(e) => setCurrentPlan({ ...currentPlan, maxUsers: e.target.value })}
          />
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSavePlan}
              disabled={addPlanMutation.isLoading || updatePlanMutation.isLoading}
            >
              {addPlanMutation.isLoading || updatePlanMutation.isLoading
                ? "Saving..."
                : "Save"}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default ShowPlans;
