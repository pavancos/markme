import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import UpcomingScreen from './screens/Upcoming';
import PastScreen from './screens/Past';

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
    return (
        <Tab.Navigator
            initialRouteName="Upcoming"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#000000',
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#999',
                tabBarLabelStyle: {
                    fontSize: 16,
                    textAlign: 'left'
                },
                tabBarIndicatorStyle: {
                    backgroundColor: 'white',
                    height: 1,
                    width: 80,
                    marginLeft: 12,
                },
                tabBarItemStyle: {
                    alignItems: 'flex-start',
                    width: 105,
                },
            }}
        >
            <Tab.Screen name="Upcoming" component={UpcomingScreen} />
            <Tab.Screen name="Past" component={PastScreen} />
        </Tab.Navigator>
    );
}
