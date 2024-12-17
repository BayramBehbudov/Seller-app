import { View, Text } from "react-native";
import React, { useState } from "react";
import CustomButton from "../CustomButton";
import CustomSelect from "../CustomSelect";
import { IStoreDB } from "@/types/interfaces";
import { useGlobalContext } from "@/context/GlobalProvider";
import TypeControl from "./PromoTypeControl";
import { Controller } from "react-hook-form";
import FormField from "../FormField";
import { buyXgetYTypes } from "@/static/data";
import PromoStatusControl from "./PromoStatusControl";
import PromoModal from "./promoModal";

const PromoControllers = ({
  selectedStore,
  setSelectedStore,
  control,
  setValue,
  errors,
  setProducts,
  selectedProducts,
  type,
  submit,
}: {
  selectedStore: IStoreDB;
  setSelectedStore: React.Dispatch<React.SetStateAction<IStoreDB>>;
  control: any;
  setValue: any;
  errors: any;
  setProducts: React.Dispatch<React.SetStateAction<string[]>>;
  selectedProducts: string[];
  type: string;
  submit: () => void;
}) => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(false);

  const { user, isLoading } = useGlobalContext();
  return (
    <View className="w-full  gap-3 flex flex-col pb-3">
      <CustomSelect
        title="Mağaza"
        handleChange={(t) => {
          setSelectedStore(user.stores.find((s) => s._id === t) as IStoreDB);
        }}
        defaultValue={
          user.stores
            .map((s) =>
              s._id === selectedStore?._id
                ? { id: s._id, title: s.name }
                : { id: "", title: "" }
            )
            .filter(Boolean)[0]
        }
        placeholder="Seç"
        modalTitle="Mağazanı seçin"
        data={user.stores
          .map((s) => ({ id: s._id, title: s.name }))
          .filter(Boolean)}
        error={!selectedStore?._id ? "Mağazanı seçin" : undefined}
      />

      {selectedStore?._id && (
        <TypeControl
          control={control}
          setValue={setValue}
          setSelectedType={setSelectedType}
          selectedType={selectedType}
          message={errors?.type?.message ? "Aksiyanın növünü seçin" : undefined}
        />
      )}
      {selectedType && (
        <>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <FormField
                title="name"
                text="Ad"
                handleChange={onChange}
                value={value}
                error={errors?.name?.message || undefined}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <FormField
                title="description"
                text="Açıqlama"
                handleChange={onChange}
                value={value}
                error={errors?.description?.message || undefined}
              />
            )}
          />
          {selectedType && selectedType !== "buyXgetY" && (
            <Controller
              control={control}
              name="discountValue"
              render={({ field: { onChange, value } }) => (
                <FormField
                  title="discountValue"
                  text={`Endirim ${
                    selectedType === "percentage" ||
                    selectedType === "countPercentage"
                      ? " faizi"
                      : " məbləği"
                  }`}
                  keyboardType="numeric"
                  handleChange={(v) => {
                    v === "" ? onChange(0) : onChange(+v);
                  }}
                  value={value.toString()}
                  error={errors?.discountValue?.message || undefined}
                />
              )}
            />
          )}

          {selectedType === "countPercentage" && (
            <Controller
              control={control}
              name="minCount"
              render={({ field: { onChange, value } }) => (
                <FormField
                  title="minCount"
                  text="Minimum alış sayı"
                  keyboardType="numeric"
                  handleChange={(v) => {
                    v === "" ? onChange(0) : onChange(+v);
                  }}
                  value={value.toString()}
                  error={errors?.minCount?.message || undefined}
                />
              )}
            />
          )}

          {selectedType === "buyXgetY" && (
            <Controller
              control={control}
              name="buyXgetY"
              render={({ field: { onChange, value } }) => (
                <CustomSelect
                  title="Hədiyyə növü"
                  handleChange={onChange}
                  placeholder="Seç"
                  modalTitle="Hədiyyə növünü seçin"
                  data={buyXgetYTypes}
                  defaultValue={buyXgetYTypes.find((t) => t.id === value)}
                  error={errors?.buyXgetY?.message}
                />
              )}
            />
          )}

          <PromoStatusControl
            control={control}
            message={
              errors?.isActive?.message
                ? "Aksiyanın statusunu seçin"
                : undefined
            }
            setProducts={setProducts}
            setSelectedStatus={setSelectedStatus}
          />

          {selectedStatus && (
            <PromoModal
              selectedStore={selectedStore}
              selectedProducts={selectedProducts}
              setSelectedProducts={setProducts}
            />
          )}
        </>
      )}
      <CustomButton
        title={
          type === "add" ? "Aksiya yarat" : "Aksiya məlumatlarını dəyişdir"
        }
        handlePress={submit}
        containerStyles="mt-5"
        disabled={isLoading}
      />
    </View>
  );
};

export default PromoControllers;
