import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import Dropdown from "../../components/ui/Dropdown";
import Input from "../../components/ui/Input";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { Save } from "lucide-react-native";

export default function ProfileView() {
  const { getUserData, isLoading } = useUser()

  const [initialData, setInitialData] = useState({
    fullName: "",
    phoneNumber: "", 
    dni: ""
  })

  const [personalData, setPersonalData] = useState({
    fullName: "",
    phoneNumber: "",
    dni: ""
  })

  const handleChangePersonalData = (field: string, value: string) => {
    setPersonalData(prev => ({ ...prev, [field]: value }))
  }

  const hasChanges = () => {
    return initialData.fullName !== personalData.fullName ||
           initialData.phoneNumber !== personalData.phoneNumber ||
           initialData.dni !== personalData.dni
  }

  const handleSaveChanges = () => {}

  useEffect(() => {
    getUserData().then(data => {
      const newData = {
        dni: data.dni || "",
        phoneNumber: data.phone_number || "",
        fullName: data.full_name || ""
      }
      
      setInitialData(newData)
      setPersonalData(newData)
    })
  }, [])

  return (
    <View className="pt-9 px-5 gap-4">
      <Text className="text-4xl text-primary font-bold">Mi Perfil</Text>
      <Dropdown label="Datos Personales">
        {isLoading.userData ? (
          <ActivityIndicator size="large" color="#006A71" />
        ) : (
          <View className="px-5 py-4 bg-quaternary gap-3">
            <Input label="Nombre Completo" value={personalData.fullName} onChange={handleChangePersonalData} name="fullName" />
            <Input label="DNI" value={personalData.dni} onChange={handleChangePersonalData} name="dni" />
            <Input label="Teléfono" value={personalData.phoneNumber} onChange={handleChangePersonalData} name="phoneNumber" />
          </View>
        )}
      </Dropdown>

      <Dropdown label="Obra Social">
        <View className="px-5 py-4 bg-quaternary gap-3">
          
        </View>
      </Dropdown>

      <TouchableOpacity 
        disabled={isLoading.userData || !hasChanges()} 
        onPress={handleSaveChanges} 
        className={`rounded-lg px-5 py-4 flex-row items-center gap-2 justify-center transition-colors ${hasChanges() ? 'bg-primary' : 'bg-primary/30'}`}
      >
        <Save size={25} color="white" />
        <Text className="text-white text-2xl font-semibold">
          Guardar cambios
        </Text>
      </TouchableOpacity>
    </View>
  )
}