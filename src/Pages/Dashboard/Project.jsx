import { Box, IconButton, MenuItem, Stack, Tab, Tabs, TextField, ThemeProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import theme from "../../Theme/Theme";
import PropTypes from 'prop-types';
import Active from "../../Components/Dashboard/Active/Active";

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
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>
            }
        </div>
    )
}

const allyProps = (index) => {
    return {
        id: `simpleTab-${index}`,
        'aria-controls': `simpleTab-${index}`
    }
}

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Project() {
    const [activeTab, setActiveTab] = useState(0)
    const handleChangeTab = (event, newValue) => {
        setActiveTab(newValue)
    }

    return (
        <Box>

            <Stack flexDirection="row" width="100%" alignItems="center" justifyContent="space-between">
                <IconButton>
                    <AddIcon />
                </IconButton>

                <ThemeProvider theme={theme}>
                    {/* <Box> */}
                    <Tabs
                        onChange={handleChangeTab}
                        aria-label="user details tabs"
                        value={activeTab}
                        TabIndicatorProps={{ sx: { display: 'none' } }}
                        sx={{ backgroundColor: 'white', borderRadius: '0.4rem', padding: '2px 3px', fontSize: '0.3rem', border: '1px solid silver' }}
                    >
                        <Tab
                            label="Active"
                            {...allyProps(0)}
                            sx={(theme) => ({
                                backgroundColor: activeTab === 0 ? theme.palette.grey.hoverGrey : 'transparent',
                                color: activeTab === 0 ? 'green' : 'black',
                                borderRadius: '0.4rem',
                                fontSize: '0.8rem',
                                padding: 0
                            })}
                        />
                        <Tab
                            label="Request"
                            {...allyProps(0)}
                            sx={(theme) => ({
                                backgroundColor: activeTab === 1 ? theme.palette.grey.hoverGrey : 'transparent',
                                color: activeTab === 1 ? 'black' : 'black',
                                borderRadius: '0.4rem',
                            })}
                        />
                        <Tab
                            label="Complete"
                            {...allyProps(2)}
                            sx={{
                                backgroundColor: activeTab === 2 ? '#F2F2F2' : 'transparent',
                                color: activeTab === 2 ? 'black' : 'black',
                                borderRadius: '0.4rem',
                            }}
                        />
                    </Tabs>
                    {/* </Box> */}
                </ThemeProvider>




                <Box width="200px" alignItems="center" mx-auto >
                    <TextField
                        label='Select here'
                        fullWidth
                        select
                        size="small"
                    >
                        <MenuItem value='add item'>Add Item</MenuItem>
                        <MenuItem value='menu item'>Menu Task</MenuItem>
                        <MenuItem value='single'>Single</MenuItem>
                    </TextField>
                </Box>
            </Stack>
            <Box>
                <CustomTabPanel value={activeTab} index={0}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Dessert (100g serving)</TableCell>
                                    <TableCell align="right">Calories</TableCell>
                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CustomTabPanel>


                <CustomTabPanel value={activeTab} index={1}>
                    <Active />
                </CustomTabPanel>
                <CustomTabPanel value={activeTab} index={2}>Hello Three this is!</CustomTabPanel>
            </Box>
        </Box >
    )
}


CustomTabPanel.propTypes = {
    children: PropTypes.node.isRequired, // Validate children prop
    value: PropTypes.number.isRequired,   // Assuming value is a number
    index: PropTypes.number.isRequired,   // Assuming index is a number
};