import { IUserDB } from "@/types/interfaces";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import CustomLoader from "@/components/CustomLoader";

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
      const { data: response } = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/authentication`
      );
      if (response.status === 200 && response.data.role === "seller") {
        setIsLoggedIn(true);
        setUser(response.data as IUserDB);
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
      <CustomLoader animating={isLoading} />
      {children}
    </GlobalContext.Provider>
  );
};
