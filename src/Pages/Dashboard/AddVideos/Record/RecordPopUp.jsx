import React, { useState } from "react";
import style from "./../styles.module.scss";
export const RecordPopUp = (prop) => {
  const [screen, setScreen] = useState(false);
  const [camera, setCamera] = useState(false);
  const [microphone, setMicrophone] = useState(false);
  const [screenSelectedOption, setScreenSelectedOption] = useState("Screen");
  const [cameraSelectedOption, setCameraSelectedOption] = useState("Camera");
  const [microphoneSelectedOption, setMicrophoneSelectedOption] =
    useState("Microphone");

  const handleScreenClick = () => {
    setScreen(!screen);
    setCamera(false);
    setMicrophone(false);
  };
  const handleCameraClick = () => {
    setCamera(!camera);
    setScreen(false);
    setMicrophone(false);
  };
  const handleMicrophoneClick = () => {
    setMicrophone(!microphone);
    setScreen(false);
    setCamera(false);
  };
  const handleScreenOptionClick = (option) => {
    setScreenSelectedOption(option);
    setScreen(false);
  };
  const handleCameraOptionClick = (option) => {
    setCameraSelectedOption(option);
    setCamera(false);
  };
  const handleMicrophoneOptionClick = (option) => {
    setMicrophoneSelectedOption(option);
    setMicrophone(false);
  };

  return (
    <>
      <div className={style.record_Popup}>
        <div className={style.record_popup_inner}>
          <div className={style.record_popup_selection}>
            <button
              onClick={handleScreenClick}
              className={style.record_popup_selection_button}
            >
              {screenSelectedOption}
            </button>

            {screen && (
              <div className={style.screen_popup}>
                <div className={style.screen_popup_selection}>
                  <button
                    className={style.screen_popup_selection_button}
                    onClick={() => handleScreenOptionClick("Entire Screen")}
                  >
                    Entire Screen
                  </button>
                  <button
                    className={style.screen_popup_selection_button}
                    onClick={() => handleScreenOptionClick("Window")}
                  >
                    Window
                  </button>
                  <button
                    className={style.screen_popup_selection_button}
                    onClick={() => handleScreenOptionClick("Chrome Tab")}
                  >
                    Chrome Tab
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className={style.record_popup_selection}>
            <button
              className={style.record_popup_selection_button}
              onClick={handleCameraClick}
            >
              {cameraSelectedOption}
            </button>
            {camera && (
              <div className={style.camera_popup}>
                <div className={style.camera_popup_selection}>
                  <button
                    className={style.camera_popup_selection_button}
                    onClick={() => handleCameraOptionClick("No Camera")}
                  >
                    No Camera
                  </button>
                  <button
                    className={style.camera_popup_selection_button}
                    onClick={() => handleCameraOptionClick("HD Camera")}
                  >
                    HD Camera
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className={style.record_popup_selection}>
            <button
              className={style.record_popup_selection_button}
              onClick={handleMicrophoneClick}
            >
              {microphoneSelectedOption}
            </button>
            {microphone && (
              <div className={style.microphone_popup}>
                <div className={style.microphone_popup_selection}>
                  <button
                    className={style.microphone_popup_selection_button}
                    onClick={() => handleMicrophoneOptionClick("No Microphone")}
                  >
                    No Microphone
                  </button>
                  <button
                    className={style.microphone_popup_selection_button}
                    onClick={() => handleMicrophoneOptionClick("HD Microphone")}
                  >
                    HD Microphone
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className={style.record_popup_selection}>
            <button className={style.record_button}>record</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordPopUp;
