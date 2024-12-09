import { createContext, useContext, useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { useGlobalContext } from "./GlobalProvider";
import axios from "axios";

const NotifyContext = createContext({});
export const useNotifyContext = () => useContext(NotifyContext);

async function registerForPushNotificationsAsync() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission not granted!");
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
export const NotifyProvider = ({ children }: { children: React.ReactNode }) => {
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const { user } = useGlobalContext();

  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      const pushTokens = user.pushTokens
        ? [...user.pushTokens, token]
        : [token];

      if (user._id && token && !user.pushTokens?.includes(token)) {
        try {
          const res = await axios.patch(
            `https://express-bay-rho.vercel.app/api/user/${user._id}`,
            { pushTokens }
          );
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
        // Bu listener, cihaz bildiriş aldıqda işə düşür. notification obyektində bildirişin detalları olur.
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response received:", response);
        // Burada bildirişə klikləndiyi zaman nə baş verəcəyini müəyyən edə bilərik
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [user]);

  return <NotifyContext.Provider value={{}}>{children}</NotifyContext.Provider>;
};
