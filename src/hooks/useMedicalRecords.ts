import { useState } from "react"
import backend from "../api/backend"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function useMedicalRecords () {
  const [isLoading, setIsLoading] = useState({
    getMedicalRecords: false,
  })

  const handleLoading = (key: keyof typeof isLoading, value: boolean) => {
    setIsLoading(prev => ({ ...prev, [key]: value }))
  }

  const getMedicalRecords = async () => {
    try {
      handleLoading("getMedicalRecords", true)
      const patientId = await AsyncStorage.getItem("patientId")
      const response = await backend.get(`/medical-records/patients/${patientId}`)
      return response.data.data
    } catch (error) {
      console.error(error)
    } finally {
      handleLoading("getMedicalRecords", false)
    }
  }

  return {
    isLoading,
    getMedicalRecords
  }
}