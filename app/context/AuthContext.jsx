"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../services/authService";
import { useRouter } from "next/navigation";
const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
  const [user, setUser] = useState(null);
  const [token,setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(null)
  const router = useRouter();

  

  const login = async (email,password) => {
     try {
      setLoading(true);
      const data = await loginUser(email, password);
      console.log(data.data);
      
     // setUser(data.user);
      localStorage.setItem('admin_token', data.data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.data.user));
      setLoading(false);
      router.push('/admin/dashboard');
     
    } catch (error) {
        throw new Error(error.message); 
    } 
  }

 const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{token,user, login, logout, loading, error  }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
