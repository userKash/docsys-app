import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

interface UserContextType {
  name: string;
  setName: (name: string) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [name, setName] = useState<string>(() => {
    // On first load, try to get name from localStorage
    return localStorage.getItem("userName") || "";
  });
  const [loading, setLoading] = useState(true);

  // Listen to Google Auth state and keep context/localStorage in sync
  useEffect(() => {
    // Subscribe to Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName) {
        // If user is signed in, update context and localStorage
        setName(user.displayName);
        localStorage.setItem("userName", user.displayName);
      } else {
        // If user is signed out, clear context and localStorage
        setName("");
        localStorage.removeItem("userName");
      }
      setLoading(false);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const updateName = (newName: string) => {
    setName(newName);
    localStorage.setItem("userName", newName); // Save it also to localStorage
  };

  return (
    <UserContext.Provider value={{ name, setName: updateName, loading }}>
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
