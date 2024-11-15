import { getCurrentUser } from "@/services/userActions";
import { IProductDb } from "@/types/interfaces";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Models } from "react-native-appwrite";

const GlobalContext = createContext({
  user: {} as Models.Document,
  isLoading: false,
  isLoggedIn: false,
  setUser: (user: Models.Document) => {},
  setIsLoggedIn: (isLoggedIn: boolean) => {},
  setIsLoading: (isLoading: boolean) => {},
  refetchUser: async () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<Models.Document>({} as Models.Document);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const refetchUser = async () => {
    setIsLoading(true);
    getCurrentUser()
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
          const user = {
            ...res.data,
            products: res?.data?.products.map((product: IProductDb) => {
              return {
                ...product,
                features: JSON.parse(product.features),
                category: JSON.parse(product.category),
                images: JSON.parse(product.images),
                filters: JSON.parse(product.filters),
              };
            }),
          };
          setUser(user as Models.Document);
        } else {
          setIsLoggedIn(false);
          setUser({} as Models.Document);
        }
      })
      .catch((error) => Alert.alert("Səhv", error.message))
      .finally(() => setIsLoading(false));
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
