import { ScrollView } from "react-native";
import React from "react";
import { IProduct } from "@/types/interfaces";
import { openPicker } from "@/helpers/openPicker";
import CustomButton from "@/components/CustomButton";
import MainImage from "./MainImage";
import VariantsSelector from "./VariantsSelector";

const ImageandVariants = ({
  selectedCategory,
  formData,
  setFormData,
  setSubmitStep,
}: {
  selectedCategory: IProduct["category"];
  formData: IProduct & { store: string };
  setFormData: React.Dispatch<
    React.SetStateAction<IProduct & { store: string }>
  >;
  setSubmitStep: React.Dispatch<
    React.SetStateAction<"cat" | "info" | "images" | "features">
  >;
}) => {
  return (
    <ScrollView className="flex-col w-full">
      <MainImage
        image={formData.image}
        setImages={() =>
          openPicker((i: IProduct["image"][]) => {
            setFormData({ ...formData, image: i[0] });
          }, "main")
        }
      />

      <VariantsSelector
        selectedCategory={selectedCategory}
        variants={formData.variants}
        setFormData={setFormData}
        formData={formData}
      />

      <CustomButton
        handlePress={() => setSubmitStep("features")}
        title="Davam et"
        containerStyles="w-full mt-5"
        disabled={formData.image.imageUrl === ""}
      />
    </ScrollView>
  );
};

export default ImageandVariants
