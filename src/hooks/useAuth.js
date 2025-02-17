import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { loginUser, logoutUser, promoteUser, signUpUser } from '../api/authApi';



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


// let ws = null;
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // const token = data?.data?.accessToken;

      // ✅ Store token in localStorage
      localStorage.setItem("accessToken", data?.data?.accessToken);
      localStorage.setItem("refreshToken", data?.data?.refreshToken);
      localStorage.setItem("role", data?.data?.user?.role);
      queryClient.setQueryData(["user"], data?.data?.user);

      // console.log("This is token from useLogin hook", token);

      // ✅ Send token to Electron via WebSocket
      // const ws = new WebSocket("ws://localhost:3001"); // Connect to Electron's WebSocket

    //   if (!ws || ws.readyState === WebSocket.CLOSED) { // ✅ Ensure connection is maintained
    //     ws = new WebSocket("ws://localhost:3001");

    //     ws.onopen = () => {
    //       console.log("Connected to Electron WebSocket");
    //       ws.send(token); // ✅ Send token once WebSocket is open
    //     };

    //     ws.onerror = (error) => {
    //       console.error("WebSocket Error:", error);
    //     };

    //     ws.onclose = () => {
    //       console.log("Electron WebSocket closed.");
    //     };
    //   } else {
    //     ws.send(token); // ✅ Send token if WebSocket is already open
    //   }

    },
    // onSuccess: (data) => {
    //   localStorage.setItem("accessToken", data?.data?.accessToken);
    //   localStorage.setItem("refreshToken", data?.data?.refreshToken);
    //   localStorage.setItem("role", data?.data?.user?.role);
    //   queryClient.setQueryData(["user"], data?.data?.user);
    //   const token = localStorage.getItem("accessToken")
    //   console.log("This is token from useLogin hook", token)
    //   if (window.electronAPI) {
    //     window.electronAPI.launchApp(token);
    //   } else {
    //     console.warn("Electron API is not available");
    //   }
    // },

    onError: (error) => {
      console.error("(useAuth) Login failed:", error.response?.data || error.message);
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