import { View, TouchableOpacity, Image } from "react-native";
import { Bell, MenuIcon } from "lucide-react-native";

export default function Header({ navigation }: { navigation: any }) {

  const isNotificationsRoute = navigation.getState().routes[navigation.getState().index].name !== 'Notifications';

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
      </TouchableOpacity>
    </View>
  )
}