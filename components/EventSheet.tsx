import { useSheetStore } from '@/stores/sheetStore';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EventPage from './EventPage';

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
            snapPoints={['100%']}
            enablePanDownToClose={true}
            // onClose={closeBottomSheet}
            // animateOnMount={true}
            detached={true}
            enableDynamicSizing={true}
            bottomInset={0}
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
            <BottomSheetScrollView style={styles.contentContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <EventPage
                    event={selectedEvent}
                />
            </BottomSheetScrollView>
        </BottomSheet>
    )
}
export default EventSheet;



const styles = StyleSheet.create({
    text: {
        color: 'yellow',
        fontSize: 20,
    },
    contentContainer: {
        backgroundColor: '#1e1e1e',
    },
});
