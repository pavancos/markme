import { useSheetStore } from '@/stores/sheetStore';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EventSheet = () => {
    const { isOpen, openBottomSheet, closeBottomSheet, selectedEvent } = useSheetStore()
    const bottomSheetRef = useRef<BottomSheet>(null);
    useEffect(() => {
        if (isOpen) {
            bottomSheetRef.current?.expand();
        } else {
            bottomSheetRef.current?.close();
        }
    }, [isOpen, selectedEvent]);
    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={['90%']}
            enablePanDownToClose={true}
            // onClose={closeBottomSheet}
            // animateOnMount={true}
            enableDynamicSizing={true}
            onChange={(index) => {
                if (index === -1) {
                    // bottomSheetRef.current?.close();
                    closeBottomSheet();
                }
            }}
            handleStyle={{
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
            }}
            backgroundStyle={{
                backgroundColor: '#1e1e1e',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
            }}
            handleIndicatorStyle={{
                backgroundColor: '#818181',
                width: 40,
            }}
        >
            <BottomSheetScrollView style={styles.contentContainer}>
                <Text style={styles.text}>{selectedEvent?.name}</Text>
                <Text style={styles.text}>{selectedEvent?.attendeesCount}</Text>
            </BottomSheetScrollView>
        </BottomSheet>
    )
}
export default EventSheet
const styles = StyleSheet.create({
    text: {
        color: 'yellow',
        fontSize: 20,
    },
    contentContainer: {
        backgroundColor: '#1e1e1e',
    },
});
