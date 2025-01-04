import { IPromotionDB, IStoreDB } from "@/types/interfaces";
import React, {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

interface IPromosContext {
  promos: IPromotionDB[];
  setPromos: (promos: IPromotionDB[]) => void;
}

const PromosContext = createContext<IPromosContext>({
  promos: [],
  setPromos: (promos: IPromotionDB[]) => {},
});

export const usePromosContext = () => useContext(PromosContext);

export const PromosProvider = ({
  children,
  setIsLoading,
  stores,
}: {
  children: React.ReactNode;
  stores: IStoreDB[] | undefined;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [promos, setPromos] = useState<IPromotionDB[]>([]);

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
    if (stores && stores.length > 0) {
      const ids = stores.map((store) => store._id);
      refetchPromos(ids);
    }
  }, [stores]);

  return (
    <PromosContext.Provider
      value={{
        promos,
        setPromos,
      }}
    >
      {children}
    </PromosContext.Provider>
  );
};
