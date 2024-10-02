import { Box, Typography } from "@mui/material";
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
      <Typography>Hello World</Typography>
      <Link to='/project'>Go to the Dashboard</Link>
    </Box>
  )
}
