import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, RefreshControl, BackHandler, Pressable } from 'react-native';
import { SpaceType, useProfileStore } from '@/stores/profileStore';
import { useEffect, useState, useCallback } from 'react';
import { EventType, UserInEventType } from '@/stores/homeStore';
import { Image } from 'expo-image';
import BackNavigation from '@/components/svgs/BackNavigation';
import TextBox from '@/components/TextBox';
import { BE_URL } from '@/constants/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toast } from '@backpackapp-io/react-native-toast';
import EventItem from '@/components/EventItem';
import { useSheetStore } from '@/stores/sheetStore';
import { set } from 'lodash';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Space = () => {
  const { id } = useLocalSearchParams();
  const { profile, fetchProfile } = useProfileStore();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { openBottomSheet, openSpaceEditSheet } = useSheetStore();

  const [currentSpace, setCurrentSpace] = useState<SpaceType>({
    _id: "",
    name: "",
    icon: "",
    followers: [],
    admins: [],
    events: [],
    createdOn: new Date(),
  });

  const [isFollower, setIsFollower] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  const loadSpace = useCallback(async () => {
    if (profile) {
      const space = profile.managingSpaces.find(space => space._id === id);
      if (space) {
        setCurrentSpace(space);
        setIsFollower(space.followers.some((follower) => {
          return follower.username === profile.username;
        }));
        setIsAdmin(space.admins.some((admin) => {
          return admin.username === profile.username;
        }));
        console.log(isAdmin);
        setLoading(false);
      } else {
        let token = await AsyncStorage.getItem('token');
        if (!token || token === null) {
          router.replace('/auth/login');
          toast("You are not Logged In");
          return;
        }
        token = JSON.parse(token);
        const spaceFromRequest = await fetch(`${BE_URL}/space/get/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          }
        });
        console.log(spaceFromRequest.status);
        if (spaceFromRequest.ok) {
          const data = await spaceFromRequest.json();
          console.log('data: ', data);
          setCurrentSpace(data.payload.space);
          setIsFollower(data.payload.space.followers.some((follower: any) => {
            return follower.username === profile.username;
          }));
          setIsAdmin(data.payload.space.admins.some((admin: any) => {
            return admin.username === profile.username;
          }));
          setLoading(false);
          console.log("Hello from Space");
        }
      }
    }
  }, [id, profile, isAdmin]);

  useEffect(() => {
    console.log(isFollower);
  }, [isFollower]);

  useEffect(() => {
    if (profile) {
      loadSpace();
    }
    return () => {
      setLoading(true);
    };
  }, [id, profile]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadSpace();
    setRefreshing(false);
  }, [loadSpace]);

  useEffect(() => {
    const backAction = () => {
      router.replace('/(tabs)/profile');
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  const followSpace = async () => {
    console.log("Follow Space");
    let token = await AsyncStorage.getItem('token');
    if (!token || token === null) {
      toast("You are not Logged In");
      return;
    }
    token = JSON.parse(token);
    const res = await fetch(`${BE_URL}/user/space/follow`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        spaceId: currentSpace._id,
      }),
    });
    if (res.ok) {
      toast(`Followed ${currentSpace.name}`);
      await fetchProfile(token!)
      // .then(() => loadSpace());
    } else {
      toast("Something went wrong");
    }
  }

  const unfollowSpace = async () => {
    console.log("UnFollow Space");
    let token = await AsyncStorage.getItem('token');
    if (!token || token === null) {
      toast("You are not Logged In");
      return;
    }
    token = JSON.parse(token);
    const res = await fetch(`${BE_URL}/user/space/unfollow`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        spaceId: currentSpace._id,
      }),
    });
    if (res.ok) {
      toast(`UnFollowed ${currentSpace.name}`);
      fetchProfile(token!)
      // .then(() => loadSpace());
    } else {
      toast("Something went wrong");
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
      }}>
        <Pressable style={{ paddingLeft: 8, width: 20 }} onPress={() => router.replace('/(tabs)/profile')}>
          <BackNavigation />
        </Pressable>

        {
          isAdmin &&
          <Pressable style={{ paddingLeft: 8 }}
            onPress={() => {
              console.log("Edit Space");
              openSpaceEditSheet(currentSpace);
            }}>
            <MaterialCommunityIcons name="pencil" size={18} color="white" />
          </Pressable>
        }

      </View>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
      }}>
        <Image
          style={{
            width: 150,
            height: 150,
          }}
          source={{ uri: currentSpace.icon }}
        />
      </View>
      <View>
        <TextBox style={styles.spaceName}>{currentSpace.name}</TextBox>
      </View>
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        {
          !isFollower ? (
            <Pressable style={styles.followContainer} onPress={followSpace}>
              <TextBox style={styles.followText}>Follow</TextBox>
            </Pressable>
          ) : (
            <Pressable style={styles.unfollowContainer} onPress={unfollowSpace}>
              <TextBox style={styles.unfollowText}>UnFollow</TextBox>
            </Pressable>
          )
        }
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          {
            currentSpace.events.map((event) => {
              return (
                <EventItem onClick={() => {
                  openBottomSheet(event)
                }}
                  key={event._id} event={event} />
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  );
};

export default Space;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollViewContainer: {
    flexGrow: 1,
    borderRadius: 50
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  spaceName: {
    color: 'white',
    fontSize: 28,
    marginBottom: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  followContainer: {
    backgroundColor: '#FFE100',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 2,
    alignItems: 'center',
  },
  unfollowContainer: {
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 2,
    alignItems: 'center',
    borderColor: '#FFE100',
    borderWidth: 1,
  },
  followText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  unfollowText: {
    color: '#FFE100',
    fontSize: 18,
    fontWeight: '500',
  },
});