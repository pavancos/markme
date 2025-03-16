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
import { useAssets } from 'expo-asset';
export function Event({ event, isPast, onClick }: any) {
    const { fetchAllEvents, events } = useExploreStore();
    const { fetchEvents } = useHomeStore()
    const { user } = useAuthStore();
    const [isMarked, setIsMarked] = useState(false);
    useEffect(() => {
        setIsMarked(event?.attendees?.some((attendee: any) => attendee.username === user?.username));
    }, [event, user]);
    const [assets, error] = useAssets([
        require('../assets/images/event.png')
    ])
    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    return (

        <Pressable onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={[styles.image,
                        isPast && { opacity: 0.5 }
                        ]}
                        source={
                            event?.poster && event?.poster !== "" ?
                                { uri: event?.poster } : 'event'
                        }
                        placeholder={{blurhash}}
                        contentFit="cover"
                    />
                    <View style={styles.overlay}>
                        <Text style={styles.date}>{event?.date}</Text>
                        {
                            event?.status === "Live" && (
                                <Text style={styles.status}>Live</Text>
                            )
                        }
                    </View>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.eventName}>{event?.name}</Text>
                    <Text style={styles.spaceName}>{event?.spaceId?.name}</Text>
                    <View style={styles.otherDetails}>
                        <View style={styles.details}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <LocationPin />
                                <Text style={{ paddingLeft: 5, color: "#999" }} >{event?.venue?.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <PersonGroup />
                                <Text style={{ paddingLeft: 5, color: "#999" }} >{event?.attendees?.length}</Text>
                            </View>
                        </View>
                        {
                            !isPast && (
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
                            )
                        }
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1e1e1e",
        width: '100%',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 150,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    date: {
        backgroundColor: '#e3e3e3',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        color: '#000',
        fontSize: 14,
        fontWeight: '600',
    },
    status: {
        backgroundColor: '#ff3c3c',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    textContainer: {
        padding: 12,
    },
    eventName: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
    },
    spaceName: {
        color: '#999',
        fontSize: 16,
        marginTop: 5,
    },
    details: {
        flexDirection: 'row',
        marginTop: 8,
        gap: 10,
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
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    markmeText: {
        backgroundColor: '#ffe93f',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        color: '#000',
        fontSize: 15,
        fontWeight: '600',
    },
});
