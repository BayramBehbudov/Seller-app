import { View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
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
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(false)}
      onBackButtonPress={() => setModalVisible(false)}
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View className={`w-full bg-white p-5 rounded-lg h-[85%]`}>
        <TouchableOpacity
          className={"absolute top-1 right-1"}
          onPress={() => setModalVisible(false)}
        >
          <Ionicons name="close" size={30} color="black" />
        </TouchableOpacity>
        {value}
      </View>
    </Modal>
  );
};

export default CustomModal;
