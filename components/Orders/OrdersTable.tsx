import React, { Dispatch, SetStateAction, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomModal from "../CustomModal";
import OrdersDetail from "./OrdersDetail";
import { getOrderStatus, getSlicedID } from "@/helpers/functions";
import { IOrderDb } from "@/types/interfaces";
import { hoursSince } from "@/helpers/dateHelpers";

const OrdersTable = ({
  orders,
  setOrders,
}: {
  orders: IOrderDb[];
  setOrders: Dispatch<SetStateAction<IOrderDb[]>>;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrderDb>({} as IOrderDb);

  const renderOrderItem = (order: IOrderDb, index: number) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.ScrollView
        style={[styles.orderItem, { opacity: fadeAnim }]}
        key={order._id}
      >
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setSelectedOrder(order);
          }}
          style={styles.orderButton}
        >
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>{getSlicedID(order._id)}</Text>
            <Text style={styles.orderTime}>
              {hoursSince(order.createdAt.toString())} saat əvvəl
            </Text>
          </View>
          <View style={styles.orderFooter}>
            <Text
              style={[
                styles.orderStatus,
                styles[order.status as "pending" | "ready" | "handOver"],
              ]}
            >
              {getOrderStatus(order.status)}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </View>
        </TouchableOpacity>
      </Animated.ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {orders.map(renderOrderItem)}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  orderItem: {
    marginBottom: 10,
  },
  orderButton: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  orderTime: {
    fontSize: 14,
    color: "#6b7280",
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: "600",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  pending: {
    backgroundColor: "#fef3c7",
    color: "#d97706",
  },
  ready: {
    backgroundColor: "#d1fae5",
    color: "#059669",
  },
  handOver: {
    backgroundColor: "#dbeafe",
    color: "#3b82f6",
  },
});

export default OrdersTable;
