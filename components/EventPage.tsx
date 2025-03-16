import { Pressable, StyleSheet, Text, View, Linking, Platform, TextInput } from 'react-native';
import { EventType, UserInEventType } from '@/stores/homeStore';
import { Image } from 'expo-image';
import { formatDate } from '@/utils/dateUtils';
import { useState, useEffect, useCallback } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { markmeEvent } from '@/utils/eventUtils';
import { toast } from '@backpackapp-io/react-native-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useExploreStore } from '@/stores/exploreStore';
import { useHomeStore } from '@/stores/homeStore';
import * as Haptics from 'expo-haptics';
import { useAuthStore } from '@/stores/authStore';
import { BE_URL } from '@/constants/config';

interface EventPageProps {
    event: EventType;
}
const EventPage = ({ event }: EventPageProps) => {
    const { fetchAllEvents } = useExploreStore();
    const { fetchEvents } = useHomeStore()
    const [attendeesVisible, setAttendeesVisible] = useState(false);
    const [checkedInVisible, setCheckedInVisible] = useState(false);
    const startDate = new Date(event?.timings.start);
    const endDate = new Date(event?.timings.end);
    const startDay = formatDate(startDate.toString());
    const endDay = formatDate(endDate.toString());
    const startTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isSameDay = startDay === endDay;
    const { user } = useAuthStore();
    const [isMarked, setIsMarked] = useState(false);
    const [checkedInAttendees, setCheckedInAttendees] = useState<UserInEventType[]>([]);
    const [checkInAttendees, setCheckInAttendees] = useState<UserInEventType[]>([]);

    const refreshStates = useCallback(() => {
        const attendees = event?.attendees || [];
        const checkedIn = event?.checkedIn || [];

        setIsMarked(attendees.some((attendee: any) => attendee.username === user?.username));
        setCheckedInAttendees(checkedIn);
        setCheckInAttendees(
            attendees.filter(
                (attendee: any) => !checkedIn.some(
                    (checkedInAttendee: any) => checkedInAttendee.username === attendee.username
                )
            )
        );
    }, [event, user, event?.attendees, event?.checkedIn])

    useEffect(() => {
        refreshStates();
    }, [event, user, event?.attendees, event?.checkedIn]);

    const handleOpenMaps = (venueName: string, venueAddress: string) => {
        const location = `${venueName}, ${venueAddress}`;
        const url = Platform.select({
            ios: `http://maps.apple.com/?q=${encodeURIComponent(location)}`,
            android: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`,
            web: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`,
        });
        if (url) {
            Linking.openURL(url);
        }
    };
    const handleOpenCalendar = () => {
        const url = Platform.select({
            ios: `calshow:${startDate.getTime() / 1000}`,
            android: `content://com.android.calendar/time/${startDate.getTime()}`,
        });
        if (url) {
            Linking.openURL(url);
        }
    };
    const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    async function checkIn(attendee: any) {
        console.log('attendee: ', attendee);
        let token = await AsyncStorage.getItem('token');
        if (!token) {
            return;
        }
        token = JSON.parse(token);
        const res = await fetch(`${BE_URL}/event/checkIn`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                eventId: event._id,
                username: attendee.username
            })
        })
        if (res.ok) {
            toast("Checked In")
            fetchAllEvents();
            fetchEvents();
            refreshStates();
        }
        else {
            toast("Something Went Wrong")
        }
    }
    async function unCheckIn(attendee: any) {
        console.log('attendee: ', attendee);
        let token = await AsyncStorage.getItem('token');
        if (!token) {
            return;
        }
        token = JSON.parse(token);
        const res = await fetch(`${BE_URL}/event/uncheckIn`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                eventId: event._id,
                username: attendee.username
            })
        })
        if (res.ok) {
            toast("UnChecked In")
            fetchAllEvents();
            fetchEvents();
            refreshStates();
        }
        else {
            toast("Something Went Wrong")
        }
    }
    return (
        <View style={styles.container}>
            <Image
                style={[styles.image]}
                source={
                    event?.poster && event?.poster !== "" ?
                        { uri: event?.poster } :
                        "event"
                }
                placeholder={{ blurhash }}
                contentFit="cover"
            />
            <View style={styles.content}>
                <Text style={styles.eventName}>{event?.name}</Text>
                <Text style={styles.spaceName}>{event?.spaceId.name}</Text>
                {
                    !isMarked ? (
                        <Pressable style={styles.markMeButton}
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
                                if (Platform.OS !== "web") {
                                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                                }
                                setIsMarked(true);
                                toast("You've Marked yourself for event")
                                await fetchAllEvents();
                                await fetchEvents();
                            }}
                        >
                            <Text style={styles.markMeText}>Mark Me</Text>
                        </Pressable>
                    ) : (
                        <Pressable style={[styles.markMeButton, {
                            backgroundColor: '#00000000',
                            borderWidth: 2,
                            borderColor: '#FFD700',

                        }]}
                            onPress={async () => {
                                console.log("Un Markme");
                                let token = await AsyncStorage.getItem('token');
                                if (!token) {
                                    return;
                                }
                                token = JSON.parse(token);
                                if (token) {
                                    await markmeEvent(event._id, token);
                                }
                                if (Platform.OS !== "web") {
                                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                                }
                                setIsMarked(false);
                                toast("You've Un-Marked yourself for event")
                                await fetchAllEvents();
                                await fetchEvents();
                            }}
                        >
                            <Text style={[styles.markMeText, {
                                color: '#FFD700',
                            }]}>UnMark Me</Text>
                        </Pressable>

                    )
                }
                <Text style={styles.sectionTitle}>About Event</Text>
                <Text style={styles.description}>{event?.description}</Text>
                <View style={styles.row}>
                    <Pressable style={styles.detailBox} onPress={handleOpenCalendar}>
                        <Text style={styles.dateTitle}>Date</Text>
                        <Text style={styles.description}>{isSameDay ? startDay : `${startDay} - ${endDay}`}</Text>
                    </Pressable>
                    <Pressable style={styles.detailBox} onPress={handleOpenCalendar}>
                        <Text style={styles.dateTitle}>Time</Text>
                        <Text style={styles.description}>{startTime} - {endTime}</Text>
                    </Pressable>
                </View>
                <Text style={styles.sectionTitle}>Location</Text>
                <Pressable onPress={() => handleOpenMaps(event?.venue.name, event?.venue.address)}>
                    <Text style={styles.description}>{event?.venue.name}, {event?.venue.address}</Text>
                </Pressable>
                {event?.capacity && event?.capacity > 0 && event?.capacity !== 9007199254740991 && (
                    <Text style={styles.sectionTitle}>Capacity: {event.capacity}</Text>
                )}
                {
                    event?.contactDetails?.length > 0 &&
                    <>
                        <Text style={styles.sectionTitle}>Contact Details</Text>
                        {event?.contactDetails.map((contact, index) => (
                            <View key={index} style={styles.contactRow}>
                                <Text style={styles.description}>{contact.name}</Text>
                                <View style={styles.contactActions}>
                                    <Pressable onPress={() => Linking.openURL(`tel:${contact.phone}`)}>
                                        <MaterialCommunityIcons name="phone" size={20} color="#818181" />
                                    </Pressable>
                                    <Pressable onPress={() => Linking.openURL(`mailto:${contact.email}`)}>
                                        <MaterialCommunityIcons name="email" size={20} color="#818181" />
                                    </Pressable>
                                </View>
                            </View>
                        ))}
                    </>
                }
            </View>
            {
                event?.isManager && checkInAttendees.length > 0 && (
                    <View style={styles.content}>
                        {
                            <>
                                <Pressable onPress={() => setAttendeesVisible(!attendeesVisible)}>
                                    <Text style={[styles.sectionTitle, {
                                        marginTop: 0,
                                    }]}>Attendees {checkInAttendees.length} </Text>
                                </Pressable>
                                {
                                    attendeesVisible && (
                                        <View style={[{
                                            flexWrap: 'wrap',
                                            flexDirection: 'column-reverse',
                                            height: 'auto',
                                        }]}>
                                            {checkInAttendees.map((attendee, index) => (
                                                <Pressable
                                                    key={index}
                                                    onPress={() => checkIn(attendee)}
                                                >
                                                    <Text key={index} style={{
                                                        color: '#fff',
                                                        fontSize: 16,
                                                        marginVertical: 5,
                                                    }}>{attendee.fullname}</Text>
                                                </Pressable>
                                            ))}
                                        </View>
                                    )
                                }
                            </>
                        }
                    </View>
                )
            }
            {
                event?.isManager && checkedInAttendees.length > 0 && (
                    <View style={styles.content}>
                        {
                            <>
                                <Pressable onPress={() => setCheckedInVisible(!checkedInVisible)}>
                                    <Text style={[styles.sectionTitle, {
                                        marginTop: 0,
                                    }]}>Checked In {checkedInAttendees.length}</Text>
                                </Pressable>
                                {
                                    checkedInVisible && (
                                        <View style={[{
                                            flexWrap: 'wrap',
                                            flexDirection: 'column-reverse',
                                            height: 'auto',
                                        }]}>
                                            {checkedInAttendees.map((attendee, index) => (
                                                <Pressable
                                                    key={index}
                                                    onPress={() => unCheckIn(attendee)}
                                                >
                                                    <Text key={index} style={{
                                                        color: '#fff',
                                                        fontSize: 16,
                                                        marginVertical: 5,
                                                    }}>{attendee.fullname}</Text>
                                                </Pressable>
                                            ))}
                                        </View>
                                    )
                                }
                            </>
                        }
                    </View>
                )
            }
        </View>
    );
};

export default EventPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 15,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
    },
    content: {
        marginTop: 20,
        width: '100%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 15,
    },
    eventName: {
        fontSize: 26,
        color: '#FFD700',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    spaceName: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        color: '#FFD700',
        marginTop: 15,
    },
    dateTitle: {
        fontSize: 16,
        color: '#FFD700',
    },
    description: {
        fontSize: 15,
        color: 'white',
        marginTop: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        gap: 10,
    },
    contactRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        gap: 10,
        alignItems: 'center',
    },
    contactActions: {
        flexDirection: 'row',
        gap: 10,
    },
    detailBox: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 10,
    },
    markMeButton: {
        marginTop: 5,
        backgroundColor: '#FFD700',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    markMeText: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
});