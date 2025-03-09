import { useSheetStore } from '@/stores/sheetStore';
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import EventPage from './EventPage';

const EventSheet = () => {
    const { isOpen, closeBottomSheet, selectedEvent } = useSheetStore();
    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        if (isOpen) {
            bottomSheetRef.current?.snapToIndex(0);
        } else {
            bottomSheetRef.current?.close();
        }
    }, [isOpen, selectedEvent]);

    const renderBackDrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                pressBehavior="close"
                appearsOnIndex={0}
                disappearsOnIndex={-1}
            />
        ),
        [closeBottomSheet]
    );

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={['88%']}
            enablePanDownToClose={true}
            animateOnMount={true}
            bottomInset={0}
            enableDynamicSizing={false}
            onChange={(index) => {
                if (index === -1) {
                    closeBottomSheet();
                }
            }}
            handleStyle={styles.handle}
            backgroundStyle={styles.background}
            handleIndicatorStyle={styles.indicator}
            backdropComponent={renderBackDrop}
        >
            <BottomSheetScrollView
                style={styles.contentContainer}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <EventPage event={selectedEvent} />
                </View>
            </BottomSheetScrollView>
        </BottomSheet>
    );
};

export default EventSheet;

const styles = StyleSheet.create({
    handle: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    background: {
        backgroundColor: '#1e1e1e',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    indicator: {
        backgroundColor: '#818181',
        width: 40,
    },
    contentContainer: {
        backgroundColor: '#1e1e1e',
    },
});
