import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeAppointmentsView from './HomeAppointmentsView';
import NewAppointmentSelectPrepaidView from './NewAppointmentSelectPrepaidView';
import { NewAppointmentProvider } from '../../../context/NewAppointmentContext';

export type MyAppointmentsStackParamList = {
  Home: undefined;
  NewAppointment: undefined;
}

const Stack = createNativeStackNavigator<MyAppointmentsStackParamList>();

export default function MyAppointmentsView() {
  return (
    <NewAppointmentProvider>
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
          component={NewAppointmentSelectPrepaidView}
        />
      </Stack.Navigator>
    </NewAppointmentProvider>
  );
}