import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeAppointmentsView from './HomeAppointmentsView';
import NewAppointmentSelectPrepaidView from './NewAppointmentSelectPrepaidView';
import { NewAppointmentProvider } from '../../../context/NewAppointmentContext';
import NewAppointmentSelectSpecialityView from './NewAppointmentSelectSpecialityView';
import NewAppointmentSelectProfessionalView from './NewAppointmentSelectProfessionalView';
import NewAppointmentSelectDateAndHour from './NewAppointmentSelectDateAndHour';
import NewAppointmentConfirmView from './NewAppointmentConfirmView';

export type MyAppointmentsStackParamList = {
  Home: undefined;
  NewAppointmentSelectPrepaid: undefined;
  NewAppointmentSelectSpeciality: undefined;
  NewAppointmentSelectProfessional: undefined;
  NewAppointmentSelectDateAndHour: undefined;
  NewAppointmentConfirm: undefined;
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
          name="NewAppointmentSelectPrepaid"
          component={NewAppointmentSelectPrepaidView}
        />
        <Stack.Screen
          name="NewAppointmentSelectSpeciality"
          component={NewAppointmentSelectSpecialityView}
        />
        <Stack.Screen
          name="NewAppointmentSelectProfessional"
          component={NewAppointmentSelectProfessionalView}
        />
        <Stack.Screen
          name="NewAppointmentSelectDateAndHour"
          component={NewAppointmentSelectDateAndHour}
        />
        <Stack.Screen
          name="NewAppointmentConfirm"
          component={NewAppointmentConfirmView}
        />
      </Stack.Navigator>
    </NewAppointmentProvider>
  );
}