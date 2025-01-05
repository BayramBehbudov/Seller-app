import { IResponse, IUserDB } from "@/types/interfaces";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import CustomLoader from "@/components/CustomLoader";
import { NotifyProvider } from "./NotifyProvider";
import { OrdersProvider } from "./OrdersProvider";
import { PromosProvider } from "./PromosProvider";

const GlobalContext = createContext({
  user: {} as IUserDB,
  isLoading: false,
  setUser: (user: IUserDB) => {},
  setIsLoading: (isLoading: boolean) => {},
  refetchUser: async () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserDB>({} as IUserDB);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refetchUser = async () => {
    setIsLoading(true);
    try {
      const response: IResponse = await axios.get(
        `https://express-bay-rho.vercel.app/api/auth/authentication`
      );
      if (response.status === 200 && response.data?.role === "seller") {
        setUser(response.data as IUserDB);
      } else {
        setUser({} as IUserDB);
      }
    } catch (error) {
      console.log("error refetchUser", error);
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
        setIsLoading,
        setUser,
        refetchUser,
      }}
    >
      <NotifyProvider user={user} setUser={setUser}>
        <OrdersProvider setIsLoading={setIsLoading} stores={user.stores}>
          <PromosProvider setIsLoading={setIsLoading} stores={user.stores}>
            <CustomLoader animating={isLoading} />
            {children}
          </PromosProvider>
        </OrdersProvider>
      </NotifyProvider>
    </GlobalContext.Provider>
  );
};
