import { useState } from "react";
import backend from "../api/backend";

export default function useUser() {
  const [isLoading, setIsLoading] = useState({
    userData: false
  })

  const handleLoading = (key: keyof typeof isLoading, value: boolean) => {
    setIsLoading(prev => ({ ...prev, [key]: value }))
  }
  
  const getUserData = async () => {
    try {
      handleLoading('userData', true)
      const response = await backend.get('/user')
      return response.data.data
    } catch (error) {
      console.log(error) //TODO: Handle error
    } finally {
      handleLoading('userData', false)
    }
  }

  return {
    getUserData,
    isLoading
  }
}