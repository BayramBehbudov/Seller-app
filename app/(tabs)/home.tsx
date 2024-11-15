import { Text, FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "@/components/Home/ProductCard";
import HomeFilters from "@/components/Home/HomeFilters";
import { IProduct } from "@/types/interfaces";
import EmptyComponent from "@/components/EmptyComponent";
import { useGlobalContext } from "@/context/GlobalProvider";
import { productDelete, productUpdate } from "@/services/productActions";
import CustomLoader from "@/components/CustomLoader";

const HomePage = () => {
  const { user, setUser } = useGlobalContext();
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(
    user.products
  );

  const [filters, setFilters] = useState({
    isActive: null,
    search: null,
    id: null,
  });

  const handleDelete = async (prodId: string) => {
    const deletedProd = await productDelete(prodId);
    if (deletedProd.status === 200) {
      const updated = user.products?.filter(
        (item: IProduct) => item.$id !== prodId
      );
      setFilteredProducts(
        filteredProducts.filter((item) => item.$id !== prodId)
      );
      setUser({ ...user, products: updated });
    }
  };

  const handleUpdate = async (prodId: string, isActive: boolean) => {
    const newProduct = await productUpdate(prodId, { isActive });

    if (newProduct.status === 200) {
      const updated = user.products?.map((item: IProduct) =>
        item.$id !== prodId ? item : { ...item, isActive }
      );
      setFilteredProducts(
        filteredProducts?.map((item) =>
          item.$id !== prodId ? item : { ...item, isActive }
        )
      );
      setUser({ ...user, products: updated });
    }
  };

  useEffect(() => {
    const updatedProd = user.products?.filter((product: IProduct) => {
      const matchesSearch = filters.search
        ? product.name.toLowerCase().includes(filters.search)
        : true;

      const matchesIsActive =
        filters.isActive !== null
          ? product.isActive === filters.isActive
          : true;
      const matchesId =
        filters.id !== null
          ? product.$id.slice(-6).toLowerCase() === filters.id
          : true;
      return matchesSearch && matchesIsActive && matchesId;
    });

    setFilteredProducts(updatedProd);
  }, [filters]);

  return (
    <SafeAreaView className="bg-primary px-3 w-full h-full pt-3 gap-3 flex-col ">
      <CustomLoader animating={true} />
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
        keyExtractor={(item) => item.$id.toString()}
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
