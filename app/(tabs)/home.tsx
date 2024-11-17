import { Text, FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "@/components/Home/ProductCard";
import HomeFilters from "@/components/Home/HomeFilters";
import EmptyComponent from "@/components/EmptyComponent";
import { useGlobalContext } from "@/context/GlobalProvider";
import { IProductDB } from "@/types/interfaces";
import axios from "axios";

const HomePage = () => {
  const { user, setUser, refetchUser } = useGlobalContext();
  const [filteredProducts, setFilteredProducts] = useState<IProductDB[]>([]);

  const [filters, setFilters] = useState({
    isActive: null,
    search: null,
    id: null,
  });

  const handleDelete = async (prodId: string) => {
    const deletedProd = await axios.delete(
      `${process.env.BASE_URL}/api/products/${prodId}`
    );

    if (deletedProd.status === 200) {
      refetchUser();
      // əgər refetch state yaratmırsa aşağıdakı funksiyanı aç
      // setFilteredProducts(filteredProducts.filter((prod) => prod._id !== prodId));
    }
  };

  const handleUpdate = async (prodId: string, isActive: boolean) => {
    const newProduct = await axios.patch(
      `${process.env.BASE_URL}/api/products/${prodId}`,
      {
        isActive,
      }
    );
    if (newProduct.status === 200) {
      refetchUser();
      // əgər refetch state yaratmırsa aşağıdakı funksiyanı aç
      // setFilteredProducts(
      //   filteredProducts.map((prod) =>
      //     prod._id === prodId ? { ...prod, isActive } : prod
      //   )
      // );
    }
  };

  useEffect(() => {
    const products = user.stores?.flatMap((store) => store.products);

    const filteredProd = products?.filter((product: IProductDB) => {
      const matchesSearch = filters.search
        ? product.name.toLowerCase().includes(filters.search)
        : true;

      const matchesIsActive =
        filters.isActive !== null
          ? product.isActive === filters.isActive
          : true;
      const matchesId =
        filters.id !== null
          ? product._id.slice(-6).toLowerCase() === filters.id
          : true;
      return matchesSearch && matchesIsActive && matchesId;
    });

    setFilteredProducts(filteredProd);
  }, [filters]);

  return (
    <SafeAreaView className="bg-primary px-3 w-full h-full pt-3 gap-3 flex-col ">
      <FlatList
        data={filteredProducts}
        ListHeaderComponent={
          <View className="w-full gap-5 h-fit flex-col ">
            <Text className="text-white text-2xl font-bold text-center">
              Bütün məhsullarınız burada
            </Text>
            <HomeFilters setFilters={setFilters} />
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        )}
        contentContainerClassName="gap-2"
        keyExtractor={(item) => item._id.toString()}
        ListEmptyComponent={
          <EmptyComponent
            title="Seçimlərə uyğun məhsul tapılmadı"
            subtitle="Filterlərdə dəyişiklik edib yenidən yoxlayın"
          />
        }
      />
    </SafeAreaView>
  );
};

export default HomePage;
