import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from 'react';
import { Event } from "@/components/Event";
function PastScreen() {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Event />
            <Event />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        color: 'white',
        padding: 12
    },
})

export default PastScreen;