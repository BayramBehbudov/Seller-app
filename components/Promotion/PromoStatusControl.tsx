import { View, Text } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import CustomSelect from "../CustomSelect";

const PromoStatusControl = ({
  control,
  setSelectedStatus,
  setProducts,
  message,
  type,
}: {
  control: any;
  setSelectedStatus: React.Dispatch<React.SetStateAction<boolean>>;
  message: string | undefined;
  setProducts: React.Dispatch<React.SetStateAction<string[]>>;
  type: string;
}) => {
  return (
    <>
      <Controller
        control={control}
        name="isActive"
        render={({ field: { onChange, value } }) => (
          <CustomSelect
            title="Status"
            handleChange={(v) => {
              if (v === "true") {
                onChange(true);
                setSelectedStatus(true);
              } else {
                onChange(false);
                setSelectedStatus(false);
                type === "add" && setProducts([]);
              }
            }}
            placeholder="Seç"
            modalTitle="Aksiya statusunu seçin"
            data={[
              { id: "true", title: "Aktiv" },
              { id: "false", title: "Deaktiv" },
            ]}
            error={message}
            defaultValue={
              value
                ? { id: "true", title: "Aktiv" }
                : { id: "false", title: "Deaktiv" }
            }
          />
        )}
      />
      <Text className="text-green-500">
        Status aktiv seçilərsə mütləq şəkildə ən azı 1 məhsul seçilməlidir və
        beləliklə aksiya yaradılan kimi seçilmiş məhsullara endirim tətbiq
        ediləcəkdir. Deaktiv seçilərsə aksiya yaradılacaq lakin siz aktiv edənə
        qədər endirim tətbiq edilməyəcək.
      </Text>
    </>
  );
};

export default PromoStatusControl;
