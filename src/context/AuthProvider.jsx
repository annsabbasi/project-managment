import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { axiosInstance } from '../api/axiosInstance';
import { darkTheme, lightTheme } from '../Theme/Theme';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    // Theme Setup
    // const [mode, setMode] = useState('light')
    const [mode, setMode] = useState(() => {
        return localStorage.getItem("Theme") || 'light'
    })
    const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);
    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };
    useEffect(() => {
        localStorage.setItem('Theme', mode)
    }, [mode])

    const { data: user, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            if (!accessToken) {
                localStorage.removeItem('refreshToken');
                return null;
            }
            try {
                const response = await axiosInstance.get('/user/get-user-data', {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                return response.data.data;
            } catch (error) {
                console.log('(AuthProvider) data Error', error);
                setAccessToken(null);
                localStorage.removeItem('accessToken');
                return null;
            }
        }
    });

    return (
        <AuthContext.Provider value={{ user, accessToken, isLoading, mode, toggleTheme, theme }}>
            {/* {children} */}
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </AuthContext.Provider>
    );
};




AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
