import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeAppointmentsView from './appointments/HomeAppointmentsView';
import NewAppointmentView from './NewAppointmentView';

export type MyAppointmentsStackParamList = {
  Home: undefined;
  NewAppointment: undefined;
}

const Stack = createNativeStackNavigator<MyAppointmentsStackParamList>();

export default function MyAppointmentsView() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen 
        name="Home"
        component={HomeAppointmentsView}
      />
      <Stack.Screen
        name="NewAppointment"
        component={NewAppointmentView}
      />
    </Stack.Navigator>
  );
}