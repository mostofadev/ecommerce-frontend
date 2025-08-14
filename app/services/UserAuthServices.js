"use client";
import axios from "@/app/lib/axiosInstance";
import userAxios from "../lib/axiosUser";

export const checkEmail = async (data) => {
  const response = await axios.post("/check/email", data);
  return response.data;
};

export const sendOtp = async (data) => {
  const response = await axios.post("/send/otp", data);
  return response.data;
};

export const loginWithPassword = async ({ email, password }) => {
  const response = await axios.post("/user/login", { email, password });
  return response.data;
};

export const loginWithOtp = async ({ email, otp }) => {
  const response = await axios.post("/verify/otp", { email, otp });
  return response.data;
};

export const logoutService = () => {
  return userAxios.post("/logout");
};
