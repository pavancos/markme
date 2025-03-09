import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';
import LocationPin from './svgs/LocationPin';
import PersonGroup from './svgs/PersonGroup';
export function Event({ event, isPast, onClick }: any) {
    return (
        <Pressable onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source="https://bside.vigneshvaranasi.in/Photos/Vintage%20Car.JPEG"
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
                                <Pressable style={styles.markmeButton}>
                                    <Text style={styles.markmeText}>Markme</Text>
                                </Pressable>
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
