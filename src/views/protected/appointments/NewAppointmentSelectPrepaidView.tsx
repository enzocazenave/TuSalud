import { Text, TouchableOpacity, View } from "react-native";
import GoBackButton from "../../../components/ui/GoBackButton";
import useUser from "../../../hooks/useUser";
import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import { useNewAppointment } from "../../../context/NewAppointmentContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Circle, CircleCheck } from "lucide-react-native";
import { MyAppointmentsStackParamList } from "./MyAppointmentsView";

export default function NewAppointmentSelectPrepaidView() {
  const { navigate } = useNavigation<NavigationProp<MyAppointmentsStackParamList>>()
  const { getUserPrepaids} = useUser()
  const { setPrepaidAffiliation, prepaidAffiliation } = useNewAppointment()

  const [userPrepaidAffiliation, setUserPrepaidAffiliation] = useState({
    prepaid: {
      name: "",
    },  
    number: "",
  })

  useEffect(() => {
    getUserPrepaids().then(data => {
      if (data.length > 0) {
        setUserPrepaidAffiliation(data[0])
      }
    })
  }, [])

  const handleSelectPrepaid = (prepaid: any) => {
    setPrepaidAffiliation(prepaid)
  }

  const handleContinue = () => {
    navigate('NewAppointmentSelectSpeciality')
  }

  return (
    <View className="pt-9 px-5 gap-8">
      <View className="flex-row items-center justify-between">
        <GoBackButton callback={() => setPrepaidAffiliation({})} />
        <Text className="text-primary text-lg">Paso 1 de 5</Text>
      </View>

      <View className="gap-4">
        <Text className="text-3xl text-primary font-bold">Seleccionar cobertura</Text>

        {
          userPrepaidAffiliation?.prepaid?.name && (
            <TouchableOpacity 
              onPress={() => handleSelectPrepaid(userPrepaidAffiliation)} 
              className={`flex-row items-center border gap-4 px-4 py-2 ${prepaidAffiliation?.prepaid?.name === userPrepaidAffiliation?.prepaid?.name ? 'bg-secondary/50 border-primary' : 'bg-secondary/30 border-transparent'}`}
            >
              {prepaidAffiliation?.prepaid?.name === userPrepaidAffiliation?.prepaid?.name
                ? <CircleCheck size={20} color="#006A71" />
                : <Circle size={20} color="#006A71" />
              }

              <Text className="text-primary text-lg">{userPrepaidAffiliation?.prepaid?.name}</Text>
            </TouchableOpacity>
          )
        }

        <TouchableOpacity 
          onPress={() => handleSelectPrepaid({
            prepaid: {
              name: "Particular",
            },
          })} 
          className={`flex-row items-center border gap-4 px-4 py-2 ${prepaidAffiliation?.prepaid?.name === 'Particular' ? 'bg-secondary/50 border-primary' : 'bg-secondary/30 border-transparent'}`}
        >
          {prepaidAffiliation?.prepaid?.name === 'Particular'
            ? <CircleCheck size={20} color="#006A71" />
            : <Circle size={20} color="#006A71" />
          }
          
          <Text className="text-primary text-lg">Particular</Text>
        </TouchableOpacity>
      </View>

      <Button 
        disabled={!prepaidAffiliation?.prepaid?.name} 
        className={`${!prepaidAffiliation?.prepaid?.name ? 'opacity-50 border-primary/50 font-semibold' : ''}`} 
        text="Continuar" 
        onPress={handleContinue} 
      />
    </View>
  )
}