import { Grid, TextField, Button, Box, Typography } from '@mui/material';
import styles from './style.module.scss';

export default function Index() {
    return (
        <form style={{ marginTop: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        label="User Names"
                        margin="dense"
                        autoFocus
                        id="user-names-1"
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        label="Task Title"
                        margin="dense"
                        autoFocus
                        id="user-names-1"
                        size="small"
                        fullWidth
                    />
                </Grid>

                {/* Third field with the same width as the first two fields */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        label="Task Description"
                        margin="dense"
                        autoFocus
                        id="user-names-1"
                        size="small"
                        fullWidth
                        multiline
                        rows={4}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        label="Due Date"
                        margin="dense"
                        autoFocus
                        id="due-date"
                        size="small"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} my={1}>
                    <Typography variant="span" sx={{ margin: 'auto', fontSize: '0.9rem', color: 'red' }}>error will shown here</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Box display="flex" gap={2}>
                        <Button color="secondary" className={`${styles.dialogBtnPrimary}`}>
                            Cancel
                        </Button>
                        <Button color="primary" className={`${styles.dialogBtnSecondary}`}>
                            Save
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};
