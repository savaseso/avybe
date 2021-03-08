import React, { useEffect, useState, createContext } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [pending, setPending] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch("http://localhost:8000/api/auth/isAuth", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const result = await response.json();
        if (result)
          if (result.success) {
            setIsLoggedIn(result.success);
            setPending(false);
          }
      }
      setPending(false);
    } catch (err) {
      toast.error(`${err}`, { position: "bottom-right" });
    }
  };
  

  useEffect(() => {
    checkLoginStatus();
  }, [isLoggedIn]);

  if (pending) {
    return <CircularProgress />;
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        pending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
