import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = async () => {
    // await AsyncStorage.setItem("token", "dummy_token");
    // @ts-ignore
    router.replace("/auth/signup");
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" secureTextEntry />
    </View>
  );
}
