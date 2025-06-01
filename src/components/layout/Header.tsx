import { View, TouchableOpacity, Image } from "react-native";
import { Bell, MenuIcon } from "lucide-react-native";

export default function Header({ navigation }: { navigation: any }) {
  return (
    <View className="bg-secondary py-[10px] flex-row justify-between items-center px-4 border-b border-b-primary">
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

      <TouchableOpacity>
        <Bell stroke="#006A71" size={40} />
       </TouchableOpacity>
    </View>
  )
}