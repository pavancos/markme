import BackNavigation from '@/components/svgs/BackNavigation'
import TextBox from '@/components/TextBox';
import { useProfileStore } from '@/stores/profileStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'
import { useEffect, useState } from 'react';
import { BackHandler, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Switch, TextInput } from 'react-native-gesture-handler';
import { AlbertSans_600SemiBold, useFonts } from "@expo-google-fonts/dev";
import { useHaptic } from '@/hook/useHaptic';
import { BE_URL } from '@/constants/config';
import { toast } from '@backpackapp-io/react-native-toast';

const settings = () => {
    const { profile, fetchProfile, setProfile } = useProfileStore();
    const haptic = useHaptic();
    const [name, setName] = useState(profile.name);
    const [profilePhoto, setProfilePhoto] = useState(profile.avatar);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(profile.notificationPreference);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        router.replace('/auth/login');
    };
    useEffect(() => {
        const backAction = () => {
            router.replace('/(tabs)/profile');
            return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);
    const [fontsLoaded] = useFonts({
        AlbertSans_600SemiBold,
    });


    async function updateFullName() {
        console.log(name);
        if (name === profile.name) {
            toast("Name is same as before")
            return;
        }
        let token = await AsyncStorage.getItem('token');
        if (!token) {
            toast("You are not logged in")
            return;
        }
        token = JSON.parse(token);
        const res = await fetch(`${BE_URL}/user/set/updateName`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                fullname: name
            })
        })
        if (res.ok) {
            toast("Name updated Successfully")
            fetchProfile(token!);
        }
        else {
            toast("Something went wrong")
        }
    }
    async function updateProfilePhoto() {
        if (profilePhoto === profile.avatar) {
            toast("Profile Photo is same as before")
            return;
        }
        let token = await AsyncStorage.getItem('token');
        if (!token) {
            toast("You are not logged in")
            return;
        }
        token = JSON.parse(token);
        const res = await fetch(`${BE_URL}/user/set/updateProfilePhoto`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                profilePhoto
            })
        })
        if (res.ok) {
            toast("Profile Photo updated Successfully")
            fetchProfile(token!);
        }
        else {
            toast("Something went wrong")
        }
    }
    const toggleSwitch = async () => {
        setIsNotificationsEnabled(prev => !prev);
        let token = await AsyncStorage.getItem('token');
        if (!token) {
            toast("You are not logged in")
            return;
        }
        token = JSON.parse(token);
        const res = await fetch(`${BE_URL}/user/set/notification`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                notification: !isNotificationsEnabled
            })
        })
        if (res.ok) {
            toast("You turned " + (isNotificationsEnabled ? "Off" : "On") + " Notifications")
            fetchProfile(token!);
        }
        else {
            toast("Something went wrong")
        }
    }

    return (
        <View style={styles.container}>
            <Pressable style={{ paddingLeft: 8, width: 20 }} onPress={() => router.replace('/(tabs)/profile')}>
                <BackNavigation />
            </Pressable>

            <View style={{ marginTop: 20 }}>
                <TextBox style={styles.label}>Change Name</TextBox>
                <TextInput
                    style={styles.input}
                    placeholder={profile.name}
                    defaultValue={profile.name}
                    onChangeText={setName}
                    returnKeyType='done'
                    onSubmitEditing={() => updateFullName()}
                />
                <TextBox style={styles.label}>Change Profile Photo</TextBox>
                <TextInput
                    style={styles.input}
                    placeholder="Paste your Image Link"
                    defaultValue={profile.avatar}
                    returnKeyType='done'
                    onChangeText={setProfilePhoto}
                    onSubmitEditing={() => updateProfilePhoto()}
                />

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 20,
                }}>
                    <TextBox style={[styles.label, {
                        marginTop: 0,
                        marginBottom: 0
                    }]}>Notifications</TextBox>
                    <Switch
                        onValueChange={toggleSwitch}
                        value={isNotificationsEnabled}
                    />
                </View>
            </View>
            <TouchableOpacity
                onPress={handleLogout} style={styles.logoutBtn}
                activeOpacity={0.8}
            >
                <TextBox style={styles.logoutText}>Logout</TextBox>
            </TouchableOpacity>
        </View>
    )
}
export default settings
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 16
    },
    text: {
        color: 'yellow',
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 20,
        marginTop: 20
    },
    input: {
        backgroundColor: "rgba(255,255,255,0.1)",
        color: "white",
        fontSize: 16,
        padding: 12,
        borderRadius: 10,
        borderBottomWidth: 2,
    },
    label: {
        color: "white",
        fontSize: 18,
        marginBottom: 5,
        marginTop: 15
    },
    logoutBtn: {
        borderColor: "#c5c5c6",
        padding: 12,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
        borderWidth: 1,
    },
    logoutText: {
        color: "white",
        fontSize: 18,
        fontFamily: "AlbertSans_600SemiBold"
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.1)",
        color: "white",
        fontSize: 16,
        borderRadius: 10,
        width: "100%",
        borderBottomWidth: 2,
    },
    passwordInput: {
        flex: 1,
        color: "white",
        fontSize: 16,
        // padding: 12,
    },
    eyeIcon: {
        marginHorizontal: 8,
    },

})