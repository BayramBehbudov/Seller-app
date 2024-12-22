import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { IOrderDb } from "@/types/interfaces";
import { Ionicons } from "@expo/vector-icons";
import { getOrderStatus, getSlicedID } from "@/helpers/functions";
import { formatterDate } from "@/helpers/dateHelpers";

const OrderCard = ({ order }: { order: IOrderDb }) => {
  
  const totalAmount = order.stores.reduce(
    (sum, store) => sum + store.amount.summary,
    0
  );

  return (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 mb-4 shadow-md"
      onPress={() => console.log(order._id)}
    >
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <Ionicons name="receipt-outline" size={24} color="#4B5563" />
          <Text className="text-gray-800 font-semibold ml-2">
            Sifariş {getSlicedID(order._id)}
          </Text>
        </View>
        <View
          className={`px-2 py-1 rounded-full ${
            order.status !== "fullfilled" ? "bg-red-100" : "bg-green-100"
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              order.status !== "fullfilled" ? "text-red-800" : "text-green-800"
            }`}
          >
            {getOrderStatus(order.status).toUpperCase()}
          </Text>
        </View>
      </View>

      <Text className="text-gray-600 mb-2 border-b p-2 border-gray-200">
        {formatterDate(order.createdAt)}
      </Text>

      {order.stores.map((store, index) => (
        <View key={index} className="mb-2 border-b border-gray-200 p-2">
          <Text className="text-gray-800 font-medium">{store.store.name}</Text>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">
              Məhsullar: {store.amount.products.toFixed(2)} AZN
            </Text>
            <Text className="text-gray-600">
              Endirim: {store.amount.discount.toFixed(2)} AZN
            </Text>
          </View>
          <Text className="text-secondary font-semibold">
            Cəm: {store.amount.summary.toFixed(2)} AZN
          </Text>
        </View>
      ))}

      <View className=" mt-2 pt-2">
        <Text className="text-secondary-200 font-bold text-right">
          Yekun: {totalAmount.toFixed(2)} AZN
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
