import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  loginUser,
  logoutUser,
  promoteUser,
  signUpUser,
  signUpCompany,
  loginCompany
} from '../api/authApi';
import { useAuth } from '../context/AuthProvider';

// Signup Hook for User
export const useSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['accessToken'], data.user);
      localStorage.setItem('accessToken', data.token); // Store user token
      localStorage.removeItem('accessTokenC');
      localStorage.removeItem('refreshTokenC');
    },
    onError: (error) => {
      console.error('(useSignup) Signup failed:', error.response?.data || error.message);
    },
  });
};

// Signup Hook for Company
export const useSignupCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUpCompany,
    onSuccess: (data) => {
      queryClient.setQueryData(['accessTokenC'], data.user);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.setItem('accessTokenC', data.token); // Store company token
    },
    onError: (error) => {
      console.error('(useSignupCompany) Signup failed:', error.response?.data || error.message);
    },
  });
};

// Login Hook for User
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setAccessToken, setRole } = useAuth();
  const navigate = useNavigate();

  return useMutation({
      mutationFn: loginUser, // API call for user login
      onSuccess: (data) => {
        try {
          const token = data?.data?.accessToken;
          const refreshToken = data?.data?.refreshToken;
          const role = data?.data?.user?.role;
          if (token && refreshToken) {
            localStorage.setItem('role', role); // Set role to user
            localStorage.setItem('accessToken', token); // Store user access token
            localStorage.setItem('refreshToken', refreshToken); // Store user refresh token

            setAccessToken(token); // Update AuthProvider state
            setRole('user');
            queryClient.invalidateQueries(['authData', 'user']);
            navigate('/dashboard'); // Navigate to user dashboard
          } else {
            console.error('Missing token or refreshToken in response');
          }
        } catch (error) {
          console.error('Error in onSuccess:', error);
        }
      },
      onError: (error) => {
        console.error('(useLogin) Login failed:', error.response?.data || error.message);
      },
  });
};

// Login Hook for Company
export const useLoginCompany = () => {
  const queryClient = useQueryClient();
  const { setAccessToken, setRole } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginCompany,
    onSuccess: (data) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('role');
      const token = data?.data?.accessToken;
      localStorage.setItem('accessTokenC', token); // Store company access token
      localStorage.setItem('refreshTokenC', data?.data?.refreshToken); // Store company refresh token
      localStorage.setItem('role', 'admin'); // Set role to company
      setAccessToken(token); // Update AuthProvider state
      setRole('admin');
      queryClient.invalidateQueries(['authData', 'admin']);
      navigate('/company-dashboard'); // Navigate to company dashboard
    },
    onError: (error) => {
      console.error('(useLoginCompany) Login failed:', error.response?.data || error.message);
    },
  });
};

// Logout Hook
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setAccessToken, setRole } = useAuth();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Clear tokens and role-specific data
      queryClient.clear();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('accessTokenC');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('refreshTokenC');
      localStorage.removeItem('role');
      setAccessToken(null); // Clear AuthProvider state
      setRole(null);
      navigate('/login'); // Redirect to login
    },
    onError: (error) => {
      console.error('(useLogout) Logout failed:', error.message || error);
    },
  });
};

// Promote User Hook
export const usePromoteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: promoteUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['userPromotion'], data.user); // Update promotion data
    },
    onError: (error) => {
      console.error('(usePromoteUser) Promotion failed:', error.response?.data || error.message);
    },
  });
};
