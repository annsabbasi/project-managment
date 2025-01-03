import theme from "../../../../Theme/Theme";
import { Box, Stack, Typography, Avatar, Grid, MenuItem, Menu, IconButton } from "@mui/material";
import style from "./style.module.scss"
import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Teams() {

  const persons = [
    { name: 'John Doe', img: '/path/to/avatar1.jpg' },
    { name: 'Jane Smith', img: '/path/to/avatar2.jpg' },
    { name: 'Bob Brown', img: '/path/to/avatar3.jpg' },
    { name: 'Alice White', img: '/path/to/avatar4.jpg' },
  ];


  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  return (
    <Stack variant="div" gap={6} my={4}>
      <Box>
        <Typography variant="h5" mb={2} sx={{ fontSize: '1.4rem' }}>Head Team</Typography>
        <Grid container spacing={3}>

          {persons.map((person, index) => (
            <Grid item key={index}>
              <Avatar
                alt={person.name}
                src={person.img}
                sx={{ width: 55, height: 55, margin: 'auto', backgroundColor: theme.palette.grey[400] }}
              />
              <Typography variant="p" align="center" sx={{ marginTop: 1, color: theme.palette.grey[700], fontSize: '0.9rem' }}>
                {person.name}
              </Typography>
            </Grid>
          ))}

        </Grid>
      </Box>


      <Box>
        <Typography variant="h5" mb={2} sx={{ fontSize: '1.4rem' }}>
          All Members
        </Typography>
        <Grid container spacing={3}>
          {persons.map((person, index) => (
            <Stack key={index} className={`${style.boxDropDown}`} sx={{ alignItems: 'center' }}>
              <Grid item className={style.gridBox}>
                <Avatar
                  alt={person.name}
                  src={person.img}
                  sx={{ width: 55, height: 55, backgroundColor: theme.palette.grey[400] }} />
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ marginTop: 1, color: theme.palette.grey[700], fontSize: '0.9rem', textAlign: 'center' }}>
                  {person.name}
                </Typography>
                <Typography className={style.QC}>QC</Typography>
                <IconButton
                  onClick={(event) => handleMenuClick(event, person)}
                  className={style.iconButton}>
                  <MoreVertIcon />
                </IconButton>
              </Grid>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                classes={{ paper: style.dropdown }}>
                <MenuItem onClick={handleMenuClose} className={style.boxMenuItem}>
                  Promote to QC
                </MenuItem>
              </Menu>
            </Stack>
          ))}
        </Grid>

      </Box>
    </Stack>
  )
}
