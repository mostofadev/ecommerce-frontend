// lib/axios/userAxios.js
"use client";
import axios from "axios";

// 🔗 API base URL নিচ্ছে .env থেকে
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const userAxios = axios.create({
  baseURL: BASE_URL,
});

// ✅ প্রতিটি রিকোয়েস্টের আগে user_token সেট করে নিচ্ছে
userAxios.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("user_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// ❌ যদি token expire হয় বা 401 error আসে তাহলে লগআউট
userAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 🔐 token remove করে login page এ পাঠানো
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_info");

      if (typeof window !== "undefined") {
       // window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default userAxios;
