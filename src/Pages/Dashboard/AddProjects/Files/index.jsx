import { Box, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import style from './style.module.scss'

export default function index() {
  return (
    <Stack spacing={5} mt={2} >
      <Stack className={style.itemContainer}>
        <Stack flexDirection="row" alignItems="center" gap={0.3}>
          <Typography className={style.headText}>Folders</Typography>
          <IconButton
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
              },
              padding: '0',
              cursor: 'default'
            }}
            disableRipple
          >
            <AddIcon />
          </IconButton>
        </Stack>

        <Stack gap={1} flexDirection="row" alignItems="center">
          <Box className={style.itemContent}>
            <IconButton
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
              disableRipple
            >

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
              </svg>

            </IconButton>
            <Stack>
              <Typography className={style.itemTextHead}>Documents</Typography>
              <Typography className={style.itemTextBody}>add docs</Typography>
            </Stack>
          </Box>

          <Box className={style.itemContent}>
            <IconButton
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
              disableRipple
            >

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
              </svg>

            </IconButton>
            <Stack>
              <Typography className={style.itemTextHead}>Meeting with Bruce</Typography>
              <Typography className={style.itemTextBody}>material...</Typography>
            </Stack>
          </Box>

          <Box className={style.itemContent}>
            <IconButton
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
              disableRipple
            >

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
              </svg>

            </IconButton>
            <Stack>
              <Typography className={style.itemTextHead}>Project Details</Typography>
              <Typography className={style.itemTextBody}>......</Typography>
            </Stack>
          </Box>
        </Stack>
      </Stack>

      <Stack className={style.itemContainer}>
        <Stack flexDirection="row" alignItems="center" gap={0.3}>
          <Typography className={style.headText}>Features</Typography>
          <IconButton
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
              },
              padding: '0',
              cursor: 'default'
            }} disableRipple>
            <AdjustOutlinedIcon />
          </IconButton>
        </Stack>

        <Box className={style.itemContent}>
          <IconButton
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
              }
            }} disableRipple>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
            </svg>

          </IconButton>
          <Stack>
            <Typography className={style.itemTextHead}>Bizz Plan</Typography>
            <Typography className={style.itemTextBody}>...</Typography>
          </Stack>
        </Box>

      </Stack>
    </Stack>
  )
}


{/* <SourceOutlinedIcon sx={{
              fontSize: '1.8rem',
              color: 'rgba(0, 0, 0, 0.4)',
              stroke: 'currentColor',
              strokeWidth: 0.1,
            }} /> */}