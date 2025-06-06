import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Dropdown from "../../components/ui/Dropdown";
import Input from "../../components/ui/Input";
import { useEffect, useState } from "react";
import React from "react";
import useUser from "../../hooks/useUser";
import { Check, ChevronDown, ChevronUp, Icon, Save } from "lucide-react-native";
import SelectDropdown from "react-native-select-dropdown";
import usePrepaids from "../../hooks/usePrepaids";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

export default function ProfileView() {
  const { bottom } = useSafeAreaInsets()
  const { theme } = useTheme()
  const { getUserData, updateUserData, updateUserPrepaid, getUserPrepaids, isLoading } = useUser()
  const { getPrepaids, isLoading: isLoadingPrepaids } = usePrepaids()
  const [prepaids, setPrepaids] = useState<any[]>([])

  const [initialData, setInitialData] = useState({
    fullName: "",
    phoneNumber: "", 
    dni: "",
    plan: "",
    number: "",
    prepaidId: -1
  })

  const [personalData, setPersonalData] = useState({
    fullName: "",
    phoneNumber: "",
    dni: "",
    plan: "",
    number: "",
    prepaidId: -1
  })

  useEffect(() => {
    getUserData().then(data => {
      const newData = {
        dni: data.dni || "",
        phoneNumber: data.phone_number || "",
        fullName: data.full_name || ""
      }
      
      setInitialData(prev => ({ ...prev, ...newData }))
      setPersonalData(prev => ({ ...prev, ...newData }))
    })
  }, [])

  useEffect(() => {
    getUserPrepaids().then(data => {
      const firstAffiliation = data[0]

      if (!firstAffiliation) return

      const newData = {
        prepaidId: firstAffiliation.prepaid.id,
        plan: firstAffiliation.plan,
        number: firstAffiliation.number
      }

      setPersonalData(prev => ({ ...prev, ...newData }))
      setInitialData(prev => ({ ...prev, ...newData }))
    })
  }, [])

  useEffect(() => {
    getPrepaids().then(data => {
      setPrepaids(data)
    })
  }, [])


  const handleChangePersonalData = (field: string, value: string) => {
    setPersonalData(prev => ({ ...prev, [field]: value }))
  }

  const hasPersonalDataChanges = () => 
    initialData.fullName !== personalData.fullName ||
    initialData.phoneNumber !== personalData.phoneNumber ||
    initialData.dni !== personalData.dni

  const hasPrepaidDataChanges = () =>
    initialData.prepaidId !== personalData.prepaidId ||
    initialData.plan !== personalData.plan ||
    initialData.number !== personalData.number
  
  const handleSaveChanges = async () => {
    if (hasPersonalDataChanges()) {
      await updateUserData({
        fullName: personalData.fullName,
        phoneNumber: personalData.phoneNumber,
        dni: personalData.dni
      })
    }

    if (hasPrepaidDataChanges()) {
      await updateUserPrepaid(
        { prepaidId: initialData.prepaidId, plan: initialData.plan, number: initialData.number },
        { prepaidId: personalData.prepaidId, plan: personalData.plan, number: personalData.number }
      )
    }

    setInitialData(personalData)
  }

  return (
    <ScrollView className="bg-quaternary dark:bg-darksecondary" contentContainerClassName="pt-9 px-5 gap-4" contentContainerStyle={{ paddingBottom: bottom + 60 }}>
      <Text className="text-4xl text-primary dark:text-darkprimary font-bold">Mi Perfil</Text>
      <Dropdown label="Datos Personales">
        {isLoading.getUserData ? (
          <ActivityIndicator size="large" color="#006A71" />
        ) : (
          <View className="px-5 py-4 bg-quaternary dark:bg-darktertiary gap-3">
            <Input label="Nombre Completo" value={personalData.fullName} onChange={handleChangePersonalData} name="fullName" />
            <Input label="DNI" value={personalData.dni} onChange={handleChangePersonalData} name="dni" />
            <Input label="Teléfono" value={personalData.phoneNumber} onChange={handleChangePersonalData} name="phoneNumber" />
          </View>
        )}
      </Dropdown>

      <Dropdown label="Obra Social">
        <View className="px-5 py-4 bg-quaternary dark:bg-darktertiary gap-3">
          <SelectDropdown
            data={prepaids}
            defaultValue={prepaids.find(prepaid => prepaid.id === personalData.prepaidId)}
            onSelect={(selectedItem) => {
              setPersonalData((prev) => ({
                ...prev,
                prepaidId: parseInt(selectedItem.id)
              }))
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View className="flex-row items-center gap-2 w-full justify-between bg-secondary dark:bg-darktertiary border border-primary dark:border-darkprimary px-4 py-3 rounded-lg">
                  <Text className="text-primary dark:text-darkprimary">{selectedItem ? selectedItem.name : 'Selecciona una obra social'}</Text>
                  {isOpened
                    ? <ChevronUp size={25} color="#006A71" />
                    : <ChevronDown size={25} color="#006A71" />
                  }
                </View>
              );
            }}
            renderItem={(selectedItem, _, isSelected) => {
              return (
                <View className={`px-4 py-3 border-b border-primary dark:border-darkprimary flex-row justify-between items-center gap-4 ${isSelected ? 'bg-tertiary dark:bg-darkprimary' : ''}`}>
                  <Text className={`text-primary dark:text-darkprimary font-semibold ${isSelected ? 'text-white' : ''}`}>{selectedItem.name}</Text>
                  {isSelected && <View className="p-1 bg-primary rounded-full items-center justify-center"><Check size={10} color="#FFF" /></View>}
                </View>
              )
            }}
            statusBarTranslucent={true}
            dropdownStyle={{
              borderRadius: 10,
              backgroundColor: theme === 'dark' ? '#1F2937' : '#9ACBD0'
            }}
          />
          <Input label="Plan Médico" value={personalData.plan} onChange={handleChangePersonalData} name="plan" />
          <Input label="Número de Afiliado" value={personalData.number} onChange={handleChangePersonalData} name="number" />
        </View>
      </Dropdown>

      <TouchableOpacity 
        disabled={
          isLoading.getUserData ||
          isLoading.updateUserData || 
          isLoading.updateUserPrepaid || 
          (!hasPersonalDataChanges() && !hasPrepaidDataChanges())
        } 
        onPress={handleSaveChanges} 
        className={`
          rounded-lg px-5 py-4 flex-row items-center gap-2 justify-center transition-colors 
          ${hasPersonalDataChanges() || hasPrepaidDataChanges() ? 'bg-primary' : 'bg-primary/30'}
        `}
      >
        {isLoading.updateUserData ? (
          <ActivityIndicator size={25} color="#006A71" />
        ) : (
          <>
            <Save size={25} color="white" />
            <Text className="text-white text-2xl font-semibold">
              Guardar cambios
            </Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  )
}