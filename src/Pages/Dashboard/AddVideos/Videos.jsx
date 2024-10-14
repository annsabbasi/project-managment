import React, { useRef } from 'react';
import { Box, Grid, Typography, Card, CardContent, CardActionArea } from '@mui/material';
import pathVideo1 from '../../../assets/videos/one.mp4';
import pathVideo2 from '../../../assets/videos/two.mp4';
import pathVideo3 from '../../../assets/videos/three.mp4';
import theme from '../../../Theme/Theme';

const Videos = () => {
    const videos = [
        { id: 1, title: 'Bees get flying', description: 'This is a description for video 1', videoUrl: pathVideo3 },
        { id: 2, title: 'Camera Bird', description: 'This is a description for video 2', videoUrl: pathVideo1 },
        { id: 3, title: 'Squirrel is eating', description: 'This is a description for video 3', videoUrl: pathVideo2 },
        { id: 4, title: 'Video Title 4', description: 'This is a description for video 4', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 3, title: 'Squirrel is eating', description: 'This is a description for video 3', videoUrl: pathVideo2 },
        { id: 1, title: 'Bees get flying', description: 'This is a description for video 1', videoUrl: pathVideo3 },
        { id: 4, title: 'Video Title 4', description: 'This is a description for video 4', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 2, title: 'Camera Bird', description: 'This is a description for video 2', videoUrl: pathVideo1 },
        { id: 3, title: 'Squirrel is eating', description: 'This is a description for video 3', videoUrl: pathVideo2 },
        { id: 4, title: 'Video Title 4', description: 'This is a description for video 4', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 3, title: 'Squirrel is eating', description: 'This is a description for video 3', videoUrl: pathVideo2 },
    ];

    const handleVideoHover = (videoRef) => {
        videoRef.current.play();
    };

    const handleVideoMouseOut = (videoRef) => {
        videoRef.current.pause();
        // videoRef.current.currentTime = 0;
    };

    const handleVideoClick = (videoRef) => {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        }
        videoRef.current.play();
    };

    const videoRefs = useRef(videos.map(() => React.createRef()));

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {videos.map((video, index) => {
                    // const videoRef = useRef(null);

                    return (
                        <Grid item xs={12} sm={6} md={3} key={video.id}>
                            <Card sx={{ height: '100%', boxShadow: 'none' }}>
                                <CardActionArea
                                    onMouseEnter={() => handleVideoHover(videoRefs.current[index])}
                                    onMouseLeave={() => handleVideoMouseOut(videoRefs.current[index])}
                                    onClick={() => handleVideoClick(videoRefs.current[index])}
                                >
                                    <video
                                        ref={videoRefs.current[index]}
                                        width="100%"
                                        height="140"
                                        src={video.videoUrl}
                                        muted
                                        controls={false}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </CardActionArea>
                                <CardContent sx={{ paddingBlock: '0.2rem', paddingInline: '0.2rem' }}>
                                    <Typography variant="h6" component="div" noWrap sx={{ fontSize: '1rem', fontWeight: '600', color: theme.palette.grey[900] }} >
                                        {video.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" noWrap>
                                        {video.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default Videos;
