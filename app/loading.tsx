import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoadingScreen() {
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        router.replace("/");
      } else {
        // @ts-ignore
        router.replace("/auth/signup");
      }
    };
    setTimeout(checkToken, 2000); // Simulating loading
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "red", fontSize: 20 }}>Loading...</Text>
      <ActivityIndicator size="large" color="yellow" />
    </View>
  );
}
