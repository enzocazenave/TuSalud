import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeView from '../views/protected/HomeView';
import ProfileView from '../views/protected/ProfileView';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeView} />
      <Tab.Screen name="MyAppointments" component={HomeView} />
      <Tab.Screen name="Profile" component={ProfileView} />
    </Tab.Navigator>
  )
}
