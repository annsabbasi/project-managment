import React from "react";
import style from "./styles.module.scss";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useFetchVideos } from "../AddVideos/videoApi/addVideo";
import RenderVideos from "../AddVideos/renderVideos";
const Videos = () => {
  const { data: videos, isLoading, isError } = useFetchVideos();

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
  return (
    <Stack spacing={15} mt={4}>
      <Stack>
        {uploadedVideos.length > 0 ? (
          <Typography variant="h6" className={style.videoTitle}>
            Uploaded Videos
          </Typography>
        ) : (
          <>
            <Typography variant="h1" className={style.videoTitle}>
              Uploaded Videos
            </Typography>
            <Typography variant="body1" className={style.videoTitleBody}>
              Uploaded videos unavailable
            </Typography>
          </>
        )}
        <Grid container spacing={2}>
          {<RenderVideos videos={uploadedVideos} />}
        </Grid>
      </Stack>

      <Stack>
        {recordedVideos.length > 0 ? (
          <Typography
            variant="h1"
            className={style.videoTitle}
            sx={{ marginTop: 4 }}
          >
            Recorded Videos
          </Typography>
        ) : (
          <>
            <Typography variant="h1" className={style.videoTitle}>
              Recorded Videos
            </Typography>
            <Typography variant="body1" className={style.videoTitleBody}>
              Recorded videos unavailable
            </Typography>
          </>
        )}
        <Grid container spacing={2}>
          {<RenderVideos videos={recordedVideos} />}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Videos;
