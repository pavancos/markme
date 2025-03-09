import React, { useCallback, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';

export default function ProfileScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();


  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/auth/login');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.text}>Profile Screen</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
        <Button title="Open Bottom Sheet" onPress={openBottomSheet} />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['90%']}
        enablePanDownToClose={true}
        animateOnMount={true}
        enableDynamicSizing={true}
        onChange={(index)=>{
          if(index===-1){
            bottomSheetRef.current?.close();
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
          <Text style={styles.text}>Hello from Bottom Sheet</Text>
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
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
  contentContainer: {
    backgroundColor: '#1e1e1e',
  },
});

