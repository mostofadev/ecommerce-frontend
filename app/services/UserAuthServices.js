


"use client";
import axios from "@/app/lib/axiosInstance";
import userAxios from "../lib/axiosUser";

// ✅ 1. Check if email exists and has password

export const checkEmail = async (data) => {
  const response = await axios.post('/check/email', data);
  return response.data;
};

export const sendOtp = async (data) => {
  const response = await axios.post('/send/otp', data);
  return response.data;
};

// ✅ 2. Login with email & password
export const loginWithPassword = async ({ email, password }) => {
  const response = await axios.post("/user/login", { email, password });
  return response.data;
};

// ✅ 3. Send OTP to email


// ✅ 4. Verify OTP and login
export const loginWithOtp = async ({ email, otp }) => {
  const response = await axios.post("/verify/otp", { email, otp });
  return response.data;
};

export const logoutService = () => {
  return userAxios.post("/logout");
};
