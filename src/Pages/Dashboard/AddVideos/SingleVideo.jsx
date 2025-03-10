import { Container, Typography, Box, IconButton, Stack, Skeleton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { usegetSingleVideo } from "./videoApi/addVideo";

const SingleVideo = () => {
    const { id } = useParams();

    const { data, isLoading } = usegetSingleVideo(id);

    return (
        <Stack >
            {/* Video Section */}
            <Link to={'/client'}>
                <IconButton >
                    <ArrowBackIcon />
                </IconButton>
            </Link>

            <Container sx={{ mt: 4, mb: 4 }}>

                {isLoading ? (
                    <>
                        <Skeleton variant="text" width="90%" height={90} />
                        <Skeleton variant="text" width="90%" />
                        <Skeleton variant="text" width="85%" />
                        <Skeleton variant="text" width="80%" />
                    </>
                ) : (
                    <>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                mb: 4,
                                borderRadius: 2,
                                overflow: "hidden",
                                boxShadow: 3,
                            }}>
                            <video
                                controls
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "8px",
                                }}
                                key={data?.data?.video}
                            >
                                {data?.data?.video && (
                                    <source
                                        src={data.data.video}
                                        type="video/mp4"
                                    />
                                )}
                                Your browser does not support the video tag.
                            </video>
                        </Box>


                        {/* Description Section */}
                        <Box>
                            <Typography
                                variant="h4"
                                gutterBottom
                                sx={{ fontWeight: "bold", mb: 2, mt: 5, textAlign: "left" }}>Video Description</Typography>
                            <Typography
                                variant="body1"
                                sx={{ textAlign: "justify", mb: 2, lineHeight: 1.8 }}>
                                {data?.data?.description}
                            </Typography>
                        </Box>
                    </>
                )}
            </Container>

        </Stack>
    );
};

export default SingleVideo;
