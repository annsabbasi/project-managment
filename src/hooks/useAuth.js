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

export const useSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['accessToken'], data.user);
      localStorage.setItem('accessToken', data.token);
      localStorage.removeItem('accessTokenC');
      localStorage.removeItem('refreshTokenC');
    },
    onError: (error) => {
      console.error('(useSignup) Signup failed:', error.response?.data || error.message);
    },
  });
};

export const useSignupCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUpCompany,
    onSuccess: (data) => {
      queryClient.setQueryData(['accessTokenC'], data.user);
      localStorage.setItem('accessTokenC', data.token);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    onError: (error) => {
      console.error('Signup failed:', error.response?.data || error.message);
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setAccessToken, setRole } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      try {
        const token = data?.data?.accessToken;
        const refreshToken = data?.data?.refreshToken;
        const role = data?.data?.user?.role || 'user';

        if (token && refreshToken) {
          localStorage.setItem('accessToken', token);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('role', role);

          setAccessToken(token);
          setRole(role);
          queryClient.invalidateQueries(['authData', role]);

          role === 'admin' ? navigate('/dashboard') : navigate('/project');
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

export const useLoginCompany = () => {
  const queryClient = useQueryClient();
  const { setAccessToken, setRole } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginCompany,
    onSuccess: (data) => {
      const token = data?.data?.accessToken;
      const refreshToken = data?.data?.refreshToken;
      const role = 'admin'; // Default role for company

      if (token && refreshToken) {
        localStorage.setItem('accessTokenC', token);
        localStorage.setItem('refreshTokenC', refreshToken);
        localStorage.setItem('role', role);

        setAccessToken(token);
        setRole(role);
        queryClient.invalidateQueries(['authData', role]);

        navigate('/company-dashboard');
      } else {
        console.error('Missing token or refreshToken in response');
      }
    },
    onError: (error) => {
      console.error('(useLoginCompany) Login failed:', error.response?.data || error.message);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      queryClient.clear();
      localStorage.removeItem("accessToken");
      navigate('/login');
    },

    onError: (error) => {
      console.error("(useAuth) Logout failed:", error.message || error);
    }
  })
}


// Promote user Hook

export const usePromoteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: promoteUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['userPromotion'], data.user);
    },
  })
}