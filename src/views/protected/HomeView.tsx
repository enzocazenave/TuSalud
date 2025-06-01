import { Text, TouchableOpacity, View } from "react-native";
import AppointmentCard from "../../components/appointments/AppointmentCard";
import useAppointments from "../../hooks/useAppointments";
import { useEffect, useState } from "react";
import { PatientAppointment } from "../../types/PatientAppointment";
import { Plus } from "lucide-react-native";
import WeeklyCalendarAppointments from "../../components/appointments/WeeklyCalendarAppointments";

export default function HomeView() {
  const { getMoreRecentAppointment } = useAppointments()
  const [recentAppointment, setRecentAppointment] = useState<PatientAppointment | null>(null)

  useEffect(() => {
    getMoreRecentAppointment().then(setRecentAppointment)
  }, [])

  const renderRecentAppointmentOrNewAppointment = () => {
    if (recentAppointment) {
      return <AppointmentCard appointment={recentAppointment} />
    }

    return <NewAppointmentCard />
  }

  return (
    <View className="pt-9 px-5 gap-9">
      <View className="gap-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-4xl text-primary font-bold">Próximo Turno</Text>
          <TouchableOpacity>
            <Text className="text-primary">Ver todos</Text>
          </TouchableOpacity>
        </View>
        
        {renderRecentAppointmentOrNewAppointment()}
      </View>
      
      <View className="bg-primary h-[2px] w-full"></View>

      <WeeklyCalendarAppointments />
    </View>
  )
}

const NewAppointmentCard = () => {
  return (
    <TouchableOpacity className="bg-secondary rounded-[20px] items-center justify-center max-h-[140px] h-full">
      <View className="bg-primary rounded-full">
        <Plus size={60} color="#9ACBD0" />
      </View>
    </TouchableOpacity>
  )
}