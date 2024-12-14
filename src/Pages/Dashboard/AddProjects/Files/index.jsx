import style from './style.module.scss'
import PropTypes from 'prop-types';

import {
  Box, Button,
  IconButton, Stack,
  TextField, Typography
} from "@mui/material";


export default function index() {

  return (
    <Stack spacing={5} mt={2}>
      <Stack className={style.itemContainer}>

        <Stack flexDirection="row" alignItems="center" gap={0.3} width="100%">
          <Typography className={style.headText}>Attach Docs Link</Typography>
          <IconButton sx={{
            '&:hover': {
              backgroundColor: 'transparent',
            }, padding: '0',
            cursor: 'default'
          }} disableRipple >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="size-6" style={{ width: '1.6rem', height: '1.6rem', marginLeft: '0.1rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
            </svg>
          </IconButton>
        </Stack>


        <Stack
          gap={2}
          flexDirection="row"
          alignItems="baseline"
          justifyContent="space-between"
          flexWrap="wrap">
          <InputComps label="Title Link" name="titleLink" />
          <InputComps label="Docs Link" name="docsLink" />
        </Stack>

        <Button variant='contained' className={style.linkBtn} size='medium'>Add Link</Button>
      </Stack>


      <Stack className={style.itemContainer}>
        <Stack flexDirection="row" alignItems="center" gap={0.3}>
          <Typography className={style.headText}>All Links</Typography>

          <IconButton
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
              }, padding: '0',
              cursor: 'default'
            }} disableRipple>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" style={{ width: '1.6rem', height: '1.6rem', marginLeft: "0.2rem" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
          </IconButton>
        </Stack>


        <Stack flexDirection="row" gap="1rem" flexWrap="wrap">
          <Typography
            component="a"
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={style.itemTextBody} sx={{ textDecoration: 'none' }}>

            <Box className={style.itemContent}>
              <Stack>
                <Typography variant="p" className={style.itemTextHead}>Title is this</Typography>
                <Typography
                  className={style.itemTextBody} sx={{ textDecoration: 'underline', color: '#0437F2 !important' }}>https://www.youtube.com/</Typography>
              </Stack>
            </Box>

          </Typography>
        </Stack>

      </Stack>
    </Stack>
  )
}

export const InputComps = ({ label, name, }) => {
  return (
    <TextField
      margin="normal"
      size="small"
      label={label}
      name={name}
      variant="standard"
      fullWidth
      sx={{
        backgroundColor: '#ffffff',
        flex: '1 0 300px',
        '& .MuiInputBase-input': {
          padding: '6px 10px',
        },
      }} />
  )
}

InputComps.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}