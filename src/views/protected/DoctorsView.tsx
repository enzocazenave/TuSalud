import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import GoBackButton from "../../components/ui/GoBackButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import useSpecialites from "../../hooks/useSpecialites";
import { useEffect } from "react";
import Dropdown from "../../components/ui/Dropdown";
import useProfessionals from "../../hooks/useProfessionals";
import { User } from "lucide-react-native";
import { formatUtcToLocalDateTime, getUserTimeZone } from "../../utils/date";

export default function DoctorsView() {
  const { bottom } = useSafeAreaInsets();
  const { theme } = useTheme();

  console.log(theme)

  const [specialties, setSpecialties] = useState<any[]>([]);

  const { isLoading, getSpecialties } = useSpecialites();

  useEffect(() => {
    getSpecialties().then(setSpecialties)
  }, [])

  return (
    <View className="pt-9 px-5 gap-4 bg-quaternary dark:bg-darksecondary flex-1">
      <View className="flex-row items-center justify-between">
        <GoBackButton />
        <Text className="text-4xl text-primary dark:text-darkprimary font-bold">Cartilla</Text>
      </View>

      {isLoading.specialties ? (
        <ActivityIndicator size="large" color={theme === 'dark' ? '#5CC8D7' : '#006A71'} />
      ) : (
        <FlatList
          data={specialties}
          renderItem={({ item }) => <SpecialtyItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ gap: 16, paddingBottom: bottom + 90 }}
          ListEmptyComponent={() => (
            <Text className="text-primary dark:text-darkprimary text-center">No hay especialidades</Text>
          )}
        />
      )}
    </View>
  )
}

const SpecialtyItem = ({ item }: { item: any }) => {
  const { theme } = useTheme();
  const { isLoading, getProfessionalsBySpecialty } = useProfessionals();
  const [professionals, setProfessionals] = useState<any[]>([]);

  useEffect(() => {
    getProfessionalsBySpecialty(item.id).then(setProfessionals)
  }, [item.id])

  return (
    <Dropdown label={item.name}>
      {isLoading.professionalsBySpecialty ? (
        <ActivityIndicator size="large" color={theme === 'dark' ? '#5CC8D7' : '#006A71'} />
      ) : (
        <FlatList
          data={professionals}
          renderItem={({ item }) => <ProfessionalItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ gap: 16 }}
          ListEmptyComponent={() => (
            <Text className="text-primary dark:text-darkprimary text-center">No hay profesionales</Text>
          )}
        />
      )}
    </Dropdown>
  )
}

const ProfessionalItem = ({ item }: { item: any }) => {
  const { theme } = useTheme();
  const { isLoading, getProfessionalSchedules } = useProfessionals();
  const [schedules, setSchedules] = useState<any[]>([]);

  const timeZone = getUserTimeZone();

  useEffect(() => {
    getProfessionalSchedules(item.id).then((professionalSchedules) => {
      const daysOrder = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
      const sortedSchedules = professionalSchedules.sort((a: any, b: any) => {
        return daysOrder.indexOf(a.day_of_week) - daysOrder.indexOf(b.day_of_week);
      });
      setSchedules(sortedSchedules);
    })
  }, [item.id])

  return (
    <View className="p-5 gap-2">
      <Text className="text-primary dark:text-darkprimary text-lg font-bold">{item.full_name}</Text>

      <View>
        <Text className="text-primary dark:text-darkprimary text-lg font-semibold">Horarios</Text>

        {isLoading.professionalSchedules ? (
          <ActivityIndicator size="small" color={theme === 'dark' ? '#5CC8D7' : '#006A71'} />
        ) : (
          <View>
            {schedules.map(schedule => {
              const formattedStartTime = formatUtcToLocalDateTime(schedule.start_time, timeZone, {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone
              });

              const formattedEndTime = formatUtcToLocalDateTime(schedule.end_time, timeZone, {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone
              });

              return (
                <View key={schedule.id} className="flex-row items-center justify-between">
                  <Text className="text-tertiary dark:text-darkprimary text-lg font-semibold">{schedule.day_of_week}</Text>
                  <Text className="text-tertiary dark:text-darkprimary text-lg">{formattedStartTime} - {formattedEndTime}</Text>
                </View>
              )
            })}
          </View>
        )}
      </View>
    </View>
  )
}