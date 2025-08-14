"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getPasswordStatus,
  getUserProfile,
  updatePassword,
  updateUserProfile,
} from "../services/UserServices";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [information, setInformation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasPassword, setHasPassword] = useState(null);

  const fetchProfile = async () => {
    setFetchLoading(true);
    try {
      const data = await getUserProfile();
      setUser(data.user);
      setInformation(data.user.information);
    } catch (err) {
      setError(err?.message || "Failed to load addresses");
    } finally {
      setFetchLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  // Update profile
  const updateProfile = async (formData) => {
    setLoading(true);
    try {
      const res = await updateUserProfile(formData);
      await fetchProfile();
      if (res.user) {
        setUser(res.user);
        setInformation(res.user.information);
      } else {
        await fetchProfile();
      }

      return res;
    } catch (error) {
      setError("Profile update failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Check if user has password
  const checkPasswordStatus = async () => {
    try {
      const res = await getPasswordStatus();
      setHasPassword(res.has_password);
    } catch (err) {
      setError("Password status fetch failed:", err);
    }
  };

  // call this after profile fetch
  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (token) {
      fetchProfile();
      checkPasswordStatus();
    } else {
      setLoading(false);
    }
  }, []);

  // Update password handler (optional utility)
  const changePassword = async (data) => {
    try {
      const res = await updatePassword(data);
      return res;
    } catch (error) {
      setError("Password update failed:" || error);
      throw error;
    }
  };
  return (
    <UserContext.Provider
      value={{
        user,
        information,
        fetchProfile,
        updateProfile,
        loading,
        fetchLoading,
        hasPassword,
        checkPasswordStatus,
        changePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
