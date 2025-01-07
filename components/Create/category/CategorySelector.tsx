import { View, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { icons } from "@/constants";
import CategoryBreadCrump from "./CatBreadCrump";
import CategoryCard from "./CatCard";
import { categories } from "@/static/categories";
import CatInput from "./CatInput";
import CustomButton from "@/components/CustomButton";
import { IProduct } from "@/types/interfaces";
import { Ionicons } from "@expo/vector-icons";

const CategorySelector = ({
  selectedCategory,
  setSelectedCategory,
  setSubmitStep,
}: {
  selectedCategory: IProduct["category"];
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<IProduct["category"]>
  >;
  setSubmitStep: React.Dispatch<
    React.SetStateAction<"cat" | "info" | "images" | "features">
  >;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState<"main" | "sub" | "child">(
    "main"
  );

  return (
    <View className={"justify-center items-center w-full gap-2"}>
      <CatInput
        selectedCategory={selectedCategory}
        setModalVisible={setModalVisible}
      />
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={400}

        style={{ margin: 0, justifyContent: "flex-end" }}
      >
        <View className="relative p-5 rounded-s-[20px] h-[80%] bg-white">
          <CategoryBreadCrump
            selectedCategory={selectedCategory}
            setCurrentStep={setCurrentStep}
            setSelectedCategory={setSelectedCategory}
          />

          <ScrollView className="py-2">
            {currentStep === "main" &&
              Object.entries(categories).map(([id, data]) => {
                return (
                  <CategoryCard
                    key={id}
                    title={data.title}
                    isSelected={id === selectedCategory.main}
                    onPress={() => {
                      setCurrentStep("sub");
                      setSelectedCategory({
                        main: id.trim(),
                        sub: "",
                        child: "",
                      });
                    }}
                  />
                );
              })}

            {currentStep === "sub" &&
              Object.entries(categories[selectedCategory?.main]?.subs).map(
                ([id, data]) => {
                  return (
                    <CategoryCard
                      key={id}
                      title={data.title}
                      isSelected={id === selectedCategory.sub}
                      onPress={() => {
                        setCurrentStep("child");
                        setSelectedCategory({
                          main: selectedCategory.main,
                          sub: id.trim(),
                          child: "",
                        });
                      }}
                    />
                  );
                }
              )}

            {currentStep === "child" &&
              Object.entries(
                categories[selectedCategory?.main]?.subs[selectedCategory?.sub]
                  ?.child
              ).map(([id, data]) => {
                return (
                  <CategoryCard
                    key={id}
                    title={data.title}
                    isSelected={id === selectedCategory.child}
                    onPress={() => {
                      setCurrentStep("child");
                      setSelectedCategory({
                        main: selectedCategory.main,
                        sub: selectedCategory.sub,
                        child: id.trim(),
                      });
                    }}
                  />
                );
              })}
          </ScrollView>

          <TouchableOpacity
            className="absolute items-center justify-center top-2 right-2 w-7 h-7"
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>

      <CustomButton
        handlePress={() => setSubmitStep("info")}
        title="Davam et"
        containerStyles="w-full mt-5"
        disabled={
          !selectedCategory.main ||
          !selectedCategory.sub ||
          !selectedCategory.child
        }
      />
    </View>
  );
};

export default CategorySelector;
