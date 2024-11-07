import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { axiosInstance } from '../api/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

    // Use useQuery to retrieve cached user data
    const { data: user, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            if (!accessToken) return null;
            try {
                const response = await axiosInstance.get('/user/get-user-data', {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                // console.log("(AuthProvider) data", response.data.data);
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

// Simple using the useContext and an api call to fetch the data

// import PropTypes from 'prop-types'
// import { axiosInstance } from "../api/axiosInstance";
// import { createContext, useEffect, useState, useContext } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

//     // Fetching the user data
//     const fetchUserData = async () => {
//         if (!accessToken) return;
//         try {
//             const response = await axiosInstance.get('/user/get-user-data', {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`
//                 }
//             })
//             setUser(response.data.data)
//             console.log("(AuthProvider) data", response.data)
//         } catch (error) {
//             console.log('Error in fetching user data', error)
//             setUser(null)
//             setAccessToken(null)
//             localStorage.removeItem('accessToken')
//         }
//     }

//     useEffect(() => {
//         fetchUserData();
//     }, [accessToken])

//     return (
//         <AuthContext.Provider value={{ user, accessToken }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// AuthProvider.propTypes = {
//     children: PropTypes.node.isRequired
// }

// export const useAuth = () => useContext(AuthContext);
