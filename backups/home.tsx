import { View, StyleSheet, Text } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextBox from '@/components/TextBox';
import { Tabs } from 'expo-router';


export default function HomeScreen() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('username').then((value) => {
      setUsername(value);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Tabs>
        <Tabs.Screen name="Home" />
        <Tabs.Screen name="Profile" />
      </Tabs>
      <TextBox style={styles.text}>Home Screen</TextBox>
      <TextBox style={styles.text}>
        Hello, {username?.toString()|| "Guest"}
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
