import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  loginUser,
  logoutUser,
  promoteUser,
  signUpUser,
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


export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { role, user } = useAuth();
  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      queryClient.clear();
      localStorage.removeItem("accessToken");
      {
        role !== "user" || user ?
          navigate('/superadminlogin') :
          navigate('/login');
      }
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