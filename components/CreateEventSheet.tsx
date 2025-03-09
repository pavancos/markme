import { useSheetStore } from '@/stores/sheetStore';
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

const CreateEventSheet = () => {
    const { isCreateEventOpen, closeCreateEventSheet } = useSheetStore();
    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        if (isCreateEventOpen) {
            bottomSheetRef.current?.snapToIndex(0);
        } else {
            bottomSheetRef.current?.close();
        }
    }, [isCreateEventOpen]);

    const renderBackDrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                pressBehavior="close"
                appearsOnIndex={0}
                disappearsOnIndex={-1}
            />
        ),
        [closeCreateEventSheet]
    );

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={['40%']}
            enablePanDownToClose={true}
            animateOnMount={true}
            bottomInset={0}
            enableDynamicSizing={false}
            onChange={(index) => {
                if (index === -1) {
                    closeCreateEventSheet();
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
                <View style={styles.createSheetContainer}>
                    <Text style={styles.mainHeader}>Create Event</Text>
                    <View style={styles.btnContainer}>
                        <Pressable 
                            style={styles.Btn}
                            onPress={() => console.log("Create Event Pressed")}
                        >
                            <Text style={styles.btnText}>Create Event</Text>
                        </Pressable>
                    </View>
                </View>
            </BottomSheetScrollView>
        </BottomSheet>
    );
};

export default CreateEventSheet;

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
    createSheetContainer: {
        padding: 20
    },
    mainHeader: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20
    },
    btnContainer:{
        flexDirection:"column",    
    },
    Btn: {
        backgroundColor: "#c5c5c6",
        padding: 12,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
    },
    btnText: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
    },
});
