import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };
    checkToken();
  }, []);

  if (isLoading) return null; // Prevents flickering while checking token

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" options={{statusBarBackgroundColor:'black'}} />
      ) : (
        <Stack.Screen name="auth"  options={{statusBarBackgroundColor:'black'}} />
      )}
    </Stack>
  );
}
