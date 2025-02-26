import { useCallback, useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, ActivityIndicator } from "react-native";
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
    duration: 1000,
    fade: true,
});

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function prepare() {
            try {
                const token = await AsyncStorage.getItem("token");
                // @ts-ignore
                router.replace(token ? "/auth" : "/auth/signup");
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(() => {
        if (appIsReady) {
          // This tells the splash screen to hide immediately! If we call this after
          // `setAppIsReady`, then we may see a blank screen while the app is
          // loading its initial state and rendering its first pixels. So instead,
          // we hide the splash screen once we know the root view has already
          // performed layout.
          SplashScreen.hide();
        }
      }, [appIsReady]);
    
      if (!appIsReady) {
        return null;
      }

    return (
        <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        onLayout={onLayoutRootView}>
            <Text style={{ color: "yellow", fontSize: 40 }}>MarkMe</Text>
        </View>
    );
}
