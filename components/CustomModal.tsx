import { View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

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
            className={"absolute top-1 right-1"}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity>
          {value}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
