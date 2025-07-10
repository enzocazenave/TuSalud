import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import GoBackButton from "../../../components/ui/GoBackButton";
import { useEffect, useState } from "react";
import useSpecialites from "../../../hooks/useSpecialites";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { MyAppointmentsStackParamList } from "./MyAppointmentsView";
import { FlatList } from "react-native-gesture-handler";
import { CircleCheck, Circle } from "lucide-react-native";
import { useNewAppointment } from "../../../context/NewAppointmentContext";
import Button from "../../../components/ui/Button";
import NewAppointmentStatus from "../../../components/appointments/NewAppointmentStatus";
import { useTheme } from "../../../context/ThemeContext";

export default function NewAppointmentSelectSpecialityView() {
  const { navigate } = useNavigation<NavigationProp<MyAppointmentsStackParamList>>();
  const { getSpecialties, isLoading } = useSpecialites();
  const [specialties, setSpecialties] = useState([]);
  const { setSpecialty } = useNewAppointment();
  const [selectedSpecialty, setSelectedSpecialty] = useState<any>(null);
  const { theme } = useTheme();

  useEffect(() => {
    getSpecialties().then(setSpecialties);
  }, []);

  const handleSelectSpecialty = (specialty: any) => {
    setSelectedSpecialty(specialty);
  };

  const handleContinue = () => {
    setSpecialty(selectedSpecialty);
    navigate("NewAppointmentSelectProfessional");
  };

  const iconColor = theme === "dark" ? "#5CC8D7" : "#006A71";

  return (
    <View className="pt-9 px-5 gap-8 bg-quaternary dark:bg-darksecondary flex-1">
      <View className="flex-row items-center justify-between">
        <GoBackButton callback={() => {
          setSpecialty({});
          setSelectedSpecialty(null);
        }} />
        <Text className="text-primary dark:text-darkprimary text-lg">Paso 2 de 5</Text>
      </View>

      <NewAppointmentStatus />

      <View className="gap-4">
        <Text className="text-3xl text-primary dark:text-darkprimary font-bold">Seleccionar especialidad</Text>

        {isLoading.specialties ? (
          <View className="items-center justify-center py-4">
            <ActivityIndicator size="large" color={iconColor} />
          </View>
        ) : (
          <FlatList
            contentContainerClassName="gap-4"
            data={specialties}
            renderItem={({ item }: { item: any }) => (
              <TouchableOpacity
                onPress={() => handleSelectSpecialty(item)}
                className={`flex-row items-center border gap-4 px-4 py-2 rounded-lg 
                  ${selectedSpecialty?.id === item?.id
                    ? "bg-secondary dark:bg-darksecondary border-primary dark:border-darkprimary"
                    : "bg-secondary/30 dark:bg-darktertiary/30 border-transparent"
                  }`}
              >
                {selectedSpecialty?.id === item?.id ? (
                  <CircleCheck size={20} color={iconColor} />
                ) : (
                  <Circle size={20} color={iconColor} />
                )}
                <Text className="text-primary dark:text-darkprimary text-lg">{item?.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <Button
        disabled={!selectedSpecialty}
        className={!selectedSpecialty
          ? "opacity-50 border-primary/50 dark:border-darkprimary/50 font-semibold"
          : ""}
        text="Continuar"
        onPress={handleContinue}
      />
    </View>
  );
}
