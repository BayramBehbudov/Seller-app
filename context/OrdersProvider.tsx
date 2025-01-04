import { IOrderDb, IStoreDB } from "@/types/interfaces";
import React, {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useGlobalContext } from "./GlobalProvider";
import axios from "axios";

interface IOrdersContext {
  orders: IOrderDb[];
  setOrders: (orders: IOrderDb[]) => void;
  refetchOrders: (stores: IStoreDB[]) => void;
}

const OrdersContext = createContext<IOrdersContext>({
  orders: [],
  setOrders: (orders: IOrderDb[]) => {},
  refetchOrders: (stores: IStoreDB[]) => {},
});

export const useOrdersContext = () => useContext(OrdersContext);

export const OrdersProvider = ({
  children,
  stores,
  setIsLoading,
}: {
  children: React.ReactNode;
  stores: IStoreDB[] | undefined;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [orders, setOrders] = useState<IOrderDb[]>([]);

  const refetchOrders = async () => {
    if (!stores || stores.length === 0) return;

    const ids = stores.map((store) => store._id);
    if (ids.length === 0) return;

    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (stores && stores.length > 0) {
      refetchOrders();
    }
  }, [stores]);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        setOrders,
        refetchOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
