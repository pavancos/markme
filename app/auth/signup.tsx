import { View, Text, TextInput, Button } from "react-native";

export default function SignUpScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "black", padding: 20 }}>
      <Text style={{ color: "white", fontSize: 24 }}>Sign Up</Text>
      <TextInput placeholder="Email" placeholderTextColor="gray" style={{ backgroundColor: "white", marginVertical: 10, padding: 8 }} />
      <TextInput placeholder="Password" placeholderTextColor="gray" secureTextEntry style={{ backgroundColor: "white", marginVertical: 10, padding: 8 }} />
      <Button title="Sign Up" onPress={() => {}} color="yellow" />
    </View>
  );
}
