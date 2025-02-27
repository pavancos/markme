import { useCallback, useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import TextBox from "@/components/TextBox";

// SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function prepare() {
            try {
                const token = await AsyncStorage.getItem("token");
                //@ts-ignore
                router.replace(token ? "/auth/login" : "/auth/login");
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    // const onLayoutRootView = useCallback(() => {
    //     if (appIsReady) {
    //         SplashScreen.hideAsync();
    //     }
    // }, [appIsReady]);

    return (
        // <View
        //     style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        //     onLayout={onLayoutRootView}>
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextBox style={{ color: "yellow", fontSize: 40 }}>MarkMe</TextBox>
        </View>
    );
}