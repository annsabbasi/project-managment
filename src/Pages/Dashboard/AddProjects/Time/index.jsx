/* eslint-disable react-hooks/rules-of-hooks */

import style from "../Controls/style.module.scss"
// -------------- I am Using this files Styles from the Controllers Tab Folder --------------
import { useAuth } from "../../../../context/AuthProvider";


import {
    Stack, Table,
    TableBody, TableCell,
    TableContainer, TableHead,
    TableRow, Typography
} from '@mui/material'


export default function index() {
    const { theme, mode } = useAuth();
    const tableClassText = mode === 'light' ? style.lightTableText : style.darkTableText;
    const tableGap = mode === 'light' ? style.tableBodyLight : style.tableBodyDark;
    const subTasks = [
        { id: 1, title: "Title", assign: "example@gmail.com", name: "John Doe", description: "Dummy Description", taskList: "TaskList", startDate: "12/12/2020", dueDate: "12/12/2020", points: "7" },
        { id: 2, title: "Title", assign: "work@gmail.com", name: "Jane Smith", description: "Dummy Description", taskList: "TaskList", startDate: "12/12/2020", dueDate: "12/12/2020", points: "10" },
        { id: 3, title: "Title", assign: "example32@gmail.com", name: "Alice Johnson", description: "Dummy Description", taskList: "TaskList", startDate: "12/12/2020", dueDate: "12/12/2020", points: "9" },
        { id: 4, title: "Title", assign: "assign", name: "Bob Lee", description: "Dummy Description", taskList: "TaskList", startDate: "12/12/2020", dueDate: "12/12/2020", points: "2" },
    ];
    const sortedSubTasks = subTasks.sort((a, b) => Number(a.points) - Number(b.points));


    return (
        <Stack variant="div">
            <TableContainer>
                {subTasks?.length > 0 ? (
                        <Table sx={{
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                            overflow: 'visible',
                            borderRadius: '0.6rem'
                        }}>
                            <TableHead>
                                <TableRow className={style.tableRowHead}>
                                    <TableCell align="left" variant="h6" className={tableClassText}>name</TableCell>
                                    <TableCell variant="h6" className={tableClassText}>email</TableCell>
                                    <TableCell align="left" variant="h6" className={tableClassText} >Points</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody className={tableGap}>
                                {sortedSubTasks?.map((task, index) => {
                                    return (
                                        <TableRow key={index} className={style.tableRowBody}>
                                            <TableCell component="th" scope="row" >{task.name}</TableCell>
                                            <TableCell component="th" scope="row" sx={{ color: '#AD86FC' }}>{task.assign}</TableCell>

                                            <TableCell align="left">
                                                <Stack
                                                    flexDirection="row"
                                                    gap={1}
                                                    sx={{ cursor: "pointer", maxWidth: "6rem", minWidth: "6rem" }}>
                                                    <Typography className={style.textGreyInfo}>{task.points}/10</Typography>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    ) : (
                        <Stack>
                            <Typography>Assign a task to User to show here</Typography>
                        </Stack>)}
            </TableContainer >
        </Stack>
    )
}
