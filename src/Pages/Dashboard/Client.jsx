// import { Link } from "react-router-dom";
import { useState } from "react";

import project from "./DashboardScss/project.module.scss";
import PropTypes from "prop-types";
import Videos from "./AddVideos/Videos";
import Uploads from "./AddVideos/Uploads";
import Record from "./AddVideos/Record/Record";

import { Box, Stack, Tab, Tabs } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { RouteNames } from "../../Constants/route";

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simpleTabPanel-${index}`}
      aria-labelledby={`simpleTabPanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const allyProps = (index) => {
  return {
    id: `simpleTab-${index}`,
    "aria-controls": `simpleTab-${index}`,
  };
};

export default function Client() {
  const [activeTab, setActiveTab] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };
  const location = useLocation();
  const isClientPage = location.pathname.includes(`${RouteNames.SINGLEVIDEO}`);
  const [showPopup, setShowPopup] = useState(false);
  const openPopUp = () => {
    setShowPopup(true);
  };

  return (
    <Box>
      {/* {!isClientPage && ( */}
      {!isClientPage && (
        <>
          <Stack flexDirection="row"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Empty Box to push Tabs to center */}
            <Box />
            <Stack
              flexDirection="row"
              // width="100%"
              alignItems="center"
            // justifyContent="center"
            >
              <Tabs
                onChange={handleChangeTab}
                value={activeTab}
                aria-label="user details tabs"
                TabIndicatorProps={{ sx: { display: "none" } }}
                sx={{ backgroundColor: "white" }}
                className={project.Tabs}
              >
                <Tab
                  {...allyProps(0)}
                  label="Videos"
                  // sx={(theme) => ({
                  //     backgroundColor: activeTab === 0 ? theme.palette.grey.hoverGrey : 'transparent',
                  //     color: activeTab === 0 ? theme.palette.grey.darkGrey : 'grey',
                  //     fontWeight: activeTab === 0 ? '600' : '500',
                  //     '&.Mui-selected': {
                  //         color: theme.palette.grey.darkGrey,
                  //     },
                  // })}
                  className={project.Tab}
                />

                <Tab
                  label="Upload"
                  {...allyProps(0)}
                  // sx={(theme) => ({
                  //     backgroundColor: activeTab === 1 ? theme.palette.grey.hoverGrey : 'transparent',
                  //     color: activeTab === 1 ? theme.palette.grey.darkGrey : 'grey',
                  //     fontWeight: activeTab === 1 ? '600' : '500',
                  //     '&.Mui-selected': {
                  //         color: theme.palette.grey.darkGrey,
                  //     },
                  // })}
                  className={project.Tab}
                />

                {/* <Tab
                  label="Record"
                  {...allyProps(0)}
                  // sx={(theme) => ({
                  //     backgroundColor: activeTab === 1 ? theme.palette.grey.hoverGrey : 'transparent',
                  //     color: activeTab === 1 ? theme.palette.grey.darkGrey : 'grey',
                  //     fontWeight: activeTab === 1 ? '600' : '500',
                  //     '&.Mui-selected': {
                  //         color: theme.palette.grey.darkGrey,
                  //     },
                  // })}
                  className={project.Tab}
                /> */}
              </Tabs>

            </Stack>

            <Stack>
              <Record openPopUp={openPopUp} showPopup={showPopup} setShowPopup={setShowPopup} />
            </Stack>
          </Stack>

          <Box>
            <CustomTabPanel value={activeTab} index={0}>
              <Videos />
            </CustomTabPanel>

            <CustomTabPanel value={activeTab} index={1}>
              <Uploads />
            </CustomTabPanel>

            {/* <CustomTabPanel value={activeTab} index={2}>
              <Record />
            </CustomTabPanel> */}
          </Box>

        </>
      )}

      <Outlet />
    </Box>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};