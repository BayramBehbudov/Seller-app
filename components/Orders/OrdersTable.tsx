import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { hoursSince } from "@/helpers/dateHelpers";
import CustomModal from "../CustomModal";
import OrdersDetail from "./OrdersDetail";
import { getOrderStatus, getSlicedID } from "@/helpers/functions";
import { IOrderDb } from "@/types/interfaces";
import { useGlobalContext } from "@/context/GlobalProvider";

const OrdersTable = ({
  orders,
  setOrders,
}: {
  orders: IOrderDb[];
  setOrders: Dispatch<SetStateAction<IOrderDb[]>>;
}) => {
  const [refreshControl, setRefreshControl] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { user, refetchOrders } = useGlobalContext();
  const [selectedOrder, setSelectedOrder] = useState<IOrderDb>({} as IOrderDb);
  const header = ["ID", "Tarix", "Status"];
  const footer = ["", "", ""];

  const body = orders.map((order) => ({
    _id: order._id,
    createdAt: hoursSince(order.createdAt.toString()) + " saat əvvəl",
    status: getOrderStatus(order.status),
  }));

  return (
    <ScrollView
      className="w-full"
      style={{ marginBottom: 70 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshControl}
          onRefresh={() => {
            setRefreshControl(true);
            refetchOrders(user.stores);
            setRefreshControl(false);
          }}
          colors={["#FF9001"]}
        />
      }
    >
      <View className="rounded-tl-2xl rounded-tr-2xl bg-white h-12 items-center  m-0 shadow-md w-full flex-row mb-2">
        {header.map((header) => (
          <Text
            key={header}
            className={`py-3 flex-1 text-center  text-lg font-pregular  uppercase tracking-wider text-gray-500`}
          >
            {header}
          </Text>
        ))}
      </View>

      <View className="flex font-medium gap-1 flex-col tracking-wider text-gray-500">
        {body.map((order, index) => {
          return (
            <TouchableOpacity
              key={order._id}
              onPress={() => {
                setModalVisible(true);
                setSelectedOrder(orders[index]);
              }}
              className="text-center bg-white flex h-12 justify-between  items-center w-full flex-row "
            >
              {Object.entries(order).map(([key, value]) => {
                return (
                  <Text
                    key={key}
                    className={`py-3 flex-1 ${
                      key === "_id" && "uppercase"
                    } text-center text-base text-gray-500 `}
                  >
                    {key === "_id" ? getSlicedID(value) : value}
                  </Text>
                );
              })}
            </TouchableOpacity>
          );
        })}
      </View>

      <View className="rounded-bl-2xl mt-2 rounded-br-2xl bg-white h-12 items-center  m-0 shadow-md w-full flex-row">
        {footer.map((foot, index) => (
          <Text
            key={foot + index}
            className={`py-3 flex-1 text-center  text-lg font-pregular  uppercase tracking-wider text-gray-500`}
          >
            {foot}
          </Text>
        ))}
      </View>

      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        value={
          <OrdersDetail
            order={selectedOrder}
            setOrders={(value: IOrderDb) => {
              setOrders((prev) =>
                prev.map((item: IOrderDb) =>
                  item._id === value._id ? value : item
                )
              );
            }}
            setModalVisible={setModalVisible}
          />
        }
      />
    </ScrollView>
  );
};

export default OrdersTable;
