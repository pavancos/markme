// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   RefreshControl,
//   TextInput,
//   Keyboard,
//   TouchableWithoutFeedback,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
// } from "react-native";
// import { useEffect, useState, useCallback, useMemo } from "react";
// import { useExploreStore } from "@/stores/exploreStore";
// import { Event } from "@/components/Event";
// import { formatDate } from "@/utils/dateUtils";
// import debounce from "lodash/debounce";

// export default function ExploreScreen() {
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedQuery, setDebouncedQuery] = useState("");
//   const { fetchAllEvents, events } = useExploreStore();

//   useEffect(() => {
//     setSearchQuery("");
//     setDebouncedQuery("");
//     fetchAllEvents().then(() => setLoading(false));
//   }, []);

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await fetchAllEvents();
//     setRefreshing(false);
//   }, []);

//   const handleSearch = useMemo(
//     () =>
//       debounce((query) => {
//         setDebouncedQuery(query);
//       }, 300),
//     []
//   );

//   const onChangeSearch = (query: string) => {
//     setSearchQuery(query);
//     handleSearch(query);
//   };

//   const filteredEvents = useMemo(
//     () =>
//       events.filter((event: any) =>
//         event.name.toLowerCase().includes(debouncedQuery.toLowerCase())
//       ),
//     [debouncedQuery, events]
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.container}
//       >
//         <View style={styles.searchContainer}>
//           <TextInput
//             style={styles.searchBar}
//             placeholder="Search events..."
//             placeholderTextColor="gray"
//             value={searchQuery}
//             onChangeText={onChangeSearch}
//             returnKeyType="done"
//             onSubmitEditing={Keyboard.dismiss}
//           />
//           {searchQuery.length > 0 && (
//             <TouchableOpacity
//               onPress={() => {
//                 setSearchQuery("");
//                 setDebouncedQuery("");
//                 Keyboard.dismiss();
//               }}
//               style={styles.closeButton}
//             >
//               <Text style={styles.closeButtonText}>✕</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white" />}
//         >
//           {filteredEvents.map((event: any, index) => (
//             <Event key={index} isPast={false} event={{ ...event, date: formatDate(event?.timings?.start) }} />
//           ))}
//           {filteredEvents.length === 0 && (
//             <View style={styles.loadingContainer}>
//               <Text style={styles.loadingText}>No events found</Text>
//             </View>
//           )}
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "black",
//     paddingHorizontal: 12,
//     paddingStart: 12,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#1E1E1E",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 12,
//   },
//   searchBar: {
//     flex: 1,
//     color: "white",
//     padding: 10,
//     fontSize: 16,
//   },
//   closeButton: {
//     padding: 10,
//   },
//   closeButtonText: {
//     color: "white",
//     fontSize: 18,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "black",
//   }, 
//   loadingText: {
//     color: "white",
//   },
// });


import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useExploreStore } from "@/stores/exploreStore";
import { Event } from "@/components/Event";
import { formatDate } from "@/utils/dateUtils";
import debounce from "lodash/debounce";

export default function ExploreScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { fetchAllEvents, events } = useExploreStore();

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

  const filteredEvents = useMemo(
    () =>
      events.filter((event: any) =>
        event.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      ),
    [debouncedQuery, events]
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search events..."
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={onChangeSearch}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white" />}
      >
        {filteredEvents.map((event: any, index) => (
          <Event key={index} isPast={false} event={{ ...event, date: formatDate(event?.timings?.start) }} />
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
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
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
});