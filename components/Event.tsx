// import { View, Text, StyleSheet, Pressable } from 'react-native';
// import { Image } from 'expo-image';
// import React, { useCallback, useRef } from 'react';
// import LocationPin from './svgs/LocationPin';
// import PersonGroup from './svgs/PersonGroup';

// export function Event({ event, isPast }: any) {
//     const [isSheetOpen, setIsSheetOpen] = React.useState(false);
//     const sheetRef = useRef(null);
//     return (
//         <Pressable onPress={() => setIsSheetOpen(true)} style={styles.container}>
//             <View style={styles.imageContainer}>
//                 <Image
//                     style={styles.image}
//                     source="https://bside.vigneshvaranasi.in/Photos/Vintage%20Car.JPEG"
//                     contentFit="cover"
//                 />
//                 <View style={styles.overlay}>
//                     <Text style={styles.date}>{event?.date}</Text>
//                     {
//                         event?.status === "Live" && (
//                             <Text style={styles.status}>Live</Text>
//                         )
//                     }
//                 </View>
//             </View>

//             <View style={styles.textContainer}>
//                 <Text style={styles.eventName}>{event?.name}</Text>
//                 <Text style={styles.spaceName}>{event?.space?.name}</Text>
//                 <View style={styles.otherDetails}>
//                     <View style={styles.details}>
//                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                             <LocationPin />
//                             <Text style={{ paddingLeft: 5, color: "#999" }} >{event?.venue}</Text>
//                         </View>
//                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                             <PersonGroup />
//                             <Text style={{ paddingLeft: 5, color: "#999" }} >{event?.attendeesCount}</Text>
//                         </View>
//                     </View>
//                     {
//                         !isPast && (
//                             <Pressable style={styles.markmeButton}>
//                                 <Text style={styles.markmeText}>Markme</Text>
//                             </Pressable>
//                         )
//                     }
//                 </View>
//             </View>
//         </Pressable>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#1e1e1e",
//         width: '100%',
//         borderRadius: 10,
//         marginBottom: 15,
//         overflow: 'hidden',
//     },
//     imageContainer: {
//         position: 'relative',
//         width: '100%',
//         height: 150,
//     },
//     image: {
//         width: '100%',
//         height: '100%',
//     },
//     overlay: {
//         position: 'absolute',
//         top: 10,
//         left: 10,
//         right: 10,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     date: {
//         backgroundColor: '#e3e3e3',
//         paddingHorizontal: 15,
//         paddingVertical: 5,
//         borderRadius: 20,
//         color: '#000',
//         fontSize: 14,
//         fontWeight: '600',
//     },
//     status: {
//         backgroundColor: '#ff3c3c',
//         paddingHorizontal: 15,
//         paddingVertical: 5,
//         borderRadius: 20,
//         color: '#fff',
//         fontSize: 14,
//         fontWeight: '600',
//     },
//     textContainer: {
//         padding: 12,
//     },
//     eventName: {
//         color: '#fff',
//         fontSize: 20,
//         fontWeight: '500',
//     },
//     spaceName: {
//         color: '#999',
//         fontSize: 16,
//         marginTop: 5,
//     },
//     details: {
//         flexDirection: 'row',
//         marginTop: 8,
//         gap: 10,
//     },
//     otherDetails: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         gap: 10,
//     },
//     markmeButton: {
//         marginTop: 10,
//         alignSelf: 'flex-start',
//     },
//     markmeText: {
//         backgroundColor: '#ffe93f',
//         paddingHorizontal: 15,
//         paddingVertical: 8,
//         borderRadius: 20,
//         color: '#000',
//         fontSize: 15,
//         fontWeight: '600',
//     },
// });

// import { View, Text, StyleSheet, Pressable } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { Image } from 'expo-image';
// import React, { useRef } from 'react';
// import BottomSheet from '@gorhom/bottom-sheet';
// import LocationPin from './svgs/LocationPin';
// import PersonGroup from './svgs/PersonGroup';
// import EventSheet from './EventSheet';

// export function Event({ event, isPast }: any) {
//     const bottomSheetRef = useRef<BottomSheet>(null);

//     const openSheet = () => {
//         if (bottomSheetRef.current) {
//             bottomSheetRef.current.expand();  // Use expand() instead of snapToIndex
//         }
//     };

//     return (
//         <GestureHandlerRootView style={{ flex: 1 }}>
//             <Pressable onPress={openSheet} style={styles.container}>
//                 <View style={styles.imageContainer}>
//                     <Image
//                         style={styles.image}
//                         source="https://bside.vigneshvaranasi.in/Photos/Vintage%20Car.JPEG"
//                         contentFit="cover"
//                     />
//                     <View style={styles.overlay}>
//                         <Text style={styles.date}>{event?.date}</Text>
//                         {event?.status === "Live" && <Text style={styles.status}>Live</Text>}
//                     </View>
//                 </View>

