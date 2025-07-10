import { Text, TouchableOpacity, View } from "react-native";
import AppointmentCard from "../../components/appointments/AppointmentCard";
import useAppointments from "../../hooks/useAppointments";
import { useCallback, useState } from "react";
import { PatientAppointment } from "../../types/PatientAppointment";
import { Plus } from "lucide-react-native";
import WeeklyCalendarAppointments from "../../components/appointments/WeeklyCalendarAppointments";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../../navigators/BottomTabNavigator";
import { useTheme } from "../../context/ThemeContext";

export default function HomeView() {
  const navigation = useNavigation<NativeStackNavigationProp<BottomTabParamList>>();
  const { getMoreRecentAppointment } = useAppointments();
  const [recentAppointment, setRecentAppointment] = useState<PatientAppointment | null>(null);

  useFocusEffect(
    useCallback(() => {
      getMoreRecentAppointment().then(setRecentAppointment);
    }, [])
  );

  const renderRecentAppointmentOrNewAppointment = () => {
    if (recentAppointment) {
      return <AppointmentCard appointment={recentAppointment} />;
    }

    return <NewAppointmentCard />;
  };

  return (
    <View className="pt-9 px-5 gap-9 flex-1 bg-quaternary dark:bg-darksecondary">
      <View className="gap-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-4xl text-primary dark:text-darkprimary font-bold">Próximo Turno</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('MyAppointments', { screen: 'NextAppointments', initial: false }) }}>
            <Text className="text-primary dark:text-darkprimary">Ver todos</Text>
          </TouchableOpacity>
        </View>

        {renderRecentAppointmentOrNewAppointment()}
      </View>

      <View className="bg-primary dark:bg-darkprimary h-[2px] w-full" />

      <WeeklyCalendarAppointments />
    </View>
  );
}

const NewAppointmentCard = () => {
  const { theme } = useTheme();
  const { navigate } = useNavigation<NativeStackNavigationProp<BottomTabParamList>>();

  const handlePress = () => {
    navigate(
      'MyAppointments',
      {
        screen: 'NewAppointmentSelectPrepaid',
        initial: false
      }
    );
  };

  return (
    <TouchableOpacity
      className="bg-secondary dark:bg-darktertiary rounded-[20px] items-center justify-center h-[140px]"
      onPress={handlePress}
    >
      <View className="bg-primary dark:bg-darkprimary rounded-full p-3">
        <Plus size={60} color={theme === 'dark' ? '#006A71' : '#9ACBD0'} />
      </View>
    </TouchableOpacity>
  );
};