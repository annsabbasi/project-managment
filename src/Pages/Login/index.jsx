import theme from '../../Theme/Theme';
import styles from './style.module.scss'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useState } from 'react';
import { useLogin } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { RouteNames } from '../../Constants/route';
import { Box, Button, TextField, Typography, Container, CssBaseline, Avatar, Stack, } from '@mui/material';


const LoginPage = () => {
    const { mutate } = useLogin();
    // const [redirect, setRedirect] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(formData, {
            onSuccess: () => {
                // setRedirect(true);
                // const userToken = localStorage.getItem("accessToken")
                const userRole = localStorage.getItem("role")

                console.log("User Role from Login.jsx", userRole)
                if (userRole === 'superadmin') {
                    // navigate(`/${RouteNames.ADMINPAGE1}`)
                    navigate(`/${RouteNames.ADMINPAGE1}`)
                }
                else if (userRole === 'admin') {
                    navigate(`/${RouteNames.PROJECT}`)
                }
                else {
                    navigate(`/${RouteNames.DASHBOARD}`)
                }
            },
            onError: (error) => {
                console.error("Login failed:", error.response?.data || error.message);
            }
        })
    }
    // if (redirect) {
    //     return <Navigate to={'/project'} />
    // }

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ backgroundColor: theme.palette.grey[50] }} className={styles.container}>
            <Container component="main" maxWidth="xs">

                <CssBaseline />
                <Box className={styles.boxItem}>
                    <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h6" className={styles.loginText}>Login</Typography>

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


                        {/* <Typography>{error && <p>{error.message}</p>}</Typography> */}
                        <Button type="submit" fullWidth variant="contained" className={styles.loginBtn}>LogIn</Button>
                        <Stack justifyContent="space-between" gap={0.5}>
                            <Box >
                                <Link href="#" variant="text" size="small" className={styles.forgetPassword}>
                                    Forgot password?
                                </Link>
                            </Box>

                            <Box>
                                <Typography variant="text" size="small" className={styles.dontHaveAccount}>
                                    {"Don't have an account?"}&nbsp;
                                    <Link to={`/${RouteNames.SIGNUP}`} className={styles.login}>
                                        &nbsp;Login
                                    </Link>
                                </Typography>
                            </Box>
                        </Stack>
                        {/* <Stack>
                            <Typography sx={{ fontSize: '0.9rem' }}>Forget Password?</Typography>
                            <Typography sx={{ fontSize: '0.9rem' }}>Don't have an account? Sign Up</Typography>
                        </Stack> */}


                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default LoginPage;
