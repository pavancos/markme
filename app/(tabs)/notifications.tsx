import { View, StyleSheet, Text, ScrollView, RefreshControl, Pressable, ActivityIndicator } from 'react-native';
import TextBox from '@/components/TextBox';
import { useEffect, useRef, useState } from 'react';
import { Event } from '@/components/Event';
import { useSheetStore } from "@/stores/sheetStore";
import { useHomeStore } from '@/stores/homeStore';
import { formatDate } from '@/utils/dateUtils';
import { useAuthStore } from '@/stores/authStore';
import { router } from 'expo-router';
export default function NotificationsScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { fetchEvents, events } = useHomeStore();
  const { openBottomSheet } = useSheetStore();
  const { user } = useAuthStore();


  useEffect(() => {
    fetchEvents().then(() => setLoading(false))
  }, [])

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };



  if (loading) {
    return (
      <View style={[styles.loadingContainer,{
        justifyContent: "center",
        alignItems: "center",
        flex:1
      }]}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }


  return (
    <>
      <View style={styles.container}>
        <TextBox style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 12,
          marginLeft: 6
        }}>Your Events</TextBox>
        <ScrollView
          style={[styles.container,{
            padding: 0
          }]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white" />
          }
        >

          {events.upcomingEvents.map((event: any, index) => {
            if (event.attendees.some((attendee: any) => attendee.username === user?.username)) {
              return (
                <Event onClick={() => {
                  openBottomSheet(event)
                }} key={index} event={{ ...event, date: formatDate(event?.timings?.start) }} />
              )
            }
          })}
          {
            events.upcomingEvents.filter((event:any)=>{
              return (
                event.attendees.some((attendee: any) => attendee.username === user?.username)
              )
            }).length===0&& (
              <View style={[styles.loadingContainer,{
                
              }]}>
                <Text style={styles.loadingText}>Looks like you did not mark any events</Text>
                <Pressable onPress={()=>{
                  router.replace("/(tabs)/explore")
                }}>
                  <Text style={{
                    color: "#007AFF",
                    marginTop: 12,
                    fontSize: 18
                  }}>Explore some events</Text>
                </Pressable>
              </View>
            )
          }
        </ScrollView>
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 12,
    paddingBottom: 0
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  loadingText: {
    color: "white",
    fontSize: 14,
  },
});
