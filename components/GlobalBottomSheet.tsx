import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { useBottomSheetStore } from '@/stores/bottomSheetStore';

const GlobalBottomSheet = () => {
  const { isOpen, selectedEvent, closeSheet } = useBottomSheetStore();
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  React.useEffect(() => {
    if (isOpen) {
        bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={['40%', '80%']}
      enablePanDownToClose={true}
      onClose={closeSheet}
      style={styles.container}
    >
      <View style={{ backgroundColor: '#1e1e1e', padding: 20 }}>
        <Text style={{ color: 'white' }}>Hello</Text>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
    },
});

export default GlobalBottomSheet;