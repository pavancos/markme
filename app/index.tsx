import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, ActivityIndicator } from "react-native";

export default function LoadingScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      // @ts-ignore
      router.replace(token ? "/home" : "/auth");
    };
    setTimeout(checkToken, 1500);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "red", fontSize: 20 }}>Loading...</Text>
      <ActivityIndicator size="large" color="yellow" />
    </View>
  );
}
