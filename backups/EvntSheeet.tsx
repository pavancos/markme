import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';

const Event = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const openSheet = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.expand();
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Pressable onPress={openSheet} style={styles.container}>
                <Text>Open Bottom Sheet</Text>
            </Pressable>

            <EventSheet bottomSheetRef={bottomSheetRef} />
        </GestureHandlerRootView>
    );
};

const EventSheet = ({ bottomSheetRef }: { bottomSheetRef: React.RefObject<BottomSheet> }) => {
    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={['40%', '80%']}
            enablePanDownToClose={true}
        >
            <View style={{ backgroundColor: '#1e1e1e', padding: 20 }}>
                <Text style={{ color: 'white', fontSize: 16 }}>Awesome 🎉</Text>
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Event;