import * as SecureStore from "expo-secure-store";

export const addCookie = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error("Tokeni saxlamağa çalışarkən xəta:", error);
  }
};

export const getCookie = async (key: string) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (error) {
    console.error("Tokeni oxumağa çalışarkən xəta:", error);
  }
};

export const removeCookie = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Tokeni silməyə çalışarkən xəta:", error);
  }
};

