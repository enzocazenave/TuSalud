import { useState } from "react";
import backend from "../api/backend";

export default function useUser() {
  const [isLoading, setIsLoading] = useState({
    getUserData: false,
    updateUserData: false,
    getUserPrepaids: false,
    updateUserPrepaid: false
  })

  const handleLoading = (key: keyof typeof isLoading, value: boolean) => {
    setIsLoading(prev => ({ ...prev, [key]: value }))
  }
  
  const getUserData = async () => {
    try {
      handleLoading('getUserData', true)
      const response = await backend.get('/user')
      return response.data.data
    } catch (error) {
      console.log(error) //TODO: Handle error
    } finally {
      handleLoading('getUserData', false)
    }
  }

  const getUserPrepaids = async () => {
    try {
      handleLoading('getUserPrepaids', true)
      const response = await backend.get('/user/prepaids')
      return response.data.data
    } catch (error) {
      console.log(error) //TODO: Handle error
    } finally {
      handleLoading('getUserPrepaids', false)
    }
  }

  const updateUserData = async (data: any) => {
    try {
      handleLoading('updateUserData', true)
      
      await backend.patch('/user', data)
    } catch (error) {
      console.log(error) //TODO: Handle error
    } finally {
      handleLoading('updateUserData', false)
    }
  }

  const updateUserPrepaid = async (oldPrepaid: any, newPrepaid: any) => {
    try {
      handleLoading('updateUserPrepaid', true)

      if (oldPrepaid.prepaidId !== -1) {
        await backend.delete('/user/prepaid', {
          data: {
            prepaidId: oldPrepaid.prepaidId
          }
        })
      }

      await backend.post('/user/prepaid', newPrepaid)
    } catch (error) {
      console.log(error) //TODO: Handle error
    } finally {
      handleLoading('updateUserPrepaid', false)
    }

  }

  return {
    getUserData,
    updateUserData,
    getUserPrepaids,
    updateUserPrepaid,
    isLoading
  }
}