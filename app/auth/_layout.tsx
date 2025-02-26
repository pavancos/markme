import { Tabs } from "expo-router";

export default function AuthLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "black" },
        tabBarActiveTintColor: "yellow",
        tabBarInactiveTintColor: "white",
      }}
    >
      <Tabs.Screen name="signup" options={{ title: "Sign Up" }} />
      <Tabs.Screen name="login" options={{ title: "Log In" }} />
    </Tabs>
  );
}
