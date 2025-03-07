import { Tabs, Slot } from "expo-router";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { toast, Toasts } from '@backpackapp-io/react-native-toast';

export default function AuthLayout() {
    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={styles.container}>
                <Slot />
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