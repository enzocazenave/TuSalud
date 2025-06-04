import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeAppointmentsView from './HomeAppointmentsView';
import NewAppointmentSelectPrepaidView from './NewAppointmentSelectPrepaidView';
import { NewAppointmentProvider } from '../../../context/NewAppointmentContext';
import NewAppointmentSelectSpecialityView from './NewAppointmentSelectSpecialityView';
import NewAppointmentSelectProfessionalView from './NewAppointmentSelectProfessionalView';
import NewAppointmentSelectDateAndHour from './NewAppointmentSelectDateAndHour';
import NewAppointmentConfirmView from './NewAppointmentConfirmView';
import MyNextAppointmentsView from './MyNextAppointmentsView';
import AllAppointmentsView from './AllAppointmentsView';

export type MyAppointmentsStackParamList = {
  Home: undefined;
  NextAppointments: undefined;
  AllAppointments: undefined;
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
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={HomeAppointmentsView}
        />
        <Stack.Screen
          name="NextAppointments"
          component={MyNextAppointmentsView}
        />
        <Stack.Screen
          name="AllAppointments"
          component={AllAppointmentsView}
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