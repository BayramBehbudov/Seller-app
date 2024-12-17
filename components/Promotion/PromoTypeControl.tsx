import { View, Text } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import CustomSelect from "../CustomSelect";
import { promoTypes } from "@/static/data";
import { getPromoInfo } from "@/helpers/functions";

const TypeControl = ({
  control,
  setValue,
  setSelectedType,
  selectedType,
  message,
}: {
  control: any;
  setValue: any;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  selectedType: string;
  message: string | undefined;
}) => {
  return (
    <>
      <Controller
        control={control}
        name="type"
        render={({ field: { onChange, value } }) => (
          <CustomSelect
            title="Aksiya növünü seçin"
            handleChange={(t) => {
              setSelectedType(t.toString());
              onChange(t);

              if (t === "buyXgetY") {
                setValue("discountValue", 0);
                setValue("minCount", 0);
              }
              if (t === "percentage") {
                setValue("minCount", 0);
                setValue("buyXgetY", "");
              }
              if (t === "countPercentage") {
                setValue("buyXgetY", "");
              }
            }}
            defaultValue={promoTypes.find((t) => t.id === value)}
            placeholder="Seç"
            modalTitle="Aksiya növünü seçin"
            data={promoTypes}
            error={message}
          />
        )}
      />
      <Text className="text-green-500">{getPromoInfo(selectedType)}</Text>
    </>
  );
};

export default TypeControl;
