import { View, Text, ScrollView } from "react-native";
import React from "react";
import { IOrder } from "@/types/interfaces";
import { formatterDate } from "@/helpers/dateHelpers";
import { getSlicedID } from "@/helpers/functions";
import OrderProductCard from "./OrderProductCard";
import CustomButton from "../CustomButton";

const OrdersDetail = ({
  order,
  setOrders,
  setModalVisible,
}: {
  order: IOrder;
  setOrders: (value: IOrder) => void;
  setModalVisible: (value: boolean) => void;
}) => {
  
  const handleOrderStatus = (status: string) => {
    setOrders({ ...order, status });
    setModalVisible(false);
  };

  return (
    <View className="flex-col gap-3">
      <View className="my-3 items-center justify-center">
        <Text className=" text-black text-xl font-bold">
          Sifarişin detalları ilə buradan tanış ola bilərsiniz
        </Text>
        <Text>Qısa zamanda sifarişləri hazır etməyiniz tələb edilir</Text>
      </View>

      <ScrollView className="flex-col gap-2 mb-24">
        <View className="w-full flex-col p-3 gap-1 border-b border rounded-lg border-gray-200 ">
          <View className="flex-row">
            <Text className="flex-1 ">Sifariş ID</Text>
            <Text className="flex-1 uppercase">{getSlicedID(order.$id)}</Text>
          </View>

          <View className="flex-row">
            <Text className="flex-1">Tarix</Text>
            <Text className="flex-1">
              {formatterDate(order.createdAt.toString())}
            </Text>
          </View>
          <View className="flex-row">
            <Text className="flex-1">Status</Text>
            <Text className="flex-1">
              {order.status === "pending" ? "Gözləyir" : "Tamamlandı"}
            </Text>
          </View>
          <View className="flex-row">
            <Text className="flex-1">Məhsul sayı</Text>
            <Text className="flex-1">
              {order?.products?.length} çeşid {" /  "}
              {order?.products?.reduce((a, b) => a + b.count, 0)} ədəd
            </Text>
          </View>
          <View className="flex-row">
            <Text className="flex-1">Məbləğ</Text>
            <Text className="flex-1">
              {order?.products?.reduce((a, b) => a + +b.price * b.count, 0)} AZN
            </Text>
          </View>
          <View className="flex-row">
            <Text className="flex-1">Müştəri qeydi</Text>
            <Text className="flex-1">
              {order.sellerNote} Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Nostrum veniam voluptates officiis debitis illum
              cumque, earum sed numquam possimus. Molestias hic veritatis odit
              esse praesentium cum nostrum distinctio exercitationem iusto.
            </Text>
          </View>
        </View>

        <View className="flex-col gap-2">
          {order?.products?.map((product, index) => {
            return (
              <OrderProductCard key={product.$id + index} product={product} />
            );
          })}
        </View>

        <View className="flex-col gap-2 mt-2">
          <CustomButton
            title={"Təhvil verilməyə hazırdır"}
            handlePress={() => handleOrderStatus("ready")}
            disabled={order.status !== "pending"}
          />

          <CustomButton
            title={"Təhvil verdim"}
            handlePress={() => {
              handleOrderStatus("handOver");
            }}
            disabled={order.status !== "ready"}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default OrdersDetail;
