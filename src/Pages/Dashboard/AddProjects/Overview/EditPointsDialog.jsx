import PropTypes from 'prop-types';

import { useState } from 'react';
import { useUpdateSubTask } from '../../../../hooks/useSubTask';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const EditPointsDialog = ({ open, handleClose, task }) => {
    const { mutate: editTask } = useUpdateSubTask();
    const [formData, setFormData] = useState({
        points: task?.points || '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        editTask({ taskId: task, updateData: formData });
        handleClose();
    }

    return (
        <Dialog component="form" onSubmit={handleSubmit} noValidate open={open} onClose={handleClose}>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="title"
                    label="Give Title"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={formData.title}
                    onChange={handleChange} />


                <TextField
                    margin="dense"
                    name="assign"
                    label="Give Assign"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={formData.assign}
                    onChange={handleChange} />


                <TextField
                    margin="dense"
                    name="description"
                    label="Give Description"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={formData.description}
                    onChange={handleChange} />


                <TextField
                    margin="dense"
                    name="taskList"
                    label="Give Task List"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={formData.taskList}
                    onChange={handleChange} />


                <TextField
                    margin="dense"
                    name="points"
                    label="Give Points"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={formData.points}
                    onChange={handleChange} />
            </DialogContent>


            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
                <Button type="submit" color="primary">Update</Button>
            </DialogActions>

        </Dialog>
    );
};

EditPointsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default EditPointsDialog;