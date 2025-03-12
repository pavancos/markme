import BackNavigation from '@/components/svgs/BackNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'
import { useEffect } from 'react';
import { BackHandler, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
const settings = () => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/auth/login');
  };
  useEffect(() => {
    const backAction = () => {
      router.replace('/(tabs)/profile');
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.replace('/(tabs)/profile')}>
        <BackNavigation />
      </Pressable>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}
export default settings
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 16
  },
  text: {
    color: 'yellow',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
    marginTop: 20
  },
})