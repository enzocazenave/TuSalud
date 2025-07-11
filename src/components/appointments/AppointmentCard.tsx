import { View, Text, TouchableOpacity } from "react-native";
import { type PatientAppointment } from "../../types/PatientAppointment";
import { User, Calendar, Clock, Trash } from "lucide-react-native";
import useAppointments from "../../hooks/useAppointments";
import React from "react";
import useConfirmationModal from "../../hooks/useConfirmationModal";
import { formatUtcToLocalDateTime, getUserTimeZone } from "../../utils/date";
import { useTheme } from "../../context/ThemeContext";

interface Props {
  appointment: PatientAppointment;
  hasDeleteButton?: boolean;
  onDelete?: () => void;
  isHistory?: boolean;
}

export default function AppointmentCard({
  appointment,
  hasDeleteButton = false,
  onDelete,
  isHistory = false,
}: Props) {
  const { showConfirmation, Confirmation } = useConfirmationModal();
  const { deleteAppointmentById } = useAppointments();
  const timeZone = getUserTimeZone();
  const { theme } = useTheme();

  const iconColor = theme === "dark" ? "#5CC8D7" : "#9ACBD0";
  const userIconBg = theme === "dark" ? "#5CC8D7" : "#006A71";
  const textColor = theme === "dark" ? "text-darkprimary" : "text-primary";
  const badgeTextColor = theme === "dark" ? "text-black" : "text-black";
  const badgeBackgroundColor = (id: number) => {
    if (id === 1) return "bg-darkprimary"; 
    if (id === 2) return "bg-red-500/60";
    if (id === 3) return "bg-green-500/60";
    return "";
  };

  const formattedDate = formatUtcToLocalDateTime(appointment.date, 'UTC', {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedStartTime = formatUtcToLocalDateTime(appointment.start_time, timeZone, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  });

  const handleDeleteAppointment = async () => {
    const confirmed = await showConfirmation({
      title: "Eliminar turno",
      message: "¿Estás seguro de querer eliminar este turno?",
      confirmText: "Eliminar",
    });

    if (confirmed) {
      await deleteAppointmentById(appointment.id);
      onDelete?.();
    }
  };

  return (
    <View className="bg-secondary dark:bg-darktertiary rounded-[20px] p-5 gap-4 relative">
      {isHistory && (
        <View className="justify-start items-start">
          <Text
            className={`${badgeBackgroundColor(
              appointment.appointment_state_id
            )} w-fit px-3 py-1 rounded-lg ${badgeTextColor} font-semibold text-lg`}
          >
            {appointment.appointment_state_id === 1 && "Reservado"}
            {appointment.appointment_state_id === 2 && "Cancelado"}
            {appointment.appointment_state_id === 3 && "Completado"}
          </Text>
        </View>
      )}

      {hasDeleteButton && appointment.appointment_state_id === 1 && (
        <>
          <TouchableOpacity
            onPress={handleDeleteAppointment}
            className="absolute top-5 right-5 p-3 rounded-full bg-red-500"
          >
            <Trash size={20} color="#fff" />
          </TouchableOpacity>

          <Confirmation />
        </>
      )}

      <View className="flex-row gap-4 items-center">
        <View className="bg-primary dark:bg-darkprimary rounded-full p-2">
          <User size={30} color="#fff" />
        </View>


        <View>
          <Text className={`text-lg font-bold ${textColor}`}>
            {appointment?.professional?.full_name}
          </Text>
          <Text className={`text-[15px] ${textColor}`}>
            {appointment?.specialty?.name}
          </Text>
        </View>
      </View>

      <View className="bg-tertiary dark:bg-darksecondary flex-row items-center rounded-[20px] p-3 justify-between">
        <View className="flex-row items-center gap-2">
          <Calendar size={20} color={iconColor} />
          <Text className="text-white text-md">{formattedDate}</Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Clock size={20} color={iconColor} />
          <Text className="text-white text-md">{formattedStartTime}</Text>
        </View>
      </View>
    </View>
  );
}
