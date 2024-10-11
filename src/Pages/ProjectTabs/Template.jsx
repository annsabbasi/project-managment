import propTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  // FormControl,
  // FormControlLabel,
  // FormLabel
} from '@mui/material';

const Template = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add a New Project</DialogTitle>

      <DialogContent >
        <TextField
          autoFocus
          id="project-name"
          label="Project Name"
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

        <TextField
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
        </TextField>
        <TextField
          select
          margin="normal"
          id="select-template"
          label="Use a Project Template (Optional)"
          fullWidth
          variant="outlined"
          size="small"
          InputLabelProps={{
            sx: {
              fontSize: '0.9rem'
            }
          }}
        >
          <MenuItem value="Template 1">Template 1</MenuItem>
          <MenuItem value="Template 2">Template 2</MenuItem>
        </TextField>

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
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog >
  );
};

export default Template;

Template.propTypes = {
  open: propTypes.node.isRequired,
  handleClose: propTypes.node.isRequired
}