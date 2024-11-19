/* eslint-disable react/prop-types */
import styles from './style.module.scss';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useUpdateTask } from '../../hooks/useTask';

const EditTextDialog = ({ open, handleClose, task }) => {
    const { mutate: editTask } = useUpdateTask();
    
    const [formData, setFormData] = useState({
        projectTitle: task?.projectTitle || '',
        // teamLeadName: task?.teamLeadName || '',
        teamLeadName: Array.isArray(task?.teamLeadName) ? task.teamLeadName.join(', ') : task?.teamLeadName || '',
        description: task?.description || '',
        projectStatus: task?.projectStatus || '',
        points: task?.points || '',
    });

    useEffect(() => {
        // console.log("Editing Task with ID:", task);
    }, [task]);

    // const renderTextField = (name, label, multiline = false) => (
    //     <TextField
    //         margin="dense"
    //         name={name}
    //         label={label}
    //         fullWidth
    //         variant="outlined"
    //         size="small"
    //         value={formData[name]}
    //         onChange={handleChange}
    //         multiline={multiline}
    //         rows={multiline ? 4 : undefined}
    //         InputLabelProps={{ sx: { fontSize: '0.9rem' } }}
    //     />
    // );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        // editTask({
        //     taskId: task._id,
        //     updates: formData,
        // });
        editTask({ taskId: task, updateData: formData });
        // console.log("This is the formData", formData)
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
                label="Project Status"
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
        // <Dialog component="form" onSubmit={handleSubmit} noValidate open={open} onClose={handleClose} className={styles.sidebar}>
        //     <DialogTitle>Add a New Project</DialogTitle>
        //     <DialogContent className={styles.sidebar}>
        //         {renderTextField("projectTitle", "Project Title")}
        //         {renderTextField("teamLeadName", "Assign User")}
        //         {renderTextField("description", "Project Description", true)}
        //         {renderTextField("projectStatus", "Project Status")}
        //         {renderTextField("points", "Points")}
        //     </DialogContent>
        //     <Typography variant="span" sx={{ margin: 'auto', fontSize: '0.9rem', color: 'red' }}>error will shown here</Typography>
        //     <DialogActions sx={{ paddingBottom: '1rem' }}>
        //         <Button type="submit" onClick={handleClose} color="primary" className={styles.dialogBtnSecondary}>Update</Button>
        //     </DialogActions>
        // </Dialog>
    );
};

EditTextDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default EditTextDialog;


  // const updatedData = {
        //     projectTitle: formData.projectTitle,
        //     teamLeadName: formData.teamLeadName,
        //     description: formData.description,
        //     projectStatus: formData.projectStatus,
        //     points: formData.points,
        // };

        // editTask({ taskId, updatedData }, {
        //     onSuccess: () => {
        //         console.log("Task updated Successfully");
        //         // setFormData('');
        //         handleClose();
        //     },
        //     onError: (error) => {
        //         console.error("Error updating task:", error);
        //     },
        // });

        // First Try 
        // editTask(formData, {
        //     onSuccess: () => {
        //         console.log('Task updated Successfully');
        //         setFormData('');
        //     }
        // })