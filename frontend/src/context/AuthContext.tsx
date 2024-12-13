"use client";

import { User } from "@/types/model";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface AuthContextProps {
  userData: User | null;
  setUserData: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuthContext = () => {
  if (!AuthContext) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return useContext(AuthContext);
};

const AuthProvider = ({
  children,
  data,
}: {
  data: User | null;
  children: React.ReactNode;
}) => {
  const [userData, setUserData] = useState<User | null>(data || null);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
