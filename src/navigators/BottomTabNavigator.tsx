import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeView from '../views/protected/HomeView';
import ProfileView from '../views/protected/ProfileView';
import MyAppointmentsView from '../views/protected/MyAppointmentsView';
import { Home, Calendar, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ViewStyle } from 'react-native';
import React from 'react';

const Tab = createBottomTabNavigator();

const tabBarIconStyle: ViewStyle = {
  width: 80,
  height: 80,
  marginTop: -40,
  backgroundColor: '#9ACBD0',
  borderRadius: 100,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  elevation: 2,
  alignItems: 'center',
  justifyContent: 'center',
};

export const BottomTabNavigator = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 50 + bottom,
          backgroundColor: '#9ACBD0',
          zIndex: -1,
        }}
      />

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
            height: 20 + bottom,
          },
          tabBarActiveTintColor: '#006A71',
          tabBarInactiveTintColor: '#6c9294',
          tabBarShowLabel: false,
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeView}
          options={{
            tabBarIcon: ({ color }) => (
              <View style={tabBarIconStyle}>
                <Home color={color} size={40} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="MyAppointments"
          component={MyAppointmentsView}
          options={{
            tabBarIcon: ({ color }) => (
              <View style={tabBarIconStyle}>
                <Calendar color={color} size={40} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileView}
          options={{
            tabBarIcon: ({ color }) => (
              <View style={tabBarIconStyle}>
                <User color={color} size={40} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};
