import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import GoBackButton from "../../../components/ui/GoBackButton";
import NewAppointmentStatus from "../../../components/appointments/NewAppointmentStatus";
import { MyAppointmentsStackParamList } from "./MyAppointmentsView";
import useAppointments from "../../../hooks/useAppointments";
import { useNewAppointment } from "../../../context/NewAppointmentContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function NewAppointmentConfirmView() {
  const { navigate } = useNavigation<NativeStackNavigationProp<MyAppointmentsStackParamList>>()
  const { createAppointment, isLoading } = useAppointments()
  const { specialty, professional, slot, resetNewAppointment } = useNewAppointment()

  const handleConfirmAppointment = async () => {
    const response: any = await createAppointment({
      specialtyId: parseInt(specialty.id),
      professionalId: parseInt(professional.id),
      date: slot.date,
      startTime: slot.start_time,
      endTime: slot.end_time
    })

    if (response.status === 201) {
      resetNewAppointment()
      navigate('Home')
    }
  }

  return (
    <View className="pt-9 px-5 gap-8">
      <View className="flex-row items-center justify-between">
        <GoBackButton />
        <Text className="text-primary text-lg">Paso 4 de 5</Text>
      </View>

      <Text className="text-3xl text-primary font-bold">Confirmar turno</Text>
      
      <NewAppointmentStatus />

      <TouchableOpacity
        disabled={isLoading.createAppointment}
        onPress={handleConfirmAppointment}
        className={`bg-secondary flex-row gap-2 items-center justify-center rounded-lg px-6 py-3 border-2 border-primary ${isLoading.createAppointment ? 'opacity-50' : ''}`}
      >
        {isLoading.createAppointment && <ActivityIndicator size="large" color="#006A71" />}
        <Text className="text-xl text-primary text-center">Confirmar turno</Text>
      </TouchableOpacity>
    </View>
  )
}