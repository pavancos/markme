import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = async () => {
    await AsyncStorage.setItem("token", "dummy_token");
    // @ts-ignore
    router.replace("/home");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black", padding: 20 }}>
      <Text style={{ color: "white", fontSize: 24 }}>Log In</Text>
      <TextInput placeholder="Email" placeholderTextColor="gray" style={{ backgroundColor: "white", marginVertical: 10, padding: 8 }} />
      <TextInput placeholder="Password" placeholderTextColor="gray" secureTextEntry style={{ backgroundColor: "white", marginVertical: 10, padding: 8 }} />
      <Button title="Login" onPress={handleLogin} color="yellow" />
    </View>
  );
}
