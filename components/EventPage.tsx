import { Pressable, StyleSheet, Text, View, Linking, Platform } from 'react-native';
import { EventType } from '@/stores/homeStore';
import { Image } from 'expo-image';
import { formatDate } from '@/utils/dateUtils';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
interface EventPageProps {
    event: EventType;
}

const EventPage = ({ event }: EventPageProps) => {
    const { user } = useAuthStore();
    const [attendeesVisible, setAttendeesVisible] = useState(false);
    const startDate = new Date(event?.timings.start);
    const endDate = new Date(event?.timings.end);
    const startDay = formatDate(startDate.toString());
    const endDay = formatDate(endDate.toString());
    const startTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isSameDay = startDay === endDay;
    const handleMarkMe = () => {
        console.log("I marked me");
    };
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
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={event?.poster ? { uri: event?.poster } : "https://bside.vigneshvaranasi.in/Photos/Vintage%20Car.JPEG"}
                contentFit="cover"
            />
            <View style={styles.content}>
                <Text style={styles.eventName}>{event?.name}</Text>
                <Text style={styles.spaceName}>{event?.spaceId.name}</Text>
                <Pressable style={styles.markMeButton} onPress={handleMarkMe}>
                    <Text style={styles.markMeText}>Mark Me</Text>
                </Pressable>
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
                    event?.contactDetails.length > 0 &&
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
                event?.isManager && (
                    <View style={styles.content}>
                        {
                            event?.attendees.length >= 0 &&
                            <>
                                <Pressable onPress={() => setAttendeesVisible(!attendeesVisible)}>
                                    <Text style={styles.sectionTitle}>Attendees</Text>
                                </Pressable>
                                {
                                    attendeesVisible && (
                                        <View style={styles.row}>
                                            {event?.attendees.map((attendee, index) => (
                                                <Text key={index} style={styles.description}>{attendee.fullname}</Text>
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