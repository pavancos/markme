import { router } from "expo-router";
import { View, Text, TextInput, Button,StyleSheet } from "react-native";

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Text>
        Sign Up
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
})