import { View, Text } from "react-native";
import { type PatientAppointment } from "../../types/PatientAppointment";
import { User, Calendar, Clock } from "lucide-react-native";

interface Props {
  appointment: PatientAppointment;
}

export default function AppointmentCard({ appointment }: Props) {
  const formattedDate = new Date(appointment.date).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric'
  });

  const formattedStartTime = new Date(appointment.start_time).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <View className="bg-secondary rounded-[20px] p-5 gap-4">
      <View className="flex-row gap-4 items-center">
        <View className="bg-[#006A71] rounded-full p-2">
          <User size={30} color="#9ACBD0" />
        </View>

        <View>
          <Text className="text-primary text-lg font-bold">{appointment?.professional?.full_name}</Text>
          <Text className="text-primary text-[15px]">{appointment?.specialty?.name}</Text>
        </View>
      </View>

      <View className="bg-tertiary flex-row items-center rounded-[20px] p-3 justify-between">
        <View className="flex-row items-center gap-2">
          <Calendar size={20} color="#9ACBD0" />
          <Text className="text-white text-md">{formattedDate}</Text>
        </View>
        
        <View className="flex-row items-center gap-2">
          <Clock size={20} color="#9ACBD0" />
          <Text className="text-white text-md">{formattedStartTime}</Text>
        </View>
      </View>
    </View>
  )
}