import styles from './style.module.scss';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { useLogin } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
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

const LoginPage = () => {
    const { mutate } = useLogin();
    const [formData, setFormData] = useState({ email: '', password: '', role: 'user' });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        mutate(formData, {
            onSuccess: () => {
                setIsSubmitting(false);
                const userRole = localStorage.getItem("role");
                if (userRole === 'superadmin') {
                    navigate(`/${RouteNames.ADMINPAGE1}`);
                }
                else if (userRole === 'admin') {
                    navigate(`/${RouteNames.PROJECT}`);
                }
                else {
                    navigate(`/${RouteNames.DASHBOARD}`);
                }
                toast.success("Login successful!", {
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
                                Welcome Back
                            </Typography>
                            <Typography variant="body2" className={styles.subtitle}>
                                Please login to your account
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
                                    label="Email Address"
                                    name="email"
                                    autoFocus
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
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                </Button>

                                <Stack justifyContent="space-between" gap={0.5} className={styles.footer}>
                                    <Typography variant="body2" className={styles.linkText}>
                                        {"Don't have an account?"}&nbsp;
                                        <Link to={`/${RouteNames.SIGNUP}`} className={styles.link}>
                                            Register here
                                        </Link>
                                    </Typography>
                                    <Typography variant="body2" className={styles.linkText}>
                                        <Link to="/forgot-password" className={styles.link}>
                                            Forgot password?
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

export default LoginPage;