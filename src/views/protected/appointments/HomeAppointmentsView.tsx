import { Calendar, CalendarPlus, History } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import { type MyAppointmentsStackParamList } from "./MyAppointmentsView";

type Navigation = NativeStackNavigationProp<MyAppointmentsStackParamList>

export default function HomeAppointmentsView() {
  const navigation = useNavigation<Navigation>()
  const { theme } = useTheme();

  return (
    <View className="pt-9 px-5 gap-4 bg-quaternary dark:bg-darksecondary flex-1">
      <Text className="text-4xl text-primary dark:text-darkprimary font-bold">Turnos</Text>

      <View className="gap-4">
        <TouchableOpacity
          className="rounded-[20px] flex-row gap-6 items-center bg-secondary dark:bg-darktertiary border border-primary dark:border-darkprimary p-6"
          onPress={() => navigation.navigate('NewAppointmentSelectPrepaid')}
        >
          <CalendarPlus size={20} color={theme === 'dark' ? '#5CC8D7' : '#006A71'} />
          <Text className="text-primary dark:text-darkprimary text-xl font-medium">Reservar nuevo turno</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className="rounded-[20px] flex-row gap-6 items-center bg-secondary/20 dark:bg-darktertiary/30 border border-primary dark:border-darkprimary p-6"
          onPress={() => navigation.navigate('NextAppointments')}
        >
          <Calendar size={20} color={theme === 'dark' ? '#5CC8D7' : '#006A71'} />
          <Text className="text-primary dark:text-darkprimary text-xl font-medium">Ver turnos próximos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className="rounded-[20px] flex-row gap-6 items-center bg-secondary/20 dark:bg-darktertiary/30 border border-primary dark:border-darkprimary p-6"
          onPress={() => navigation.navigate('AllAppointments')}
        >
          <History size={20} color={theme === 'dark' ? '#5CC8D7' : '#006A71'} />
          <Text className="text-primary dark:text-darkprimary text-xl font-medium">Ver historial de turnos</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}