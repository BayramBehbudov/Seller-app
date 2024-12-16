import { IOrderDb, IResponse, IStoreDB, IUserDB } from "@/types/interfaces";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import CustomLoader from "@/components/CustomLoader";

const GlobalContext = createContext({
  user: {} as IUserDB,
  isLoading: false,
  isLoggedIn: false,
  orders: [] as IOrderDb[],
  refetchOrders: (stores: IStoreDB[]) => {},
  setUser: (user: IUserDB) => {},
  setIsLoggedIn: (isLoggedIn: boolean) => {},
  setIsLoading: (isLoading: boolean) => {},
  refetchUser: async () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserDB>({} as IUserDB);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<IOrderDb[]>([] as IOrderDb[]);
  const refetchUser = async () => {
    setIsLoading(true);
    try {
      const response: IResponse = await axios.get(
        `https://express-bay-rho.vercel.app/api/auth/authentication`
      );
      if (response.status === 200 && response.data?.role === "seller") {
        setIsLoggedIn(true);
        setUser(response.data as IUserDB);
        refetchOrders(response.data.stores);
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

  const refetchOrders = async (stores: IStoreDB[]) => {
    const ids = stores.map((store) => store._id);
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://express-bay-rho.vercel.app/api/order`,
        {
          params: {
            "stores.store": { $in: ids },
          },
        }
      );

      if (response.status === 200) {
        const updatedOrders = response.data.map((order: IOrderDb) => {
          return {
            ...order,
            stores: order.stores.filter((store) =>
              ids.includes(store.store._id)
            ),
          };
        });
        setOrders(updatedOrders);
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
        orders,
        refetchOrders,
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
