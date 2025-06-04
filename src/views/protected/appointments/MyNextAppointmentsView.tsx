import { useCallback, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import useAppointments from "../../../hooks/useAppointments";
import { useFocusEffect } from "@react-navigation/native";
import { PatientAppointment } from "../../../types/PatientAppointment";
import AppointmentCard from "../../../components/appointments/AppointmentCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GoBackButton from "../../../components/ui/GoBackButton";

export default function MyNextAppointmentsView() {
  const { bottom } = useSafeAreaInsets()
  const { getNextAppointments, isLoading } = useAppointments()
  const [nextAppointments, setNextAppointments] = useState<PatientAppointment[]>([])

  useFocusEffect(
    useCallback(() => {
      getNextAppointments().then(setNextAppointments)
    }, [])
  )

  const renderAppointment = ({ item: appointment }: { item: PatientAppointment }) => (
    <AppointmentCard
      appointment={appointment}
      hasDeleteButton
      onDelete={() => {
        getNextAppointments().then(setNextAppointments)
      }}
    />
  )

  return (
    <View className="pt-9 px-5 gap-4 bg-quaternary dark:bg-darksecondary flex-1">
      <GoBackButton />
      <Text className="text-4xl text-primary dark:text-darkprimary font-bold">Turnos próximos</Text>

      {isLoading.nextAppointments ? (
        <ActivityIndicator size="large" color="#006A71" />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={nextAppointments}
          renderItem={renderAppointment}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ gap: 16, paddingBottom: bottom + 150 }}
          ListEmptyComponent={() => (
            <Text className="text-primary dark:text-darkprimary text-center">No hay turnos próximos</Text>
          )}
        />
      )}
    </View>
  )
}