import { Tabs, useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    const router = useRouter();

    return (
            <Tabs
                screenOptions={{
                    tabBarStyle: { backgroundColor: '#2f2f2f', borderTopWidth:0,paddingTop:10 },
                    tabBarActiveTintColor: '#ffffff',
                    tabBarInactiveTintColor: '#999999',
                    headerShown:false,
                    tabBarShowLabel:false,
                    tabBarHideOnKeyboard:true,
                    tabBarVariant:'uikit',
                    tabBarPosition:'bottom',
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="home-outline" size={27} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="explore"
                    options={{
                        title: 'Explore',
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="search-outline" size={27} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        title: '',
                        tabBarIcon: ({ color }) => (
                            <Ionicons name='add-circle' size={30}  color="#ffffff" />
                        ),
                        
                    }}
                />
                <Tabs.Screen
                    name="notifications"
                    options={{
                        title: 'Notifications',
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="notifications-outline" size={27} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="person-outline" size={27} color={color} />
                        ),
                    }}
                />
            </Tabs>
    );
}