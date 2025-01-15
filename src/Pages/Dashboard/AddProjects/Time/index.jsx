import style from "./style.module.scss"


import {
    Stack, Table,
    TableBody, TableCell,
    TableContainer, TableHead,
    TableRow, Typography
} from '@mui/material'



export default function index() {
    const subTasks = [
        { id: 1, title: "Title", assign: "example@gmail.com", name: "John Doe", description: "Dummy Description", taskList: "TaskList", startDate: "12/12/2020", dueDate: "12/12/2020", points: "7" },
        { id: 2, title: "Title", assign: "work@gmail.com", name: "Jane Smith", description: "Dummy Description", taskList: "TaskList", startDate: "12/12/2020", dueDate: "12/12/2020", points: "10" },
        { id: 3, title: "Title", assign: "example32@gmail.com", name: "Alice Johnson", description: "Dummy Description", taskList: "TaskList", startDate: "12/12/2020", dueDate: "12/12/2020", points: "9" },
        { id: 4, title: "Title", assign: "assign", name: "Bob Lee", description: "Dummy Description", taskList: "TaskList", startDate: "12/12/2020", dueDate: "12/12/2020", points: "2" },
    ];

    const sortedSubTasks = subTasks.sort((a, b) => Number(a.points) - Number(b.points));


    return (
        <Stack variant="div" className={style.boxMain2}>
            <TableContainer>
                {
                    subTasks?.length > 0 ? (
                        <Table className={style.table}>
                            <TableHead className={style.tableHead}>
                                <TableRow className={style.tableRowHead}>
                                    <TableCell align="left" variant="h6" className={style.tableInfo}>name</TableCell>
                                    <TableCell variant="h6" className={style.tableInfo}>email</TableCell>
                                    <TableCell align="left" variant="h6" className={style.tableInfo} >Points</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody >
                                {sortedSubTasks?.map((task, index) => {
                                    return (
                                        <TableRow key={index} className={style.tableRowBody}>
                                            <TableCell component="th" scope="row" >{task.name}</TableCell>
                                            <TableCell component="th" scope="row" className={style.textGrey} sx={{ color: 'purple !important' }}>{task.assign}</TableCell>

                                            <TableCell align="left">
                                                <Stack
                                                    flexDirection="row"
                                                    gap={1}
                                                    sx={{ cursor: "pointer", maxWidth: "6rem", minWidth: "6rem" }}>
                                                    <Typography className={style.textGrey} sx={{ color: 'green !important' }}>{task.points}/10</Typography>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    ) : (
                        <Stack>
                            <Typography className={style.noContent}>Assign a task to User to show here</Typography>
                        </Stack> )}
            </TableContainer >
        </Stack>
    )
}
