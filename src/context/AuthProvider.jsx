import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import { darkTheme, lightTheme } from '../Theme/Theme';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(localStorage.getItem('role')); // 'user' or 'company'
    const [accessToken, setAccessToken] = useState(() => {
        return role === 'user'
            ? localStorage.getItem('accessToken')
            : localStorage.getItem('accessTokenC');
    });
    console.log('test role', role);
    // Theme Setup
    const [mode, setMode] = useState(() => localStorage.getItem("Theme") || 'light');
    const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

    const toggleTheme = useCallback(() => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('Theme', newMode);
            document.body.setAttribute('data-theme', newMode);
            return newMode;
        });
    }, []);

    useEffect(() => {
        document.body.setAttribute('data-theme', mode);
    }, [mode]);

    // Update Axios headers when accessToken or role changes
    useEffect(() => {
        if (accessToken) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        } else {
            delete axiosInstance.defaults.headers.common['Authorization'];
        }
    }, [accessToken, role]);

    // Clear local storage based on role
    const clearLocalStorage = useCallback(() => {
        if (role === 'user') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('role');
        } else if (role === 'company') {
            localStorage.removeItem('accessTokenC');
            localStorage.removeItem('refreshTokenC');
            localStorage.removeItem('role');
        }
    }, [role]);

    // Handle logout for both roles
    const handleLogout = useCallback(() => {
        clearLocalStorage();
        setAccessToken(null);
        setRole(null);
    }, [clearLocalStorage]);

    // Fetch user data based on role
    const { data: authData, isLoading } = useQuery({
        queryKey: ['authData', role],
        queryFn: async () => {
            if (!accessToken || !role) {
                clearLocalStorage();
                return null;
            }
            try {
                const endpoint = role === 'user' ? '/user/get-user-data' : '/company/get-company-data';
                const response = await axiosInstance.get(endpoint);
                return response.data.data;
            } catch (error) {
                console.error('(AuthProvider) Fetch auth data error:', error);
                handleLogout();
                return null;
            }
        },
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });

    return (
        <AuthContext.Provider
            value={{
                authData,
                role,
                accessToken,
                setAccessToken,
                setRole,
                isLoading,
                handleLogout,
                mode,
                toggleTheme,
                theme,
            }}
        >
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
