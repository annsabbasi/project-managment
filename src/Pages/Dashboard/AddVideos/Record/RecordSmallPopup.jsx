import React, { useState, useEffect } from "react";
import style from "./../styles.module.scss";
import Tooltip from "@mui/material/Tooltip";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import CloseIcon from "@mui/icons-material/Close";
import StopIcon from "@mui/icons-material/Stop";
import { ReactMediaRecorder } from "react-media-recorder";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import RecordingUpload from "./RecordingUpload";

export const RecordSmallPopup = (prop) => {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [deleteRecording, setDeleteRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showPopups, setShowPopups] = useState(prop.showPopup);

  useEffect(() => {
    setShowPopups(prop.showPopup);
  }, [prop.showPopup]);

  const handleRecordingStart = (startRecording) => {
    setRecording(true);
    startRecording();
  };

  const handleRecordingStop = (stopRecording) => {
    setRecording(false);
    stopRecording();
  };

  const handlePauseRecording = (pauseRecording) => {
    setPaused(true);
    pauseRecording();
  };

  const handleResumeRecording = (resumeRecording) => {
    setPaused(false);
    resumeRecording();
  };

  const handleDeleteRecording = (stopRecording, clearBlobUrl) => {
    setRecording(false);
    stopRecording();
    clearBlobUrl();
    setDeleteRecording(true);
  };

  const handleRestartRecording = (
    stopRecording,
    clearBlobUrl,
    startRecording
  ) => {
    stopRecording();
    clearBlobUrl();
    startRecording();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleRecordingComplete = (blobUrl) => {
    setVideoURL(blobUrl);
    if (blobUrl.size > 100 * 1024 * 1024) {
      // 100MB
      setSnackbarOpen(true);
    }
  };

  return (
    <ReactMediaRecorder
      screen
      audio
      onStop={handleRecordingComplete}
      render={({
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
        pauseRecording,
        resumeRecording,
        clearBlobUrl,
      }) => (
        <div className={style.record_mini_popup_container}>
          {showPopups && !mediaBlobUrl && (
            <div className={style.record_mini_popup_inner}>
              <div className={style.record_mini_popup_selection}>
                {!recording ? (
                  <Tooltip title="Start Recording" placement="left">
                    <FiberManualRecordIcon
                      className={style.record_mini_popup_selection_button}
                      onClick={() => handleRecordingStart(startRecording)}
                    />
                  </Tooltip>
                ) : paused ? (
                  <Tooltip title="Resume Recording" placement="left">
                    <PlayCircleOutlineIcon
                      className={style.record_mini_popup_selection_button}
                      onClick={() => handleResumeRecording(resumeRecording)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Pause Recording" placement="left">
                    <PauseIcon
                      className={style.record_mini_popup_selection_button}
                      onClick={() => handlePauseRecording(pauseRecording)}
                    />
                  </Tooltip>
                )}
                <HorizontalRuleIcon
                  className={style.record_mini_popup_selection_gap}
                />
                {recording && (
                  <>
                    <Tooltip title="Stop Recording" placement="left">
                      <StopIcon
                        className={style.record_mini_popup_selection_button}
                        onClick={() => handleRecordingStop(stopRecording)}
                      />
                    </Tooltip>
                    <Tooltip title="Restart Recording" placement="left">
                      <RestartAltIcon
                        className={style.record_mini_popup_selection_button}
                        onClick={() =>
                          handleRestartRecording(
                            stopRecording,
                            clearBlobUrl,
                            startRecording
                          )
                        }
                      />
                    </Tooltip>
                    <Tooltip title="Delete Recording" placement="left">
                      <DeleteIcon
                        className={style.record_mini_popup_selection_button}
                        onClick={() =>
                          handleDeleteRecording(stopRecording, clearBlobUrl)
                        }
                      />
                    </Tooltip>
                  </>
                )}
                <Tooltip title="Close" placement="left">
                  <CloseIcon
                    className={style.record_mini_popup_selection_cross_button}
                    onClick={prop.closePopup}
                  />
                </Tooltip>
              </div>
            </div>
          )}
          {mediaBlobUrl && (
            <RecordingUpload
              videoURL={mediaBlobUrl}
              snackbarOpen={snackbarOpen}
              handleCloseSnackbar={handleCloseSnackbar}
              closePopup={prop.closePopup}
            />
          )}
        </div>
      )}
    />
  );
};

export default RecordSmallPopup;
