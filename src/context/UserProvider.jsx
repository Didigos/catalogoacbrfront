import { useState, useEffect } from "react";
import UserContext from "./UserContext";

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser) {
    setUser(storedUser);
  }
  setLoading(false); // sempre encerra o loading
}, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
