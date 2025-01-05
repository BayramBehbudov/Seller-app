import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { IStoreDB } from "@/types/interfaces";
import { Checkbox } from "react-native-paper";
import { icons } from "@/constants";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

const PromoModal = ({
  selectedStore,
  selectedProducts,
  setSelectedProducts,
}: {
  selectedStore: IStoreDB;
  selectedProducts: string[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <View className="space-y-2 ">
      <Text className={`text-base text-gray-100 font-pmedium mb-2`}>
        Məhsullar
      </Text>
      <View
        className="border-2  border-black-200 w-full h-12 flex-row px-4 bg-black-100 rounded-2xl focus:border-secondary items-center"
        onTouchStart={() => setVisible(true)}
      >
        <Text className="text-gray-100">
          {selectedProducts.length > 0
            ? `${selectedProducts.length} məhsul seçilib`
            : `Seçin`}
        </Text>
        <Modal
          isVisible={visible}
          onBackdropPress={() => setVisible(false)}
          onBackButtonPress={() => setVisible(false)}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          style={{ margin: 0, justifyContent: "flex-end" }}
        >
          <View
            className={`bg-white  relative w-full p-5 h-auto rounded-s-[20px] max-h-[80%]`}
          >
            <FlatList
              ListHeaderComponent={
                <Text className={"text-xl font-bold mb-4"}>
                  Məhsulları seçin
                </Text>
              }
              data={selectedStore?.products}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <Checkbox.Item
                  label={item.name}
                  color="green"
                  labelStyle={{ color: "black" }}
                  status={
                    selectedProducts.includes(item._id)
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => {
                    selectedProducts.includes(item._id)
                      ? setSelectedProducts(
                          selectedProducts.filter((i) => i !== item._id)
                        )
                      : setSelectedProducts([...selectedProducts, item._id]);
                  }}
                />
              )}
            />

            <TouchableOpacity
              className="absolute items-center justify-center top-2 right-2 w-7 h-7 "
              onPress={() => setVisible(false)}
            >
              <Ionicons name="close" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default PromoModal;