//                 <View style={styles.textContainer}>
//                     <Text style={styles.eventName}>{event?.name}</Text>
//                     <Text style={styles.spaceName}>{event?.space?.name}</Text>
//                     <View style={styles.otherDetails}>
//                         <View style={styles.details}>
//                             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                 <LocationPin />
//                                 <Text style={styles.detailText}>{event?.venue}</Text>
//                             </View>
//                             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                 <PersonGroup />
//                                 <Text style={styles.detailText}>{event?.attendeesCount}</Text>
//                             </View>
//                         </View>
//                         {!isPast && (
//                             <Pressable style={styles.markmeButton}>
//                                 <Text style={styles.markmeText}>Markme</Text>
//                             </Pressable>
//                         )}
//                     </View>
//                 </View>
//             </Pressable>

//             {/* Event Bottom Sheet */}
//             <EventSheet bottomSheetRef={bottomSheetRef} />
//         </GestureHandlerRootView>
//     );
// }


// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#1e1e1e",
//         borderRadius: 10,
//         marginBottom: 15,
//         overflow: 'hidden',
//     },
//     imageContainer: {
//         position: 'relative',
//         width: '100%',
//         height: 150,
//     },
//     image: {
//         width: '100%',
//         height: '100%',
//     },
//     overlay: {
//         position: 'absolute',
//         top: 10,
//         left: 10,
//         right: 10,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     date: {
//         backgroundColor: '#e3e3e3',
//         paddingHorizontal: 15,
//         paddingVertical: 5,
//         borderRadius: 20,
//         color: '#000',
//         fontSize: 14,
//         fontWeight: '600',
//     },
//     status: {
//         backgroundColor: '#ff3c3c',
//         paddingHorizontal: 15,
//         paddingVertical: 5,
//         borderRadius: 20,
//         color: '#fff',
//         fontSize: 14,
//         fontWeight: '600',
//     },
//     textContainer: {
//         padding: 12,
//     },
//     eventName: {
//         color: '#fff',
//         fontSize: 20,
//         fontWeight: '500',
//     },
//     spaceName: {
//         color: '#999',
//         fontSize: 16,
//         marginTop: 5,
//     },
//     details: {
//         flexDirection: 'row',
//         marginTop: 8,
//         gap: 10,
//     },
//     otherDetails: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         gap: 10,
//     },
//     detailText: {
//         paddingLeft: 5,
//         color: "#999",
//     },
//     markmeButton: {
//         marginTop: 10,
//         alignSelf: 'flex-start',
//     },
//     markmeText: {
//         backgroundColor: '#ffe93f',
//         paddingHorizontal: 15,
//         paddingVertical: 8,
//         borderRadius: 20,
//         color: '#000',
//         fontSize: 15,
//         fontWeight: '600',
//     },
// });


// import { View, Text, StyleSheet, Pressable } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { Image } from 'expo-image';
// import React, { useRef, useMemo } from 'react';
// import BottomSheet from '@gorhom/bottom-sheet';
// import LocationPin from './svgs/LocationPin';
// import PersonGroup from './svgs/PersonGroup';

// export function Event({ event, isPast }: any) {
//     const bottomSheetRef = useRef<BottomSheet>(null);
//     const snapPoints = useMemo(() => ['40%', '75%'], []);


//     const openSheet = () => {
//         if (bottomSheetRef.current) {
//             bottomSheetRef.current.expand();
//         }
//     };


//     return (
//         <GestureHandlerRootView style={{ flex: 1 }}>
//             <Pressable onPress={openSheet} style={styles.container}>
//                 <View style={styles.imageContainer}>
//                     <Image
//                         style={styles.image}
//                         source="https://bside.vigneshvaranasi.in/Photos/Vintage%20Car.JPEG"
//                         contentFit="cover"
//                     />
//                     <View style={styles.overlay}>
//                         <Text style={styles.date}>{event?.date}</Text>
//                         {event?.status === "Live" && <Text style={styles.status}>Live</Text>}
//                     </View>
//                 </View>

//                 <View style={styles.textContainer}>
//                     <Text style={styles.eventName}>{event?.name}</Text>
//                     <Text style={styles.spaceName}>{event?.space?.name}</Text>
//                     <View style={styles.otherDetails}>
//                         <View style={styles.details}>
//                             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                 <LocationPin />
//                                 <Text style={styles.detailText}>{event?.venue}</Text>
//                             </View>
//                             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                 <PersonGroup />
//                                 <Text style={styles.detailText}>{event?.attendeesCount}</Text>
//                             </View>
//                         </View>
//                         {!isPast && (
//                             <Pressable style={styles.markmeButton}>
//                                 <Text style={styles.markmeText}>Markme</Text>
//                             </Pressable>
//                         )}
//                     </View>
//                 </View>
//             </Pressable>
//         </GestureHandlerRootView>
//     );
// }

