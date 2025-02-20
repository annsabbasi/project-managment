import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { axiosInstance } from '../api/axiosInstance';
import { darkTheme, lightTheme } from '../Theme/Theme';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    // let ws = null;
    const wsRef = useRef(null);
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
        document.body.setAttribute('data-theme', mode);
    }, [mode])

    // Trying to Implement Electron-App
    const getToken = localStorage.getItem('accessToken')
    useEffect(() => {
        if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
            wsRef.current = new WebSocket("ws://localhost:3001");

            wsRef.current.onopen = () => {
                console.log("Connected to Electron WebSocket");
                wsRef.current.send(getToken);
            };

            wsRef.current.onerror = (error) => {
                console.error("WebSocket Error:", error);
            };

            wsRef.current.onclose = () => {
                console.log("Electron WebSocket closed.");
            };
        } else {
            wsRef.current.send(getToken);
        }

        // Cleanup function to close WebSocket when component unmounts
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    });

    // console.log("GetToken Access", getToken)
    // useEffect(() => {
    //     // const connectWebSocket = () => {

    //         if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
    //             wsRef.current = new WebSocket("ws://localhost:3001");

    //             wsRef.current.onopen = () => {
    //                 console.log("Connected to Electron WebSocket");
    //                 wsRef.current.send(getToken);
    //             };

    //             wsRef.current.onerror = (error) => {
    //                 console.error("WebSocket Error:", error);
    //             };

    //             wsRef.current.onclose = () => {
    //                 console.log("Electron WebSocket closed.");
    //             };
    //         } else {
    //             wsRef.current.send(getToken);
    //         }
    //     // }
    //     // connectWebSocket();

    //     const intervalId = setInterval(() => {
    //         console.log("Checking web-socket connection")
    //         // connectWebSocket();
    //     }, 60000)

    //     // Cleanup function to close WebSocket when component unmounts
    //     return () => {
    //         clearInterval(intervalId);
    //         if (wsRef.current) {
    //             wsRef.current.close();
    //         }
    //     };
    // }, [getToken]);


    // useEffect(() => {

    //     if (!ws || ws.readyState === WebSocket.CLOSED) {
    //         ws = new WebSocket("ws://localhost:3001");

    //         ws.onopen = () => {
    //             console.log("Connected to Electron WebSocket");
    //             ws.send(getToken);
    //         };

    //         ws.onerror = (error) => {
    //             console.error("WebSocket Error:", error);
    //         };

    //         ws.onclose = () => {
    //             console.log("Electron WebSocket closed.");
    //         };
    //     } else { ws.send(getToken); }
    // }, [])

    // Trying to Implement Electron-App

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
