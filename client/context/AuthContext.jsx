import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  // Check if user is authenticated and if so, set the user data and connect the socket
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Login function to handle user authentication and socket connection
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
      if (data.success) {
        setAuthUser(data.userData);
        connectSocket(data.userData);
        axios.defaults.headers.common["token"] = data.token;
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Logout function to handle user logout and socket disconnection
  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    axios.defaults.headers.common["token"] = null;
    toast.success("Logged out successfully");
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", body);
      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Improved socket connection function
  const connectSocket = (userData) => {
  if (!userData || socket?.connected) return;

  let baseURL = backendUrl?.replace(/\/+$/, "");

  if (baseURL.startsWith("https://https") || baseURL.startsWith("http://https")) {
    baseURL = baseURL.replace("https://https", "https://").replace("http://https", "https://");
  }

  console.log("Connecting to socket at:", baseURL);
  console.log("With userId:", userData._id);

  const newSocket = io(baseURL, {
    query: { userId: userData._id },
    transports: ["websocket"],
  });

  //Add these logs to debug
  newSocket.on("connect", () => {
    console.log(" WebSocket connected!");
  });

  newSocket.on("connect_error", (err) => {
    console.error("WebSocket connection error:", err.message);
  });

  newSocket.on("getOnlineUsers", (userIds) => {
    console.log("Online users via socket:", userIds);
    setOnlineUsers(userIds);
  });

  setSocket(newSocket);
};


  // Clean up socket on unmount
  useEffect(() => {
  return () => {
    if (socket?.connected) {
      socket.disconnect();
      console.log("Socket disconnected on unmount");
    }
  };
}, []); // empty deps → only runs on unmount


  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
      checkAuth();
    }
  }, [token]);

  const value = {
    axios,
    authUser,
    onlineUsers,
    socket,
    logout,
    updateProfile,
    login,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};