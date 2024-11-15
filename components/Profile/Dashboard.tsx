import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";

const Dashboard = () => {
  const { user } = useGlobalContext();

  return (
    <View className="w-full h-full">
      <Text className="text-white w-full text-2xl">DASHBOARD componenti</Text>
      <Text className="text-white w-full text-base">
        burada statistika tərzi bir səhifə olacaq
      </Text>
      {/* <CustomButton title="go" handlePress={async () => {}} /> */}
    </View>
  );
};

export default Dashboard;
