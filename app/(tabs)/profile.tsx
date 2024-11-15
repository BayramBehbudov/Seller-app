import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import MenuBar from "@/components/menu";
import Dashboard from "@/components/Profile/Dashboard";
import { ScrollView } from "react-native";
export interface IProfileElement {
  title: string;
  component: React.ReactElement;
}
const profile = () => {
  const [element, setElement] = useState<IProfileElement>({
    title: "Dashboard",
    component: <Dashboard />,
  });
  return (
    <SafeAreaView className="bg-primary px-3 w-full h-full pt-3 gap-3 flex-col">
      <MenuBar setElement={setElement} element={element} />

      <ScrollView className="w-full h-full mt-2">
        {element.component}
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
