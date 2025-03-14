import styles from './style.module.scss';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useState } from 'react';
import { useLogin, useLoginCompany } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { RouteNames } from '../../Constants/route';
import { toast } from 'react-toastify';
import {
    Box, Button,
    TextField, Typography,
    Container, CssBaseline,
    Avatar, Stack, RadioGroup, FormControlLabel, Radio,
} from '@mui/material';

const LoginPage = () => {
    const { mutate: login } = useLogin();
    const { mutate: loginCompany } = useLoginCompany();
    const [formData, setFormData] = useState({ email: '', password: '', role: 'user' }); // Default role as 'user'
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle Login Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const loginMutation = formData.role === 'admin' ? loginCompany : login;

        loginMutation(formData, {
            onSuccess: (response) => {
                const userRole = response?.data?.role || localStorage.getItem("role");

                // Navigate based on role
                switch (userRole) {
                    case 'superadmin':
                        navigate(`/${RouteNames.ADMINPAGE1}`);
                        break;
                    case 'admin':
                        navigate(`/${RouteNames.PROJECT}`);
                        break;
                    default:
                        navigate(`/${RouteNames.DASHBOARD}`);
                }

                toast.success("User Login Successfully!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });
            },

            onError: (error) => {
                const errorMessage = error?.response?.data?.message || 
                    (Array.isArray(error?.response?.data?.errors) 
                        ? error.response.data.errors.join(', ') 
                        : "An unexpected error occurred");

                setError(errorMessage);
                setTimeout(() => setError(''), 5000);
            },
        });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ backgroundColor: '#f5f5f5' }} // Default Background Color
            className={styles.container}
        >
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box className={styles.boxItem}>
                    <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h6" className={styles.loginText}>
                        Login as
                    </Typography>

                    {/* Role Selection */}
                    <RadioGroup
                        aria-label="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        row
                        className={styles.radioGroup}
                    >
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                        <FormControlLabel value="admin" control={<Radio />} label="Company" />
                    </RadioGroup>

                    <Box sx={{ mt: 1, width: '100%' }}>
                        <Box className={styles.boxText}>
                            <TextField
                                margin="normal"
                                size="small"
                                label="Email Address"
                                name="email"
                                autoFocus
                                variant="standard"
                                onChange={handleChange}
                                fullWidth
                                value={formData.email}
                                sx={{ backgroundColor: '#ffffff', '& .MuiInputBase-input': { fontSize: '14px' } }}
                            />

                            <TextField
                                margin="dense"
                                size="small"
                                name="password"
                                label="Password"
                                type="password"
                                variant="standard"
                                onChange={handleChange}
                                fullWidth
                                value={formData.password}
                                sx={{ backgroundColor: '#ffffff', '& .MuiInputBase-input': { fontSize: '14px' } }}
                            />
                        </Box>

                        {/* Display Error Message */}
                        {error && (
                            <Typography className={styles.errMessageTxt} color="error">
                                {error}
                            </Typography>
                        )}

                        <Button type="submit" fullWidth variant="contained" className={styles.loginBtn}>
                            Log In
                        </Button>

                        <Stack justifyContent="space-between" gap={0.5}>
                            <Box>
                                <Typography variant="text" size="small" className={styles.dontHaveAccount}>
                                    {"Don't have an account?"}&nbsp;
                                    <Link to={`/${RouteNames.SIGNUP}`} className={styles.login}>
                                        &nbsp;Register here
                                    </Link>
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default LoginPage;
