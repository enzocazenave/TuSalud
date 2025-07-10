import { Text, View } from "react-native";
import { PatientAppointment } from "../../types/PatientAppointment";
import { Clock } from "lucide-react-native";
import { useTheme } from "../../context/ThemeContext";

interface Props {
  appointment: PatientAppointment;
}

export default function SmallAppointmentCard({ appointment }: Props) {
  const formattedStartTime = new Date(appointment.start_time).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const { theme } = useTheme();
  const iconColor = theme === 'dark' ? '#5CC8D7' : '#9ACBD0';

  return (
    <View className="bg-secondary dark:bg-darktertiary rounded-[20px] p-4 flex-row items-center justify-between">
      <View>
        <Text className="text-primary dark:text-darkprimary text-lg font-bold">
          {appointment.professional.full_name}
        </Text>
        <Text className="text-primary dark:text-darkprimary text-[15px]">
          {appointment.specialty.name}
        </Text>
      </View>

      <View className="flex-row bg-tertiary dark:bg-darktertiary rounded-[20px] p-2 items-center gap-2">
        <Clock size={20} color={iconColor} />
        <Text className="text-white text-[15px]">{formattedStartTime}</Text>
      </View>
    </View>
  );
}
