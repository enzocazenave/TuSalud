import { useState } from "react";
import backend from "../api/backend"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { PatientAppointment } from "../types/PatientAppointment"

interface UseAppointments {
  isLoading: {
    moreRecentAppointment: boolean
    appointmentsByDate: boolean
    createAppointment: boolean,
    nextAppointments: boolean,
    deleteAppointment: boolean,
    appointments: boolean
  }

  getMoreRecentAppointment: () => Promise<PatientAppointment>
  getAppointmentsByDate: (date: string) => Promise<PatientAppointment[]>
  createAppointment: (appointment: any) => Promise<PatientAppointment>
  getNextAppointments: () => Promise<PatientAppointment[]>
  deleteAppointmentById: (appointmentId: number) => Promise<void>
  getAppointments: () => Promise<PatientAppointment[]>
}

export default function useAppointments(): UseAppointments {
  const [isLoading, setIsLoading] = useState({
    moreRecentAppointment: false,
    appointmentsByDate: false,
    createAppointment: false,
    nextAppointments: false,
    deleteAppointment: false,
    appointments: false
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
          endDate: date,
          appointmentStateId: 1
        }
      })
      
      const sortedAppointments = response.data.data.sort((a: any, b: any) => 
        a.start_time.localeCompare(b.start_time)
      )

      return sortedAppointments
    } catch (error) {
      console.log(error)
    } finally {
      handleLoading('appointmentsByDate', false)
    }
  }

  const createAppointment = async (appointment: any) => {
    try {
      handleLoading('createAppointment', true)
      const patientId = await AsyncStorage.getItem('patientId');

      const data = {
        ...appointment,
        patientId: parseInt(patientId || '-1')
      }

      const response = await backend.post('/appointments', data)
      return response.data
    } catch (error) {
      console.log(error) //TODO: Handle error
    } finally {
      handleLoading('createAppointment', false)
    }
  }

  const getNextAppointments = async () => {
    try {
      handleLoading('nextAppointments', true)
      const patientId = await AsyncStorage.getItem('patientId');
      const response = await backend.get(`/appointments/patients/${patientId}`, {
        params: {
          startDate: new Date().toISOString().split('T')[0],
          appointmentStateId: 1
        }
      })
      return response.data.data
    } catch (error) {
      console.log(error)
    } finally {
      handleLoading('nextAppointments', false)
    }
  }

  const deleteAppointmentById = async (appointmentId: number) => {
    try {
      handleLoading('deleteAppointment', true)
      
      const response = await backend.delete(`/appointments/${appointmentId}`)
      return response.data
    } catch (error) {
      console.log(error)
    } finally {
      handleLoading('deleteAppointment', false)
    }
  }

  const getAppointments = async () => {
    try {
      handleLoading('appointments', true)
      const patientId = await AsyncStorage.getItem('patientId');
      const response = await backend.get(`/appointments/patients/${patientId}`)
      return response.data.data
    } catch (error) {
      console.log(error)
    } finally {
      handleLoading('appointments', false)
    }
  }

  return {
    getMoreRecentAppointment,
    getAppointmentsByDate,
    createAppointment,
    getNextAppointments,
    deleteAppointmentById,
    getAppointments,
    isLoading
  }
}