import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) setRole(savedRole);
  }, []);

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;