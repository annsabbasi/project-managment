import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useState, useEffect } from 'react';
import { axiosInstance } from '../api/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [role, setRole] = useState(localStorage.getItem('role')); // 'user' or 'company'

    // Update Axios headers when accessToken changes
    useEffect(() => {
        if (accessToken) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        } else {
            delete axiosInstance.defaults.headers.common['Authorization'];
        }
    }, [accessToken]);

    // Fetch data based on role
    const { data: authData, isLoading } = useQuery({
        queryKey: ["authData", role],
        queryFn: async () => {
            if (!accessToken || !role) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('role');
                return null;
            }
            try {
                const endpoint =
                    role === 'user' ? '/user/get-user-data' : '/company/get-company-data';
                const response = await axiosInstance.get(endpoint);
                return response.data.data;
            } catch (error) {
                console.error('(AuthProvider) Fetch auth data error:', error);
                setAccessToken(null);
                setRole(null);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('role');
                return null;
            }
        },
    });

    return (
        <AuthContext.Provider value={{ authData, role, accessToken, setAccessToken, setRole, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
