import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Linking } from "react-native";
import GoBackButton from "../../components/ui/GoBackButton";
import useMedicalRecords from "../../hooks/useMedicalRecords";
import { useCallback, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Calendar, FileText, User } from "lucide-react-native";
import { formatUtcToLocalDateTime } from "../../utils/date";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext";

const MedicalRecordItem = ({ item, theme }: { item: any; theme: string }) => {
  const formattedDate = formatUtcToLocalDateTime(item.createdAt);

  const openUrl = () => {
    Linking.openURL(item.file_url);
  };

  const iconBg = theme === "dark" ? "#9ACBD0" : "#006A71";
  const iconColor = theme === "dark" ? "#002B31" : "#9ACBD0";
  const calendarColor = theme === "dark" ? "#9ACBD0" : "#006A71";

  return (
    <View className="bg-secondary dark:bg-darktertiary rounded-[20px] p-5 gap-4 relative">
      <TouchableOpacity onPress={openUrl} className="absolute bottom-2 right-2 p-3 rounded-2xl bg-primary/20 dark:bg-darkprimary/20">
        <FileText size={20} color={calendarColor} />
      </TouchableOpacity>  

      <View className="flex-row gap-4 items-start">
        <View style={{ backgroundColor: iconBg }} className="rounded-full p-2">
          <User size={30} color={iconColor} />
        </View>

        <View className="gap-8 justify-between flex-1">
          <View>
            <Text className="text-primary dark:text-darkprimary text-lg font-bold">
              {item?.professional?.full_name}
            </Text>
            <Text className="text-primary dark:text-darkprimary text-[15px]">
              {item?.record}
            </Text>
          </View>

          <View className="flex-row items-center gap-2">
            <Calendar size={15} color={calendarColor} />
            <Text className="text-primary dark:text-darkprimary font-semibold text-md">
              {formattedDate}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function MedicalRecordView() {
  const { theme } = useTheme();
  const { bottom } = useSafeAreaInsets()
  const { isLoading, getMedicalRecords } = useMedicalRecords()
  const [medicalRecords, setMedicalRecords] = useState<any[]>([])

  useFocusEffect(
    useCallback(() => {
      getMedicalRecords().then(setMedicalRecords)
    }, [])
  )

  return (
    <View className="pt-9 px-5 gap-4 bg-quaternay dark:bg-darksecondary flex-1">
      <View className="flex-row items-center justify-between">
        <GoBackButton />
        <Text className="text-4xl text-primary font-bold dark:text-darkprimary">Historia Clínica</Text>
      </View>

      {isLoading.getMedicalRecords ? (
        <ActivityIndicator size="large" color="#006A71" />
      ) : (
        <FlatList
          data={medicalRecords}
          renderItem={({ item }: { item: any }) => (
            <MedicalRecordItem item={item} theme={theme} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ gap: 16, paddingBottom: bottom + 90 }}
          ListEmptyComponent={() => (
            <Text className="text-primary text-center">No hay historias clínicas</Text>
          )}
        />
      )}
    </View>
  );
}