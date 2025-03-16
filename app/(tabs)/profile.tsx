import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useProfileStore } from '@/stores/profileStore';
import TextBox from '@/components/TextBox';
import SpaceItem from '@/components/SpaceItem';

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, fetchProfile } = useProfileStore();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const token = await AsyncStorage.getItem('token');
    if (token) {
      await fetchProfile(JSON.parse(token));
    }
    setRefreshing(false);
  }, [fetchProfile]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/auth/login');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.profilecontainer}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={{ uri: (profile.avatar && profile.avatar!=="")? profile.avatar :"https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg" }}
              />
            </View>
            <View style={styles.infoContainer}>
              <TextBox style={styles.name}>{profile.name}</TextBox>
              <TextBox style={styles.username}>@{profile.username}</TextBox>
              <View style={styles.stats}>
                <TextBox style={styles.statText}>
                  <TextBox style={styles.bold}>{profile.managingEvents.length}</TextBox> Hosted
                </TextBox>
                <TextBox style={styles.statText}>
                  <TextBox style={styles.bold}>{profile.registeredEvents.length}</TextBox> Attended
                </TextBox>
                <TextBox style={styles.statText}>
                  <TextBox style={styles.bold}>{profile.followingSpaces.length}</TextBox> Following
                </TextBox>
              </View>
            </View>
          </View>

          <View style={styles.profileSection}>
            <TextBox style={{
              color: "#FFFFFF",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 18,
            }}>Managing Spaces</TextBox>
          </View>
          {
            profile.managingSpaces.map((space: any) => {
              return (
                <SpaceItem key={space._id} space={space}/>
              )
            })
          }
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
  },
  text: {
    color: 'yellow',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
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
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    objectFit: "cover",
  },
  infoContainer: {
    justifyContent: "center",
  },
  name: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  username: {
    color: "#AAAAAA",
    fontSize: 15,
    marginVertical: 4,
  },
  stats: {
    flexDirection: "row",
    marginTop: 8,
  },
  statText: {
    color: "#FFFFFF",
    fontSize: 15,
    marginRight: 16,
  },
  bold: {
    fontWeight: "bold",
  },
});