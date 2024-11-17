import { getCurrentUser } from "@/services/userActions";
import { IUserDB } from "@/types/interfaces";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Models } from "react-native-appwrite";
import axios from "axios";

const GlobalContext = createContext({
  user: {} as IUserDB,
  isLoading: false,
  isLoggedIn: false,
  setUser: (user: IUserDB) => {},
  setIsLoggedIn: (isLoggedIn: boolean) => {},
  setIsLoading: (isLoading: boolean) => {},
  refetchUser: async () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUserDB>({} as IUserDB);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refetchUser = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3333/api/auth/authentication`
      );
      console.log("auth", res);
      if (res.status === 200 && res.data.role === "seller") {
        setIsLoggedIn(true);
        setUser(res.data as IUserDB);
      } else {
        setIsLoggedIn(false);
        setUser({} as IUserDB);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetchUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn,
        setIsLoading,
        setUser,
        setIsLoggedIn,
        refetchUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
