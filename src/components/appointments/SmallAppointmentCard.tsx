import { Text, View } from "react-native";
import { PatientAppointment } from "../../types/PatientAppointment";
import { Clock } from "lucide-react-native";

interface Props {
  appointment: PatientAppointment
}

export default function SmallAppointmentCard({ appointment }: Props) {
  const formattedStartTime = new Date(appointment.start_time).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  
  return (
    <View className="bg-secondary rounded-[20px] p-4 flex-row items-center justify-between">
      <View>
        <Text className="text-primary text-lg font-bold">{appointment.professional.full_name}</Text>
        <Text className="text-primary text-[15px]">{appointment.specialty.name}</Text>
      </View>

      <View className="flex-row bg-tertiary rounded-[20px] p-2 items-center gap-2">
        <Clock size={20} color="#9ACBD0" />
        <Text className="text-white text-[15px]">{formattedStartTime}</Text>
      </View>
    </View>
  )
}