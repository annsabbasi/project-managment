/* eslint-disable no-unused-vars */
import style from "./style.module.scss";
import MoreVertIcon from '@mui/icons-material/MoreVert';


import {
  Table, Box, Stack,
  Typography, Avatar,
  Grid, MenuItem,
  Menu, IconButton,
  TableRow, TableHead,
  TableCell, TableBody,
  Button, TableContainer,
} from "@mui/material";


import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";


import { getUserForSubTask } from "../../../../api/userSubTask";
import { usePromoteUser } from "../../../../hooks/useAuth";
import { useAuth } from "../../../../context/AuthProvider";
import { usersTimeProject } from "../../../../api/userTracker";



export default function Teams() {
  const { user, theme, mode } = useAuth();
  const tableGap = mode === 'light' ? style.tableBodyLight : style.tableBodyDark;
  const tableClassText = mode === 'light' ? 'lightTableText' : 'darkTableText';

  const { id: projectId } = useParams();
  // const [_, setUserRole] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);


  const handleMenuClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    // setUserRole(userId)
  };


  const { data: getUserInfo } = useQuery({
    queryKey: ['assignedUsers', projectId],
    queryFn: () => getUserForSubTask(projectId),
    enabled: !!projectId,
  });
  const userData = getUserInfo?.data;
  const QcAdmins = userData?.filter((user) => user.role === "QcAdmin") || [];
  const Users = userData?.filter((user) => user.role === "user") || [];


  const { mutate: promoteUser } = usePromoteUser();
  const handlePromoteUser = (userId) => {
    promoteUser({ userId });
    setAnchorEl(null);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAnchorEl(null);
  };


  const { id: ProjectId } = useParams();

  const { data: usersData } = useQuery({
    queryKey: ['elapsedTime', ProjectId],
    queryFn: () => usersTimeProject(ProjectId),
    enabled: !!ProjectId,
  })

  console.log("usersData Data fetching Time", usersData)

  return (
    <Stack variant="div" gap={8} my={4}>
      <Box>
        <Typography variant="h6" mb={1} className={tableClassText}>
          Team: (QcAdmin)
        </Typography>

        {QcAdmins.length > 0 ? (
          <Grid container spacing={3} ml="1px">
            {QcAdmins?.map((person, index) => (
              <Stack key={index} className={`${style.boxDropDown}`} sx={{ alignItems: 'center' }}>

                <Grid item className={style.gridBox}>
                  <Avatar alt={person.name} src={person.avatar} sx={{ width: 55, height: 55 }} />
                  <Typography variant="body2" align="center" sx={{ marginTop: 1, fontSize: '0.8rem', textAlign: 'center' }}>
                    {person.userId}
                  </Typography>

                  {person.role === "QcAdmin" ? (
                    <Typography className={style.QC}>QC</Typography>
                  ) : (
                    <IconButton onClick={(event) => handleMenuClick(event, person)}
                      className={style.iconButton}>
                      <MoreVertIcon />
                    </IconButton>
                  )}
                </Grid>


                {/* <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  classes={{ paper: style.dropdown }}>

                  <MenuItem onClick={() => handlePromoteUser(person.id,
                    toast.success(`${person.userId} Successfully Promoted to QCAdmin`, {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: false,
                    })
                  )} className={style.boxMenuItem}>Promote to QC</MenuItem>
                </Menu> */}
              </Stack>

            ))}
          </Grid>
        ) : (
          <Typography variant="p" mb={3} className={style.noTaskAssignText}>
            No tasks assigned QcAdmin
          </Typography>
        )}
      </Box>



      {/* TEAM USERS */}
      <Box>
        <Typography variant="h6" mb={1} className={tableClassText}>
          Team: (users)
        </Typography>

        {Users.length > 0 ? (
          <Grid container spacing={3} ml="1px">

            {Users?.map((person, index) => (
              <Stack key={index} className={`${style.boxDropDown}`} sx={{ alignItems: 'center' }}>
                <Grid item className={style.gridBox}>
                  <Avatar alt={person.name} src={person.avatar} sx={{ width: 55, height: 55 }} />
                  <Typography variant="body2" align="center" sx={{ marginTop: 1, fontSize: '0.8rem', textAlign: 'center' }}>{person.userId}</Typography>

                  {person.role === "user" ? (
                    <Typography className={style.QC}>U</Typography>
                  ) : null}

                  <IconButton
                    onClick={(event) => handleMenuClick(event, person)}
                    className={style.iconButton}>
                    <MoreVertIcon />
                  </IconButton>
                </Grid>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }} classes={{ paper: style.dropdown }}>

                  <MenuItem onClick={() => handlePromoteUser(person.id,
                    toast.success(`${person.userId} Successfully Promoted to QCAdmin`, {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: false,
                    })
                  )} className={style.boxMenuItem}>Promote to QC</MenuItem>
                </Menu>
              </Stack>

            ))}
          </Grid>
        ) : (
          <Typography variant="p" mb={3} className={style.noTaskAssignText}>
            No tasks assigned users
          </Typography>
        )}
      </Box>

      <TableContainer>
        <Typography variant="h6" mb={1} className={tableClassText}>
          Employee&apos;s Time-Track
        </Typography>
        <Table
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            overflow: 'visible',
            borderRadius: '0.6rem'
          }}>

          <TableHead>
            <TableRow className={style.tableRowHead}>
              <TableCell className={tableClassText}>Employee</TableCell>
              <TableCell align="center" className={tableClassText}>TimeIn</TableCell>
              <TableCell align="center" className={tableClassText}>TimeOut</TableCell>
              <TableCell align="center" className={tableClassText}>Tracked Time</TableCell>
              <TableCell align="center" className={tableClassText}>Date</TableCell>
              <TableCell align="center" className={tableClassText}>Weekly Time</TableCell>
              <TableCell align="center" className={tableClassText}>Monthly Time</TableCell>
            </TableRow>
          </TableHead>

          <TableBody className={tableGap}>
            <TableRow className={style.tableRowBody}>
              <TableCell component="th" scope="row">1</TableCell>
              <TableCell align="center">21:04</TableCell>
              <TableCell align="center">3</TableCell>
              <TableCell align="center">4</TableCell>
              <TableCell align="center">5</TableCell>
              <TableCell align="center">6</TableCell>
              <TableCell align="center">$7</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}
