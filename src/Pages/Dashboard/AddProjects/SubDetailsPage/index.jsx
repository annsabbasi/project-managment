import style from "./style.module.scss"
import Image2 from "../../../../assets/demoImage/2.jpg"
import Image3 from "../../../../assets/demoImage/3.jpg"
import Image4 from "../../../../assets/demoImage/4.jpg"
import { useState } from "react";
import { useAuth } from "../../../../context/AuthProvider";
import {
    Container, Typography,
    Box, Stack,
    TableBody, TableRow,
    TableCell, TableHead,
    Table, TableContainer,
    Grid, Dialog,
    IconButton
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const Index = () => {

    const { theme, mode } = useAuth();
    const tableGap = mode === 'light' ? style.tableBodyLight : style.tableBodyDark;
    const tableClassText = mode === 'light' ? 'lightTableText' : 'darkTableText';

    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleOpen = (imageSrc) => {
        setSelectedImage(imageSrc);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage(null);
    };
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    return (
        <Container >
            <Link className={style.goBack} onClick={goBack}>
                <IconButton disableRipple >
                    <ArrowBackIosNewIcon sx={{ color: theme.palette.text.primary }} />
                </IconButton>
                <Typography className={style.goBackTitle} sx={{ color: theme.palette.text.primary }}>Return</Typography>
            </Link>
            <Stack variant="div" gap={8} my={4}>
                <Box>
                    <Typography variant="h6" mb={1} className={tableClassText}>
                        Task Name: (Person Name)
                    </Typography>
                    <Typography variant="body1" className={`${style.galleryDate} ${tableClassText}`}>
                        12-January-2020
                    </Typography>

                    <Grid container spacing={3} ml="1px" >
                        <Stack className={`${style.boxDropDown}`} sx={{ alignItems: 'center' }} >

                            <Grid item className={style.gridBox}>
                                {[Image2, Image3, Image4, Image2, Image3, Image4, Image2, Image3, Image4,].map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt="Snap Shots"
                                        width="200"
                                        className={style.snapShotImg}
                                        onClick={() => handleOpen(image)}
                                    />
                                ))}
                            </Grid>

                        </Stack>

                    </Grid>
                    <Typography variant="p" mb={3} className={style.noTaskAssignText}>
                        No Current Snap-Shots
                    </Typography>
                    <Dialog open={open} onClose={handleClose} maxWidth="lg">
                        {selectedImage && (
                            <img src={selectedImage} alt="Enlarged View" style={{ width: "100%", height: "auto" }} />
                        )}
                    </Dialog>
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
        </Container>
    );
};

export default Index;