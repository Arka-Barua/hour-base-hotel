import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import router from "next/router";
import Loading from "../components/loading";

export const AuthContext = createContext();

export function AuthWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [verified, setVerified] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newUser = JSON.parse(localStorage.getItem("user"));
      setUser(newUser);
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        const decodedToken = jwt_decode(accessToken);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("role");
          setIsAuthenticated(false);
        } else {
          setVerified(true);
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
      }
      localStorage.getItem("role") === "admin"
        ? setIsAdmin(true)
        : setIsAdmin(false);
    }
    setIsLoaded(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoaded,
        isAdmin,
        verified,
        setIsAdmin,
        setUser,
        setIsAuthenticated,
        setVerified,
        setIsLoaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
