import { Text, TouchableOpacity, View } from "react-native";
import GoBackButton from "../../../components/ui/GoBackButton";
import useUser from "../../../hooks/useUser";
import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import { useNewAppointment } from "../../../context/NewAppointmentContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Circle, CircleCheck } from "lucide-react-native";
import { MyAppointmentsStackParamList } from "./MyAppointmentsView";
import { useTheme } from "../../../context/ThemeContext";

export default function NewAppointmentSelectPrepaidView() {
  const { navigate } = useNavigation<NavigationProp<MyAppointmentsStackParamList>>();
  const { getUserPrepaids } = useUser();
  const { setPrepaidAffiliation, prepaidAffiliation } = useNewAppointment();
  const { theme } = useTheme();

  const [userPrepaidAffiliation, setUserPrepaidAffiliation] = useState({
    prepaid: {
      name: "",
    },
    number: "",
  });

  useEffect(() => {
    getUserPrepaids().then((data) => {
      if (data.length > 0) {
        setUserPrepaidAffiliation(data[0]);
      }
    });
  }, []);

  const handleSelectPrepaid = (prepaid: any) => {
    setPrepaidAffiliation(prepaid);
  };

  const handleContinue = () => {
    navigate("NewAppointmentSelectSpeciality");
  };

  const iconColor = theme === "dark" ? "#5CC8D7" : "#006A71";

  return (
    <View className="pt-9 px-5 gap-8 bg-quaternary dark:bg-darksecondary flex-1">
      <View className="flex-row items-center justify-between">
        <GoBackButton callback={() => setPrepaidAffiliation({})} />
        <Text className="text-primary dark:text-darkprimary text-lg">Paso 1 de 5</Text>
      </View>

      <View className="gap-4">
        <Text className="text-3xl text-primary dark:text-darkprimary font-bold">Seleccionar cobertura</Text>

        {userPrepaidAffiliation?.prepaid?.name && (
          <TouchableOpacity
            onPress={() => handleSelectPrepaid(userPrepaidAffiliation)}
            className={`flex-row items-center border gap-4 px-4 py-2 rounded-lg 
              ${prepaidAffiliation?.prepaid?.name === userPrepaidAffiliation?.prepaid?.name
                ? "bg-secondary dark:bg-darksecondary border-primary dark:border-darkprimary"
                : "bg-secondary/30 dark:bg-darktertiary/30 border-transparent"}`}
          >
            {prepaidAffiliation?.prepaid?.name === userPrepaidAffiliation?.prepaid?.name ? (
              <CircleCheck size={20} color={iconColor} />
            ) : (
              <Circle size={20} color={iconColor} />
            )}
            <Text className="text-primary dark:text-darkprimary text-lg">
              {userPrepaidAffiliation?.prepaid?.name}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() =>
            handleSelectPrepaid({
              prepaid: {
                name: "Particular",
              },
            })
          }
          className={`flex-row items-center border gap-4 px-4 py-2 rounded-lg 
            ${prepaidAffiliation?.prepaid?.name === "Particular"
              ? "bg-secondary dark:bg-darksecondary border-primary dark:border-darkprimary"
              : "bg-secondary/30 dark:bg-darktertiary/30 border-transparent"}`}
        >
          {prepaidAffiliation?.prepaid?.name === "Particular" ? (
            <CircleCheck size={20} color={iconColor} />
          ) : (
            <Circle size={20} color={iconColor} />
          )}
          <Text className="text-primary dark:text-darkprimary text-lg">Particular</Text>
        </TouchableOpacity>
      </View>

      <Button
        disabled={!prepaidAffiliation?.prepaid?.name}
        className={`${
          !prepaidAffiliation?.prepaid?.name
            ? "opacity-50 border-primary/50 dark:border-darkprimary/50 font-semibold"
            : ""
        }`}
        text="Continuar"
        onPress={handleContinue}
      />
    </View>
  );
}
