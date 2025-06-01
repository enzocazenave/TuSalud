import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import GoBackButton from "../../../components/ui/GoBackButton";
import { useEffect, useState } from "react";
import useSpecialites from "../../../hooks/useSpecialites";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { MyAppointmentsStackParamList } from "./MyAppointmentsView";
import { FlatList } from "react-native-gesture-handler";
import { Check, CircleCheck } from "lucide-react-native";
import { Circle } from "lucide-react-native";
import { useNewAppointment } from "../../../context/NewAppointmentContext";
import Button from "../../../components/ui/Button";
import NewAppointmentStatus from "../../../components/appointments/NewAppointmentStatus";

export default function NewAppointmentSelectSpecialityView() {
  const { navigate } = useNavigation<NavigationProp<MyAppointmentsStackParamList>>()
  const { getSpecialties, isLoading } = useSpecialites()
  const [specialties, setSpecialties] = useState([])
  const { setSpecialty } = useNewAppointment()
  const [selectedSpecialty, setSelectedSpecialty] = useState<any>(null)
  

  useEffect(() => {
    getSpecialties().then(setSpecialties)
  }, [])

  const handleSelectSpecialty = (specialty: any) => {
    setSelectedSpecialty(specialty)
  }

  const handleContinue = () => {
    setSpecialty(selectedSpecialty)
    navigate('NewAppointmentSelectProfessional')
  }

  return (
    <View className="pt-9 px-5 gap-8">
      <View className="flex-row items-center justify-between">
        <GoBackButton callback={() => { setSpecialty({}); setSelectedSpecialty(null) }} />
        <Text className="text-primary text-lg">Paso 2 de 5</Text>
      </View>

      <NewAppointmentStatus />

      <View className="gap-4">
        <Text className="text-3xl text-primary font-bold">Seleccionar especialidad</Text>

        {isLoading.specialties ? (
          <View className="items-center justify-center py-4">
            <ActivityIndicator size="large" color="#006A71" />
          </View>
        ) : (
          <FlatList
            contentContainerClassName="gap-4"
            data={specialties}
            renderItem={({ item }: { item: any }) => (
              <TouchableOpacity
                onPress={() => handleSelectSpecialty(item)}
                className={`flex-row items-center border gap-4 px-4 py-2 ${selectedSpecialty?.id === item?.id ? 'bg-secondary/50 border-primary' : 'bg-secondary/30 border-transparent'}`}
              >
                {selectedSpecialty?.id === item?.id
                  ? <CircleCheck size={20} color="#006A71" />
                  : <Circle size={20} color="#006A71" />
                }
                <Text className="text-primary text-lg">{item?.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <Button 
        disabled={!selectedSpecialty}
        className={!selectedSpecialty ? 'opacity-50 border-primary/50 font-semibold' : ''}
        text="Continuar"
        onPress={handleContinue}
      />
    </View>
  )
}