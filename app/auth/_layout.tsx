import { Tabs, Slot } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
    return (
        <SafeAreaView style={styles.container}>
            <Slot/>
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