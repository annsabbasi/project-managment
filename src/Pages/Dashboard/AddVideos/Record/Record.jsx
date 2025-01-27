import React, { useState } from "react";
import style from "./../styles.module.scss";
import { Box, Button, Typography } from "@mui/material";
import RecordPopUp from "./RecordPopUp";
import RecordSmallPopup from "./RecordSmallPopup";

export const Record = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <Box className={style.recordContainer}>
        <Box className={style.recordButtonInner}>
          <Button
            variant="contained"
            className={style.recordButton}
            onClick={togglePopup}
          >
            Start Recording
          </Button>
        </Box>
        <Box className={style.record_popup_container}>
          {showPopup && <RecordPopUp showPopup={showPopup} />}
        </Box>
        <Box className={style.record_mini_popup_container}>
          {showPopup && <RecordSmallPopup showPopup={showPopup} />}
        </Box>
      </Box>
    </>
  );
};

export default Record;
