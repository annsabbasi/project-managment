import { Grid, Card, CardContent, Typography, Divider, Box, IconButton, Stack } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import style from './DashboardScss/project.module.scss'
import { useState } from "react";
import TextDialog from "./Departments/TextDialog";

const data = [
  { title: "Manager", designation: "Finance" },
  { title: "Developer", designation: "Software" },
  { title: "Designer", designation: "UI/UX" },
];

const Dashboard = () => {

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  const handleCloseTab = () => {
    setDialogOpen(false);
  };


  return (
    <Box sx={{ padding: 2 }}>
      <Stack className={style.addItemHeader} sx={{ width: 'fit-content' }}>
        <Link onClick={handleClickOpen} className={style.addItemLink}>
          <Typography className={style.addItemText}>Add Here</Typography>
          <IconButton disableRipple><AddIcon /></IconButton>
        </Link>
      </Stack>

      <Grid container spacing={2}>
        {data.map((item, index) => (
          // <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
          <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
            <Card sx={{ boxShadow: 2, padding: 2 }}>
              <CardContent>

                {/* Heading Section */}
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6" fontWeight="bold" sx={{ color: "#424242", fontWeight: "500" }}>Title</Typography>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ mx: 2, backgroundColor: "silver", marginLeft: "25px" }} />
                  <Typography variant="h6" fontWeight="bold" sx={{ color: "#424242", fontWeight: "500" }}>Designation</Typography>
                </Box>

                <Divider sx={{ my: 1, backgroundColor: "silver" }} />

                {/* Details Section */}
                {data.map((i, index) => (
                  <Box key={index} display="flex" justifyContent="space-between">
                    <Typography variant="body1" sx={{ color: "#424242", fontWeight: "500", marginBottom: "10px" }}>{i.title}</Typography>
                    <Typography variant="body1" sx={{ textAlign: "left", marginRight: "10px", color: "#424242" }}>{i.designation}</Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 1, backgroundColor: "silver" }} />

                <Stack mt={3}>
                  <Typography mb={1} variant="h6" fontWeight="bold" sx={{ color: "#424242", fontWeight: "500" }}>Description</Typography>
                  <Typography sx={{ color: "rgb(122, 122, 122)", fontWeight: "500", fontSize: '0.8rem' }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus ipsa aut eligendi. Nostrum, error! Similique perspiciatis pariatur culpa molestiae non.</Typography>
                </Stack>
              </CardContent>
            </Card>

          </Grid>
        ))}
      </Grid>

      <TextDialog open={dialogOpen} handleClose={handleCloseTab} />
    </Box>
  );
};

export default Dashboard;
