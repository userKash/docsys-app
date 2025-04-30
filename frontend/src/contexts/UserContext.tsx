import React, { createContext, useState, useContext, ReactNode } from "react";

interface UserContextType {
  name: string;
  setName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [name, setName] = useState<string>(() => {
      // When app loads, try to get name from localStorage
      return localStorage.getItem("userName") || "";
    });
  
    const updateName = (newName: string) => {
      setName(newName);
      localStorage.setItem("userName", newName); // Save it also to localStorage
    };
  
    return (
      <UserContext.Provider value={{ name, setName: updateName }}>
        {children}
      </UserContext.Provider>
    );
  };
  

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
