import style from './style.module.scss'
import PropTypes from 'prop-types';

import {
    Box, Button,
    IconButton, Stack,
    TextField, Typography
} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useEffect, useState } from 'react';
import { useCreateVideoLink, useDeleteVideoLinks, useFetchVideoLinks } from '../../../../api/userSubTask';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Index() {
    const { id: projectId } = useParams();
    const [inputData, setInputData] = useState({
        title: '',
        video: '',
        projectId: projectId || ''
    });

    useEffect(() => {
        if (projectId) {
            setInputData((prev) => ({ ...prev, projectId }))
        }
    }, [projectId])
    const handleInputData = (event) => {
        const { name, value } = event.target;
        setInputData((prevData) => ({ ...prevData, [name]: value }));
    }



    // Create Docs Link Code
    const { mutate } = useCreateVideoLink();
    const handleSubmitInputData = (e) => {
        e.preventDefault();
        mutate(inputData, {
            onSuccess: () => {
                setInputData({
                    title: '',
                    video: ''
                })
            }
        })
    }


    // Fetch Docs Link Code
    const { data } = useFetchVideoLinks(projectId);

    // Delete Docs Link Code
    const { mutate: deleteTask } = useDeleteVideoLinks();
    const handleDelete = (id) => {
        deleteTask(id, {
            onSuccess: () => {
                toast.success("Task Deleted Successfully", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: false,
                })
                // setTasks((prevTasks) => [...prevTasks, id]);
            },
        });
    };

    const tasks = data?.data || [];



    return (
        <Stack spacing={5} mt={2}>
            <Stack className={style.itemContainer}>

                <Stack flexDirection="row" alignItems="center" gap={0.3} width="100%">
                    <Typography className={style.headText}>Attach Video Link</Typography>
                    <IconButton sx={{
                        '&:hover': {
                            backgroundColor: 'transparent',
                        }, padding: '0',
                        cursor: 'default'
                    }} disableRipple >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="size-6" style={{ width: '1.6rem', height: '1.6rem', marginLeft: '0.1rem' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                        </svg>
                    </IconButton>
                </Stack>


                <Stack
                    gap={2}
                    flexDirection="row"
                    alignItems="baseline"
                    justifyContent="space-between"
                    flexWrap="wrap">
                    <InputComps label="Title Link" name="title" onChange={handleInputData} value={inputData.title} />
                    <InputComps label="Video Link" name="video" onChange={handleInputData} value={inputData.video} />
                </Stack>

                <Button variant='contained' className={style.linkBtn} size='medium' onClick={handleSubmitInputData}>Add Link</Button>
            </Stack>


            <Stack className={style.itemContainer}>

                <Stack flexDirection="row" alignItems="center" gap={0.3}>
                    <Typography className={style.headText}>All Links</Typography>

                    <IconButton
                        sx={{
                            '&:hover': {
                                backgroundColor: 'transparent',
                            }, padding: '0',
                            cursor: 'default'
                        }} disableRipple>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" style={{ width: '1.6rem', height: '1.6rem', marginLeft: "0.2rem" }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                        </svg>
                    </IconButton>
                </Stack>

                <Stack flexDirection="row" gap="1rem" flexWrap="wrap" flex>
                    {tasks.map((docs) => (
                        <Stack key={docs._id} className={style.linkContainer}>
                            <IconButton
                                className={style.linkDelete}
                                onClick={() => handleDelete(docs._id)}>
                                <DeleteOutlineIcon />
                            </IconButton>
                            <Typography
                                component="a"
                                href={docs.video}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={style.itemTextBody}
                                sx={{ textDecoration: 'none' }}>
                                <Box className={style.itemContent}>
                                    <Stack>
                                        <Typography variant="p" className={style.itemTextHead}>
                                            {docs.title}
                                        </Typography>
                                        <Typography
                                            className={style.itemTextBody}
                                            sx={{ textDecoration: 'underline', color: '#0437F2 !important' }}>
                                            {docs.video}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Stack >
    )
}

export const InputComps = ({ label, name, onChange, value }) => {
    return (
        <TextField
            margin="normal"
            size="small"
            label={label}
            name={name}
            onChange={onChange}
            value={value}
            variant="standard"
            fullWidth
            sx={{
                backgroundColor: '#ffffff',
                flex: '1 0 300px',
                '& .MuiInputBase-input': {
                    padding: '6px 10px',
                },
            }} />
    )
}

InputComps.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
}