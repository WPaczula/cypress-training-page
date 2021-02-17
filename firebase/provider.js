import React, { createContext, useContext } from "react";
import useAuth from "./useAuth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useFirebaseAuth = () => {
  return useContext(AuthContext);
};
