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
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import theme from '../../Theme/Theme';
// import { Link } from 'react-router-dom';
// import { RouteNames } from '../../Constants/route';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <Box sx={{ backgroundColor: theme.palette.grey[50], height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Container component="main" maxWidth="xs">
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
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            size="small"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                backgroundColor: '#ffffff',
                                '& .MuiInputBase-input': {
                                    fontSize: '14px',
                                },
                            }}
                        />
                        <TextField
                            margin="normal"
                            size="small"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                backgroundColor: '#ffffff',
                                '& .MuiInputBase-input': {
                                    fontSize: '14px',
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: 'black', color: 'white' }}
                        >
                            LogIn
                        </Button>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Button href="#" variant="text" size="small" sx={{ fontSize: '12px', color: 'black' }}>
                                    Forgot password?
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button href="#" variant="text" size="small" sx={{ fontSize: '12px', color: 'black' }}>
                                    {"Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default LoginPage;
