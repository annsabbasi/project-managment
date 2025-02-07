import styles from './style.module.scss';
import theme from '../../Theme/Theme';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSignup, useSignupCompany } from '../../hooks/useAuth';
import { Link, Navigate } from 'react-router-dom';
import { RouteNames } from '../../Constants/route';

import {
    Box, Button,
    Grid, Stack,
    Container, Avatar,
    TextField, Typography,
    Radio, RadioGroup,
    FormControlLabel, FormControl,
    FormLabel
} from '@mui/material';

const Index = () => {
    const { mutate: signup } = useSignup();
    const { mutate: signupComapny } = useSignupCompany();
    const [error, setError] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        password: '', 
        confirmPassword: '', 
        companyName: '', 
        role: 'admin' // Default to "user"
    });

    const handleData = (value) => {
        setFormData({ ...formData, [value.target.name]: value.target.value });
    };

    const handleRoleChange = (e) => {
        setFormData({ ...formData, role: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.role == 'admin'){
            signupComapny(formData, {
                onSuccess: () => {
                    setRedirect(true);
                    toast.success("Registration Successful.");
                },
                onError: (err) => {
                    setError(err.response?.data?.error || err.response?.data?.errors);
                    setTimeout(() => {
                        setError("");
                    }, 3000);
                }
            });
        } else{            
            signup(formData, {
                onSuccess: () => {
                    setRedirect(true);
                    toast.success("Registration Successful.");
                },
                onError: (err) => {
                    setError(err.response?.data?.error || err.response?.data?.errors);
                    setTimeout(() => {
                        setError("");
                    }, 3000);
                }
            });
        }
    };

    if (redirect) {
        return <Navigate to={'/login'} />;
    }

    return (
        // <Box component="form" onSubmit={handleSubmit} noValidate sx={{ backgroundColor: theme.palette.grey[50] }} className={`${styles.containerMain}`}>
        <Box component="form" onSubmit={handleSubmit} noValidate className={`${styles.containerMain}`}>
            <Container component="main" sx={{ maxWidth: '600px !important' }}>
                <Box className={`${styles.itemContent}`}>

                    <Avatar className={`${styles.avatar}`}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h6" className={`${styles.signupText}`}>Sign Up</Typography>

                    <Box className={`${styles.contentMain}`}>
                        <Box className={`${styles.contentMainChild}`}>

                            {/* Role Selection */}
                            <FormControl component="fieldset" className={`${styles.roleSelection}`}>
                                <FormLabel component="legend">Register as</FormLabel>
                                <RadioGroup
                                    row
                                    name="role"
                                    value={formData.role}
                                    onChange={handleRoleChange}
                                >
                                    <FormControlLabel value="user" control={<Radio />} label="User" />
                                    <FormControlLabel value="admin" control={<Radio />} label="Company" />
                                </RadioGroup>
                            </FormControl>
                            <Stack flexWrap="wrap" gap="1rem" flexDirection="row" flex={1} className={`${styles.contentMainStack}`}>

                                {/* Name Field */}
                                {formData.role === 'user' && (
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        label="Full Name"
                                        name="name"
                                        value={formData.name}
                                        autoFocus
                                        variant="standard"
                                        onChange={handleData}
                                        className={`${styles.textInput}`}
                                    />
                                )}

                                {/* Company Name Field (conditionally rendered) */}
                                {formData.role === 'admin' && (
                                    <TextField
                                        margin="normal"
                                        size="small"
                                        label="Company Name"
                                        name="companyName"
                                        variant="standard"
                                        value={formData.companyName}
                                        onChange={handleData}
                                        className={`${styles.textInput}`}
                                    />
                                )}

                                {/* Email Field */}
                                <TextField
                                    margin="normal"
                                    size="small"
                                    label="Email Address"
                                    name="email"
                                    variant="standard"
                                    value={formData.email}
                                    onChange={handleData}
                                    className={`${styles.textInput}`}
                                />
                            </Stack>

                            {/* Password Fields */}
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
                                className={`${styles.textInputPassword}`}
                            />

                            <TextField
                                margin="dense"
                                size="small"
                                label="Confirm Password"
                                name="confirmPassword"
                                variant="standard"
                                fullWidth
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleData}
                                className={`${styles.textInputPassword}`}
                            />
                        </Box>

                        {/* Error Message */}
                        <Typography className={`${styles.errMessageTxt}`}>{error} &nbsp;</Typography>

                        {/* Submit Button */}
                        <Button type="submit" fullWidth variant="contained" className={`${styles.btnSignup}`}>Sign Up</Button>

                        {/* Redirect to Login */}
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
