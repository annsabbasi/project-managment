import { Container, Typography, Box, IconButton, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SingleVideo = () => {
    return (
        <Stack >
            {/* Video Section */}
            <Link to={'/client'}>
                <IconButton >
                    <ArrowBackIcon />
                </IconButton>
            </Link>

            <Container sx={{ mt: 4, mb: 4 }}>
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
                        }}>
                        <source
                            src="https://www.w3schools.com/html/mov_bbb.mp4"
                            type="video/mp4" />
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
                        This is the first paragraph of the video description. It provides an
                        introduction to the content of the video, explaining its purpose and
                        significance. This paragraph is intended to give the reader a clear
                        understanding of what they can expect from the video.
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ textAlign: "justify", mb: 2, lineHeight: 1.8 }}>
                        In the second paragraph, we delve deeper into the specifics of the
                        video&lsquo;s content. This section highlights the key points, concepts, or
                        topics covered in the video. It is important to keep this part
                        informative yet concise to maintain the reader&#39;s interest.
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ textAlign: "justify", mb: 2, lineHeight: 1.8 }}>
                        Finally, the third paragraph concludes the description by summarizing
                        the value the viewer can gain from watching the video. Whether it&apos;s
                        educational, entertaining, or inspirational, this part emphasizes the
                        unique qualities of the video and encourages the reader to explore it
                        further.
                    </Typography>
                </Box>
            </Container>

        </Stack>
    );
};

export default SingleVideo;
