import React from "react";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { icons } from "@/constants";

const TabIcon = ({ icon, color }: { icon: any; color: string }) => {
  return (
    <Image
      className="w-6 h-6"
      source={icon}
      resizeMode="contain"
      tintColor={color}
    />
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDF0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Əsas səhifə",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon icon={icons.home} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Məhsul artır",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon icon={icons.create} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Sifarişlər",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon icon={icons.order} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Hesab",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon icon={icons.profile} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
