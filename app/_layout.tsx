import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { toast, Toasts } from '@backpackapp-io/react-native-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";
import EventSheet from "@/components/EventSheet";
import { View } from "react-native";
import CreateSheet from "@/components/CreateSheet";

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
      <CreateSheet/>
      <Toasts
        defaultStyle={{
          view: {
            backgroundColor: "#c5c5c6",
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "rgba(44, 44, 44, 0.84)",
            padding: 10,
          },
          pressable: {
            backgroundColor: "#c5c5c6",
            borderRadius: 32,
            borderWidth: 1,
            borderColor: "rgba(44, 44, 44, 0.84)",
          },
          text: {
            color: "000",
            fontSize: 16,
          },
        }}

      />
    </GestureHandlerRootView>
  );
}