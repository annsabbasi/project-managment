import { useState, useEffect } from "react";
import { useLogin, useLoginCompany } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../Constants/route";
import { toast } from "react-toastify";

import {
    Box, Button, TextField, Typography,
    Container, CssBaseline, Avatar,
    Stack, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import styles from "./style.module.scss";

const LoginPage = () => {
    const navigate = useNavigate();
    const { mutate: login } = useLogin();
    const { mutate: loginCompany } = useLoginCompany();

    const [formData, setFormData] = useState({ email: '', password: '', role: 'user' });
    const [error, setError] = useState("");

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const loginHandler = (authFunction) => {
        authFunction(formData, {
            onSuccess: () => {
                const userRole = localStorage.getItem("role");
                const redirectPath =
                    userRole === "superadmin" ? `/${RouteNames.SUPERDASHBOARD}` :
                    userRole === "admin" ? `/${RouteNames.PROJECT}` :
                    `/${RouteNames.DASHBOARD}`;
                
                navigate(redirectPath);
                toast.success("User Login Successfully.", {
                    position: "top-center",
                    autoClose: 2000,
                });
            },
            onError: (error) => {
                setError(error?.response?.data?.message || error.response?.data?.errors);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.role === 'admin' ? loginHandler(loginCompany) : loginHandler(login);
    };

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
                    <RadioGroup name="role" value={formData.role} onChange={handleChange} row className={styles.radioGroup}>
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
                                sx={{
                                    backgroundColor: '#ffffff',
                                    '& .MuiInputBase-input': { fontSize: '14px' },
                                }}
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
                                sx={{
                                    backgroundColor: '#ffffff',
                                    '& .MuiInputBase-input': { fontSize: '14px' },
                                }}
                            />
                        </Box>

                        {error && (
                            <Typography className={styles.errMessageTxt}>{error}</Typography>
                        )}

                        <Button type="submit" fullWidth variant="contained" className={styles.loginBtn}>
                            Log In
                        </Button>

                        <Stack justifyContent="space-between" gap={0.5}>
                            <Typography variant="text" size="small" className={styles.dontHaveAccount}>
                                {"Don't have an account?"}&nbsp;
                                <Link to={`/${RouteNames.SIGNUP}`} className={styles.login}>
                                    Register here
                                </Link>
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default LoginPage;