// const EventSheet = ({ bottomSheetRef }: { bottomSheetRef: React.RefObject<BottomSheet> }) => {
//     return (
//         <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={['40%', '75%']} enablePanDownToClose={true}>
//             <View style={styles.sheetContent}>
//                 <Text style={styles.sheetTitle}>Event Name</Text>
//                 <Text style={styles.sheetDescription}>Event Description</Text>
//             </View>
//         </BottomSheet>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#1e1e1e",
//         borderRadius: 10,
//         marginBottom: 15,
//         overflow: 'hidden',
//     },
//     imageContainer: {
//         position: 'relative',
//         width: '100%',
//         height: 150,
//     },
//     image: {
//         width: '100%',
//         height: '100%',
//     },
//     overlay: {
//         position: 'absolute',
//         top: 10,
//         left: 10,
//         right: 10,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     date: {
//         backgroundColor: '#e3e3e3',
//         paddingHorizontal: 15,
//         paddingVertical: 5,
//         borderRadius: 20,
//         color: '#000',
//         fontSize: 14,
//         fontWeight: '600',
//     },
//     status: {
//         backgroundColor: '#ff3c3c',
//         paddingHorizontal: 15,
//         paddingVertical: 5,
//         borderRadius: 20,
//         color: '#fff',
//         fontSize: 14,
//         fontWeight: '600',
//     },
//     textContainer: {
//         padding: 12,
//     },
//     eventName: {
//         color: '#fff',
//         fontSize: 20,
//         fontWeight: '500',
//     },
//     spaceName: {
//         color: '#999',
//         fontSize: 16,
//         marginTop: 5,
//     },
//     details: {
//         flexDirection: 'row',
//         marginTop: 8,
//         gap: 10,
//     },
//     otherDetails: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         gap: 10,
//     },
//     detailText: {
//         paddingLeft: 5,
//         color: "#999",
//     },
//     markmeButton: {
//         marginTop: 10,
//         alignSelf: 'flex-start',
//     },
//     markmeText: {
//         backgroundColor: '#ffe93f',
//         paddingHorizontal: 15,
//         paddingVertical: 8,
//         borderRadius: 20,
//         color: '#000',
//         fontSize: 15,
//         fontWeight: '600',
//     },
//     sheetContent: {
//         padding: 20,
//     },
//     sheetTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     sheetDescription: {
//         fontSize: 14,
//         color: "#666",
//     },
// });


import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import LocationPin from './svgs/LocationPin';
import PersonGroup from './svgs/PersonGroup';
import { useBottomSheetStore } from '@/stores/bottomSheetStore';

export function Event({ event, isPast }: any) {
  const { openSheet } = useBottomSheetStore();

  return (
    <Pressable onPress={() => openSheet(event)} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source="https://bside.vigneshvaranasi.in/Photos/Vintage%20Car.JPEG"
          contentFit="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.date}>{event?.date}</Text>
          {event?.status === "Live" && <Text style={styles.status}>Live</Text>}
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.eventName}>{event?.name}</Text>
        <Text style={styles.spaceName}>{event?.space?.name}</Text>
        <View style={styles.otherDetails}>
          <View style={styles.details}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <LocationPin />
              <Text style={styles.detailText}>{event?.venue}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <PersonGroup />
              <Text style={styles.detailText}>{event?.attendeesCount}</Text>
            </View>
          </View>
          {!isPast && (
            <Pressable style={styles.markmeButton}>
              <Text style={styles.markmeText}>Markme</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1e1e1e",
        borderRadius: 10,
        marginBottom: 15,
        overflow: "hidden",
    },
    imageContainer: {
        position: "relative",
        width: "100%",
        height: 150,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: "absolute",
        top: 10,
        left: 10,
        right: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    date: {
        backgroundColor: "#e3e3e3",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        color: "#000",
        fontSize: 14,
        fontWeight: "600",
    },
    status: {
        backgroundColor: "#ff3c3c",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
    textContainer: {
        padding: 12,
    },
    eventName: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "500",
    },
    spaceName: {
        color: "#999",
        fontSize: 16,
        marginTop: 5,
    },
    details: {
        flexDirection: "row",
        marginTop: 8,
        gap: 10,
    },
    otherDetails: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    detailText: {
        paddingLeft: 5,
        color: "#999",
    },
    markmeButton: {
        marginTop: 10,
        alignSelf: "flex-start",
    },
    markmeText: {
        backgroundColor: "#ffe93f",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        color: "#000",
        fontSize: 15,
        fontWeight: "600",
    },
});

