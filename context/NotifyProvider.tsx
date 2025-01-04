import axios from "axios";
import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Alert, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { IUserDB } from "@/types/interfaces";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});
interface INotifyContext {}

const NotifyContext = createContext<INotifyContext>({});

export const useNotifyContext = () => useContext(NotifyContext);

export const NotifyProvider = ({
  children,
  user,
  setUser,
}: {
  children: React.ReactNode;
  user: IUserDB;
  setUser: React.Dispatch<SetStateAction<IUserDB>>;
}) => {
  const responseListener = useRef<any>();

  async function registerForPushNotificationsAsync() {
    let token: string | undefined = undefined;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") return;

      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "80c6c315-cfc6-4a45-88d0-4d80ae68654b",
        })
      ).data;
    } else {
      Alert.alert("Xeta", "Bu funksiya yalnız cihazlarda işləyir");
    }

    return token;
  }

  const sendTokenToServer = async (userId: string, token: string) => {
    try {
      const response = await axios.post(
        `https://express-bay-rho.vercel.app/api/notification/save-token`,
        { userId, token }
      );
      if (response.status === 200) {
        console.log("Token sent to server successfully");
      }
    } catch (error) {
      console.error("Error sending token to server:", error);
    }
  };

  const setupNotifications = async () => {
    const token = await registerForPushNotificationsAsync();
    if (!user._id || !token || user.pushTokens?.includes(token)) return;

    await sendTokenToServer(user._id, token);
    setUser((prevUser) => ({
      ...prevUser!,
      pushTokens: [...(prevUser?.pushTokens || []), token],
    }));
  };

  useEffect(() => {
    if (user?._id) {
      setupNotifications();
    }

    // bildiriş alınan kimi işə düşür
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        const content = notification.request.content;
        console.log("Bildiriş alındı:", content);
      }
    );

    // bildirişə klik olanda işə düşür
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((res: any) => {
        const content = res.notification.request.content;
        console.log("Notify data", content);
      });

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, [user?._id]);

  return <NotifyContext.Provider value={{}}>{children}</NotifyContext.Provider>;
};
