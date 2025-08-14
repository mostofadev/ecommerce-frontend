"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import {
  checkEmail,
  sendOtp,
  loginWithPassword,
  loginWithOtp,
  logoutService,
} from "@/app/services/UserAuthServices";

const UserContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasPassword, setHasPassword] = useState(false);

  const checkUserEmail = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const res = await checkEmail( email );
      setHasPassword(res.has_password || false);
      return res; // { exists: true/false, has_password: true/false }
    } catch (err) {
      setError("Failed to check email");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  //  Send OTP
  const sendOtpToEmail = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await sendOtp({ email });
    } catch (err) {
      setError("Failed to send OTP");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login with Password
  const loginWithPwd = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginWithPassword( email, password );
      localStorage.setItem("user_token", res.token);
      localStorage.setItem("user_data", JSON.stringify(res.user));
      setUser(res.user);
      setToken(res.token);
      return res;
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login with OTP
  const loginWithOtpCode = async (email, otp) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginWithOtp( email, otp );
      localStorage.setItem("user_token", res.token);
      localStorage.setItem("user_data", JSON.stringify(res.user));
      setUser(res.user);
      setToken(res.token);
      return res;
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await logoutService();
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_data");
      setUser(null);
      setToken(null);
      router.push("/login");
    } catch (err) {
      setError("Logout failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        hasPassword,
        checkUserEmail,
        sendOtpToEmail,
        loginWithPwd,
        loginWithOtpCode,
        logout,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserAuthContext = () => useContext(UserContext);
