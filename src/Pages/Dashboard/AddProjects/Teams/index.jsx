import theme from "../../../../Theme/Theme";
import { Box, Stack, Typography, Avatar, Grid } from "@mui/material";

export default function Teams() {

  const persons = [
    { name: 'John Doe', img: '/path/to/avatar1.jpg' },
    { name: 'Jane Smith', img: '/path/to/avatar2.jpg' },
    { name: 'Bob Brown', img: '/path/to/avatar3.jpg' },
    { name: 'Alice White', img: '/path/to/avatar4.jpg' },
  ];


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
        <Typography variant="h5" mb={2} sx={{ fontSize: '1.4rem' }}>All Members</Typography>
        <Grid container spacing={3}>

          {persons.map((person, index) => (
            <Grid item key={index}>
              <Avatar
                alt={person.name}
                src={person.img}
                sx={{ width: 55, height: 55, margin: 'auto', backgroundColor: theme.palette.grey[400] }} />
              <Typography variant="p" align="center" sx={{ marginTop: 1, color: theme.palette.grey[700], fontSize: '0.9rem' }}>{person.name}</Typography>
            </Grid>
          ))}

        </Grid>
      </Box>


    </Stack>
  )
}
