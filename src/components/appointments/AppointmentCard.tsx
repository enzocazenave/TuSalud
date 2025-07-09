import { View, Text, TouchableOpacity } from "react-native";
import { type PatientAppointment } from "../../types/PatientAppointment";
import { User, Calendar, Clock, Trash } from "lucide-react-native";
import useAppointments from "../../hooks/useAppointments";
import React from "react";
import useConfirmationModal from "../../hooks/useConfirmationModal";
import { formatUtcToLocalDateTime, getUserTimeZone } from "../../utils/date";

interface Props {
  appointment: PatientAppointment;
  hasDeleteButton?: boolean;
  onDelete?: () => void;
  isHistory?: boolean;
}

export default function AppointmentCard({ appointment, hasDeleteButton = false, onDelete, isHistory = false }: Props) {
  const { showConfirmation, Confirmation } = useConfirmationModal()
  const { deleteAppointmentById } = useAppointments()
  const timeZone = getUserTimeZone();

  const formattedDate = formatUtcToLocalDateTime(appointment.date, timeZone, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const formattedStartTime = formatUtcToLocalDateTime(appointment.start_time, timeZone, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone
  });

  const handleDeleteAppointment = async () => {
    const confirmed = await showConfirmation({
      title: "Eliminar turno",
      message: "¿Estás seguro de querer eliminar este turno?",
      confirmText: "Eliminar"
    })

    if (confirmed) {
      await deleteAppointmentById(appointment.id)
      onDelete?.()
    }
  }
  
  return (
    <View className="bg-secondary rounded-[20px] p-5 gap-4 relative">
      {isHistory && (
        <>
          {appointment.appointment_state_id === 1 && (
            <View className="justify-start items-start">
              <Text className="bg-primary w-fit px-3 py-1 rounded-lg text-secondary font-semibold text-lg">Reservado</Text>
            </View>
          )}
          {appointment.appointment_state_id === 2 && (
            <View className="justify-start items-start">
              <Text className="bg-red-500/60 w-fit px-3 py-1 rounded-lg text-black font-semibold text-lg">Cancelado</Text>
            </View>
          )}
          {appointment.appointment_state_id === 3 && (
            <View className="justify-start items-start">
              <Text className="bg-green-500/60 w-fit px-3 py-1 rounded-lg text-black font-semibold text-lg">Completado</Text>
            </View>
          )}
        </>
      )}

      {hasDeleteButton && appointment.appointment_state_id === 1 && (
        <>
          <TouchableOpacity onPress={handleDeleteAppointment} className="absolute top-5 right-5 p-3 rounded-full bg-red-500">
            <Trash size={20} color="#fff" />
          </TouchableOpacity>

          <Confirmation />
        </>
      )}

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