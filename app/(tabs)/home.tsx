import { View, StyleSheet, Text } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextBox from '@/components/TextBox';


export default function HomeScreen() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('username').then((value) => {
      setUsername(value);
    });
  }, []);

  return (
    <View style={styles.container}>
      <TextBox style={styles.text}>Home Screen</TextBox>
      <TextBox style={styles.text}>
        Hello, {username}
      </TextBox>
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
