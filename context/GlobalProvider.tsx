import {
  IOrderDb,
  IPromotionDB,
  IResponse,
  IStoreDB,
  IUserDB,
} from "@/types/interfaces";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import CustomLoader from "@/components/CustomLoader";

const GlobalContext = createContext({
  user: {} as IUserDB,
  isLoading: false,
  isLoggedIn: false,
  orders: [] as IOrderDb[],
  promos: [] as IPromotionDB[],
  setPromos: (promos: IPromotionDB[]) => {},
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
  const [promos, setPromos] = useState<IPromotionDB[]>([]);
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
        refetchPromos(response.data.stores.map((store) => store._id));
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
      const response = await axios.get(
        `https://express-bay-rho.vercel.app/api/order`,
        {
          params: {
            "stores.store": { $in: ids },
          },
        }
      );
      // const response = await axios.get(
      //   `https://express-bay-rho.vercel.app/api/order/store`,
      //   {
      //     params: {
      //       ids,
      //     },
      //   }
      // );

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
    }
  };

  const refetchPromos = async (ids: string[]) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://express-bay-rho.vercel.app/api/promo/`,
        {
          params: {
            ids,
          },
        }
      );
      if (response.status === 200 && response.data?.length > 0) {
        setPromos(response.data);
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
        promos,
        setPromos,
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
