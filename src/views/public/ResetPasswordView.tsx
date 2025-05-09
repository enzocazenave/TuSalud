import { Text, View } from "react-native";
import GoBackButton from "../../components/ui/GoBackButton";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigators/AuthStack";
import { useNavigation } from "@react-navigation/native";

type Navigation = NativeStackNavigationProp<AuthStackParamList>

export default function ResetPasswordView() {
  const navigation = useNavigation<Navigation>();

  const handleResetCode = () => {
    navigation.navigate('Login');
  }

  return (
    <View className="flex flex-1 gap-6 items-center px-12 pt-12">
      <GoBackButton absolute={false} />

      <View className="flex gap-5 justify-center items-center w-full flex-col">
        <View className="w-full">
          <Text className="text-2xl text-[#006A71] font-medium">Recuperar contraseña</Text>
          <Text className="text-[#447f81]">Ingrese su nueva contraseña.</Text>
        </View>

        <Input placeholder="******" label="Contraseña" />
        <Input placeholder="******" label="Repite tu contraseña" />
        <Button text="Confirmar" onPress={handleResetCode} />
      </View>

    </View>
  )
}