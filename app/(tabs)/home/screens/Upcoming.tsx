import { View, Text,StyleSheet, ScrollView } from "react-native";
import { Event } from "@/components/Event";
export default function UpcomingScreen() {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Event/>
            <Event/>
            <Event/>
            <Event/>
            <Event/>
            <Event/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
    padding:12
  },
})