import { Text, FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "@/components/Home/ProductCard";
import HomeFilters from "@/components/Home/HomeFilters";
import EmptyComponent from "@/components/EmptyComponent";
import { useGlobalContext } from "@/context/GlobalProvider";
import { IProductDB } from "@/types/interfaces";
import axios from "axios";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const HomePage = () => {
  const { user } = useGlobalContext();
  const [filteredProducts, setFilteredProducts] = useState<IProductDB[]>([]);

  const [filters, setFilters] = useState({
    isActive: null,
    search: null,
    id: null,
  });

  useEffect(() => {
    const products = user.stores?.flatMap((store) => store.products);

    const filteredProd = products?.filter((product: IProductDB) => {
      if (!product) return;
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

    filteredProd && setFilteredProducts(filteredProd);
  }, [filters, user]);

  return (
    <SafeAreaView className="bg-primary px-3 w-full h-full pt-3 gap-3 flex-col ">
      {user.stores?.length > 0 ? (
        <FlatList
          data={filteredProducts}
          ListHeaderComponent={
            <View className="w-full gap-5 h-fit flex-col">
              <Text className="text-white text-2xl font-bold text-center">
                Bütün məhsullarınız burada
              </Text>
              <HomeFilters setFilters={setFilters} />
            </View>
          }
          renderItem={({ item }) => <ProductCard product={item} />}
          contentContainerClassName="gap-2"
          keyExtractor={(item) => item._id.toString()}
          ListEmptyComponent={
            <EmptyComponent
              title="Seçimlərə uyğun məhsul tapılmadı"
              subtitle="Filterlərdə dəyişiklik edib yenidən yoxlayın"
            />
          }
        />
      ) : (
        <View className="w-full h-full flex-col justify-center items-center ">
          <EmptyComponent
            title="Sizin aktiv mağazanız yoxdur"
            subtitle="Davam etmək üçün öncə hesabınıza mağaza əlavə edin"
          />
          <CustomButton
            containerStyles="mt-10 w-[80%] "
            title="Mağaza əlavə et"
            handlePress={() => router.push(`/store/add`)}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomePage;
