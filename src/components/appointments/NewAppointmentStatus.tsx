import { Text, View } from "react-native";
import { useNewAppointment } from "../../context/NewAppointmentContext";
import { Calendar, Check, Clock } from "lucide-react-native";
import { formatUtcToLocalDateTime, getUserTimeZone } from "../../utils/date";
import { useTheme } from "../../context/ThemeContext";

export default function NewAppointmentStatus() {
  const { prepaidAffiliation, specialty, professional, slot } = useNewAppointment();
  const timeZone = getUserTimeZone();
  const { theme } = useTheme();
  const iconColor = theme === 'dark' ? '#5CC8D7' : '#006A71';

  return (
    <View className="flex-row flex-wrap items-center gap-2">
      {prepaidAffiliation?.prepaid?.name && (
        <View className="bg-secondary/30 dark:bg-darktertiary/40 rounded-lg p-2 flex-row items-center gap-2">
          <Check size={20} color={iconColor} />
          <Text className="text-primary dark:text-darkprimary">
            1. {prepaidAffiliation?.prepaid?.name}
          </Text>
        </View>
      )}

      {specialty?.name && (
        <View className="bg-secondary/30 dark:bg-darktertiary/40 rounded-lg p-2 flex-row items-center gap-2">
          <Check size={20} color={iconColor} />
          <Text className="text-primary dark:text-darkprimary">
            2. {specialty?.name}
          </Text>
        </View>
      )}

      {professional?.full_name && (
        <View className="bg-secondary/30 dark:bg-darktertiary/40 rounded-lg p-2 flex-row items-center gap-2">
          <Check size={20} color={iconColor} />
          <Text className="text-primary dark:text-darkprimary">
            3. {professional?.full_name}
          </Text>
        </View>
      )}

      {slot?.start_time && (
        <View className="bg-secondary/30 dark:bg-darktertiary/40 rounded-lg p-2 flex-row items-center gap-2">
          <Check size={20} color={iconColor} />
          <Text className="text-primary dark:text-darkprimary">4.</Text>
          <View className="flex-row items-center gap-1">
            <Calendar size={12} color={iconColor} />
            <Text className="text-primary dark:text-darkprimary">
              {formatUtcToLocalDateTime(slot?.date + 'T00:00:00', timeZone, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: undefined,
                minute: undefined
              })}
            </Text>
            <Clock size={12} color={iconColor} />
            <Text className="text-primary dark:text-darkprimary">
              {new Date(`2000-01-01T${slot?.start_time}:00Z`).toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone
              })}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
