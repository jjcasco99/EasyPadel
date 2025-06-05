// context/UserContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { logout as doLogout, getUser } from "../auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUser(user);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    doLogout();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
