import styles from './style.module.scss';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useCreateTask } from '../../hooks/useTask';

const TextDialog = ({ open, handleClose }) => {
    const [formData, setFormData] = useState({
        projectTitle: '', teamLeadName: '', dueDate: '', budget: '', description: ''
    });

    const renderTextField = (name, label, multiline = false) => (
        <TextField
            margin="dense"
            name={name}
            label={label}
            fullWidth
            variant="outlined"
            size="small"
            value={formData[name]}
            onChange={handleChange}
            multiline={multiline}
            rows={multiline ? 4 : undefined}
            InputLabelProps={{ sx: { fontSize: '0.9rem' } }}
        />
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };
    const { mutate: createTask } = useCreateTask();
    const handleSubmit = (e) => {
        e.preventDefault();
        createTask(formData, {
            onSuccess: () => {
                console.log("Task Successfully Created")
                setFormData('')
            }
        });
    };

    return (
        <Dialog component="form" onSubmit={handleSubmit} noValidate open={open} onClose={handleClose} className={styles.sidebar}>
            <DialogTitle>Add a New Project</DialogTitle>
            <DialogContent className={styles.sidebar}>
                {renderTextField("projectTitle", "Project Title")}
                {renderTextField("teamLeadName", "Assign User")}
                {renderTextField("dueDate", "Due Date")}
                {renderTextField("budget", "Add Budget")}
                {renderTextField("description", "Project Description", true)}
            </DialogContent>
            {/* <Typography variant="span" sx={{ margin: 'auto', fontSize: '0.9rem', color: 'red' }}>error will shown here</Typography> */}
            <DialogActions sx={{ paddingBottom: '1rem' }}>
                <Button onClick={handleClose} color="secondary" className={styles.dialogBtnPrimary}>Cancel</Button>
                <Button type="submit" onClick={handleClose} color="primary" className={styles.dialogBtnSecondary}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

TextDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default TextDialog;
