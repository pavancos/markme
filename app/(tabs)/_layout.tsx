import { Stack, Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ColorValue, Pressable, StyleSheet } from "react-native";
import AppHeader from "@/components/AppHeader";
import ProfileHeader from "@/components/ProfileHeader";
import { useSheetStore } from "@/stores/sheetStore";
import { TabList } from "expo-router/ui";

export default function TabLayout() {
  const { openCreateSheet } = useSheetStore();
  const handleCreatePress = () => {
    console.log("Create Button Pressed");
    openCreateSheet();
  };
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#2f2f2f",
            borderTopWidth: 0,
            paddingTop: 8,
            paddingBottom: 7,
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#999",
          headerShown: true,
          tabBarShowLabel: false,
          header: () => <AppHeader />,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color }: { color: ColorValue }) => (
              <MaterialCommunityIcons name="home-outline" size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            tabBarIcon: ({ color }: { color: ColorValue }) => (
              <MaterialCommunityIcons name="compass-outline" size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            tabBarButton: () => (
              <Pressable style={styles.createButton} onPress={handleCreatePress}>
                <MaterialCommunityIcons name="plus-circle-outline" size={26} color={"#999999"} />
              </Pressable>
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            tabBarIcon: ({ color }: { color: ColorValue }) => (
              <MaterialCommunityIcons name="heart-outline" size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }: { color: ColorValue }) => (
              <MaterialCommunityIcons name="account-outline" size={26} color={color} />
            ),
            header: ()=> <ProfileHeader/>
          }}
        />
        <Tabs.Screen
          name="space/[id]"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  createButton: {
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    // marginBottom: 25,
  },
});
