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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import styles from './style.module.scss'

import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { RouteNames } from '../../Constants/route';
import { Box, Button, TextField, Typography, Container, Avatar, Grid, Stack, } from '@mui/material';
import { useSignup } from '../../hooks/useAuth';

<<<<<<< HEAD
const Index = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    // const signUpMutation = useSignup();
    const { mutate: signup, error } = useSignup();
    const [redirect, setRedirect] = useState(false);
    const handleData = (value) => {
        setFormData({ ...formData, [value.target.name]: value.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        signup(formData);
        setRedirect(true);
    }
    if (redirect) {
        return <Navigate to={'/login'} />
    }

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ backgroundColor: theme.palette.grey[50] }} className={`${styles.containerMain}`}>
            <Container component="main" sx={{ maxWidth: '600px !important' }}>
                <Box className={`${styles.itemContent}`} >

                    <Avatar className={`${styles.avatar}`}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h6" className={`${styles.signupText}`}>SignUp</Typography>

                    <Box className={`${styles.contentMain}`}>
                        <Box className={`${styles.contentMainChild}`}>
                            <Stack flexWrap="wrap" gap="1rem" flexDirection="row" flex={1} className={`${styles.contentMainStack}`}>
=======

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <Box sx={{ backgroundColor: theme.palette.grey[50], height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <Container component="main" sx={{ maxWidth: '600px !important' }}>

                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.3)',
                        border: '1px solid silver',
                        padding: 4,
                        borderRadius: 2,
                        backgroundColor: 'white'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h6" sx={{ fontSize: '16px', color: 'black' }}>

                        SignUp
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '1.4rem', }}>
                            <Stack flexWrap="wrap" gap="1rem" flexDirection="row" flex={1} sx={{ width: '100%', minWidth: "200px" }}>
>>>>>>> ba3d944966c755d77ef3a98e609f1f4df6a1c8a4
                                <TextField
                                    margin="normal"
                                    size="small"
                                    label="example name"
                                    name="name"
                                    value={formData.name}
                                    autoFocus
                                    variant="standard"
                                    onChange={handleData} className={`${styles.textInput}`} />
                                <TextField
                                    margin="normal"
                                    size="small"
                                    label="example@gmail.com"
                                    name="email"
                                    variant="standard"
                                    value={formData.email}
                                    onChange={handleData}
                                    className={`${styles.textInput}`} />
                            </Stack>
<<<<<<< HEAD
=======
                            <TextField
                                margin="dense"
                                size="small"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                variant="standard"
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                    backgroundColor: '#ffffff',
                                    '& .MuiInputBase-input': {
                                        fontSize: '14px',
                                    },
                                }}
                            />
                            <TextField
                                margin="dense"
                                size="small"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="confirm password"
                                type="confirmPassword"
                                id="confirmPassword"
                                autoComplete="current-password"
                                value={confirmPassword}
                                variant="standard"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                sx={{
                                    backgroundColor: '#ffffff',
                                    '& .MuiInputBase-input': {
                                        fontSize: '14px',
                                    },
                                }}
                            />
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"

                            sx={{ mt: 6, mb: 2, backgroundColor: 'black', color: 'white' }}>Sign Up</Button>
>>>>>>> ba3d944966c755d77ef3a98e609f1f4df6a1c8a4

                            <TextField
                                margin="dense"
                                size="small"
                                label="Password"
                                name="password"
                                variant="standard"
                                fullWidth
                                type="password"
                                value={formData.password}
                                onChange={handleData}
                                className={`${styles.textInputPassword}`} />
                            <TextField
                                margin="dense"
                                size="small"
                                label="confirm password"
                                name="confirmPassword"
                                variant="standard"
                                fullWidth
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleData}
                                className={`${styles.textInputPassword}`} />
                        </Box>

                        <Typography className={`${styles.errMessageTxt}`}>{error && <p>{error.message}</p>}</Typography>
                        <Button type="submit" fullWidth variant="contained" className={`${styles.btnSignup}`}>Sign Up</Button>
                        <Stack justifyContent="space-between" gap={0.5}>
                            <Grid item>
                                <Typography variant="text" size="small" className={`${styles.textFooter}`}>
                                    {"Already have an account?"}&nbsp;
                                    <Link to={`/${RouteNames.LOGIN}`} className={`${styles.textLogin}`}>&nbsp;Login</Link>
                                </Typography>
                            </Grid>
                        </Stack>


                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Index;
