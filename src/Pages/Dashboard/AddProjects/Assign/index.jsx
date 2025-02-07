import style from './style.module.scss';
import { createSubTask } from '../../../../api/userSubTask';

import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, TextField, Button, Box } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';



export default function Index() {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        assign: '',
        title: '',
        description: '',
        dueDate: '',
        projectId: id || ''
    });


    useEffect(() => {
        if (id) {
            setFormData((prev) => ({ ...prev, id }));
        }
    }, [id]);


    const mutation = useMutation({
        mutationFn: createSubTask,

        onSuccess: () => {
            queryClient.invalidateQueries(['userSubtask']);
            setFormData("")
            toast.success("The Sub Task Created Successfully", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: false,
            })
        },

        onError: (error) => {
            toast.error(error?.response?.data?.message, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: false,
            })
        },
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
        setFormData("")
    };



    return (
        <form style={{ marginTop: '20px' }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        label="User Names (Comma-separated)"
                        name="assign"
                        margin="dense"
                        size="small"
                        fullWidth
                        value={formData.assign}
                        onChange={handleChange} />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        label="Task Title"
                        name="title"
                        margin="dense"
                        size="small"
                        fullWidth
                        value={formData.title}
                        onChange={handleChange} />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        label="Task Description"
                        name="description"
                        margin="dense"
                        size="small"
                        fullWidth
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={handleChange} />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        label="Due Date"
                        name="dueDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        margin="dense"
                        size="small"
                        fullWidth
                        value={formData.dueDate}
                        onChange={handleChange} />
                </Grid>

                <Grid item xs={12}>
                    <Box display="flex" gap={2}>
                        <Button className={`accept ${style.addBtn}`} size='medium' variant="outlined" type="submit">
                            Create Assign
                        </Button>
                    </Box>
                </Grid>

            </Grid>
        </form>
    );
}
