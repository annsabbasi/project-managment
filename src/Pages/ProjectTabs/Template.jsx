import { Button, Typography } from "@mui/material";
// import theme from "../../Theme/Theme";

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';


export default function Template() {
  return (
    <>
      <Typography
        sx={{
          fontWeight: '600',
          // color: theme.palette.text.primary, // Dynamically set text color
          fontSize: '1.3rem',
        }}
      >
        No active project yet
      </Typography>
      <Button
        variant="contained"
        size="large"
        startIcon={<LightModeOutlinedIcon />}
        // sx={{
        //   backgroundColor: theme.palette.primary.main, // Dynamic primary color
        //   color: theme.palette.primary.contrastText,
        //   '&:hover': {
        //     backgroundColor: theme.palette.primary.dark,
        //   },
        // }}
      >
        Add Project
      </Button>
    </>

  )
}
