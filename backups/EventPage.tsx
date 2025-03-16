import { StyleSheet, Text, View } from 'react-native';
import { EventType } from '@/stores/homeStore';
import { Image } from 'expo-image';
import { formatDate } from '@/utils/dateUtils';

interface EventPageProps {
    event: EventType;
}

const EventPage = ({ event }: EventPageProps) => {
    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    const startDate = new Date(event?.timings.start);
    const endDate = new Date(event?.timings.end);
    const startDay = formatDate(startDate.toString());
    const endDay = formatDate(endDate.toString());
    const startTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isSameDay = startDay === endDay;
    return (
        <View style={styles.eventContainer}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={
                        event?.poster && event?.poster !== "" ?
                            { uri: event?.poster } :
                            "event"
                    }
                    contentFit="cover"
                    placeholder={{blurhash}}
                />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.spaceName}>{event?.spaceId.name}</Text>
                <Text
                    style={styles.eventName}
                >{event?.name}</Text>
                <Text style={styles.spaceName}>About Event</Text>
                <Text
                    style={styles.eventDescription}
                >{event?.description}</Text>
                <Text style={styles.spaceName}>Timings</Text>
                <Text
                    style={styles.eventDescription}
                >{isSameDay? startDay : `${startDay} - ${endDay}`}</Text>
                <Text
                    style={styles.eventDescription}
                >{startTime} - {endTime}</Text>
                <Text style={styles.spaceName}>Location</Text>
                <Text
                    style={styles.eventDescription}
                >{event?.venue.name}</Text>
                {
                    event?.capacity && event?.capacity > 0 && event?.capacity !== 9007199254740991 &&
                    <Text style={styles.spaceName}>Capacity - {event.capacity}</Text>
                }
                {
                    
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    eventContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 20,
    },
    imageContainer: {
        width: '100%',
        height: 250,
        boxShadow: '0px 0px 30px rgba(65, 65, 65, 0.16)',
        borderRadius: 10,
    },
    detailsContainer: {
        marginTop: 15,
        width: '100%',
        alignItems: 'flex-start',
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 10,
    },
    spaceName: {
        fontSize: 16,
        color: 'gray',
        marginTop: 10,
    },
    eventName: {
        fontSize: 24,
        color: 'white',
        marginTop: 10,
        fontWeight: 'bold',
    },
    eventDescription: {
        fontSize: 15,
        color: 'white',
        marginTop: 2,
    },
})