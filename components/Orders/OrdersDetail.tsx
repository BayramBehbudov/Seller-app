import { View, Text, ScrollView } from "react-native";
import React from "react";
import { IOrderDb } from "@/types/interfaces";
import { formatterDate } from "@/helpers/dateHelpers";
import { getOrderStatus, getSlicedID } from "@/helpers/functions";
import OrderProductCard from "./OrderProductCard";
import CustomButton from "../CustomButton";
import axios from "axios";

const OrdersDetail = ({
  order,
  setOrders,
  setModalVisible,
}: {
  order: IOrderDb;
  setOrders: (value: IOrderDb) => void;
  setModalVisible: (value: boolean) => void;
}) => {
  const handleOrderStatus = async (status: IOrderDb["status"]) => {
    try {
      await axios.patch(
        `https://express-bay-rho.vercel.app/api/order/${order._id}`,
        {
          status,
        }
      );
      setOrders({ ...order, status });
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const products = order.stores.flatMap((store) => store.products);

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
            <Text className="flex-1 uppercase">{getSlicedID(order._id)}</Text>
          </View>

          <View className="flex-row">
            <Text className="flex-1">Tarix</Text>
            <Text className="flex-1">
              {formatterDate(order.createdAt.toString())}
            </Text>
          </View>
          <View className="flex-row">
            <Text className="flex-1">Status</Text>
            <Text className="flex-1">{getOrderStatus(order.status)}</Text>
          </View>
          <View className="flex-row">
            <Text className="flex-1">Məhsul sayı</Text>
            <Text className="flex-1">
              {products.length} çeşid {" /  "}
              {products.reduce((a, b) => a + b.count, 0)} ədəd
            </Text>
          </View>
          <View className="flex-row">
            <Text className="flex-1">Məbləğ</Text>
            <Text className="flex-1">
              {products
                .reduce((a, p) => a + +p.product.price * p.count, 0)
                .toFixed(2)}{" "}
              AZN
            </Text>
          </View>
          <View className="flex-row">
            <Text className="flex-1">Müştəri qeydi</Text>
            <Text className="flex-1">{order.sellerNote}</Text>
          </View>
        </View>

        <View className="flex-col gap-2 mt-2">
          {products.map((product, index) => {
            return (
              <OrderProductCard
                key={product.product._id + index}
                prod={product}
              />
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
