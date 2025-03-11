import React, { useCallback, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Button, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useAuthStore } from '@/stores/authStore';

export default function ProfileScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();
  const { user } = useAuthStore();

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/auth/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profilecontainer}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={{ uri: "https://media.licdn.com/dms/image/sync/v2/D5627AQG48zfa8aNyMQ/articleshare-shrink_800/articleshare-shrink_800/0/1719855406372?e=2147483647&v=beta&t=MWCAoXFxJULiKlPHzh6T5k8xyWflYZGoadbYy3Bsrk8" }}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>Eswar Aditya</Text>
            <Text style={styles.username}>@eswaraditya</Text>
            <View style={styles.stats}>
              <Text style={styles.statText}>
                <Text style={styles.bold}>2</Text> Hosted
              </Text>
              <Text style={styles.statText}>
                <Text style={styles.bold}>4</Text> Attended
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    
  },
  text: {
    color: 'yellow',
    fontSize: 20,
  },
  contentContainer: {
    backgroundColor: '#1e1e1e',
  },
  profilecontainer: {
    backgroundColor: "#000000",
    flex: 1,
    padding: 16,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    gap: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  infoContainer: {
    justifyContent: "center",
  },
  name: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  username: {
    color: "#AAAAAA",
    fontSize: 14,
    marginVertical: 4,
  },
  stats: {
    flexDirection: "row",
    marginTop: 8,
  },
  statText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginRight: 16,
  },
  bold: {
    fontWeight: "bold",
  },
});