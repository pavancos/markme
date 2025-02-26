import { Tabs, Slot } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { toast, Toasts } from '@backpackapp-io/react-native-toast';

export default function AuthLayout() {
    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={styles.container}>
                <Slot />
                <Toasts defaultStyle={{
                    view: {
                        backgroundColor: "rgba(44, 44, 44, 0.15)",
                        borderRadius: 10,
                        padding: 10,
                    },
                    pressable: {
                        backgroundColor: "rgba(44, 44, 44, 0.15)",
                        borderRadius: 10,
                    },
                    text: {
                        color: "rgb(255, 255, 255)",
                        fontSize: 16,
                    },
                }} />
            </GestureHandlerRootView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    text: {
        color: 'yellow',
        fontSize: 20,
    },
})