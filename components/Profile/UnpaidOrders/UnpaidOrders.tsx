import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { IOrderDb } from "@/types/interfaces";
import EmptyComponent from "@/components/EmptyComponent";
import UnpaidCard from "./UnpaidCard";
import { Ionicons } from "@expo/vector-icons";
import { useOrdersContext } from "@/context/OrdersProvider";
import { hoursSince } from "@/helpers/dateHelpers";

const UnpaidOrders = () => {
  const { isLoading } = useGlobalContext();
  const { orders, refetchOrders } = useOrdersContext();
  const [unpaidOrders, setUnpaidOrders] = useState<IOrderDb[]>([]);

  useEffect(() => {
    const unpaids = orders.map((o: IOrderDb) => {
      return {
        ...o,
        stores: o.stores.filter((s) => !s.payToStore),
      };
    });
    setUnpaidOrders(unpaids.filter((o) => o.stores.length > 0));
  }, [orders]);

  const calculateTotalBalance = useCallback(() => {
    const balance = {
      payable: 0,
      unPayable: 0,
    };
    unpaidOrders.forEach((order) => {
      order.stores.forEach((s) => {
        if (
          hoursSince(order.updatedAt) / 24 > 7 &&
          order.status === "fullfilled" &&
          s.status === "handOver" &&
          s.products.every((p) => p.accepted)
        ) {
          balance.payable += s.amount.summary;
        } else {
          balance.unPayable += s.amount.summary;
        }
      });
    });
    return balance;
  }, [unpaidOrders]);

  return unpaidOrders.length > 0 ? (
    <FlatList
      ListHeaderComponent={
        <View className="flex-col gap-1 p-3 border rounded-lg mb-5 border-gray-200">
          <View className="flex-row items-center">
            <Ionicons name="wallet-outline" size={24} color="#FF9001" />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#FF9001",
                marginLeft: 8,
              }}
            >
              Təsdiqlənən: {calculateTotalBalance().payable.toFixed(2)} AZN
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="timer" size={24} color="#FF9" />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#FF9",
                marginLeft: 8,
              }}
            >
              Gözləyən: {calculateTotalBalance().unPayable.toFixed(2)} AZN
            </Text>
          </View>
        </View>
      }
      data={unpaidOrders}
      renderItem={({ item }) => (
        <UnpaidCard order={item} setOrders={setUnpaidOrders} />
      )}
      keyExtractor={(item) => item._id}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetchOrders}
          colors={["#FF9001"]}
        />
      }
      contentContainerClassName="gap-2 pb-20"
    />
  ) : (
    <EmptyComponent
      title="Ödənilməmiş sifarişiniz yoxdur"
      subtitle={orders.length > 0 ? "Bütün sifarişləriniz ödənilib" : ""}
    />
  );
};

export default UnpaidOrders;

const styles = StyleSheet.create({});
