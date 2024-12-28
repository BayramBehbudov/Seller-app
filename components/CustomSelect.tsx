import { icons } from "@/constants";
import React, { useEffect, useState } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import Modal from "react-native-modal";

const CustomSelect = ({
  title,
  modalTitle,
  data,
  containerStyles,
  placeholder,
  modalStyles,
  handleChange,
  error,
  defaultValue,
  disabled,
}: {
  title?: string;
  data?: { id: string; title: string }[] | null;
  modalTitle: string;
  containerStyles?: string;
  modalStyles?: string;
  handleChange: (value: string | string[]) => void;
  placeholder?: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  defaultValue?: { id: string; title: string };
  disabled?: boolean;
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedValues, setSelectedValues] = useState(
    defaultValue || { id: "", title: "" }
  );
  useEffect(() => {
    handleChange(selectedValues.id);
  }, [selectedValues]);

  return (
    <View className={`space-y-2  ${containerStyles}`}>
      {title && (
        <Text className={`text-base text-gray-100 font-pmedium mb-2`}>
          {title} {disabled && "(Dəyişdirmək olmaz)"}
        </Text>
      )}

      <View
        className="border-2  border-black-200 w-full h-12 flex-row px-4 bg-black-100 rounded-2xl focus:border-secondary items-center"
        onTouchStart={() => {
          !disabled && setModalVisible(true);
        }}
      >
        <Text className="text-gray-100">
          {selectedValues?.title || placeholder}
        </Text>
      </View>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{ margin: 0, justifyContent: "flex-end" }}
      >
        <View
          className={`bg-white  w-full ${modalStyles} relative p-5 h-auto rounded-s-[20px] max-h-[80%]`}
        >
          <FlatList
            ListHeaderComponent={
              <Text className={"text-xl font-bold mb-4"}>{modalTitle}</Text>
            }
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`p-3 rounded-md flex-row items-start`}
                onPress={() => {
                  setSelectedValues(item);
                  handleChange(item.id);
                }}
              >
                <View className="w-6">
                  {selectedValues.id === item.id && (
                    <Image
                      source={icons.done}
                      className="w-6 h-6"
                      resizeMode="contain"
                    />
                  )}
                </View>
                <Text className={"text-lg ml-3"}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            className="absolute items-center justify-center top-2 right-2 w-6 h-6"
            onPress={() => setModalVisible(false)}
          >
            <Image
              source={icons.close}
              resizeMode="contain"
              className="w-5 h-5"
            />
          </TouchableOpacity>
        </View>
      </Modal>
      {error && (
        <Text className="text-red-500 w-full overflow-hidden text-sm">
          {error.toString()}
        </Text>
      )}
    </View>
  );
};

export default CustomSelect;
