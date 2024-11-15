import { View, Modal, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";

const CustomModal = ({
  modalVisible,
  setModalVisible,
  value,
}: {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  value: React.ReactNode;
}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="h-full bg-black-100/65 justify-end">
        <View className={`w-full bg-white p-5 rounded-lg h-[90%]`}>
          <TouchableOpacity
            className={"absolute top-2 right-2"}
            onPress={() => setModalVisible(false)}
          >
            <Image
              source={icons.close}
              resizeMode="contain"
              className="w-5 h-5"
            />
          </TouchableOpacity>
          {value}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
