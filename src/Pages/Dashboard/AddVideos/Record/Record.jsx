import style from "./../styles.module.scss";
import { Box, IconButton } from "@mui/material";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import RecordSmallPopup from "./RecordSmallPopup";
import PropTypes from "prop-types";

export const Record = ({ openPopUp, showPopup, setShowPopup }) => {
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <Box className={style.recordContainer}>
        <Box className={style.recordButtonInner}>
          <IconButton
            onClick={openPopUp}
            className={style.recordButton}
          >
            <FiberManualRecordIcon className={style.recordIcon} />
          </IconButton>
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

Record.propTypes = {
  openPopUp: PropTypes.func.isRequired,
  showPopup: PropTypes.bool.isRequired,
  setShowPopup: PropTypes.func.isRequired,
};




// {
//   "success": false,
//   "statusCode": 500,
//   "message": "Invalid status code: Invalid video type",
//   "errors": [],
//   "stack": null
// }