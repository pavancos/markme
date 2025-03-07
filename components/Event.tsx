import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';
import LocationPin from './svgs/LocationPin';
import PersonGroup from './svgs/PersonGroup';
export function Event() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source="https://bside.vigneshvaranasi.in/Photos/Vintage%20Car.JPEG"
                    contentFit="cover"
                />
                <View style={styles.overlay}>
                    <Text style={styles.date}>15th, March</Text>
                    <Text style={styles.status}>Upcoming</Text>
                </View>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.eventName}>Event Name</Text>
                <Text style={styles.spaceName}>Space Name</Text>
                <View style={styles.otherDetails}>
                    <View style={styles.details}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <LocationPin />
                            <Text style={{ paddingLeft: 5,color:"#999"}} >Location</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <PersonGroup />
                            <Text style={{ paddingLeft: 5,color:"#999"}} >100</Text>
                        </View>
                    </View>
                    <Pressable style={styles.markmeButton}>
                        <Text style={styles.markmeText}>Markme</Text>
                    </Pressable>
                </View>
            </View>
        </View>
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
        backgroundColor: '#999999',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        color: '#000',
        fontSize: 14,
        fontWeight: '600',
    },
    status: {
        backgroundColor: '#aa8dd8',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        color: '#000',
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
