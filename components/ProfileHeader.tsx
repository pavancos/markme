import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Pressable } from 'react-native';
import TextBox from './TextBox';
import AppHeaderLogo from './svgs/AppHeaderLogo';
import ProfileSettings from './svgs/ProfileSettings';
import { router } from 'expo-router';

const ProfileHeader = () => {

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <View style={styles.headerHolder}>
                    <AppHeaderLogo />
                    <Pressable
                        style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                        onPress={() => router.push('/settings')}
                    >
                        <View
                        style={{paddingTop: 1}}
                        >
                            <ProfileSettings />
                        </View>
                        <TextBox style={styles.settingsTitle}>Settings</TextBox>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "black",
    },
    header: {
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 16,
        borderBottomWidth: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    settingsTitle: {
        color: '#999999',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Poppins_400Regular',
        marginRight: 5,
    },
    headerHolder: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    }
});

export default ProfileHeader;