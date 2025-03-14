// import { router, useLocalSearchParams } from 'expo-router';
// import { ActivityIndicator, StyleSheet, Text, View, ScrollView, RefreshControl, BackHandler, Pressable } from 'react-native';
// import { SpaceType, useProfileStore } from '@/stores/profileStore';
// import { useEffect, useState, useCallback } from 'react';
// import { EventType, UserInEventType } from '@/stores/homeStore';
// import { Image } from 'expo-image';
// import BackNavigation from '@/components/svgs/BackNavigation';
// import TextBox from '@/components/TextBox';
// import { BE_URL } from '@/constants/config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { toast } from '@backpackapp-io/react-native-toast';
// import EventItem from '@/components/EventItem';
// import { useSheetStore } from '@/stores/sheetStore';

// const Space = () => {
//   const { id } = useLocalSearchParams();
//   const { profile, fetchProfile } = useProfileStore();
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const { openBottomSheet } = useSheetStore();

//   const [currentSpace, setCurrentSpace] = useState<SpaceType>({
//     _id: "",
//     name: "",
//     icon: "",
//     followers: [],
//     admins: [],
//     events: [],
//     createdOn: new Date(),
//   });

//   const [isFollower, setIsFollower] = useState(false);

//   const loadSpace = useCallback(() => {
//     if (profile) {
//       const space = profile.managingSpaces.find(space => space._id === id);
//       if (space) {
//         setCurrentSpace(space);
//         setIsFollower(space.followers.some((follower) => {
//           return follower.username === profile.username;
//         }));
//         setLoading(false);
//       }
//     }
//   }, [id, profile]);

//   useEffect(() => {
//     console.log(isFollower);
//   }, [isFollower]);

//   useEffect(() => {
//     if (profile) {
//       loadSpace();
//     }
//     return () => {
//       setLoading(true);
//     };
//   }, [id, profile]);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     loadSpace();
//     setRefreshing(false);
//   }, [loadSpace]);

//   useEffect(() => {
//     const backAction = () => {
//       router.replace('/(tabs)/profile');
//       return true;
//     };
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
//     return () => backHandler.remove();
//   }, []);

//   const followSpace = async () => {
//     console.log("Follow Space");
//     let token = await AsyncStorage.getItem('token');
//     if (!token || token === null) {
//       toast("You are not Logged In");
//       return;
//     }
//     token = JSON.parse(token);
//     const res = await fetch(`${BE_URL}/user/space/follow`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         spaceId: currentSpace._id,
//       }),
//     });
//     if (res.ok) {
//       toast(`Followed ${currentSpace.name}`);
//       await fetchProfile(token!)
//         // .then(() => loadSpace());
//     } else {
//       toast("Something went wrong");
//     }
//   }

//   const unfollowSpace = async () => {
//     console.log("UnFollow Space");
//     let token = await AsyncStorage.getItem('token');
//     if (!token || token === null) {
//       toast("You are not Logged In");
//       return;
//     }
//     token = JSON.parse(token);
//     const res = await fetch(`${BE_URL}/user/space/unfollow`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         spaceId: currentSpace._id,
//       }),
//     });
//     if (res.ok) {
//       toast(`UnFollowed ${currentSpace.name}`);
//       fetchProfile(token!)
//         // .then(() => loadSpace());
//     } else {
//       toast("Something went wrong");
//     }
//   }

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="small" color="white" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Pressable style={{ paddingLeft: 8, width: 20 }} onPress={() => router.replace('/(tabs)/profile')}>
//         <BackNavigation />
//       </Pressable>
//       <View style={{
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginBottom: 8,
//       }}>
//         <Image
//           style={{
//             width: 150,
//             height: 150,
//           }}
//           source={{ uri: currentSpace.icon }}
//         />
//       </View>
//       <View>
//         <TextBox style={styles.spaceName}>{currentSpace.name}</TextBox>
//       </View>
//       <View style={{ alignItems: 'center' }}>
//         {
//           !isFollower ? (
//             <Pressable style={styles.followContainer} onPress={followSpace}>
//               <TextBox style={styles.followText}>Follow</TextBox>
//             </Pressable>
//           ) : (
//             <Pressable style={styles.unfollowContainer} onPress={unfollowSpace}>
//               <TextBox style={styles.unfollowText}>UnFollow</TextBox>
//             </Pressable>
//           )
//         }
//       </View>
//       <ScrollView
//         contentContainerStyle={[styles.container,{
//           paddingTop: 20,
//           flexGrow: 1,
//         }]}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         showsVerticalScrollIndicator={false}
//         showsHorizontalScrollIndicator={false}
//       >
//         {
//           currentSpace.events.map((event)=>{
//             return (
//               <EventItem onClick={() => {
//                 openBottomSheet(event)
//               }}
//                key={event._id} event={event} />
//             )
//           })
//         }
//       </ScrollView>
//     </View>
//   );
// };

// export default Space;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'black',
//     flex: 1,
//     paddingHorizontal: 10,
//   },
//   text: {
//     color: 'white',
//     fontSize: 20,
//     textAlign: 'center',
//   },
//   spaceName: {
//     color: 'white',
//     fontSize: 28,
//     marginBottom: 10,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   followContainer: {
//     backgroundColor: '#FFE100',
//     borderRadius: 15,
//     paddingHorizontal: 20,
//     paddingVertical: 2,
//     alignItems: 'center',
//   },
//   unfollowContainer: {
//     borderRadius: 15,
//     paddingHorizontal: 20,
//     paddingVertical: 2,
//     alignItems: 'center',
//     borderColor: '#FFE100',
//     borderWidth: 1,
//   },
//   followText: {
//     color: 'black',
//     fontSize: 18,
//     fontWeight: '500',
//   },
//   unfollowText: {
//     color: '#FFE100',
//     fontSize: 18,
//     fontWeight: '500',
//   },
// });



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

const Space = () => {
  const { id } = useLocalSearchParams();
  const { profile, fetchProfile } = useProfileStore();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { openBottomSheet } = useSheetStore();

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

  const loadSpace = useCallback(() => {
    if (profile) {
      const space = profile.managingSpaces.find(space => space._id === id);
      if (space) {
        setCurrentSpace(space);
        setIsFollower(space.followers.some((follower) => {
          return follower.username === profile.username;
        }));
        setLoading(false);
      }
    }
  }, [id, profile]);

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
      <Pressable style={{ paddingLeft: 8, width: 20 }} onPress={() => router.replace('/(tabs)/profile')}>
        <BackNavigation />
      </Pressable>
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