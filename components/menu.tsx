import { IProfileElement } from "@/app/(tabs)/profile";
import { icons } from "@/constants";
import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import EditProfile from "./Profile/EditProfile";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import Stores from "./Profile/Store/Stores";
import { IUserDB } from "@/types/interfaces";
import axios from "axios";
import Promos from "./Profile/Promos/Promos";
import UnpaidOrders from "./Profile/UnpaidOrders/UnpaidOrders";

const MenuBar = ({
  setElement,
  element,
}: {
  setElement: Dispatch<SetStateAction<IProfileElement>>;
  element: IProfileElement;
}) => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get("window").width)
  ).current;

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get("window").width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const menuItems = [
    {
      title: "Hesab Məlumatları",
      component: <EditProfile />,
    },
    {
      title: "Mağazalar",
      component: <Stores />,
    },
    {
      title: "Aksiyalar",
      component: <Promos />,
    },
    {
      title: "Ödənilməmiş sifarişlər",
      component: <UnpaidOrders />,
    },
  ];

  return (
    <View className="z-50">
      <View className="flex-row w-full py-3 items-center justify-between">
        <Text className="text-white text-2xl">{element.title}</Text>
        <TouchableOpacity onPress={toggleMenu} className="px-2">
          <Image source={icons.menu} className="h-8" resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <Animated.View
          style={{ transform: [{ translateX: slideAnim }] }}
          className="absolute z-30 top-0 right-0 h-screen w-3/4 bg-white shadow-lg flex-col justify-between"
        >
          <View className="flex-col">
            <TouchableOpacity
              onPress={toggleMenu}
              className="w-full mt-2 pr-3 flex-row items-center justify-end"
            >
              <Image
                source={icons.close}
                className="h-5 w-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="p-3 flex-col gap-2">
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setElement(item), toggleMenu();
                  }}
                  className="p-3 border-b"
                >
                  <Text className="text-black text-base ml-4">
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Hesabınızdan çıxış etmək istəyirsiniz?", "", [
                {
                  text: "Xeyr",
                },
                {
                  text: "Bəli",
                  onPress: async () => {
                    try {
                      await axios.post(
                        `https://express-bay-rho.vercel.app/api/auth/logout`
                      );
                      setUser({} as IUserDB),
                        setIsLoggedIn(false),
                        router.push("/");
                    } catch (error: any) {
                      Alert.alert("Çıxış edilmədi", error.message);
                    }
                  },
                  style: "default",
                },
              ]);
            }}
            className="p-3 w-full"
            style={{ position: "absolute", bottom: 80 }}
          >
            <Text className="bg-red-500 text-white p-4 rounded-lg">Çıxış</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default MenuBar;
