import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { Event } from "@/components/Event";
import { useEffect, useState, useCallback } from "react";
import { useHomeStore } from "@/stores/homeStore";
import { formatDate } from "@/utils/dateUtils";

export default function UpcomingScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { fetchEvents, events } = useHomeStore();

  useEffect(() => {
    fetchEvents().then(() => setLoading(false));
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  }, []);

  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white" />
      }
    >
      {events.upcomingEvents.map((event: any, index) => (
        <Event key={index} event={{ ...event, date: formatDate(event?.timings?.start) }} />
      ))}
      {
        events.upcomingEvents.length === 0 && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>No upcoming events</Text>
          </View>
        )
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
  },
});
