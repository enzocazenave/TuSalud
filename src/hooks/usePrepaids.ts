import { useState } from "react"
import backend from "../api/backend"

export default function usePrepaids() {
  const [isLoading, setIsLoading] = useState({
    prepaids: false
  })

  const handleLoading = (key: keyof typeof isLoading, value: boolean) => {
    setIsLoading(prev => ({ ...prev, [key]: value }))
  }

  const getPrepaids = async () => {
    try {
      handleLoading('prepaids', true)
      const response = await backend.get('/prepaids')
      return response.data.data
    } catch (error) {
      console.log(error) //TODO: Handle error
    } finally {
      handleLoading('prepaids', false)
    }
  }

  return {
    getPrepaids,
    isLoading
  }
}