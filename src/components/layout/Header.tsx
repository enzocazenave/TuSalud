import { View, TouchableOpacity, Image, Text } from "react-native";
import { Bell, MenuIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import messaging from '@react-native-firebase/messaging';

export default function Header({ navigation }: { navigation: any }) {
  const [showNotificationBadge, setShowNotificationBadge] = useState(true)
  const isNotificationsRoute = navigation.getState().routes[navigation.getState().index].name !== 'Notifications';

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async () => {
      setShowNotificationBadge(true)
    })

    if (isNotificationsRoute) {
      setShowNotificationBadge(false)
    }

    return unsubscribe
  }, [isNotificationsRoute])


  return (
    <View
      className="bg-secondary py-[10px] flex-row justify-between items-center px-4 border-b border-b-primary" 
      style={{ 
        elevation: 10, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3.84 
      }}
    >
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <MenuIcon size={40} color="#006A71" stroke="#006A71" />
      </TouchableOpacity>

      <View className="bg-primary rounded-full">
        <Image
          className="size-[50px]"
          resizeMode="cover"
          source={require('../../assets/logo.png')}
        /> 
      </View>


      <TouchableOpacity className={`${isNotificationsRoute ? 'opacity-100' : 'opacity-0'} duration-75`} onPress={() => navigation.navigate('Notifications')}>
        <Bell stroke="#006A71" size={40} />
        {showNotificationBadge && (
          <View className="absolute -top-1 right-0 bg-red-500 rounded-full size-3 items-center justify-center">
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}