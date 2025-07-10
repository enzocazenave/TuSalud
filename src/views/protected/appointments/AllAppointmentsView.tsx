import {useCallback, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import useAppointments from '../../../hooks/useAppointments';
import {useFocusEffect} from '@react-navigation/native';
import {PatientAppointment} from '../../../types/PatientAppointment';
import AppointmentCard from '../../../components/appointments/AppointmentCard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GoBackButton from '../../../components/ui/GoBackButton';
import {useTheme} from '../../../context/ThemeContext';

export default function AllAppointmentsView() {
  const {bottom} = useSafeAreaInsets();
  const {getAppointments, isLoading} = useAppointments();
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const {theme} = useTheme();

  useFocusEffect(
    useCallback(() => {
      getAppointments().then(setAppointments);
    }, []),
  );

  const renderAppointment = ({
    item: appointment,
  }: {
    item: PatientAppointment;
  }) => (
    <AppointmentCard
      appointment={appointment}
      hasDeleteButton
      onDelete={() => {
        getAppointments().then(setAppointments);
      }}
      isHistory
    />
  );

  return (
    <View className="pt-9 px-5 gap-4">
      <GoBackButton />
      <Text className="text-4xl text-primary dark:text-secondary font-bold">
        Historial de turnos
      </Text>

      {isLoading.appointments ? (
        <ActivityIndicator
          size="large"
          color={theme === 'dark' ? '#9ACBD0' : '#006A71'}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={appointments}
          renderItem={renderAppointment}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{gap: 16, paddingBottom: bottom + 150}}
          ListEmptyComponent={() => (
            <Text className="text-primary dark:text-secondary text-center">
              No hay turnos
            </Text>
          )}
        />
      )}
    </View>
  );
}
