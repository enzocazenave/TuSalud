import { useState } from "react";
import backend from "../api/backend";

export default function useProfessionals() {
  const [isLoading, setIsLoading] = useState({
    professionalsBySpecialty: false,
    professionalAvailability: false,
    professionalSchedules: false
  })

  const handleLoading = (key: keyof typeof isLoading, value: boolean) => {
    setIsLoading(prev => ({ ...prev, [key]: value }))
  }

  const getProfessionalsBySpecialty = async (specialtyId: number) => {
    try {
      handleLoading('professionalsBySpecialty', true)
      const response = await backend.get(`/specialties/${specialtyId}/professionals`)
      return response.data.data
    } catch (error) {
      return []
    } finally {
      handleLoading('professionalsBySpecialty', false)
    }
  }

  const getProfessionalAvailability = async (professionalId: number, startDate: string, endDate: string) => {
    try {
      const response = await backend.get(
        `/appointments/professionals/${professionalId}/availability`,
        {
          params: {
            startDate,
            endDate
          }
        }
      )
      return response.data.data
    } catch (error) {
      return []
    } finally {
      handleLoading('professionalAvailability', false)
    }
  }

  const getProfessionalSchedules = async (professionalId: number) => {
    try {
      handleLoading('professionalSchedules', true)
      const response = await backend.get(`/schedules/${professionalId}`)
      return response.data.data
    } catch (error) {
      return []
    } finally {
      handleLoading('professionalSchedules', false)
    }
  }
 
  return {
    isLoading,
    handleLoading,
    getProfessionalsBySpecialty,
    getProfessionalAvailability,
    getProfessionalSchedules
  }
}