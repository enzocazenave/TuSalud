import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Linking } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import GoBackButton from "../../components/ui/GoBackButton";
import useMedicalRecords from "../../hooks/useMedicalRecords";
import { useCallback, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Calendar, FileText, User } from "lucide-react-native";
import { formatUtcToLocalDateTime } from "../../utils/date";
import { useFocusEffect } from "@react-navigation/native";

const renderMedicalRecord = ({ item }: { item: any }) => {
  const { theme } = useTheme();
  const formattedDate = formatUtcToLocalDateTime(item.createdAt)
  
  const openUrl = () => {
    Linking.openURL(item.file_url)
  }
  
  return (
    <View className="bg-secondary dark:bg-darktertiary rounded-[20px] p-5 gap-4 relative">
      <TouchableOpacity onPress={openUrl} className="absolute bottom-2 right-2 p-3 rounded-2xl bg-primary/20 dark:bg-darkprimary/20">
        <FileText size={20} color={theme === 'dark' ? '#5CC8D7' : '#006A71'} />
      </TouchableOpacity>

      <View className="flex-row gap-4 items-start">
        <View className="bg-[#006A71] dark:bg-darkprimary rounded-full p-2">
          <User size={30} color="#9ACBD0" />
        </View>


        <View className="gap-8 justify-between flex-1">
          <View>
            <Text className="text-primary dark:text-darkprimary text-lg font-bold">{item?.professional?.full_name}</Text>
            <Text className="text-primary dark:text-darkprimary text-[15px]">{item?.record}</Text>
          </View>
          
          <View className="flex-row items-center gap-2">
            <Calendar size={15} color={theme === 'dark' ? '#5CC8D7' : '#006A71'} />
            <Text className="text-primary dark:text-darkprimary font-semibold text-md">{formattedDate}</Text>
          </View>
        </View>
      </View>

    </View>
  )
}

export default function MedicalRecordView() {
  const { bottom } = useSafeAreaInsets()
  const { isLoading, getMedicalRecords } = useMedicalRecords()
  const [medicalRecords, setMedicalRecords] = useState<any[]>([])
  const { theme } = useTheme();

  useFocusEffect(
    useCallback(() => {
      getMedicalRecords().then(setMedicalRecords)
    }, [])
  )


  return (
    <View className="pt-9 px-5 gap-4 bg-quaternary dark:bg-darksecondary flex-1">
      <View className="flex-row items-center justify-between">
        <GoBackButton />
        <Text className="text-4xl text-primary dark:text-darkprimary font-bold">Historia clínica</Text>
      </View>

      {isLoading.getMedicalRecords ? (
        <ActivityIndicator size="large" color={theme === 'dark' ? '#5CC8D7' : '#006A71'} />
      ) : (
        <FlatList
          data={medicalRecords}
          renderItem={renderMedicalRecord}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ gap: 16, paddingBottom: bottom + 90 }}
          ListEmptyComponent={() => (
            <Text className="text-primary dark:text-darkprimary text-center">No hay historias clínicas</Text>
          )}
        />
      )}
    </View>
  );
}