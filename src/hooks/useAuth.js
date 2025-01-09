import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream

import { loginUser, logoutUser, promoteUser, signUpUser } from '../api/authApi';
=======
import { loginUser, logoutUser, signUpUser, signUpCompany, loginCompany } from '../api/authApi';
import { useAuth } from '../context/AuthProvider';
>>>>>>> Stashed changes



export const useSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['accessToken'], data.user);
      localStorage.setItem('token', data.token);
    },
  });
};

export const useSignupCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUpCompany,
    onSuccess: (data) => {
      queryClient.setQueryData(['accessToken'], data.user);
      localStorage.setItem('token', data.token);
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setAccessToken, setRole } = useAuth();

  return useMutation({
      mutationFn: loginUser, // API call for user login
      onSuccess: (data) => {
          const token = data?.data?.accessToken;
          localStorage.setItem('accessToken', token);
          localStorage.setItem('refreshToken', data?.data?.refreshToken);
          localStorage.setItem('role', 'user');
          setAccessToken(token); // Update AuthProvider state
          setRole('user'); // Update role
          queryClient.invalidateQueries(["authData", "user"]);
      },
      onError: (error) => {
          console.error('(useLoginUser) Login failed:', error.response?.data || error.message);
      },
  });
};

export const useLoginCompany = () => {
  const queryClient = useQueryClient();
  const { setAccessToken, setRole } = useAuth();

  return useMutation({
      mutationFn: loginCompany,
      onSuccess: (data) => {
          const token = data?.data?.accessToken;
          localStorage.setItem('accessToken', token);
          localStorage.setItem('refreshToken', data?.data?.refreshToken);
          localStorage.setItem('role', 'company');
          setAccessToken(token); // Update AuthProvider state
          setRole('company'); // Update role
          queryClient.invalidateQueries(["authData", "company"]);
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