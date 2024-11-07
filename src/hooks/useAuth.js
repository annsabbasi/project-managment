import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser, logoutUser, signUpUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['accessToken'], data.user);
      localStorage.setItem('token', data.token);
    },
    onError: (error) => {
      console.error('(useAuth) Signup failed:', error);
    },
  });
};


export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.data.accessToken);
      // queryClient.setQueriesData(["user"], data?.data?.user)
      queryClient.setQueryData(["user"], data?.data?.user)
      console.log("This is the data of Login deom (useAuth)", data)
    },
    onError: (error) => {
      console.error("(useAuth) Login failed:", error.response?.data || error.message)
    }
  })
}


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
