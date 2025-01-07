import { Text, FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "@/components/Home/ProductCard";
import EmptyComponent from "@/components/EmptyComponent";
import { useGlobalContext } from "@/context/GlobalProvider";
import { IHomeFilter, IProductDB } from "@/types/interfaces";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import FilterModal from "@/components/Home/FilterModal";

const HomePage = () => {
  const { user } = useGlobalContext();
  const [filteredProducts, setFilteredProducts] = useState<IProductDB[]>([]);

  const [filters, setFilters] = useState<IHomeFilter>({
    isActive: null,
    search: null,
    id: null,
    storeId: null,
    promoId: null,
  });

  useEffect(() => {
    const products = user.stores?.flatMap((store) => store.products) || [];
    const filteredProd = products.filter((product: IProductDB) => {
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
          ? product._id
              .slice(-6)
              .toLowerCase()
              .includes(filters.id.toLowerCase())
          : true;

      const matchesStoreId =
        filters.storeId !== null
          ? product.store._id.toLowerCase() === filters.storeId.toLowerCase()
          : true;

      const matchesPromoId =
        filters.promoId !== null
          ? product.promo?.toLowerCase() === filters.promoId.toLowerCase()
          : true;

      return (
        matchesSearch &&
        matchesIsActive &&
        matchesId &&
        matchesStoreId &&
        matchesPromoId
      );
    });

    filteredProd && setFilteredProducts(filteredProd);
  }, [filters, user]);

  if (!user.stores || user.stores.length === 0) {
    return (
      <View className="w-full h-full flex-col justify-center items-center bg-primary ">
        <EmptyComponent
          title="Sizin aktiv mağazanız yoxdur"
          subtitle="Məhsul əlavə etmək üçün öncə hesabınıza mağaza əlavə edin"
        />
        <CustomButton
          containerStyles="mt-10 w-[80%] "
          title="Mağaza əlavə et"
          handlePress={() => router.push(`/store/add`)}
        />
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-primary px-3 w-full h-full pt-3 gap-3 flex-col ">
      <FlatList
        data={filteredProducts}
        ListHeaderComponent={
          <View className="w-full h-fit flex-row items-center justify-between flex-1 mb-4">
            <Text className="text-white text-2xl font-bold">
              Bütün məhsullarınız burada
            </Text>
            <FilterModal setFilters={setFilters} filters={filters} />
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
    </SafeAreaView>
  );
};

export default HomePage;
