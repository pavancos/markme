import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { toast, Toasts } from '@backpackapp-io/react-native-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";
import EventSheet from "@/components/EventSheet";
import { View } from "react-native";
import CreateSheet from "@/components/CreateSheet";
import CreateEventSheet from "@/components/CreateEventSheet";
import CreateSpaceSheet from "@/components/CreateSpaceSheet";

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

  if (isLoading)
    return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>

          {isAuthenticated ? (
            <Stack.Screen name="(tabs)" options={{ statusBarBackgroundColor: 'black' }} />
          ) : (
            <Stack.Screen name="auth" options={{ statusBarBackgroundColor: 'black' }} />
          )}
        </Stack>
      </View>
      <EventSheet />
      <CreateSheet />
      <CreateEventSheet />
      <CreateSpaceSheet />
      <Toasts
        defaultStyle={{
          view: {
            backgroundColor: "rgba(44, 44, 46, 0.85)",
            borderRadius: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 6,
            padding: 14,
          },
          pressable: {
            backgroundColor: "rgba(44, 44, 46, 0.85)",
            borderRadius: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 6,
          },
          text: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "500",
          },
        }}
      />
    </GestureHandlerRootView>
  );
}