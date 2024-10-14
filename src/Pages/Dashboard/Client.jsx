import { Box, IconButton, MenuItem, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import project from "./DashboardScss/project.module.scss"
import PropTypes from 'prop-types';
import Videos from "./AddVideos/Videos";
import TaskImages from "./AddVideos/TaskImages";

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

export default function Client() {
    const [activeTab, setActiveTab] = useState(0)
    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue)
    }
    return (
        <Box>
            {/* {!isAddProductPage && ( */}
            <>
                <Stack flexDirection="row" width="100%" alignItems="center" justifyContent="space-between">
                    {/* <Link to={`${RouteNames.ADDPRODUCTS}`}>
                            <IconButton>
                                <AddIcon />
                            </IconButton>
                        </Link> */}
                    <Link >
                        <IconButton>
                            <AddIcon />
                        </IconButton>
                    </Link>

                    <Tabs
                        onChange={handleChangeTab}
                        value={activeTab}
                        aria-label="user details tabs"
                        TabIndicatorProps={{ sx: { display: 'none' } }}
                        sx={{ backgroundColor: 'white' }} className={project.Tabs}>
                        <Tab
                            {...allyProps(0)}
                            label="Videos"
                            sx={(theme) => ({
                                backgroundColor: activeTab === 0 ? theme.palette.grey.hoverGrey : 'transparent',
                                color: activeTab === 0 ? theme.palette.grey.darkGrey : 'grey',
                                fontWeight: activeTab === 0 ? '600' : '500',
                                '&.Mui-selected': {
                                    color: theme.palette.grey.darkGrey,
                                },
                            })}
                            className={project.Tab} />

                        <Tab
                            label="Images"
                            {...allyProps(0)}
                            sx={(theme) => ({
                                backgroundColor: activeTab === 1 ? theme.palette.grey.hoverGrey : 'transparent',
                                color: activeTab === 1 ? theme.palette.grey.darkGrey : 'grey',
                                fontWeight: activeTab === 1 ? '600' : '500',
                                '&.Mui-selected': {
                                    color: theme.palette.grey.darkGrey,
                                },
                            })} className={project.Tab} />

                        <Tab
                            label="Demo"
                            {...allyProps(2)}
                            sx={(theme) => ({
                                backgroundColor: activeTab === 2 ? theme.palette.grey.hoverGrey : 'transparent',
                                color: activeTab === 2 ? theme.palette.grey.darkGrey : 'grey',
                                fontWeight: activeTab === 2 ? '600' : '500',
                                '&.Mui-selected': {
                                    color: theme.palette.grey.darkGrey,
                                },
                            })} className={project.Tab} />

                        {/* <Tab
                            label="Template"
                            {...allyProps(3)}
                            sx={(theme) => ({
                                backgroundColor: activeTab === 3 ? theme.palette.grey.hoverGrey : 'transparent',
                                color: activeTab === 3 ? theme.palette.grey.darkGrey : 'grey',
                                fontWeight: activeTab === 3 ? '600' : '500',
                                '&.Mui-selected': {
                                    color: theme.palette.grey.darkGrey,
                                },
                            })} className={project.Tab} /> */}
                    </Tabs>

                    <Box width="200px" alignItems="center" mx-auto >
                        <TextField
                            label='Select here'
                            fullWidth
                            select
                            size="small">
                            <MenuItem value='add item'>Add Item</MenuItem>
                            <MenuItem value='menu item'>Menu Task</MenuItem>
                            <MenuItem value='single'>Single</MenuItem>
                        </TextField>
                    </Box>
                </Stack>

                <Box>
                    <CustomTabPanel value={activeTab} index={0}>
                        {/* <Typography>Hey One</Typography> */}
                        <Videos />
                    </CustomTabPanel>

                    <CustomTabPanel value={activeTab} index={1}>
                        {/* <Typography>Hey Two</Typography> */}
                        <TaskImages />
                    </CustomTabPanel>

                    <CustomTabPanel value={activeTab} index={2}>
                        <Typography>Hey Three</Typography>
                    </CustomTabPanel>

                    {/* <CustomTabPanel value={activeTab} index={3}>
                        <Typography>Hey Four</Typography>
                    </CustomTabPanel> */}
                </Box>
            </>
            {/* <Outlet /> */}
        </Box >
    )
}

CustomTabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
};
