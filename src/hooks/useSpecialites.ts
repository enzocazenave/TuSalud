import { useState } from "react"
import backend from "../api/backend"

export default function useSpecialites() {
  const [isLoading, setIsLoading] = useState({
    specialties: false,
  })
  
  const handleLoading = (key: keyof typeof isLoading, value: boolean) => {
    setIsLoading(prev => ({ ...prev, [key]: value }))
  }

  const getSpecialties = async () => {
    try {
      handleLoading('specialties', true)
      const response = await backend.get('/specialties')
      return response.data.data
    } catch (error) {
      console.log(error) //TODO: Handle error
    } finally {
      handleLoading('specialties', false)
    }
  }
  
  return {
    isLoading,
    getSpecialties,
  }
}
