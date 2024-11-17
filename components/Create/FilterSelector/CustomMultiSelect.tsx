import { icons } from "@/constants";
import React, { useState } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

const CustomMultiSelect = ({
  title,
  modalTitle,
  placeholder,
  data,
  defaultSelectValues,
  containerStyles,
  handleChange,
  error,
  multiSelect = false,
}: {
  title: string;
  data?: { title: string; value: string[] } | null;
  modalTitle: string;
  containerStyles?: string;
  handleChange: (value: string[]) => void;
  placeholder?: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  multiSelect?: boolean;
  defaultSelectValues: string[];
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(
    defaultSelectValues[0] ? defaultSelectValues : []
  );

  const handleSelection = (item: string) => {
    if (multiSelect) {
      const updatedValues = selectedValues.includes(item)
        ? selectedValues.filter((i) => i !== item)
        : [...selectedValues, item];

      setSelectedValues(updatedValues);
      handleChange(updatedValues);
    } else {
      if (!selectedValues.includes(item)) {
        setSelectedValues([item]);
        handleChange([item]);
      }
    }
  };

  return (
    <View className={`space-y-2 ${containerStyles}`}>
      <Text className={`text-base text-gray-100 font-pmedium mb-2`}>
        {title}
      </Text>

      <View
        className="border-2 border-black-200 w-full h-12 flex-row px-4 bg-black-100 rounded-2xl focus:border-secondary items-center"
        onTouchStart={() => setModalVisible(true)}
      >
        <Text className="text-gray-100">
          {multiSelect
            ? selectedValues.length > 0
              ? selectedValues.map((item) => item).join(", ")
              : placeholder
            : selectedValues[0] || placeholder}
        </Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View
              className={
                "flex-1 justify-center items-center w-full h-full bg-black/50"
              }
            >
              <View
                className={"bg-white p-6 rounded-lg w-80 max-h-[50vh] relative"}
              >
                <Text className={"text-xl font-bold mb-4"}>{modalTitle}</Text>

                <ScrollView>
                  {data?.value?.map((item) => {
                    return (
                      <TouchableOpacity
                        key={item}
                        className={`p-3 rounded-md flex-row items-start`}
                        onPress={() => handleSelection(item)}
                      >
                        <View className="w-6 items-start justify-center">
                          {selectedValues.includes(item) && (
                            <Image
                              source={icons.done}
                              resizeMode="contain"
                              className="w-5 h-5"
                            />
                          )}
                        </View>
                        <Text className={"text-lg ml-3"}>{item}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>

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
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
      {error && (
        <Text className="text-red-500 w-full overflow-hidden text-sm">
          {error.toString()}
        </Text>
      )}
    </View>
  );
};

export default CustomMultiSelect;
