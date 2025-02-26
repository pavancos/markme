import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ColorValue } from "react-native";
import AppHeader from "@/components/AppHeader";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "#2f2f2f", borderTopWidth: 0, paddingTop: 8 },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#999",
        headerShown: true,
        tabBarShowLabel: false,
        header: () => <AppHeader />,
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }: { color: ColorValue }) => <MaterialCommunityIcons name="home-outline" size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color }: { color: ColorValue }) => <MaterialCommunityIcons name="compass-outline" size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ color }: { color: ColorValue }) => <MaterialCommunityIcons name="plus-circle-outline" size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ color }: { color: ColorValue }) => <MaterialCommunityIcons name="heart-outline" size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }: { color: ColorValue }) => <MaterialCommunityIcons name="account-outline" size={26} color={color} />,
        }}
      />
    </Tabs>
  );
}