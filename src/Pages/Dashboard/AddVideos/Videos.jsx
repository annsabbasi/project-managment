import React, { useRef } from "react";
import style from "./styles.module.scss";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";
import { RouteNames } from "../../../Constants/route";
import { useFetchVideos } from "./videoApi/addVideo";

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
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return (
      <Typography>Error loading videos. Please try again later.</Typography>
    );
  }

  if (!Array.isArray(videos?.data)) {
    return <Typography>No videos available</Typography>;
  }

  const uploadedVideos = videos.data.filter((video) => video.type === "Upload");
  const recordedVideos = videos.data.filter((video) => video.type === "Record");

  const renderVideos = (videos) => {
    return videos.map((video, index) => {
      videoRefs.current[index] = React.createRef();
      return (
        <Grid item xs={12} sm={6} md={3} key={video._id}>
          <Link
            className={style.link}
            to={`/${RouteNames.CLIENT}/${RouteNames.SINGLEVIDEO}/${video._id}`}
          >
            <Card sx={{ height: "100%", boxShadow: "none" }}>
              <CardActionArea
                onMouseEnter={() => handleVideoHover(videoRefs.current[index])}
                onMouseLeave={() =>
                  handleVideoMouseOut(videoRefs.current[index])
                }
              >
                <video
                  ref={videoRefs.current[index]}
                  width="100%"
                  height="140"
                  src={video.video}
                  muted
                  controls={false}
                  style={{ objectFit: "cover" }}
                />
              </CardActionArea>
              <CardContent
                sx={{ paddingBlock: "0.2rem", paddingInline: "0.2rem" }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className={style.textClamp}
                >
                  {video.description}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      );
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h6" className={style.videoTitle}>
        Uploaded Videos
      </Typography>
      <Grid container spacing={2}>
        {renderVideos(uploadedVideos)}
      </Grid>
      <Typography
        variant="h6"
        className={style.videoTitle}
        sx={{ marginTop: 4 }}
      >
        Recorded Videos
      </Typography>
      <Grid container spacing={2}>
        {renderVideos(recordedVideos)}
      </Grid>
    </Box>
  );
};

export default Videos;
