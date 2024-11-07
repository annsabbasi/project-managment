import theme from '../../Theme/Theme';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import styles from './style.module.scss'

import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { RouteNames } from '../../Constants/route';
import { Box, Button, TextField, Typography, Container, Avatar, Grid, Stack, } from '@mui/material';
import { useSignup } from '../../hooks/useAuth';

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
