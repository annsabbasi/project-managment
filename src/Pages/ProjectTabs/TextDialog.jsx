import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    Typography,
    // MenuItem,
    // FormControl,
    // FormControlLabel,
    // FormLabel
} from '@mui/material';
import styles from './style.module.scss'
import PropTypes from 'prop-types';

const TextDialog = ({ open, handleClose }) => {
    return (
        <Dialog open={open} onClose={handleClose} className={`${styles.sidebar}`}>
            <DialogTitle>Add a New Project</DialogTitle>

            <DialogContent className={`${styles.sidebar}`}>
                <TextField
                    margin='dense'
                    autoFocus
                    id="project-title"
                    label="Project Title"
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                        sx: {
                            fontSize: '0.9rem',
                        },
                    }} sx={{ marginTop: '0.8rem' }} />

                {/* <TextField
                    select
                    margin="normal"
                    id="select-client"
                    label="Select a Client (Optional)"
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                        sx: {
                            fontSize: '0.9rem'
                        }
                    }}>

                    <MenuItem value="Client 1">Client 1</MenuItem>
                    <MenuItem value="Client 2">Client 2</MenuItem>
                </TextField> */}
                <TextField
                    autoFocus
                    margin='dense'
                    id="team-lead"
                    label="Team Lead Name"
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                        sx: {
                            fontSize: '0.9rem'
                        }
                    }} />
                <TextField
                    autoFocus
                    margin='dense'
                    id="client-name"
                    label="Client Name"
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                        sx: {
                            fontSize: '0.9rem'
                        }
                    }} />
                <TextField
                    autoFocus
                    margin='dense'
                    id="due-date"
                    label="Due Date"
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                        sx: {
                            fontSize: '0.9rem'
                        }
                    }} />
                <TextField
                    autoFocus
                    margin='dense'
                    id="add-budget"
                    label="Add Budget"
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                        sx: {
                            fontSize: '0.9rem'
                        }
                    }} />

                <TextField
                    margin="normal"
                    id="project-description"
                    label="Project Description"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                        sx: {
                            fontSize: '0.9rem'
                        }
                    }} />

                {/* <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Enter Text</FormLabel>
          <TextField
            placeholder='Text Field'
            variant="outlined"
            name="text"
            fullWidth
            size="small"
            InputProps={{
              sx: {
                fontSize: '0.8rem'
              }
            }}
          />
        </FormControl> */}

            </DialogContent>
            <Typography variant="span" sx={{ margin: 'auto', fontSize: '0.9rem', color: 'red' }}>error will shown here</Typography>
            <DialogActions sx={{ paddingBottom: '1rem' }}>
                <Button onClick={handleClose} color="secondary" className={`${styles.dialogBtnPrimary}`}>
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary" className={`${styles.dialogBtnSecondary}`}>
                    Save
                </Button>
            </DialogActions>
        </Dialog >
    );
};

export default TextDialog;

TextDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired, // Update to accept a function
};