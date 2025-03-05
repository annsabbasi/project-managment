import React, { useState } from "react";
import style from "./../styles.module.scss";
import { Box, Button, Typography } from "@mui/material";
// import RecordPopUp from "./RecordPopUp";
import RecordSmallPopup from "./RecordSmallPopup";

export const Record = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const openPopUp = () => {
    setShowPopup(true);
  };

  return (
    <>
      <Box className={style.recordContainer}>
        <Box className={style.recordButtonInner}>
          <Button
            variant="contained"
            className={style.recordButton}
            onClick={openPopUp}
          >
            Start Recording
          </Button>
        </Box>
        <Box className={style.record_mini_popup_container}>
          {showPopup && (
            <RecordSmallPopup showPopup={showPopup} closePopup={togglePopup} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Record;
