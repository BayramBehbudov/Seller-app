import { Image, ScrollView, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import CustomButton from "@/components/CustomButton";

const HomePage = () => {
  const { isLoading, user } = useGlobalContext();
  if (user?._id) return <Redirect href={"/home"} />;

  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="items-center px-4 gap-5 h-full justify-center w-full ">
          <View className="relative w-full items-center">
            <Text className="text-secondary-200 text-6xl font-pbold">
              Bazar.com
            </Text>
            <Image
              source={images.path}
              className="absolute -bottom-2  right-10 h-[15px] w-[136px]"
              resizeMode="contain"
            />
          </View>

          <Text className="text-white text-4xl mt-2  font-bold text-center">
            Ticarətinizi genişləndirin, işinizə dəyər qatın
          </Text>

          <Text className="text-sm text-white mt-7 text-center  ">
            Mağazanız artıq online platformada, siz satın biz çatdıraq
          </Text>
          <CustomButton
            title="Bizə qatıl"
            handlePress={() => router.push("/login")}
            containerStyles="w-full mt-10"
            disabled={isLoading}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default HomePage;
