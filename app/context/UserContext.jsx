'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  getPasswordStatus,
  getUserProfile,
  updatePassword,
  updateUserProfile,
} from '../services/UserServices';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [information, setInformation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [hasPassword, setHasPassword] = useState(null);
  // ✅ 1. Fetch profile

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setUser(data.user);
      setInformation(data.user.information);
    } catch (err) {
      // if (err.response?.status === 401) {
      //     window.location.href = '/login';
      //   }
      setError(err?.message || 'Failed to load addresses');
      console.error('Fetch profile error:', err);
      // setError(err.response.status)
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('user_token');
    console.log(token);
    
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);
  // ✅ 2. Update profile
  const updateProfile = async (formData) => {
    setLoading(true);
    try {
      const res = await updateUserProfile(formData);
 await fetchProfile()
      // Optional local state update
      if (res.user) {
        setUser(res.user);
        setInformation(res.user.information);
       
      } else {
         await fetchProfile(); // fallback refresh
      }

      return res;
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

// ✅ 3. Check if user has password
const checkPasswordStatus = async () => {
  try {
    const res = await getPasswordStatus();
    setHasPassword(res.has_password);
  } catch (err) {
    console.error("Password status fetch failed:", err);
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

// ✅ 4. Update password handler (optional utility)
const changePassword = async (data) => {
  try {
    const res = await updatePassword(data);
    return res;
  } catch (error) {
    console.log("Password update failed:", error);
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
