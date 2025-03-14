import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import LocationPin from './svgs/LocationPin';
import PersonGroup from './svgs/PersonGroup';
import { markmeEvent, unMarkmeEvent } from '../utils/eventUtils'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toast } from '@backpackapp-io/react-native-toast';
import { useExploreStore } from '@/stores/exploreStore';
import { useHomeStore } from '@/stores/homeStore';
import * as Haptics from 'expo-haptics';
import { useAuthStore } from '@/stores/authStore';
import { formatDate } from '@/utils/dateUtils';

const EventItem = ({ event, onClick }: any) => {
    const { fetchAllEvents, events } = useExploreStore();
    const { fetchEvents } = useHomeStore()
    const { user } = useAuthStore();
    const [isMarked, setIsMarked] = useState(false);
    useEffect(() => {
        setIsMarked(event?.attendees?.some((attendee: any) => attendee.username === user?.username));
    }, [event, user]);
    return (
        <Pressable onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={[styles.image]}
                        source={
                            event?.poster && event?.poster !== "" ?
                                { uri: event?.poster } :
                                "https://bside.vigneshvaranasi.in/Photos/Vintage%20Car.JPEG"
                        }
                        contentFit="cover"
                    />
                </View>
                <View style={styles.textContainer}>
                    <View>
                        <Text style={styles.eventName}>{
                            event?.name.length > 17 ?
                                event?.name.slice(0, 17) + "..." :
                                event?.name
                        }</Text>
                        <View style={styles.details}>
                            <Text style={styles.date}>{formatDate(event.timings.start)}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <PersonGroup />
                                <Text style={{ paddingLeft: 5, color: "#999" }} >{event?.attendees?.length}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                            <LocationPin />
                            <Text style={{ paddingLeft: 5, color: "#999" }} >{event?.venue?.name}</Text>
                        </View>
                    </View>
                    <View style={styles.details}>
                        {
                            event?.status === "Live" && (
                                <Text style={styles.status}>Live</Text>
                            )
                        }
                        {
                            !isMarked ? (
                                <Pressable
                                    onPress={async () => {
                                        console.log("Markme");
                                        let token = await AsyncStorage.getItem('token');
                                        if (!token) {
                                            return;
                                        }
                                        token = JSON.parse(token);
                                        if (token) {
                                            await markmeEvent(event._id, token);
                                        }
                                        setIsMarked(true);
                                        toast("You've Marked yourself for event");
                                        if (Platform.OS !== "web") {
                                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                                        }
                                        await fetchAllEvents();
                                        await fetchEvents();
                                    }}
                                    style={styles.markmeButton}>
                                    <Text style={styles.markmeText}>Markme</Text>
                                </Pressable>
                            ) : (
                                <Pressable
                                    onPress={async () => {
                                        console.log("Un-Markme");
                                        let token = await AsyncStorage.getItem('token');
                                        if (!token) {
                                            return;
                                        }
                                        token = JSON.parse(token);
                                        if (token) {
                                            await unMarkmeEvent(event._id, token);
                                        }
                                        setIsMarked(false);
                                        toast("You've Un-Marked yourself for event");
                                        if (Platform.OS !== "web") {
                                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                                        }
                                        await fetchAllEvents();
                                        await fetchEvents();
                                    }}
                                    style={styles.markmeButton}>
                                    <Text style={[styles.markmeText, {
                                        backgroundColor: '#0000000',
                                        borderColor: '#ffe93f',
                                        borderWidth: 1,
                                        color: '#ffe93f'
                                    }]}>UnMark</Text>
                                </Pressable>
                            )
                        }
                    </View>
                </View>
            </View>
        </Pressable >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1e1e1e",
        width: '100%',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
        padding: 10,
        flexDirection: 'row',
        height: 140,
    },
    imageContainer: {
        position: 'relative',
        width: '40%',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    textContainer: {
        paddingHorizontal: 12,
        justifyContent: 'space-between',
    },
    eventName: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
        overflow: 'hidden',
    },
    date: {
        color: '#999',
        fontSize: 16,
        marginTop: 5,
    },
    details: {
        flexDirection: 'row',
        marginTop: 8,
        gap: 10,
        alignItems: 'center',
    },
    otherDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    normalText: {
        color: '#999',
        fontSize: 15,
    },
    markmeButton: {
        alignSelf: 'flex-start',
    },
    markmeText: {
        backgroundColor: '#ffe93f',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        color: '#000',
        fontSize: 15,
        fontWeight: '600',
    },
    status: {
        backgroundColor: '#000000',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        color: '#FFE100',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default EventItem