import PropTypes from "prop-types";
import { useState } from "react";
import { useAddDepartment } from "../Api/departmentApi";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Typography,
} from "@mui/material";

const AddDepartmentPopup = ({ open, handleClose }) => {
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const {
    mutate: addDepartment,
    isLoading,
    isError,
    error,
  } = useAddDepartment();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const departmentData = {
      title: data.title,
      description: data.description,
    };

    addDepartment(departmentData, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  const renderTextField = (name, label, multiline = false, type = "text") => (
    <TextField
      margin="dense"
      name={name}
      label={label}
      fullWidth
      variant="outlined"
      size="small"
      value={data[name]}
      onChange={handleChange}
      multiline={multiline}
      type={type}
    />
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Department</DialogTitle>
      <DialogContent>
        {isLoading && <CircularProgress />}
        {isError && (
          <Typography color="error">Error: {error.message}</Typography>
        )}
        <form onSubmit={handleSubmit}>
          {renderTextField("title", "Title")}
          {renderTextField("description", "Description", true)}
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={isLoading}>
              Add
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

AddDepartmentPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddDepartmentPopup;
