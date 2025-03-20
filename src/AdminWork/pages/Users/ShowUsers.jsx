import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TablePagination,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useFetchUsers, useUpdateUser } from "../AdminApis/UsersApi";

export const ShowUsers = () => {
  const { data: usersResponse, isLoading, isError } = useFetchUsers();
  const users = usersResponse?.data || [];
  const { mutate: updateUser } = useUpdateUser();

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleEdit = (user) => {
    setCurrentUser({
      ...user,
      isActive: user.isActive,
    });
    setOpenModal(true);
  };

  // Close modal
  const handleClose = () => {
    setOpenModal(false);
    setCurrentUser(null);
  };

  // Save button click handler
  const handleSave = () => {
    if (currentUser) {
      updateUser(
        {
          ...currentUser,
          isActive: !!currentUser.isActive, // Ensure a boolean is sent to the backend
        },
        {
          onSuccess: () => {
            setOpenModal(false);
            setCurrentUser(null);
          },
          onError: (error) => {
            console.error("Error updating user:", error);
          },
        }
      );
    } else {
      alert("Invalid user data.");
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: type === "radio" ? value === "true" : value,
    }));
  };

  // Handle search text change
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Handle page change for pagination
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change for pagination
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };

  // Filter users based on search text
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const AdminUsers = filteredUsers.filter((user) => user.role === "admin");

  return (
    <Container
      maxWidth="xl"
      sx={{ mt: 4, borderRadius: 1, border: 1, borderColor: "divider", p: 2 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5"></Typography>
        <TextField
          label="Search Companies"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={handleSearchChange}
        />
      </Box>

      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="300px"
        >
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography color="error">Error fetching users.</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Updated At</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {AdminUsers.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {user.isActive ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(user)}
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
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={AdminUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </>
      )}

      {/* Edit User Modal */}
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Edit Companies</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            name="name"
            value={currentUser?.name || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            type="text"
            fullWidth
            name="email"
            value={currentUser?.email || ""}
            onChange={handleChange}
          />

          <RadioGroup
            row
            name="isActive"
            value={currentUser?.isActive ? "true" : "false"} // Convert boolean to string for UI
            onChange={handleChange}
          >
            <FormControlLabel value="true" control={<Radio />} label="Active" />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="Inactive"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ShowUsers;
