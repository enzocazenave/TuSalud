import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeView from '../views/protected/HomeView';
import ProfileView from '../views/protected/ProfileView';
import MyAppointmentsView from '../views/protected/appointments/MyAppointmentsView';
import { Home, Calendar, User } from 'lucide-react-native';
import { View, ViewStyle } from 'react-native';
import React from 'react';
import { useTheme } from '../context/ThemeContext';

export type BottomTabParamList = {
  Home: undefined;
  MyAppointments: { 
    initial: boolean
    screen: 'NextAppointments' | 'NewAppointmentSelectPrepaid' | 'NewAppointmentSelectSpeciality' | 'NewAppointmentSelectProfessional' | 'NewAppointmentSelectDateAndHour' | 'NewAppointmentConfirm'
  } | undefined;
  Profile: undefined;
}

const Tab = createBottomTabNavigator<BottomTabParamList>();

const baseTabBarIconStyle: ViewStyle = {
  width: 80,
  height: 80,
  marginTop: -40,
  borderRadius: 100,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  elevation: 2,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
};

export const BottomTabNavigator = () => {
  const { theme } = useTheme();
  const inactiveColor = theme === 'dark' ? '#9ACBD0' : '#006A71';
  const tabBarBg = theme === 'dark' ? '#1B1B1B' : '#9ACBD0';
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: tabBarBg,
          elevation: 0,
          height: 50,
          borderTopWidth: 1,
          borderColor: inactiveColor,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: inactiveColor,
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeView}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                baseTabBarIconStyle,
                {
                  backgroundColor: tabBarBg,
                  borderColor: inactiveColor,
                },
                focused && { backgroundColor: '#48A6A7' },
              ]}
            >
              <Home color={color} size={40} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyAppointments"
        component={MyAppointmentsView}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                baseTabBarIconStyle,
                { backgroundColor: tabBarBg, borderColor: inactiveColor },
                focused && { backgroundColor: '#48A6A7' },
              ]}
            >
              <Calendar color={color} size={40} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileView}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                baseTabBarIconStyle,
                { backgroundColor: tabBarBg, borderColor: inactiveColor },
                focused && { backgroundColor: '#48A6A7' },
              ]}
            >
              <User color={color} size={40} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
