import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSubTask } from '../../../../api/userSubTask';
import { useEffect, useState } from 'react';
import { Grid, TextField, Button, Box } from '@mui/material';
import styles from './style.module.scss';
import { useParams } from 'react-router-dom';

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
        console.log("useParams projectId:", id);
        if (id) {
            setFormData((prev) => ({ ...prev, id }));
        }
    }, [id]);
    console.log("Assign Index.jsx", formData)
    const mutation = useMutation({
        mutationFn: createSubTask,
        onSuccess: () => {
            queryClient.invalidateQueries(['userSubtask']);
        },
        onError: (error) => {
            console.error('Error creating task:', error);
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
                        onChange={handleChange}
                    />
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
                        onChange={handleChange}
                    />
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
                        onChange={handleChange}
                    />
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
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box display="flex" gap={2}>
                        <Button
                            color="secondary"
                            className={`${styles.dialogBtnPrimary}`}
                            type="button"
                            onClick={() => setFormData({})}
                        >
                            Cancel
                        </Button>
                        <Button color="primary" className={`${styles.dialogBtnSecondary}`} type="submit">
                            Save
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
}
