import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import Template from "../ProjectTabs/Template";
import Complete from "../ProjectTabs/Complete";
import TableActive from "../ProjectTabs/TableActive";
import Request from "../ProjectTabs/Request";
import project from "./DashboardScss/project.module.scss"
// import Request from "../../Components/Dashboard/Request/Request";

import { useState } from "react";
import { RouteNames } from "../../Constants/route";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Box, IconButton, MenuItem, Stack, Tab, Tabs, TextField } from "@mui/material";
import TextDialog from '../ProjectTabs/TextDialog';

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


export default function Project() {
    const [activeTab, setActiveTab] = useState(0)
    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue)
    }
    
    const location = useLocation('')
    const isAddProductPage = location.pathname.includes(`${RouteNames.ADDPRODUCTS}`)

    // This is for the Dialog
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleCloseTab = () => {
        setDialogOpen(false);
    };

    return (
        <Box>
            {!isAddProductPage && (
                <>
                    <Stack flexDirection="row" width="100%" alignItems="center" justifyContent="space-between">
                        {/* <Link to={`${RouteNames.ADDPRODUCTS}`}>
                            <IconButton>
                                <AddIcon />
                            </IconButton>
                        </Link> */}
                        <Link onClick={handleClickOpen}>
                            <IconButton>
                                <AddIcon />
                            </IconButton>
                        </Link>

                        <Tabs
                            onChange={handleChangeTab}
                            aria-label="user details tabs"
                            value={activeTab}
                            TabIndicatorProps={{ sx: { display: 'none' } }}
                            sx={{ backgroundColor: 'white' }} className={project.Tabs}>
                            <Tab
                                {...allyProps(0)}
                                label="Active"
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
                                label="Request"
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
                                label="Complete"
                                {...allyProps(2)}
                                sx={(theme) => ({
                                    backgroundColor: activeTab === 2 ? theme.palette.grey.hoverGrey : 'transparent',
                                    color: activeTab === 2 ? theme.palette.grey.darkGrey : 'grey',
                                    fontWeight: activeTab === 2 ? '600' : '500',
                                    '&.Mui-selected': {
                                        color: theme.palette.grey.darkGrey,
                                    },
                                })} className={project.Tab} />

                            <Tab
                                label="Template"
                                {...allyProps(3)}
                                sx={(theme) => ({
                                    backgroundColor: activeTab === 3 ? theme.palette.grey.hoverGrey : 'transparent',
                                    color: activeTab === 3 ? theme.palette.grey.darkGrey : 'grey',
                                    fontWeight: activeTab === 3 ? '600' : '500',
                                    '&.Mui-selected': {
                                        color: theme.palette.grey.darkGrey,
                                    },
                                })} className={project.Tab} />
                        </Tabs>

                        <Box width="200px" alignItems="center" mx-auto='true' >
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
                            <TableActive />
                        </CustomTabPanel>

                        <CustomTabPanel value={activeTab} index={1}>
                            {/* <Request /> */}
                            <Request />
                        </CustomTabPanel>

                        <CustomTabPanel value={activeTab} index={2}>
                            <Complete />
                        </CustomTabPanel>

                        <CustomTabPanel value={activeTab} index={3}>
                            <Template />
                        </CustomTabPanel>
                    </Box>
                    <TextDialog open={dialogOpen} handleClose={handleCloseTab} />
                </>
            )}
            <Outlet />
        </Box >
    )
}


CustomTabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
};
