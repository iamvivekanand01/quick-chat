import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const App = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <div className="bg-[url('/bgImage.svg')] bg-contain">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f1f1f",
            color: "#fff",
          },
        }}
      />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route path="*" 
        element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
