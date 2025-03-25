import styles from './style.module.scss'
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
} from '@mui/material';


const LoginPage = () => {
    const { mutate } = useLogin();
    const [formData, setFormData] = useState({ email: '', password: '', role: 'user' });
    const [error, setError] = useState("")
    const navigate = useNavigate();
    console.log("This is the formData of the login", formData)
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(formData, {
            onSuccess: () => {
                const userRole = localStorage.getItem("role")
                if (userRole === 'superadmin') {
                    navigate(`/${RouteNames.ADMINPAGE1}`)
                }
                else if (userRole === 'admin') {
                    navigate(`/${RouteNames.PROJECT}`)
                }
                else {
                    navigate(`/${RouteNames.DASHBOARD}`)
                }
                toast.success("User Login Successfully.", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: false,
                })
            },

            onError: (error) => {
                setError(error?.response?.data?.message || error.response?.data?.errors)
                setTimeout(() => {
                    setError("");
                }, 5000);
            }
        })
    }

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate className={styles.container}>
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


                    <Box sx={{ mt: 1, width: '100%' }} >
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
                                sx={{
                                    backgroundColor: '#ffffff',
                                    '& .MuiInputBase-input': {
                                        fontSize: '14px',
                                    },
                                }} />

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
                                sx={{
                                    backgroundColor: '#ffffff',
                                    '& .MuiInputBase-input': {
                                        fontSize: '14px',
                                    },
                                }} />
                        </Box>


                        <Typography className={`${styles.errMessageTxt}`}>{error} &nbsp;</Typography>
                        <Button type="submit" fullWidth variant="contained" className={styles.loginBtn}>LogIn</Button>
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