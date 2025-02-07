import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useState, useEffect } from 'react';
import { axiosInstance } from '../api/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem('accessToken') || localStorage.getItem('accessTokenC')
    );
    const [role, setRole] = useState(localStorage.getItem('role')); // 'user' or 'company'

    // Update Axios headers when accessToken or role changes
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

    // Fetch data based on role
    const { data: authData, isLoading } = useQuery({
        queryKey: ['authData', role],
        queryFn: async () => {
            if (!accessToken || !role) {
                clearLocalStorage();
                return null;
            }
            try {
                const endpoint =
                    role === 'user' ? '/user/get-user-data' : '/company/get-company-data';
                const response = await axiosInstance.get(endpoint);
                return response.data.data;
            } catch (error) {
                console.error('(AuthProvider) Fetch auth data error:', error);
                handleLogout();
                return null;
            }
        },
    });

    // Clear local storage based on role
    const clearLocalStorage = () => {
        if (role === 'user') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('role');
        } else if (role === 'admin') {
            localStorage.removeItem('accessTokenC');
            localStorage.removeItem('refreshTokenC');
            localStorage.removeItem('role');
        }
    };

    // Handle logout for both roles
    const handleLogout = () => {
        clearLocalStorage();
        setAccessToken(null);
        setRole(null);
    };

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
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
