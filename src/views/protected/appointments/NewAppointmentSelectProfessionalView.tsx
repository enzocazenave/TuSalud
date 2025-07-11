import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import GoBackButton from "../../../components/ui/GoBackButton";
import { useEffect, useState } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { MyAppointmentsStackParamList } from "./MyAppointmentsView";
import { FlatList } from "react-native-gesture-handler";
import { CircleCheck, Circle } from "lucide-react-native";
import { useNewAppointment } from "../../../context/NewAppointmentContext";
import Button from "../../../components/ui/Button";
import useProfessionals from "../../../hooks/useProfessionals";
import NewAppointmentStatus from "../../../components/appointments/NewAppointmentStatus";
import { useTheme } from "../../../context/ThemeContext";

export default function NewAppointmentSelectProfessionalView() {
  const { navigate } = useNavigation<NavigationProp<MyAppointmentsStackParamList>>();
  const { getProfessionalsBySpecialty, isLoading } = useProfessionals();
  const [professionals, setProfessionals] = useState([]);
  const { setProfessional, specialty } = useNewAppointment();
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
  const { theme } = useTheme();

  useEffect(() => {
    getProfessionalsBySpecialty(specialty?.id).then(setProfessionals);
  }, []);

  const handleSelectProfessional = (professional: any) => {
    setSelectedProfessional(professional);
  };

  const handleContinue = () => {
    setProfessional(selectedProfessional);
    navigate("NewAppointmentSelectDateAndHour");
  };

  const iconColor = theme === "dark" ? "#5CC8D7" : "#006A71";

  return (
    <View className="pt-9 px-5 gap-8 bg-quaternary dark:bg-darksecondary flex-1">
      <View className="flex-row items-center justify-between">
        <GoBackButton callback={() => {
          setProfessional({});
          setSelectedProfessional(null);
        }} />
        <Text className="text-primary dark:text-darkprimary text-lg">Paso 3 de 5</Text>
      </View>

      <NewAppointmentStatus />

      <View className="gap-4">
        <Text className="text-3xl text-primary dark:text-darkprimary font-bold">Seleccionar profesional</Text>

        {isLoading.professionalsBySpecialty ? (
          <View className="items-center justify-center py-4">
            <ActivityIndicator size="large" color={iconColor} />
          </View>
        ) : professionals.length === 0 ? (
          <Text className="text-primary dark:text-darkprimary text-lg">No hay profesionales disponibles</Text>
        ) : (
          <FlatList
            contentContainerClassName="gap-4"
            data={professionals}
            renderItem={({ item }: { item: any }) => (
              <TouchableOpacity
                onPress={() => handleSelectProfessional(item)}
                className={`flex-row items-center border gap-4 px-4 py-2 rounded-lg 
                  ${selectedProfessional?.id === item?.id
                    ? "bg-secondary dark:bg-darksecondary border-primary dark:border-darkprimary"
                    : "bg-secondary/30 dark:bg-darktertiary/30 border-transparent"
                  }`}
              >
                {selectedProfessional?.id === item?.id ? (
                  <CircleCheck size={20} color={iconColor} />
                ) : (
                  <Circle size={20} color={iconColor} />
                )}
                <Text className="text-primary dark:text-darkprimary text-lg">{item?.full_name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <Button
        disabled={!selectedProfessional}
        className={!selectedProfessional
          ? "opacity-50 border-primary/50 dark:border-darkprimary/50 font-semibold"
          : ""}
        text="Continuar"
        onPress={handleContinue}
      />
    </View>
  );
}
