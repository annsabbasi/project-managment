import style from "./style.module.scss";

import {
  Table,
  Button,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableContainer,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import TextDialog from "./TextDialog";
import EditTextDialog from "./EditTextDialog";
import { useGetCreateTask, useProjectApproval } from "../../hooks/useTask";
import { useAuth } from "../../context/AuthProvider";

export default function Request() {
  const { user, theme, mode } = useAuth();
  const { mutate: submitProjectApproval } = useProjectApproval();
  const tableGap =
    mode === "light" ? style.tableBodyLight : style.tableBodyDark;
  const tableClassText =
    mode === "light" ? style.lightTableText : style.darkTableText;

  const { data } = useGetCreateTask();
  const [selectedTask, setSelectedTask] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  const handleCloseTab = () => {
    setDialogOpen(false);
  };

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const handleEditCloseTab = () => {
    setEditDialogOpen(false);
    setSelectedTask(null);
  };

  return (
    <TableContainer>
      {data && data?.data?.length > 0 ? (
        <Table
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            overflow: "visible",
            borderRadius: "0.6rem",
          }}
        >
          <TableHead>
            <TableRow className={style.tableRowHead}>
              <TableCell className={tableClassText}>Project Title</TableCell>
              <TableCell align="left" className={tableClassText}>
                Owner
              </TableCell>
              <TableCell align="left" className={tableClassText}>
                Members
              </TableCell>
              <TableCell align="left" className={tableClassText}>
                Start Date
              </TableCell>
              <TableCell align="left" className={tableClassText}>
                Due Date
              </TableCell>
              <TableCell align="right" className={tableClassText}>
                Budget
              </TableCell>
              <TableCell align="right" className={tableClassText}>
                Points
              </TableCell>
              <TableCell align="right" className={tableClassText}>
                &nbsp;
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className={tableGap}>
            {data?.data?.map((task) => {
              return (
                <TableRow key={task._id} className={style.tableRowBody}>
                  <TableCell component="th" scope="row">
                    {task.projectTitle}
                  </TableCell>
                  <TableCell align="left">{task.assignedBy.name}</TableCell>
                  <TableCell align="left">{task.members}</TableCell>
                  <TableCell align="left">
                    {new Date(task.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="left">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="left">
                    ${task.budget.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">{`${task.points > 40 ? "+" : "-"} ${
                    task.points
                  }`}</TableCell>

                  <TableCell align="right" className={style.btnCell}>
                    {user?.role === "admin" && (
                      <>
                        {task.status === "Completed" && (
                          <>
                            <Button
                              variant="outlined"
                              className={style.decline}
                              onClick={() =>
                                submitProjectApproval({
                                  taskId: task._id,
                                  projectStatus: "not approved",
                                })
                              }
                              sx={{
                                ...(task.projectStatus === "approved" && {
                                  display: "none",
                                }),
                              }}
                            >
                              Decline
                            </Button>

                            <Button
                              variant="contained"
                              className={style.accept}
                              onClick={() =>
                                submitProjectApproval({
                                  taskId: task._id,
                                  projectStatus: "approved",
                                })
                              }
                              sx={{
                                ...(task.projectStatus === "not approved" && {
                                  display: "none",
                                }),
                              }}
                            >
                              Accept
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <Stack
          alignItems="center"
          justifyContent="end"
          height="50vh"
          gap={4}
          variant="div"
        >
          <Typography sx={{ fontWeight: "600", fontSize: "1.3rem" }}>
            No active project yet
          </Typography>

          <Stack gap={2} width={350} textAlign="center">
            <Typography component="p" className={style.btnText}>
              You haven&apos;t started any projects. Begin a new project to see
              it appear in your active list.
            </Typography>

            <Link onClick={handleClickOpen}>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                className={style.projectBtn}
                sx={{
                  color: theme.palette.text.primary,
                  border: `1px solid ${theme.palette.text.primary}`,
                  "&:hover": {
                    opacity: `0.4 !important`,
                  },
                }}
              >
                Add Project
              </Button>
            </Link>
          </Stack>
          <TextDialog open={dialogOpen} handleClose={handleCloseTab} />
        </Stack>
      )}

      <EditTextDialog
        open={editDialogOpen}
        handleClose={handleEditCloseTab}
        task={selectedTask}
      />
    </TableContainer>
  );
}
