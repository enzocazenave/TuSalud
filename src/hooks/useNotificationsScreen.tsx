import { useCallback, useState } from "react";
import backend from "../api/backend";
import { useFocusEffect } from "@react-navigation/native";

interface Notification {
  id: number;
  read: boolean;
  message: string;
  user_id: number;
}

export default function useNotificationsScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState<Notification[]>([])

  useFocusEffect(
    useCallback(() => {
      const fetchNotifications = async () => {
        try {
          const response = await backend.get('/notifications')
          console.log('Notifications fetched:', response.data.data)
          setNotifications(response.data.data)
        } catch (error) {
          console.error('Error fetching notifications:', error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchNotifications()
    }, [])
  )

  const markAsRead = async (notificationId: number) => {
    try {
      setNotifications(prevNotifications => prevNotifications.filter((notification: any) => notification.id !== notificationId))
      await backend.post(`/notifications/${notificationId}/read`)
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  return {
    isLoading,
    notifications,
    markAsRead
  }
}
