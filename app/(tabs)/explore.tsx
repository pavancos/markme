import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TextInput,
  Keyboard,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useExploreStore } from "@/stores/exploreStore";
import debounce from "lodash/debounce";
import { useSheetStore } from "@/stores/sheetStore";
import EventItem from "@/components/EventItem";
import TextBox from "@/components/TextBox";
import { router } from "expo-router";

export default function ExploreScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { fetchAllEvents, events, spaces } = useExploreStore();
  const { openBottomSheet } = useSheetStore();

  useEffect(() => {
    setSearchQuery("");
    setDebouncedQuery("");
    fetchAllEvents().then(() => setLoading(false));
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAllEvents();
    setRefreshing(false);
  }, []);

  const handleSearch = useMemo(
    () =>
      debounce((query) => {
        setDebouncedQuery(query);
      }, 300),
    []
  );

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    Keyboard.dismiss();
  };

  const filteredEvents = useMemo(() => {
    const filteredEventList = events.filter((event: any) =>
      event.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    return [...filteredEventList];
  }, [debouncedQuery, events]);
  const filteredSpaces = useMemo(() => {
    const filteredSpaces = spaces.filter((space: any) =>
      space.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    return [...filteredSpaces];
  }, [debouncedQuery, spaces]);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
      }]}>
        <ActivityIndicator size="small" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search events or spaces..."
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={onChangeSearch}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          clearButtonMode="always"
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white" />}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.spaceWrapper}
        >
          {/* <View style={styles.spaceContainer}>
            <Image
              style={styles.spaceIcon}
              source={{ uri: 'https://picsum.photos/200' }}
            />
            <View style={styles.spaceNameWrap}>
              <TextBox style={styles.spaceName}>Xen Dev</TextBox>
            </View> 
            </View>*/
          }

          {
            filteredSpaces.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()).map((space: any, index: number) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    router.push(`/space/${space._id}`)
                  }}
                >
                  <View style={styles.spaceContainer} key={index}>
                    <Image
                      style={styles.spaceIcon}
                      source={{ uri: space.icon }}
                    />
                    <View style={styles.spaceNameWrap}>
                      <TextBox style={styles.spaceName}>{space.name}</TextBox>
                    </View>
                  </View>
                </Pressable>
              )
            })
          }
          {
            filteredSpaces.length === 0 && (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>No spaces found</Text>
              </View>
            )
          }
        </ScrollView>
        {filteredEvents.sort((a, b) =>
          new Date(a.timings.start).getTime() - new Date(b.timings.start).getTime()
        ).map((event: any, index) => (
          <EventItem key={index} onClick={() => {
            openBottomSheet(event)
          }} isPast={false} event={{ ...event }} />
        ))}
        {filteredEvents.length === 0 && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>No events found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 12,
    paddingStart: 12,
    paddingTop: 9,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    paddingHorizontal: 10
  },
  searchBar: {
    flex: 1,
    color: "white",
    padding: 10,
    fontSize: 16,
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  loadingText: {
    color: "white",
  },
  spaceWrapper: {
    marginVertical: 10,
    shadowColor: 'black',
  },
  spaceContainer: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
  },
  spaceIcon: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  spaceNameWrap: {
    backgroundColor: '#1e1e1e',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  spaceName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
});