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

  // Check token and get user
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (error) {
      toast.error("Session expired. Please login again.");
      logout();
    }
  };

  const login = async (action, credentials) => {
  try {
    const { data } = await axios.post(`/api/auth/${action}`, credentials);
    if (data.success) {
      setAuthUser(data.userData);
      axios.defaults.headers.common["token"] = data.token;
      setToken(data.token);
      localStorage.setItem("token", data.token);
      connectSocket(data.userData);

      toast.success(data.message);
      return { success: true, user: data.userData };
    } else {
      toast.error(data.message);
      return { success: false, message: data.message };
    }
  } catch (error) {
    toast.error("Login failed. Please try again.");
    return { success: false, message: error.message };
  }
};

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["token"] = null;
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    if (socket?.connected) {
      socket.disconnect();
      setSocket(null);
    }
    toast.success("Logged out successfully.");
  };

  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", body);
      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error("Profile update failed.");
    }
  };

  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;

    const newSocket = io(backendUrl.trim(), {
      query: { userId: userData._id },
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("WebSocket connected");
    });

    newSocket.on("connect_error", (err) => {
      console.error("WebSocket error:", err.message);
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });

    setSocket(newSocket);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
      checkAuth();
    }
  }, [token]);

  useEffect(() => {
    return () => {
      if (socket?.connected) {
        socket.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        axios,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
