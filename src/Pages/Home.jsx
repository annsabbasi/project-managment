import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <Typography>Home page coming soon for</Typography>
      <Typography>Task Managment APP</Typography>
      <IconButton sx={{ border: '1px solid grey', borderRadius: '0.4rem' }}>
        <Link to='/project'>Go to the Dashboard</Link>
      </IconButton>
    </Box>
  )
}
