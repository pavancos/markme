// import { StyleSheet, Text, View } from 'react-native'

// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
// import { useCallback, useRef } from 'react';
// const EventSheet = () => {
//     // ref
//     const bottomSheetRef = useRef<BottomSheet>(null);

//     // callbacks
//     const handleSheetChanges = useCallback((index: number) => {
//         console.log('handleSheetChanges', index);
//     }, []);

//     // Function to open the bottom sheet
//     const handleOpenBottomSheet = () => {
//         bottomSheetRef.current?.snapToIndex(0);
//     };
//     return (
//         <GestureHandlerRootView style={styles.container}>
//             {/* Bottom Sheet */}
//             <BottomSheet
//                 ref={bottomSheetRef}
//                 index={-1} // Initially hidden
//                 snapPoints={['40%', '80%']} // Customize heights
//                 onChange={handleSheetChanges}
//             >
//                 <BottomSheetView style={{ backgroundColor: '#1e1e1e', padding: 20 }}>
//                     <Text style={{ color: 'white', fontSize: 16 }}>Awesome 🎉</Text>
//                 </BottomSheetView>
//             </BottomSheet>
//         </GestureHandlerRootView>

//     )
// }
// export default EventSheet
// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#1e1e1e",
//         width: '100%',
//         borderRadius: 10,
//         marginBottom: 15,
//         overflow: 'hidden',
//     }
// // });
// import { StyleSheet, Text, View } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

// const EventSheet = ({ bottomSheetRef }: { bottomSheetRef: React.RefObject<BottomSheet> }) => {
//     return (
//         <GestureHandlerRootView style={styles.container}>
//             <BottomSheet
//                 ref={bottomSheetRef}
//                 index={-1} // Initially hidden
//                 snapPoints={['40%', '80%']} // Customize heights
//             >
//                 <BottomSheetView style={{ backgroundColor: '#1e1e1e', padding: 20 }}>
//                     <Text style={{ color: 'white', fontSize: 16 }}>Awesome 🎉</Text>
//                 </BottomSheetView>
//             </BottomSheet>
//         </GestureHandlerRootView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
// });

// export default EventSheet;


import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';

const EventSheet = ({ bottomSheetRef }: { bottomSheetRef: React.RefObject<BottomSheet> }) => {
    return (
        <GestureHandlerRootView style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                index={-1} // Initially hidden
                snapPoints={['40%', '80%']} // Customize heights
                enablePanDownToClose={true} // Allow closing
            >
                <BottomSheetView style={{ backgroundColor: '#1e1e1e', padding: 20 }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>Awesome 🎉</Text>
                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default EventSheet;
