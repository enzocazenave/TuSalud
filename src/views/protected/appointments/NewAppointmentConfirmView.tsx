import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import GoBackButton from "../../../components/ui/GoBackButton";
import { MyAppointmentsStackParamList } from "./MyAppointmentsView";
import useAppointments from "../../../hooks/useAppointments";
import { useNewAppointment } from "../../../context/NewAppointmentContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Check } from "lucide-react-native";
import AppointmentStatusConfirmation from "../../../components/appointments/AppointmentStatusConfirmation";
import { useTheme } from "../../../context/ThemeContext";

export default function NewAppointmentConfirmView() {
  const { navigate } = useNavigation<NativeStackNavigationProp<MyAppointmentsStackParamList>>();
  const { createAppointment, isLoading } = useAppointments();
  const { specialty, professional, slot, resetNewAppointment } = useNewAppointment();
  const { theme } = useTheme();

  const handleConfirmAppointment = async () => {
    const response: any = await createAppointment({
      specialtyId: parseInt(specialty.id),
      professionalId: parseInt(professional.id),
      date: slot.date,
      startTime: slot.start_time,
      endTime: slot.end_time
    });

    if (response.status === 201) {
      resetNewAppointment();
      navigate("Home");
    }
  };

  return (
    <View className="flex-1 bg-quaternary dark:bg-darksecondary">
      <ScrollView contentContainerClassName="pt-9 px-5 gap-8 pb-24" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between">
          <GoBackButton />
          <Text className="text-primary dark:text-darkprimary text-lg">Paso 5 de 5</Text>
        </View>

        <Text className="text-3xl text-primary dark:text-darkprimary font-bold">Confirmar turno</Text>

        <AppointmentStatusConfirmation />


        <TouchableOpacity
          disabled={isLoading.createAppointment}
          onPress={handleConfirmAppointment}
          className={`
            flex-row gap-2 items-center justify-center rounded-lg px-6 py-3 border-2
            ${theme === 'dark' ? 'bg-darkprimary border-darkprimary' : 'bg-primary border-primary'}
            ${isLoading.createAppointment ? 'opacity-50' : ''}
          `}
        >
          {isLoading.createAppointment && <ActivityIndicator size="small" color="#fff" />}
          <Check size={20} color="#fff" />
          <Text className="text-xl text-white text-center font-bold">Confirmar turno</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
