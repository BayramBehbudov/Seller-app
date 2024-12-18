import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { IStoreDB } from "@/types/interfaces";
import { Checkbox } from "react-native-paper";
import { icons } from "@/constants";

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
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        >
          <View
            className={
              "flex-1 justify-center items-center w-full h-full bg-black/50"
            }
          >
            <View
              className={`bg-white p-6 rounded-lg w-80 max-h-[50vh] relative `}
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
                className="absolute items-center justify-center top-2 right-2 w-6 h-6"
                onPress={() => setVisible(false)}
              >
                <Image
                  source={icons.close}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default PromoModal;
