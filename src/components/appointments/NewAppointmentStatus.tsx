import { Text, View } from "react-native";
import { useNewAppointment } from "../../context/NewAppointmentContext";
import { Calendar, Check, Clock } from "lucide-react-native";

export default function NewAppointmentStatus() {
  const { prepaidAffiliation, specialty, professional, slot } = useNewAppointment()

  return (
    <View className="flex-row flex-wrap items-center gap-2">
      {prepaidAffiliation?.prepaid?.name && (
        <View className="bg-secondary/30 rounded-lg p-2 flex-row items-center gap-2">
          <Check size={20} color="#006A71" />
          <Text className="text-primary">
            1. {prepaidAffiliation?.prepaid?.name}
          </Text>
        </View>
      )}

      {specialty?.name && (
        <View className="bg-secondary/30 rounded-lg p-2 flex-row items-center gap-2">
          <Check size={20} color="#006A71" />
          <Text className="text-primary">
            2. {specialty?.name}
          </Text>
        </View>
      )}

      {professional?.full_name && (
        <View className="bg-secondary/30 rounded-lg p-2 flex-row items-center gap-2">
          <Check size={20} color="#006A71" />
          <Text className="text-primary">
            3. {professional?.full_name}
          </Text>
        </View>
      )}

      {slot?.start_time && (
        <View className="bg-secondary/30 rounded-lg p-2 flex-row items-center gap-2">
          <Check size={20} color="#006A71" />
          <Text className="text-primary">4.</Text>
          <View className="flex-row items-center gap-1">
            <Calendar size={12} color="#006A71" />
            <Text className="text-primary">
            {new Date(slot?.date).toLocaleDateString('es-AR', {
              day: '2-digit', month: '2-digit', year: 'numeric'
            })}
          </Text>
          <Clock size={12} color="#006A71" />
            <Text className="text-primary">
              {slot?.start_time} - {slot?.end_time}
            </Text>
          </View>
        </View>
      )}
    </View>
  )
}