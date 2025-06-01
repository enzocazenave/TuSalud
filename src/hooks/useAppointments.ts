import { useState } from "react";
import backend from "../api/backend"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { PatientAppointment } from "../types/PatientAppointment"

interface UseAppointments {
  isLoading: {
    moreRecentAppointment: boolean
    appointmentsByDate: boolean
  }
  getMoreRecentAppointment: () => Promise<PatientAppointment>
  getAppointmentsByDate: (date: string) => Promise<PatientAppointment[]>
}

export default function useAppointments(): UseAppointments {
  const [isLoading, setIsLoading] = useState({
    moreRecentAppointment: false,
    appointmentsByDate: false
  })

  const handleLoading = (key: keyof typeof isLoading, value: boolean) => {
    setIsLoading(prev => ({ ...prev, [key]: value }))
  }

  const getMoreRecentAppointment = async () => {
    try {
      handleLoading('moreRecentAppointment', true)
      const patientId = await AsyncStorage.getItem('patientId');
      const response = await backend.get(`/appointments/patients/${patientId}/more-recent`)
      return response.data.data
    } catch (error) {
      console.log(error) //TODO: Handle error
    } finally {
      handleLoading('moreRecentAppointment', false)
    }
  }

  const getAppointmentsByDate = async (date: string) => {
    try {
      handleLoading('appointmentsByDate', true)
      const patientId = await AsyncStorage.getItem('patientId');
      const response = await backend.get(`/appointments/patients/${patientId}`, {
        params: {
          startDate: date,
          endDate: date
        }
      })
      return response.data.data
    } catch (error) {
      console.log(error) //TODO: Handle error
    } finally {
      handleLoading('appointmentsByDate', false)
    }
  }

  return {
    getMoreRecentAppointment,
    getAppointmentsByDate,
    isLoading
  }
}