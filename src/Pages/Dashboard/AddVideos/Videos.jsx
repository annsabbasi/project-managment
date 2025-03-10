import React, { useRef } from 'react';
import style from './styles.module.scss';
import { Box, Grid, Typography, Card, CardContent, CardActionArea, IconButton, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../../Constants/route';
import { useFetchVideos } from './videoApi/addVideo';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import { useFetchVideos } from "./videoApi/fetchVideos";

const Videos = () => {
    const { data: videos, isLoading, isError } = useFetchVideos();
    const videoRefs = useRef([]);

    const handleVideoHover = (videoRef) => {
        videoRef?.current?.play();
    };
    const handleVideoMouseOut = (videoRef) => {
        videoRef?.current?.pause();
    };
    if (isLoading) {
        return <>
            <Skeleton variant="text" width="90%" height={90} />
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="85%" />
            <Skeleton variant="text" width="80%" />
        </>;
    }

    if (isError) {
        return <Typography>Error loading videos. Please try again later.</Typography>;
    }

    if (!Array.isArray(videos?.data)) {
        return <Typography>No videos available</Typography>;
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {videos?.data.map((video, index) => {
                    videoRefs.current[index] = React.createRef();
                    return (
                        <Grid item xs={12} sm={6} md={3} key={video._id}>
                            <Link className={`${style.link} ${style.linkContainer}`} to={`/${RouteNames.CLIENT}/${RouteNames.SINGLEVIDEO}/${video._id}`}>
                                <Card sx={{ height: '100%', boxShadow: 'none' }}>
                                    <CardActionArea
                                        onMouseEnter={() => handleVideoHover(videoRefs.current[index])}
                                        onMouseLeave={() => handleVideoMouseOut(videoRefs.current[index])}>
                                        <video
                                            ref={videoRefs.current[index]}
                                            width="100%"
                                            height="140"
                                            src={video.video}
                                            muted
                                            controls={false}
                                            style={{ objectFit: 'cover' }} />
                                    </CardActionArea>
                                    <CardContent sx={{ paddingBlock: '0.2rem', paddingInline: '0.4rem' }}>
                                        <Typography variant="body2" color="text.secondary" className={style.textClamp}>
                                            <Box >
                                                <IconButton className={style.linkDelete} onClick={() => { }}>
                                                    <DeleteOutlineIcon />
                                                </IconButton>
                                            </Box>
                                            {video.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default Videos;

