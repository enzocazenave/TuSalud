import { Text, View } from "react-native";
import GoBackButton from "../../components/ui/GoBackButton";
import CodeInput from "../../components/ui/CodeInput";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigators/AuthStack";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/ui/Button";

type Navigation = NativeStackNavigationProp<AuthStackParamList>

export default function RecoverPasswordView() {
  const navigation = useNavigation<Navigation>();
  const [code, setCode] = useState<string>('');

  const fillingCallback = async (text: string) => {
    setCode(text)
  }

  const handleVerifyCode = async () => {
    navigation.navigate('ResetPassword')
  }

  return (
    <View className="flex flex-1 gap-6 items-center px-12 pt-12">
      <GoBackButton absolute={false} />

      <View className="flex gap-5 justify-center items-center w-full flex-col">
        <View> 
          <Text className="text-2xl text-[#006A71] font-medium">Recuperar contraseña</Text>
          <Text className="text-[#447f81]">Por favor ingrese su correo electrónico para cambiar su contraseña.</Text>
        </View>
      </View>

      <CodeInput 
        cellsQtty={6}
        fillingCallback={fillingCallback}
      />

    <Button
      text="Enviar código"
      onPress={handleVerifyCode}
      className={`max-w-96 ${code.length !== 6 ? 'opacity-60' : ''}`}
      disabled={code.length !== 6}
    />

    </View>
  )
}