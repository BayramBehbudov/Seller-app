import { Text, View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import CustomSelect from "../CustomSelect";
import { IOrderFilters } from "@/app/(tabs)/orders";
import { getOrderStatus, getSlicedID } from "@/helpers/functions";
import { IOrder } from "@/types/interfaces";

const OrdersFilters = ({
  setFilters,
  orders,
}: {
  setFilters: Dispatch<SetStateAction<IOrderFilters>>;
  orders: IOrder[];
}) => {
  return (
    <View className="w-full flex-row gap-2 flex-wrap p-2 rounded-lg justify-center items-center">
      <Text className="w-full text-center text-white">Axtarış motorları</Text>
      <CustomSelect
        modalTitle="Status seçin"
        data={[
          ...orders
            .map((order) => ({
              id: order.status,
              title: getOrderStatus(order.status),
            }))
            .filter(
              (order, index, self) =>
                index === self.findIndex((o) => o.id === order.id)
            ),
          { id: "null", title: "Hamısı" },
        ]}
        placeholder="Status üzrə"
        containerStyles="w-[150px]"
        handleChange={(e) =>
          setFilters((prev: any) => ({
            ...prev,
            status: e && e !== "null" ? e : null,
          }))
        }
      />

      <CustomSelect
        modalTitle="ID seçin"
        data={[
          ...orders.map((order) => ({
            id: order.$id,
            title: getSlicedID(order.$id).toUpperCase(),
          })),
          { id: "null", title: "Hamısı" },
        ]}
        placeholder="ID üzrə"
        containerStyles="w-[150px]"
        handleChange={(e) =>
          setFilters((prev: any) => ({
            ...prev,
            $id: e && e !== "null" ? e : null,
          }))
        }
      />
    </View>
  );
};

export default OrdersFilters;
