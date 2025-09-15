import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import assets from "../assets/assets";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

const onSubmitHandler = async (event) => {
  event.preventDefault();
  if (!acceptedTerms) return;

  if (currState === "Sign up" && !isDataSubmitted) {
    setIsDataSubmitted(true);
    return;
  }

  const result = await login(
    currState === "Sign up" ? "signup" : "login",
    { fullName, email, password, bio }
  );

  if (result?.success) {
    navigate("/");
  }
};



  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Glowing Background Blob */}
      <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-violet-700 rounded-full blur-[150px] opacity-30 z-0"></div>

      <div className="max-w-5xl w-full flex justify-between items-center gap-8 backdrop-blur-xl border border-gray-700 rounded-xl p-8 z-10 shadow-2xl max-sm:flex-col">
        {/* Left Side: Logo */}
        <div className="text-center flex-1 max-sm:hidden">
          <img src={assets.logo} alt="logo" className="w-[120px] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white">QuickChat</h1>
          <p className="text-sm text-gray-400 mt-1">Chat anytime, anywhere 💬</p>
        </div>

        {/* Right Side: Form */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-md flex-1 text-white space-y-5"
        >
          <div className="text-center mb-2">
            <h2 className="text-2xl font-semibold">
              {currState === "Sign up" ? "Create Account" : "Login to QuickChat"}
            </h2>
            <p className="text-sm text-gray-400">
              {currState === "Sign up" ? "Join the conversation" : "Welcome back!"}
            </p>
          </div>

          {currState === "Sign up" && !isDataSubmitted && (
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Full Name"
              className="w-full p-3 rounded-md bg-white/10 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          )}

          {!isDataSubmitted && (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email Address"
                className="w-full p-3 rounded-md bg-white/10 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                autoComplete="current-password"
                className="w-full p-3 rounded-md bg-white/10 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </>
          )}

          {currState === "Sign up" && isDataSubmitted && (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              required
              placeholder="Write a short bio..."
              className="w-full p-3 rounded-md bg-white/10 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          )}

          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={() => setAcceptedTerms(!acceptedTerms)}
            />
            <span>Agree to terms of use & privacy policy.</span>
          </label>

          <button
            type="submit"
            className={`w-full py-3 rounded-md font-semibold shadow-lg transition-transform duration-300 ${
              acceptedTerms
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-[1.03]"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={!acceptedTerms}
          >
            {currState === "Sign up" ? "Create Account" : "Login Now"}
          </button>

          {/* Switch Form */}
          <p className="text-sm text-gray-400 text-center">
            {currState === "Sign up" ? (
              <>
                Already have an account?{" "}
                <span
                  className="text-violet-400 hover:underline cursor-pointer"
                  onClick={() => {
                    setCurrState("login");
                    setFullName("");
                    setEmail("");
                    setPassword("");
                    setBio("");
                    setIsDataSubmitted(false);
                    setAcceptedTerms(false);
                  }}
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span
                  className="text-violet-400 hover:underline cursor-pointer"
                  onClick={() => {
                    setCurrState("Sign up");
                    setFullName("");
                    setEmail("");
                    setPassword("");
                    setBio("");
                    setIsDataSubmitted(false);
                    setAcceptedTerms(false);
                  }}
                >
                  Create one
                </span>
              </>
            )}
          </p>
        </form>
      </div>

      {/* Footer */}
      <p className="absolute bottom-4 text-xs text-gray-500 text-center w-full">
        Built with 💙 by Vivekanand
      </p>
    </div>
  );
};

export default LoginPage;
