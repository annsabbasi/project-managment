import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';

import { axiosInstance } from '../api/axiosInstance';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

    const { data: user, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            if (!accessToken) return null;
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
        <AuthContext.Provider value={{ user, accessToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};




AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};


export const useAuth = () => useContext(AuthContext);