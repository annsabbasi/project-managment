import React, { useRef } from 'react';
import style from './styles.module.scss'

import pathVideo1 from '../../../assets/videos/one.mp4';
import pathVideo2 from '../../../assets/videos/two.mp4';
import pathVideo3 from '../../../assets/videos/three.mp4';

import {
    Box, Grid,
    Typography, Card,
    CardContent, CardActionArea
} from '@mui/material';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../../Constants/route';

const Videos = () => {
    const videos = [
        { id: 1, title: 'Bees get flying', description: 'This is a description for video 1', videoUrl: pathVideo3 },
        { id: 2, title: 'Camera Bird', description: 'This is a description for video 2', videoUrl: pathVideo1 },
        { id: 3, title: 'Squirrel is eating', description: 'This is a description for video 3', videoUrl: pathVideo2 },
        { id: 4, title: 'Video Title 4', description: 'This is a description for video 4', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 5, title: 'Squirrel is eating', description: 'This is a description for video 3', videoUrl: pathVideo2 },
        { id: 6, title: 'Bees get flying', description: 'This is a description for video 1', videoUrl: pathVideo3 },
        { id: 7, title: 'Video Title 4', description: 'This is a description for video 4', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 8, title: 'Camera Bird', description: 'This is a description for video 2', videoUrl: pathVideo1 },
        { id: 9, title: 'Squirrel is eating', description: 'This is a description for video 3', videoUrl: pathVideo2 },
        { id: 10, title: 'Video Title 4', description: 'This is a description for video 4', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 11, title: 'Squirrel is eating', description: 'This is a description for video 3', videoUrl: pathVideo2 },
    ];


    const handleVideoHover = (videoRef) => {
        videoRef.current.play();
    };
    const handleVideoMouseOut = (videoRef) => {
        videoRef.current.pause();
    };
    // const handleVideoClick = (videoRef) => {
    //     if (videoRef.current.requestFullscreen) {
    //         videoRef.current.requestFullscreen();
    //     }
    //     videoRef.current.play();
    // };


    const videoRefs = useRef(videos.map(() => React.createRef()));

    return (
        <Box sx={{ flexGrow: 1 }}>
            
            <Grid container spacing={2}>

                {videos.map((video, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={3} key={video.id}>

                            <Link className={style.link} to={`/${RouteNames.CLIENT}/${RouteNames.SINGLEVIDEO}/${video.id}`}>
                                <Card sx={{ height: '100%', boxShadow: 'none' }}>

                                    <CardActionArea
                                        onMouseEnter={() => handleVideoHover(videoRefs.current[index])}
                                        onMouseLeave={() => handleVideoMouseOut(videoRefs.current[index])}
                                        // onClick={() => handleVideoClick(videoRefs.current[index])}
                                        >
                                        <video
                                            ref={videoRefs.current[index]}
                                            width="100%"
                                            height="140"
                                            src={video.videoUrl}
                                            muted
                                            controls={false}
                                            style={{ objectFit: 'cover' }} />
                                    </CardActionArea>


                                    <CardContent sx={{ paddingBlock: '0.2rem', paddingInline: '0.2rem' }}>
                                        <Typography variant="body2" color="text.secondary" className={style.textClamp}>
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