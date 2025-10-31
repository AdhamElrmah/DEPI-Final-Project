import { createContext, useContext, useState, useEffect } from "react";
import React from "react";
import { signIn, signUp } from "../lib/getUsers";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user state from localStorage
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const signin = async (email, password) => {
    try {
      const data = await signIn(email, password);
      const u = {
        ...data.user,
        avatar:
          data.user.avatar ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${data.user.email}`,
        token: data.token,
      };
      setUser(u);
      return u;
    } catch (err) {
      const e = err?.response?.data || err?.data || {};
      throw new Error(e.error || err.message || "Failed to sign in");
    }
  };

  const signup = async (email, password, name, role) => {
    try {
      const data = await signUp(email, password, name, role);
      const u = {
        ...data.user,
        avatar:
          data.user.avatar ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${data.user.email}`,
        token: data.token,
      };
      setUser(u);
      return u;
    } catch (err) {
      const e = err?.response?.data || err?.data || {};
      throw new Error(e.error || err.message || "Failed to sign up");
    }
  };

  const signout = () => {
    setUser(null);
    // remove token
    localStorage.removeItem("user");
  };

  const value = {
    user,
    signin,
    signup,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
