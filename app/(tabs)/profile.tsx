import { View, StyleSheet, TouchableOpacity } from 'react-native';
import TextBox from '@/components/TextBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <TextBox style={styles.text}>Profile Screen</TextBox>
      <TouchableOpacity onPress={async() => {
        await AsyncStorage.removeItem('token');
        router.replace('/auth/login');
      }}>
        <TextBox style={styles.text}>Logout</TextBox>
      </TouchableOpacity>
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
