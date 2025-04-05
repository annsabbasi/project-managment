import style from './style.module.scss';
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
import { Add, Edit } from "@mui/icons-material";
import { useFetchPlans, useAddPlan, useUpdatePlan } from "../AdminApis/PlanApi";
import { useAuth } from '../../../context/AuthProvider';

export const ShowPlans = () => {
  const { theme, mode } = useAuth();
  const tableClassText = mode === 'light' ? style.lightTableText : style.darkTableText;
  const tableGap = mode === 'light' ? style.tableBodyLight : style.tableBodyDark;

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
        await updatePlanMutation.mutateAsync(currentPlan);
      } else {
        await addPlanMutation.mutateAsync(currentPlan);
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
          variant="outlined"
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
          <TableContainer component={Paper} sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: '0.6rem',
            overflow: "hidden",
            boxShadow: 4
          }}>
            <Table
              sx={{
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper
              }}
            >
              <TableHead>
                <TableRow className={style.tableRowHead}>
                  {["Title", "Price", "Interval", "Max Users", "Popular", "Actions"].map((head) => (
                    <TableCell key={head} className={tableClassText}>
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className={tableGap}>
                {plans.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((plan) => (
                  <TableRow key={plan.id} className={style.tableRowBody}>
                    <TableCell>{plan.title}</TableCell>
                    <TableCell>${plan.price}</TableCell>
                    <TableCell>{plan.interval}</TableCell>
                    <TableCell>{plan.maxUsers}</TableCell>
                    <TableCell>{plan.mostPopular ? "Yes" : "No"}</TableCell>
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
            width: 500,
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" mb={3} textAlign="center" fontWeight="bold">
            {editMode ? "Edit Plan" : "Add New Plan"}
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={currentPlan.title}
              onChange={(e) => setCurrentPlan({ ...currentPlan, title: e.target.value })}
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              minRows={3}
              value={currentPlan.description}
              onChange={(e) => setCurrentPlan({ ...currentPlan, description: e.target.value })}
            />
            <Box display="flex" gap={2}>
              <TextField
                fullWidth
                label="Price ($)"
                type="number"
                variant="outlined"
                value={currentPlan.price}
                onChange={(e) => setCurrentPlan({ ...currentPlan, price: e.target.value })}
              />
              <FormControl fullWidth>
                <InputLabel>Interval</InputLabel>
                <Select
                  value={currentPlan.interval}
                  onChange={(e) => setCurrentPlan({ ...currentPlan, interval: e.target.value })}
                >
                  <MenuItem value="month">Monthly</MenuItem>
                  <MenuItem value="year">Yearly</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              fullWidth
              label="Max Users"
              type="number"
              variant="outlined"
              value={currentPlan.maxUsers}
              onChange={(e) => setCurrentPlan({ ...currentPlan, maxUsers: e.target.value })}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button variant="contained" color="primary" onClick={handleSavePlan} sx={{ px: 3 }}>
              {editMode ? "Update" : "Save"}
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
