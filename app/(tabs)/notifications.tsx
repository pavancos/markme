import { View, StyleSheet, Button } from 'react-native';
import TextBox from '@/components/TextBox';
import BottomSheet, {BottomSheetMethods } from '@devvie/bottom-sheet'
import { useRef } from 'react';
export default function NotificationsScreen() {
  const sheetRef = useRef<BottomSheetMethods>(null);
  return (
    <View style={styles.container}>
      <TextBox style={styles.text}>Notifications Screen</TextBox>
      <Button title="Open Stanley Bottom Sheet" onPress={() => sheetRef.current?.open()} />
      <BottomSheet ref={sheetRef} >
        <TextBox style={styles.text}>Bottom Sheet</TextBox>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'yellow',
    fontSize: 20,
  },
});
