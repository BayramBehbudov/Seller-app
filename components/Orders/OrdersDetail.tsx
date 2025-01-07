import { View, Text, ScrollView, Alert } from "react-native";
import React from "react";
import { IOrderDb } from "@/types/interfaces";
import { formatterDate } from "@/helpers/dateHelpers";
import { getOrderStatus, getSlicedID } from "@/helpers/functions";
import OrderProductCard from "./OrderProductCard";
import CustomButton from "../CustomButton";
import axios from "axios";
import { useGlobalContext } from "@/context/GlobalProvider";

const OrdersDetail = ({
  order,
  setOrders,
  setModalVisible,
}: {
  order: IOrderDb;
  setOrders: (value: IOrderDb) => void;
  setModalVisible: (value: boolean) => void;
}) => {
  const { user } = useGlobalContext();

  const handleOrderStatus = async (
    storeId: string,
    status: "ready" | "handOver"
  ) => {
    Alert.alert(
      "Bağlamanın statusunu dəyişmək istədiyinizdən əminsinizmi?",
      `Status "${
        status === "ready" ? "Hazır" : "Təhvil verdim"
      }" olaraq qeyd ediləcək`,
      [
        { text: "Xeyr" },
        {
          text: "Bəli",
          onPress: async () => {
            try {
              await axios.post(
                `https://express-bay-rho.vercel.app/api/order/store`,
                {
                  orderId: order._id,
                  storeId,
                  status,
                }
              );
              setOrders({
                ...order,
                stores: order.stores.map((store) =>
                  store.store._id === storeId ? { ...store, status } : store
                ),
              });
              setModalVisible(false);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  const products = order.stores.flatMap((store) => store.products);

  const getInfoLabel = (label: string, value: string | number) => {
    return (
      <View className="flex-row justify-between mb-1">
        <Text>{label}</Text>
        <Text>{value}</Text>
      </View>
    );
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
          {getInfoLabel("Sifariş ID", getSlicedID(order._id))}
          {getInfoLabel("Tarix", formatterDate(order.createdAt.toString()))}
          {getInfoLabel("Status", getOrderStatus(order.status))}
          {getInfoLabel(
            "Məhsul sayı",
            `${products.length} çeşid / ${products.reduce(
              (a, b) => a + b.count,
              0
            )} ədəd`
          )}
          {getInfoLabel(
            "Məbləğ",
            `${order.stores
              .reduce((acc, store) => acc + store.amount.summary, 0)
              .toFixed(2)} AZN`
          )}
          {getInfoLabel("Müşteri qeydi", order.sellerNote)}
        </View>

        <View className="flex-col gap-2 mt-2">
          {order.stores.map((s) => {
            const store = user.stores.find(
              (store) => store._id === s.store._id
            );

            return (
              <View
                className="w-full flex-col p-3 gap-1  border rounded-lg border-gray-200 "
                key={store?._id}
              >
                <View className="items-center justify-center ">
                  <Text className="uppercase p-2 line text-cyan-600 font-bold bg-orange-100 rounded-md">
                    {store?.name}
                  </Text>
                </View>

                {s.products.map((product, index) => {
                  return (
                    <OrderProductCard
                      key={product.product._id + index}
                      prod={product}
                      setModalVisible={setModalVisible}
                    />
                  );
                })}
                <View className="flex-row gap-2 mt-5">
                  <CustomButton
                    containerStyles="w-1/2"
                    title={"Hazır"}
                    handlePress={() => handleOrderStatus(s.store._id, "ready")}
                    disabled={s.status !== "pending"}
                    height={12}
                  />

                  <CustomButton
                    containerStyles="w-1/2"
                    title={"Təhvil verdim"}
                    handlePress={() => {
                      handleOrderStatus(s.store._id, "handOver");
                    }}
                    height={10}
                    disabled={s.status !== "ready"}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default OrdersDetail;
