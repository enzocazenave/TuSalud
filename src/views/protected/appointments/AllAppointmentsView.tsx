import { useCallback, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import useAppointments from "../../../hooks/useAppointments";
import { useFocusEffect } from "@react-navigation/native";
import { PatientAppointment } from "../../../types/PatientAppointment";
import AppointmentCard from "../../../components/appointments/AppointmentCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GoBackButton from "../../../components/ui/GoBackButton";

export default function AllAppointmentsView() {
  const { bottom } = useSafeAreaInsets();
  const { getAppointments, isLoading } = useAppointments();
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);

  useFocusEffect(
    useCallback(() => {
      getAppointments().then(setAppointments);
    }, [])
  );

  const renderAppointment = ({ item: appointment }: { item: PatientAppointment }) => (
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
    <View className="pt-9 px-5 gap-4 flex-1 bg-quaternary dark:bg-darksecondary">
      <GoBackButton />
      <Text className="text-4xl text-primary dark:text-darkprimary font-bold">Historial de turnos</Text>

      {isLoading.appointments ? (
        <ActivityIndicator size="large" color="#006A71" />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={appointments}
          renderItem={renderAppointment}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ gap: 16, paddingBottom: bottom + 150 }}
          ListEmptyComponent={() => (
            <Text className="text-primary dark:text-darkprimary text-center">No hay turnos</Text>
          )}
        />
      )}
    </View>
  );
}
