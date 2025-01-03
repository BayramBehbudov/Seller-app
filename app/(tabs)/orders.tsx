import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrdersTable from "@/components/Orders/OrdersTable";
import OrdersFilters from "@/components/Orders/OrdersFilters";
import EmptyComponent from "@/components/EmptyComponent";
import { IOrderDb } from "@/types/interfaces";
import { useGlobalContext } from "@/context/GlobalProvider";

export interface IOrderFilters {
  status: null | string;
  _id: string | null;
}
const orders = () => {
  const { orders } = useGlobalContext();
  const [filteredOrders, setFilteredOrders] = useState<IOrderDb[]>(orders);
  const [filters, setFilters] = useState<IOrderFilters>({
    status: null,
    _id: null,
  });

  useEffect(() => {
    const updatedProd = orders.filter((order) => {
      const matchesID = filters._id !== null ? order._id === filters._id : true;
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
        <OrdersTable orders={filteredOrders} setOrders={setFilteredOrders} />
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
