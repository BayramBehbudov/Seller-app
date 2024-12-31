import { View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const ButtonsContainer = ({
  type,
  setType,
  submit,
  cancel,
  submitDisabled,
}: {
  type: boolean;
  setType: React.Dispatch<React.SetStateAction<boolean>>;
  submit: () => void;
  cancel: () => void;
  submitDisabled: boolean;
}) => {
  return (
    <View className="absolute top-3 right-4 flex-row gap-5  items-center justify-center z-10">
      {type && (
        <TouchableOpacity onPress={submit} disabled={submitDisabled}>
          <FontAwesome5
            name={"check"}
            size={25}
            color={submitDisabled ? "gray" : "green"}
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => {
          if (type) {
            cancel();
          }
          setType(!type);
        }}
      >
        <FontAwesome5
          name={type ? "times" : "pen"}
          size={type ? 25 : 20}
          color="#9ca3af"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonsContainer;
