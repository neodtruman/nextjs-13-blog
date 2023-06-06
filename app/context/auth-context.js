"use client";

import { getCookie } from "cookies-next";
import { useState, createContext, useEffect } from "react";

export const AuthenticationContext = createContext({
  user: null,
  error: null,
  loading: false,
  setAuthState: () => {},
});

export default function AuthContext({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    error: null,
    loading: true,
  });

  const fetchUser = () => {
    setAuthState({
      user: null,
      error: null,
      loading: true,
    });

    const jwt = getCookie("next-jwt");
    if (!jwt) {
      return setAuthState({
        user: null,
        error: null,
        loading: false,
      });
    }

    fetch("/api/user/profile")
      .then((data) => data.json())
      .then((response) => {
        setAuthState({
          user: response.data.user,
          error: null,
          loading: false,
        });
      })
      .catch(() => {
        setAuthState({
          user: null,
          error: "Internal Server Error",
          loading: false,
        });
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        ...authState,
        setAuthState,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
