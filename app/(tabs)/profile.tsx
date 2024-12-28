import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import MenuBar from "@/components/menu";
import { View } from "react-native";
import EditProfile from "@/components/Profile/EditProfile";
export interface IProfileElement {
  title: string;
  component: React.ReactElement;
}
const profile = () => {
  const [element, setElement] = useState<IProfileElement>({
    title: "Hesab Məlumatları",
    component: <EditProfile />,
  });

  return (
    <SafeAreaView className="bg-primary px-3 w-full h-full pt-3 gap-3 flex-col">
      <MenuBar setElement={setElement} element={element} />
      <View className="w-full h-full mt-2">{element.component}</View>
    </SafeAreaView>
  );
};

export default profile;
