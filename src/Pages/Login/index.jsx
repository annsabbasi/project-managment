<<<<<<< HEAD
=======
import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    CssBaseline,
    Avatar,
    Grid,

    Stack,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
>>>>>>> ba3d944966c755d77ef3a98e609f1f4df6a1c8a4
import theme from '../../Theme/Theme';
import styles from './style.module.scss'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useState } from 'react';
import { useLogin } from '../../hooks/useAuth';
import { Link, Navigate } from 'react-router-dom';
import { RouteNames } from '../../Constants/route';
import { Box, Button, TextField, Typography, Container, CssBaseline, Avatar, Grid, Stack, } from '@mui/material';


const LoginPage = () => {
    const { mutate } = useLogin();
    const [redirect, setRedirect] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
<<<<<<< HEAD
        mutate(formData, {
            onSuccess: () => {
                setRedirect(true);
            }
        })
    }
    if (redirect) {
        return <Navigate to={'/project'} />
    }

=======


        console.log('Email:', email);
        console.log('Password:', password);
    };
>>>>>>> ba3d944966c755d77ef3a98e609f1f4df6a1c8a4

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ backgroundColor: theme.palette.grey[50] }} className={styles.container}>
            <Container component="main" maxWidth="xs">

                <CssBaseline />
                <Box className={styles.boxItem}>
                    <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                        <LockOutlinedIcon />
                    </Avatar>
<<<<<<< HEAD
                    <Typography component="h1" variant="h6" className={styles.loginText}>Login</Typography>

                    <Box sx={{ mt: 1, width: '100%' }} >
                        <Box className={styles.boxText}>
=======
                    <Typography component="h1" variant="h6" sx={{ fontSize: '16px', color: 'black' }}>
                        Login
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '1.4rem', }}>
>>>>>>> ba3d944966c755d77ef3a98e609f1f4df6a1c8a4
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
<<<<<<< HEAD
=======

                    
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"

                            sx={{ mt: 6, mb: 2, backgroundColor: 'black', color: 'white' }}>LogIn</Button>
>>>>>>> ba3d944966c755d77ef3a98e609f1f4df6a1c8a4


                        {/* <Typography>{error && <p>{error.message}</p>}</Typography> */}
                        <Button type="submit" fullWidth variant="contained" className={styles.loginBtn}>LogIn</Button>
                        <Stack justifyContent="space-between" gap={0.5}>
                            <Box item>
                                <Link href="#" variant="text" size="small" className={styles.forgetPassword}>
                                    Forgot password?
                                </Link>
                            </Box>

                            <Grid item>
                                <Typography variant="text" size="small" className={styles.dontHaveAccount}>
                                    {"Don't have an account?"}&nbsp;
                                    <Link to={`/${RouteNames.SIGNUP}`} className={styles.login}>
                                        &nbsp;Login
                                    </Link>
                                </Typography>
                            </Grid>
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
