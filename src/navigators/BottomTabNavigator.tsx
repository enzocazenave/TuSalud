import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeView from '../views/protected/HomeView';
import ProfileView from '../views/protected/ProfileView';
import MyAppointmentsView from '../views/protected/appointments/MyAppointmentsView';
import { Home, Calendar, User } from 'lucide-react-native';
import { View, ViewStyle, useColorScheme } from 'react-native';
import React from 'react';

export type BottomTabParamList = {
  Home: undefined;
  MyAppointments: {
    initial: boolean;
    screen:
      | 'NextAppointments'
      | 'NewAppointmentSelectPrepaid'
      | 'NewAppointmentSelectSpeciality'
      | 'NewAppointmentSelectProfessional'
      | 'NewAppointmentSelectDateAndHour'
      | 'NewAppointmentConfirm';
  } | undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const tabBarBackground = isDark ? '#1F2937' : '#9ACBD0';
  const borderColor = isDark ? '#5CC8D7' : '#006A71';
  const activeIconBackground = isDark ? '#5CC8D7' : '#48A6A7';
  const iconColorActive = '#FFFFFF';
  const iconColorInactive = isDark ? '#5CC8D7' : '#006A71';

  const tabBarIconStyle: ViewStyle = {
    width: 80,
    height: 80,
    marginTop: -40,
    backgroundColor: tabBarBackground,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: borderColor,
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: tabBarBackground,
          elevation: 0,
          height: 50,
          borderTopWidth: 1,
          borderColor: borderColor,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
        },
        tabBarActiveTintColor: iconColorActive,
        tabBarInactiveTintColor: iconColorInactive,
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
                tabBarIconStyle,
                focused && { backgroundColor: activeIconBackground },
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
                tabBarIconStyle,
                focused && { backgroundColor: activeIconBackground },
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
                tabBarIconStyle,
                focused && { backgroundColor: activeIconBackground },
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
