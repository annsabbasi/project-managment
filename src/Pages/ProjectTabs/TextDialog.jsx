import style from './style.module.scss';
import PropTypes from 'prop-types';

import { useState } from 'react';
import { useCreateTask } from '../../hooks/useTask';
import { toast } from 'react-toastify';

import {
    Button, TextField,
    Dialog, DialogActions,
    DialogContent, DialogTitle,
} from '@mui/material';


const TextDialog = ({ open, handleClose }) => {
    const [formData, setFormData] = useState({
        projectTitle: '',
        link: '',
        teamLeadName: '',
        dueDate: '',
        budget: '',
        description: ''
    });


    const renderTextField = (name, label, multiline = false, type) => (
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
            type={type}
            InputLabelProps={{
                sx: { display: name === 'dueDate' ? 'none' : 'block', fontSize: '0.9rem' }, // Hide label for "dueDate"
            }}
            placeholder={name === 'dueDate' ? 'mm/dd/yyyy' : undefined}
        />
    );


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };


    const { mutate: createTask, error } = useCreateTask();
    const handleSubmit = (e) => {
        e.preventDefault();
        createTask(formData, {

            onSuccess: () => {
                setFormData('')
                toast.success("Task created Successfully", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: false,
                })
            },

            onError: () => {
                toast.error(error?.response?.data?.message, {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: false,
                })
            }

        });
    };

    return (
        <Dialog component="form" onSubmit={handleSubmit} noValidate open={open} onClose={handleClose}>
            <DialogTitle>Add a New Project</DialogTitle>

            <DialogContent>
                {renderTextField("projectTitle", "Project Title")}
                {renderTextField("teamLeadName", "Assign User")}
                {renderTextField("link", "Add Link")}
                {renderTextField("dueDate", "Due Date", false, "date")}
                {renderTextField("budget", "Add Budget", false, "number")}
                {renderTextField("description", "Project Description", true)}
            </DialogContent>


            <DialogActions sx={{ paddingBottom: '1rem' }}>
                {/* <Button onClick={handleClose} color="secondary" className={styles.dialogBtnPrimary}>Cancel</Button>
                <Button type="submit" onClick={handleClose} color="primary" className={styles.dialogBtnSecondary}>Save</Button> */}
                <Button onClick={handleClose} variant="outlined" className={style.decline}>Cancel</Button>
                <Button type="submit" onClick={handleClose} color="primary" variant="contained" className={style.accept}>Save</Button>
            </DialogActions>

        </Dialog>
    );
};



TextDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default TextDialog;
