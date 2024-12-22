import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { IOrderDb, IProductDB } from "@/types/interfaces";
import EmptyComponent from "@/components/EmptyComponent";
import UnpaidCard from "./UnpaidCard";
import { Ionicons } from "@expo/vector-icons";

const UnpaidOrders = () => {
  const { orders, refetchOrders, user, setIsLoading, isLoading } =
    useGlobalContext();
  const [unpaidOrders, setUnpaidOrders] = useState<IOrderDb[]>([]);

  const filterUnpaidOrders = () => {
    const unpaids = orders.filter((o: IOrderDb) =>
      o.stores.every((s) => s.payToStore === false)
    );
    setUnpaidOrders(unpaids);
  };

  useEffect(() => {
    filterUnpaidOrders();
  }, [orders]);

  const calculateTotalBalance = useCallback(() => {
    return unpaidOrders.reduce((acc, order) => {
      const total = order.stores.reduce((storeAcc, store) => {
        return storeAcc + store.amount.summary;
      }, 0);
      return acc + total;
    }, 0);
  }, [unpaidOrders]);

  const totals = unpaidOrders.reduce((acc, order) => {
    const total = order.stores.reduce((acc, store) => {
      return acc + store.amount.summary;
    }, 0);

    return acc + total;
  }, 0);

  return unpaidOrders.length > 0 ? (
    <FlatList
      ListHeaderComponent={
        <View className="flex-row items-center p-3 rounded-lg ">
          <Ionicons name="wallet-outline" size={24} color="#FF9001" />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#FF9001",
              marginLeft: 8,
            }}
          >
            Balans: {calculateTotalBalance().toFixed(2)} AZN
          </Text>
        </View>
      }
      data={unpaidOrders}
      renderItem={({ item }) => <UnpaidCard order={item} />}
      keyExtractor={(item) => item._id}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={filterUnpaidOrders}
          colors={["#FF9001"]}
        />
      }
      contentContainerClassName="gap-2 pb-20"
    />
  ) : (
    <EmptyComponent
      title="Ödənilməmiş sifarişiniz yoxdur"
      subtitle="Bütün sifarişləriniz ödənilib"
    />
  );
};

export default UnpaidOrders;

const styles = StyleSheet.create({});
