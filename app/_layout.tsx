import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { toast, Toasts } from '@backpackapp-io/react-native-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalBottomSheet from "@/components/GlobalBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { View, Text } from "react-native";
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

  if (isLoading) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="(tabs)" options={{ statusBarBackgroundColor: 'black' }} />
        ) : (
          <Stack.Screen name="auth" options={{ statusBarBackgroundColor: 'black' }} />
        )}
      </Stack>
      <GlobalBottomSheet />
    </GestureHandlerRootView>
  );
}