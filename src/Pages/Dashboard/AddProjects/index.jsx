import { useState } from "react";
import PropTypes from 'prop-types';
import project from "./style.module.scss"
import { Box, Button, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import theme from "../../../Theme/Theme";
import OverView from "./Overview"
import Files from "./Files"

const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simpleTabPanel-${index}`}
            aria-labelledby={`simpleTabPanel-${index}`}
            {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}

const allyProps = (index) => {
    return {
        id: `simpleTab-${index}`,
        'aria-controls': `simpleTab-${index}`
    }
}


export default function AddProjects() {
    const [activeTab, setActiveTab] = useState(0)
    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue)
    }
    console.log("This AboutPage is Loaded")
    return (
        <Box>
            <Stack flexDirection="row" width="100%" alignItems="center" justifyContent="space-between">
                <Link className={project.goBack} to={`/project`}>
                    <IconButton disableRipple sx={{
                        '&:hover': {
                            backgroundColor: 'transparent'
                        }
                    }} className={project.goBackIconContent}>
                        <ArrowBackIosNewIcon sx={{
                            color: theme.palette.grey[800],
                        }} className={project.goBackIcon} />
                    </IconButton>
                    <Typography className={project.goBackTitle}>Project Title</Typography>
                </Link>

                <Tabs
                    onChange={handleChangeTab}
                    aria-label="user details tabs"
                    value={activeTab}
                    TabIndicatorProps={{ sx: { display: 'none' } }}
                    sx={{ backgroundColor: 'white' }}
                    className={project.Tabs}
                >
                    <Tab
                        {...allyProps(0)}
                        label="Overview"
                        sx={(theme) => ({
                            backgroundColor: activeTab === 0 ? theme.palette.grey.hoverGrey : 'transparent',
                            color: activeTab === 0 ? theme.palette.grey.darkGrey : 'grey',
                            fontWeight: activeTab === 0 ? '600' : '500',
                            '&.Mui-selected': {
                                color: theme.palette.grey.darkGrey,
                            },
                        })}
                        className={project.Tab}
                    />

                    <Tab
                        label="Files"
                        {...allyProps(0)}
                        sx={(theme) => ({
                            backgroundColor: activeTab === 1 ? theme.palette.grey.hoverGrey : 'transparent',
                            color: activeTab === 1 ? theme.palette.grey.darkGrey : 'grey',
                            fontWeight: activeTab === 1 ? '600' : '500',
                            '&.Mui-selected': {
                                color: theme.palette.grey.darkGrey,
                            },
                        })}
                        className={project.Tab}
                    />

                    <Tab
                        label="Team"
                        {...allyProps(2)}
                        sx={(theme) => ({
                            backgroundColor: activeTab === 2 ? theme.palette.grey.hoverGrey : 'transparent',
                            color: activeTab === 2 ? theme.palette.grey.darkGrey : 'grey',
                            fontWeight: activeTab === 2 ? '600' : '500',
                            '&.Mui-selected': {
                                color: theme.palette.grey.darkGrey,
                            },
                        })}
                        className={project.Tab}
                    />

                    <Tab
                        label="Time"
                        {...allyProps(3)}
                        sx={(theme) => ({
                            backgroundColor: activeTab === 3 ? theme.palette.grey.hoverGrey : 'transparent',
                            color: activeTab === 3 ? theme.palette.grey.darkGrey : 'grey',
                            fontWeight: activeTab === 3 ? '600' : '500',
                            '&.Mui-selected': {
                                color: theme.palette.grey.darkGrey,
                            },
                        })}
                        className={project.Tab}
                    />
                </Tabs>

                <Button
                    variant="text"
                    sx={{
                        borderColor: (theme) => theme.palette.primary.main,
                        textTransform: 'capitalize',
                        borderRadius: '0.4rem',
                        padding: '0.1rem 0.6rem',
                        cursor: 'default'
                    }}
                >In Progress</Button>
            </Stack>

            <Box>
                <CustomTabPanel value={activeTab} index={0}>
                    <OverView />
                </CustomTabPanel>

                <CustomTabPanel value={activeTab} index={1}>
                    {/* <Typography>Hey</Typography> */}
                    <Files />
                </CustomTabPanel>

                <CustomTabPanel value={activeTab} index={2}>
                    <Typography>4</Typography>
                </CustomTabPanel>

                <CustomTabPanel value={activeTab} index={3}>
                    <Typography>5</Typography>
                </CustomTabPanel>
            </Box>
        </Box >
    )
}

CustomTabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
};