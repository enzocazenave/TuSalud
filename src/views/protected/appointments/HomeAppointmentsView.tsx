import { Calendar, CalendarPlus, History } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import { type MyAppointmentsStackParamList } from "../MyAppointmentsView";

type Navigation = NativeStackNavigationProp<MyAppointmentsStackParamList>

export default function HomeAppointmentsView() {
  const navigation = useNavigation<Navigation>()

  return (
    <View className="pt-9 px-5 gap-4">
      <Text className="text-4xl text-primary font-bold">Turnos</Text>

      <View className="gap-4">
        <TouchableOpacity 
          className="rounded-[20px] flex-row gap-6 items-center bg-secondary border border-primary p-6"
          onPress={() => navigation.navigate('NewAppointment')}
        >
          <CalendarPlus size={20} color="#006A71" />
          <Text className="text-primary text-xl font-medium">Reservar nuevo turno</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="rounded-[20px] flex-row gap-6 items-center bg-secondary/20 border border-primary p-6">
          <Calendar size={20} color="#006A71" />
          <Text className="text-primary text-xl font-medium">Ver turnos próximos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="rounded-[20px] flex-row gap-6 items-center bg-secondary/20 border border-primary p-6">
          <History size={20} color="#006A71" />
          <Text className="text-primary text-xl font-medium">Ver historial de turnos</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}