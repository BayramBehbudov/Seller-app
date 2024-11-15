import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrdersTable from "@/components/Orders/OrdersTable";
import { defaultOrders } from "@/static/data";
import OrdersFilters from "@/components/Orders/OrdersFilters";
import { IOrder } from "@/types/interfaces";
import EmptyComponent from "@/components/EmptyComponent";

export interface IOrderFilters {
  status: null | string;
  $id: string | null;
}
const orders = () => {
  const [orders, setOrders] = useState(defaultOrders);
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>(orders);

  const [filters, setFilters] = useState<IOrderFilters>({
    status: null,
    $id: null,
  });

  useEffect(() => {
    const updatedProd = orders.filter((order) => {
      const matchesID = filters.$id !== null ? order.$id === filters.$id : true;
      const matchesStatus =
        filters.status !== null ? order.status === filters.status : true;

      return matchesID && matchesStatus;
    });
    setFilteredOrders(updatedProd);
  }, [filters, orders]);

  return (
    <SafeAreaView className="bg-primary px-3 w-full h-full pt-3 gap-3 flex-col">
      <Text className="text-white text-2xl font-bold text-center">
        Sifarişlərinizi buradan izləyə bilərsiniz
      </Text>
      <OrdersFilters setFilters={setFilters} orders={orders} />

      {filteredOrders.length ? (
        <OrdersTable orders={filteredOrders} setOrders={setOrders} />
      ) : (
        <EmptyComponent
          title={
            orders.length
              ? "Seçimlərə uyğun sifariş tapılmadı"
              : "Halhazırda aktiv sifarişiniz yoxdur"
          }
          subtitle={
            orders.length
              ? "Filterlərdə dəyişiklik edib yenidən yoxlayın"
              : "Tezliklə sifariş əldə etməyi gözləyin"
          }
        />
      )}
    </SafeAreaView>
  );
};

export default orders;
