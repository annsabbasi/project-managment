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
import theme from '../../Theme/Theme';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../Constants/route';


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
                                <TextField
                                    margin="normal"
                                    size="small"
                                    required
                                    id="name"
                                    label="example name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    value={name}
                                    variant="standard"
                                    onChange={(e) => setName(e.target.value)}
                                    sx={{
                                        backgroundColor: '#ffffff',
                                        '& .MuiInputBase-input': {
                                            fontSize: '14px',
                                        },
                                        flexGrow: 1
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    size="small"
                                    required
                                    id="email"
                                    label="example@gmail.com"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    variant="standard"
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={{
                                        backgroundColor: '#ffffff',
                                        '& .MuiInputBase-input': {
                                            fontSize: '14px',
                                        },
                                        flexGrow: 1
                                    }}
                                />
                            </Stack>
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

                        <Stack justifyContent="space-between" gap={0.5}>
                            <Grid item>
                                <Typography variant="text" size="small" style={{ fontSize: '14px', color: 'gray' }}>
                                    {"Already have an account?"}&nbsp;
                                    <Link to={`/${RouteNames.LOGIN}`} style={{ color: '#1877F2', textDecoration: 'none' }}>
                                        &nbsp;Login
                                    </Link>
                                </Typography>
                            </Grid>
                        </Stack>


                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default LoginPage;
