import { Text, View, TouchableOpacity, Image } from "react-native";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigators/AuthStack";

type Navigation = NativeStackNavigationProp<AuthStackParamList>

export default function LoginView() {
  const navigation = useNavigation<Navigation>();

  return (
    <View className="flex flex-1 gap-12 items-center justify-center px-12">
      <View className="bg-[#006A71] rounded-full">
        <Image
          className="size-36"
          resizeMode="cover"
          source={require('../assets/logo.png')}
        />
      </View>
      
      <View className="flex gap-8 items-center justify-center w-full">
        <Input label="Usuario" />
        <Input label="Contraseña" />
        <Button text="Iniciar sesión" />
      </View>

      <View className="flex flex-col gap-4">
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
        >
          <Text className="text-center text-2xl text-[#006A71]">¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('RecoverPassword')}
        >
          <Text className="text-center text-2xl text-[#006A71]">Olvidé mi contraseña</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}