import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api";
import { motion } from "framer-motion";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      let res;

      // ✅ Send proper JSON object to backend
      if (isRegister) {
        res = await register(name, email, password );
      } else {
        res = await login( email, password );
      }

      // ✅ Save token and user info from backend response
      localStorage.setItem("myntra_token", res.data.token);
      localStorage.setItem("myntra_user", res.data.user?.name || "");

      // ✅ Navigate to home page after successful login/register
      navigate("/");
    } catch (err) {
      console.error("Auth error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Authentication failed");
    }
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-md w-full border border-pink-100"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={submit} className="space-y-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            required
          />

          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-full shadow-md w-full transition-transform transform hover:scale-105 active:scale-95"
          >
            {isRegister ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-gray-600">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsRegister(false)}
                className="text-pink-600 font-semibold hover:underline"
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setIsRegister(true)}
                className="text-pink-600 font-semibold hover:underline"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

