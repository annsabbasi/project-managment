import { Card, CardContent, Typography, Box, Grid, Stack } from "@mui/material";
import style from './style.module.scss'

const Page1 = () => {
  // Mock data for the number of users subscribed to each plan
  const subscriptions = {
    basic: 120,
    standard: 230,
    premium: 95,
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography className={style.headText}>Subscribers List</Typography>

      <Stack
        flexDirection="row"
        flexWrap="wrap"
        gap={4}
        justifyContent="center">
        <Stack className={style.content} flexGrow={1} flexBasis="45%" minWidth="300px">
          <Typography className={style.contentHeadText}>Basic Plan</Typography>
          <Stack flexDirection="row" gap={4} mt={1}>
            <Box>
              <Typography className={style.totalUser}>Total User</Typography>
              <Typography className={style.totalUserNumber}>+90</Typography>
            </Box>
            <Box>
              <Typography className={style.totalUser}>Total User Left</Typography>
              <Typography className={style.totalUserDanger}>-182</Typography>
            </Box>
          </Stack>
        </Stack>

        <Stack className={style.content} flexGrow={1} flexBasis="45%" minWidth="300px">
          <Typography className={style.contentHeadTextStandard}>Standard Plan</Typography>
          <Stack flexDirection="row" gap={4} mt={1}>
            <Box>
              <Typography className={style.totalUser}>Total User</Typography>
              <Typography className={style.totalUserNumber}>+90</Typography>
            </Box>
            <Box>
              <Typography className={style.totalUser}>Total User Left</Typography>
              <Typography className={style.totalUserDanger}>-182</Typography>
            </Box>
          </Stack>
        </Stack>

        <Stack className={style.content} flexGrow={1} flexBasis="90%" minWidth="300px">
          <Typography className={style.contentHeadTextPremium}>Premium Plan</Typography>
          <Stack flexDirection="row" gap={4} mt={1}>
            <Box>
              <Typography className={style.totalUser}>Total User</Typography>
              <Typography className={style.totalUserNumber}>+90</Typography>
            </Box>
            <Box>
              <Typography className={style.totalUser}>Total User Left</Typography>
              <Typography className={style.totalUserDanger}>-182</Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>

    </Box>
  );
};

export default Page1;
