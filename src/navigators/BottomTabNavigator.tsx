import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeView from '../views/protected/HomeView';
import ProfileView from '../views/protected/ProfileView';
import MyAppointmentsView from '../views/protected/MyAppointmentsView';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeView} />
      <Tab.Screen name="MyAppointments" component={MyAppointmentsView} />
      <Tab.Screen name="Profile" component={ProfileView} />
    </Tab.Navigator>
  )
}
