import { useCallback, useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import TextBox from "@/components/TextBox";
import { useAuthStore } from "@/stores/authStore";
import AppHeaderLogo from "@/components/svgs/AppHeaderLogo";
import { useProfileStore } from "@/stores/profileStore";
export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const router = useRouter();
    const { verifyToken, isAuthenticated } = useAuthStore();
    const [tokenChecked, setTokenChecked] = useState(false);
    const {profile, fetchProfile} = useProfileStore();

    useEffect(() => {
        async function prepare() {
            try {
                const token = await AsyncStorage.getItem("token");
                if (token) {
                    await verifyToken({ token: JSON.parse(token) });
                    await fetchProfile(JSON.parse(token));
                    setTokenChecked(true);
                } else {
                    setTokenChecked(true);
                }
                // await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);

    useEffect(() => {
        if (tokenChecked && appIsReady) {
            router.replace(isAuthenticated ? "/(tabs)/home/screens/Upcoming" : "/auth/login");
        }
    }, [tokenChecked, isAuthenticated, appIsReady]);

    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "black" }}>
            <AppHeaderLogo />
        </View>
    );
}