import style from './style.module.scss';
import theme from '../../Theme/Theme';


import {
  Table,
  Button, TableRow,
  TableCell,
  TableBody, TableHead,
  TableContainer, Stack,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';


import AddIcon from '@mui/icons-material/Add';
import TextDialog from './TextDialog';
import EditTextDialog from './EditTextDialog';
import { useGetCreateTask, useProjectApproval } from '../../hooks/useTask';
import { useAuth } from '../../context/AuthProvider';


export default function Request() {
  const { user } = useAuth();
  // const { id } = useParams();
  const { data, isLoading, isError, error } = useGetCreateTask();
  const [selectedTask, setSelectedTask] = useState(null);

  // console.log("This is the data", data?.data?.map((e) => e.status))

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

  const { mutate: submitProjectApproval } = useProjectApproval();


  if (isLoading) return <p>loading...</p>;
  if (isError) return <p>Error loading tasks: {error.message}</p>;

  return (
    <TableContainer>
      {data && data?.data?.length > 0 ?
        (

          <Table className={style.table}>
            <TableHead className={style.tableHead}>
              <TableRow className={style.tableRowHead}>
                <TableCell>Project Title</TableCell>
                <TableCell align="left">Owner</TableCell>
                <TableCell align="left">Members</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">Due Date</TableCell>
                <TableCell align="right">Budget</TableCell>
                <TableCell align="right">Points</TableCell>
                <TableCell align="right">&nbsp;</TableCell>
              </TableRow>
            </TableHead>

            <TableBody sx={{ borderTop: '12px solid white' }}>
              {data?.data?.map((task) => {
                return (
                  <TableRow key={task._id} className={style.tableRowBody}>
                    <TableCell component="th" scope="row">{task.projectTitle}</TableCell>
                    <TableCell align="left">{task.assignedBy.name}</TableCell>
                    <TableCell align="left">{task.members}</TableCell>
                    <TableCell align="left">{new Date(task.startDate).toLocaleDateString()}</TableCell>
                    <TableCell align="left">{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell align="left">${task.budget.toLocaleString()}</TableCell>
                    <TableCell align="right">{`${task.points > 40 ? '+' : '-'} ${task.points}`}</TableCell>

                    {/* <TableCell align="right" className={style.btnCell}>
                    {taskData === 'Completed' && (
                      <>
                        <Button
                          variant="outlined"
                          className={style.decline}
                          onClick={() => submitProjectApproval({ taskId: task._id, projectStatus: 'not approved' })}
                        >
                          Decline
                        </Button>
                        <Button
                          variant="contained"
                          className={style.accept}
                          onClick={() => submitProjectApproval({ taskId: task._id, projectStatus: 'approved' })}
                        >
                          Accept
                        </Button>
                      </>
                    )}
                  </TableCell> */}

                    <TableCell align="right" className={style.btnCell}>
                      {user?.role === 'admin' &&
                        <>
                          {task.status === 'Completed' && (
                            <>
                              <Button
                                variant="outlined"
                                className={style.decline}
                                onClick={() =>
                                  submitProjectApproval({ taskId: task._id, projectStatus: 'not approved' })
                                }
                                sx={{
                                  ...(task.projectStatus === 'approved') && {
                                    display: 'none'
                                  }
                                }}
                              >
                                Decline
                              </Button>
                              <Button
                                variant="contained"
                                className={style.accept}
                                onClick={() =>
                                  submitProjectApproval({ taskId: task._id, projectStatus: 'approved' })
                                }
                                sx={{
                                  ...(task.projectStatus === 'not approved') && {
                                    display: 'none'
                                  }
                                }}
                              >
                                Accept
                              </Button>
                            </>
                          )}
                        </>
                      }
                    </TableCell>


                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : (
          <Stack alignItems='center' justifyContent='end' height='50vh' gap={4} variant="div">
            <Typography sx={{ fontWeight: '600', color: theme.palette.grey.darkGrey, fontSize: '1.3rem' }}>No active project yet</Typography>

            <Stack gap={2} width={350} textAlign='center'>
              <Typography component='p' className={style.btnText}>You haven&apos;t started any projects. Begin a new project to see it appear in your active list.</Typography>

              <Link onClick={handleClickOpen}>
                <Button variant='contained' size='large' startIcon={<AddIcon />}
                  className={style.projectBtn} >Add Project</Button>
              </Link>

            </Stack>
            <TextDialog open={dialogOpen} handleClose={handleCloseTab} />
          </Stack>
        )}

      <EditTextDialog open={editDialogOpen} handleClose={handleEditCloseTab} task={selectedTask} />
    </TableContainer >
  );
}
