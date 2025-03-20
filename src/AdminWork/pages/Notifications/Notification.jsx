import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useAddNotification } from "../AdminApis/NotificationApi"; // Ensure the path is correct

export const AddNotification = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Get the mutation function and states from useAddNotification hook
  const {
    mutate: addNotification,
    isLoading,
    isError,
    error,
  } = useAddNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      console.error("All fields are required.");
      return;
    }

    // Call the mutation function to create the notification
    addNotification(formData, {
      onSuccess: () => {
        // Reset form data after successful submission
        console.log("Notification added successfully");
        setFormData({
          title: "",
          description: "",
        });
      },
      onError: (err) => {
        console.error("Error adding notification:", err);
      },
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 3, border: "1px solid #ccc", borderRadius: 2 }}
      >
        <Typography variant="h5" gutterBottom>
          Add Notification
        </Typography>

        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
          required
        />

        {isLoading ? (
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Typography color="error" sx={{ mt: 2 }}>
            Error: {error?.message || "Failed to add notification"}
          </Typography>
        ) : null}

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Notification"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddNotification;
