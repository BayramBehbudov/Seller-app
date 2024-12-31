import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { icons } from "@/constants";

const CustomMultiSelect = ({
  data,
  defaultSelectValues,
  disabledValues = [],
  multiSelect = false,
  handleChange,
  triggerClassName,
  placeholder,
  modalTitle,
}: {
  data: { title: string; value: string[] };
  defaultSelectValues?: string[];
  disabledValues?: string[];
  multiSelect?: boolean;
  handleChange: (value: string[]) => void;
  triggerClassName?: string;
  placeholder?: string;
  modalTitle?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(
    defaultSelectValues ? defaultSelectValues : []
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
      } else {
        setSelectedValues([]);
        handleChange([]);
      }
    }
  };

  const onClose = () => {
    setIsVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        className={`border-2 h-12 py-3 px-2  bg-black-100 rounded-2xl  border-black-200  ${triggerClassName}`}
      >
        <Text className="text-base text-gray-100 font-pmedium">
          {multiSelect
            ? selectedValues.length > 0
              ? selectedValues.map((item) => item).join(", ")
              : placeholder
            : selectedValues[0] || placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        isVisible={isVisible}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{ margin: 0, justifyContent: "flex-end" }}
      >
        <View className="relative p-5 h-auto rounded-s-[20px] max-h-[80%] bg-white">
          <ScrollView>
            <Text className={"text-xl font-bold mb-4"}>{modalTitle}</Text>

            {data.value.map((item) => {
              return (
                <TouchableOpacity
                  key={item}
                  disabled={
                    disabledValues.includes(item) &&
                    !selectedValues.includes(item)
                  }
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
                  <Text
                    className={`text-lg ml-3 ${
                      disabledValues.includes(item) &&
                      !selectedValues.includes(item) &&
                      "text-gray-400"
                    }`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            className="absolute items-center justify-center top-2 right-2 w-6 h-6"
            onPress={() => setIsVisible(false)}
          >
            <Image
              source={icons.close}
              resizeMode="contain"
              className="w-5 h-5"
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CustomMultiSelect;
