import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Text style={styles.text}>
        Hello, {AsyncStorage.getItem('username')}
      </Text>
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
