import React, { useState, useEffect } from "react";
import { useFetchDepartments, getNumberOfUsers } from "./Api/departmentApi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddDepartmentPopup from "./Departments/AddDepartmentPopup";
import style from "./Departments/style.module.scss";
export default function Department() {
  const {
    data: departments = [],
    isLoading,
    isError,
    error,
  } = useFetchDepartments();
  const [open, setOpen] = useState(false);
  const [departmentUsers, setDepartmentUsers] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (departments.length > 0) {
      fetchAllDepartmentUsers();
    }
  }, [departments]);

  const fetchAllDepartmentUsers = async () => {
    try {
      const results = await Promise.all(
        departments.map(async (department) => {
          const count = await getNumberOfUsers(department._id);
          return {
            name: department.title,
            departmentId: department._id,
            count,
          };
        })
      );

      // Store department name and its user count in state
      const usersData = results.reduce((acc, { name, count }) => {
        acc[name] = count;
        return acc;
      }, {});

      setDepartmentUsers(usersData);
    } catch (error) {
      console.error("Error fetching number of users:", error);
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        style={{ marginBottom: "16px" }}
      >
        Add Department
      </Button>
      <AddDepartmentPopup open={open} handleClose={handleClose} />

      {isLoading && <CircularProgress />}
      {isError && (
        <Typography color="error">
          Error fetching departments: {error.message}
        </Typography>
      )}

      {/* Check if departments are available before rendering the table */}
      {!isLoading &&
      !isError &&
      Array.isArray(departments) &&
      departments.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={style.department_table_cell}>
                  Department Name
                </TableCell>
                <TableCell
                  align="right"
                  className={style.department_table_cell}
                >
                  Description
                </TableCell>
                <TableCell
                  align="right"
                  className={style.department_table_cell}
                >
                  Number of Employees
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((department) => (
                <TableRow
                  key={department._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {department.title}
                  </TableCell>
                  <TableCell align="right">{department.description}</TableCell>
                  <TableCell align="right">
                    {departmentUsers[department.title] || 0}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No departments available</Typography> // Display a message if no departments
      )}
    </div>
  );
}
