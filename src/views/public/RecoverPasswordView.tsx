import { Text, View } from "react-native";
import GoBackButton from "../../components/ui/GoBackButton";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../navigators/AuthStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Navigation = NativeStackNavigationProp<AuthStackParamList>

export default function RecoverPasswordView() {
  const navigation = useNavigation<Navigation>();

  return (
    <View className="flex flex-1 gap-12 items-center px-12 pt-12">
      <GoBackButton absolute={false} />

      <View className="flex gap-5 justify-center items-center w-full flex-col">
        <View>
          <Text className="text-2xl text-[#006A71] font-medium">Recuperar contraseña</Text>
          <Text className="text-[#447f81]">Por favor ingrese su correo electrónico para cambiar su contraseña.</Text>
        </View>
        
        <Input label="Correo electrónico" placeholder="Correo electrónico" />
        <Button text="Enviar código" onPress={() => navigation.navigate('InsertCode')} className="max-w-96" />
      </View>
    </View>
  )
}