/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useUpdateTask } from '../../hooks/useTask';

const EditTextDialog = ({ open, handleClose, task }) => {
    const { mutate: editTask } = useUpdateTask();

    const [formData, setFormData] = useState({
        projectTitle: task?.projectTitle || '',
        teamLeadName: Array.isArray(task?.teamLeadName) ? task.teamLeadName.join(', ') : task?.teamLeadName || '',
        description: task?.description || '',
        projectStatus: task?.projectStatus || '',
        points: task?.points || '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        editTask({ taskId: task, updateData: formData });
        setFormData("")
        handleClose();
    }

    return (
        <Dialog component="form" onSubmit={handleSubmit} noValidate open={open} onClose={handleClose}>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="projectTitle"
                    label="Project Title"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={formData.projectTitle}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="teamLeadName"
                    label="Team Lead"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={formData.teamLeadName}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="description"
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    size="small"
                    value={formData.description}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="projectStatus"
                    label="pending, approved, not approved"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={formData.projectStatus}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="points"
                    label="Points"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={formData.points}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button type="submit" color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

EditTextDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default EditTextDialog;