import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useState, useEffect } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from '../Theme/Theme'; // Ensure these themes exist

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem('accessToken') || localStorage.getItem('accessTokenC')
    );
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [theme, setTheme] = useState(localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme);

    useEffect(() => {
        const token = role === 'user'
            ? localStorage.getItem('accessToken')
            : localStorage.getItem('accessTokenC');

        if (token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setAccessToken(token);
        } else {
            delete axiosInstance.defaults.headers.common['Authorization'];
        }
    }, [role]);

    const { data: authData, isLoading } = useQuery({
        queryKey: ['authData', role],
        queryFn: async () => {
            if (!accessToken || !role) return null;
            try {
                const endpoint = role === 'user' ? '/user/get-user-data' : '/company/get-company-data';
                const response = await axiosInstance.get(endpoint);
                return response.data.data;
            } catch (error) {
                console.error('(AuthProvider) Fetch auth data error:', error);
                return null;
            }
        },
        enabled: !!accessToken && !!role, // Prevents running query if token or role is missing
        onError: (error) => {
            console.error('Auth Fetch Error:', error);
            handleLogout();
        }
    });

    const clearLocalStorage = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenC');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('refreshTokenC');
        localStorage.removeItem('role');
    };

    const handleLogout = () => {
        clearLocalStorage();
        setAccessToken(null);
        setRole(null);
    };

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <AuthContext.Provider value={{ authData, role, accessToken, setAccessToken, setRole, isLoading, handleLogout, theme, setTheme }}>
                {children}
            </AuthContext.Provider>
        </MuiThemeProvider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
