import styles from './style.module.scss';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { useSignup } from '../../hooks/useAuth';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { RouteNames } from '../../Constants/route';
import { toast } from 'react-toastify';
import {
    Box, Button,
    TextField, Typography,
    Container, CssBaseline,
    Avatar, Stack,
    RadioGroup,
    FormControlLabel,
    Radio,
    Fade,
    Paper
} from '@mui/material';

const SignUpPage = () => {
    const { mutate: signup } = useSignup();
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        signup(formData, {
            onSuccess: () => {
                setIsSubmitting(false);
                setRedirect(true);
                toast.success("Registration successful!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: false,
                    theme: "dark",
                });
            },
            onError: (error) => {
                setIsSubmitting(false);
                setError(error?.response?.data?.message || error.response?.data?.errors);
                setTimeout(() => {
                    setError("");
                }, 5000);
            }
        });
    }

    if (redirect) {
        return <Navigate to={`/${RouteNames.LOGIN}`} />;
    }

    return (
        <Box className={styles.container}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Fade in={true} timeout={800}>
                    <Paper elevation={10} className={styles.paper}>
                        <Box className={styles.boxItem}>
                            <Avatar className={styles.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography variant="h5" className={styles.title}>
                                Create an Account
                            </Typography>
                            <Typography variant="body2" className={styles.subtitle}>
                                Please fill in your details
                            </Typography>

                            <RadioGroup
                                aria-label="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                row
                                className={styles.radioGroup}
                            >
                                <FormControlLabel
                                    value="user"
                                    control={<Radio color="primary" />}
                                    label="User"
                                    className={styles.radioLabel}
                                />
                                <FormControlLabel
                                    value="admin"
                                    control={<Radio color="primary" />}
                                    label="Company"
                                    className={styles.radioLabel}
                                />
                            </RadioGroup>

                            <Box component="form" onSubmit={handleSubmit} className={styles.form}>
                                <TextField
                                    margin="normal"
                                    size="medium"
                                    label="Full Name"
                                    name="name"
                                    autoFocus
                                    variant="outlined"
                                    onChange={handleChange}
                                    fullWidth
                                    value={formData.name}
                                    className={styles.textField}
                                    InputLabelProps={{
                                        className: styles.inputLabel
                                    }}
                                />

                                <TextField
                                    margin="normal"
                                    size="medium"
                                    label="Email Address"
                                    name="email"
                                    variant="outlined"
                                    onChange={handleChange}
                                    fullWidth
                                    value={formData.email}
                                    className={styles.textField}
                                    InputLabelProps={{
                                        className: styles.inputLabel
                                    }}
                                />

                                <TextField
                                    margin="normal"
                                    size="medium"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    onChange={handleChange}
                                    fullWidth
                                    value={formData.password}
                                    className={styles.textField}
                                    InputLabelProps={{
                                        className: styles.inputLabel
                                    }}
                                />

                                <TextField
                                    margin="normal"
                                    size="medium"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    variant="outlined"
                                    onChange={handleChange}
                                    fullWidth
                                    value={formData.confirmPassword}
                                    className={styles.textField}
                                    InputLabelProps={{
                                        className: styles.inputLabel
                                    }}
                                />

                                {error && (
                                    <Typography className={styles.errMessageTxt}>
                                        {error}
                                    </Typography>
                                )}

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={styles.loginBtn}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Registering...' : 'Sign Up'}
                                </Button>

                                <Stack justifyContent="space-between" gap={0.5} className={styles.footer}>
                                    <Typography variant="body2" className={styles.linkText}>
                                        {"Already have an account?"}&nbsp;
                                        <Link to={`/${RouteNames.LOGIN}`} className={styles.link}>
                                            Login here
                                        </Link>
                                    </Typography>
                                </Stack>
                            </Box>
                        </Box>
                    </Paper>
                </Fade>
            </Container>
        </Box>
    );
};

export default SignUpPage;