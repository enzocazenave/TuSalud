import { Text, View } from "react-native";
import { useNewAppointment } from "../../context/NewAppointmentContext";
import { Calendar, Check, Clock } from "lucide-react-native";
import { formatUtcToLocalDateTime, getUserTimeZone } from "../../utils/date";
import { useTheme } from "../../context/ThemeContext";

export default function AppointmentStatusConfirmation() {
  const { prepaidAffiliation, specialty, professional, slot } = useNewAppointment();
  const timeZone = getUserTimeZone();
  const { theme } = useTheme();
  const iconColor = theme === 'dark' ? '#5CC8D7' : '#006A71';

  return (
    <View className="flex-col gap-4">
      {prepaidAffiliation?.prepaid?.name && (
        <View className="bg-secondary/30 dark:bg-darktertiary/40 rounded-lg px-4 py-3 flex flex-row items-center gap-4">
          <View className="bg-primary dark:bg-darkprimary rounded-full p-1">
            <Check size={18} color="#fff" />
          </View>
          <View>
            <Text className="text-primary dark:text-darkprimary text-lg">1. Obra Social</Text>
            <Text className="text-primary dark:text-darkprimary font-bold text-xl">
              {prepaidAffiliation?.prepaid?.name}
            </Text>
          </View>
        </View>
      )}

      {specialty?.name && (
        <View className="bg-secondary/30 dark:bg-darktertiary/40 rounded-lg px-4 py-3 flex flex-row items-center gap-4">
          <View className="bg-primary dark:bg-darkprimary rounded-full p-1">
            <Check size={18} color="#fff" />
          </View>
          <View>
            <Text className="text-primary dark:text-darkprimary text-lg">2. Especialidad</Text>
            <Text className="text-primary dark:text-darkprimary font-bold text-xl">
              {specialty?.name}
            </Text>
          </View>
        </View>
      )}

      {professional?.full_name && (
        <View className="bg-secondary/30 dark:bg-darktertiary/40 rounded-lg px-4 py-3 flex flex-row items-center gap-4">
          <View className="bg-primary dark:bg-darkprimary rounded-full p-1">
            <Check size={18} color="#fff" />
          </View>
          <View>
            <Text className="text-primary dark:text-darkprimary text-lg">3. Profesional</Text>
            <Text className="text-primary dark:text-darkprimary font-bold text-xl">
              {professional?.full_name}
            </Text>
          </View>
        </View>
      )}

      {slot?.start_time && (
        <View className="bg-secondary/30 dark:bg-darktertiary/40 rounded-lg px-4 py-3 flex flex-row items-center gap-4">
          <View className="bg-primary dark:bg-darkprimary rounded-full p-1">
            <Check size={18} color="#fff" />
          </View>

          <View>
            <Text className="text-primary dark:text-darkprimary text-lg">4. Fecha y Horario</Text>

            <View className="flex-row items-center gap-2">
              <Calendar size={16} color={iconColor} />
              <Text className="text-primary dark:text-darkprimary font-bold text-xl">
                {formatUtcToLocalDateTime(slot?.date + 'T00:00:00', timeZone, {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: undefined,
                  minute: undefined
                })}
              </Text>
            </View>

            <View className="flex-row items-center gap-2">
              <Clock size={16} color={iconColor} />
              <Text className="text-primary dark:text-darkprimary text-xl font-bold">
                {new Date(`2000-01-01T${slot?.start_time}:00Z`).toLocaleTimeString(undefined, {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                  timeZone
                })}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
