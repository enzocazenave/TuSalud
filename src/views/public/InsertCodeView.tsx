import { Text, View } from "react-native";
import GoBackButton from "../../components/ui/GoBackButton";
import CodeInput from "../../components/ui/CodeInput";
import { useCallback, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigators/AuthStackNavigator";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { Info } from "lucide-react-native";

type Navigation = NativeStackNavigationProp<AuthStackParamList>

export default function RecoverPasswordView() {
  const { validateResetPasswordCode, error, setError } = useAuth();
  const navigation = useNavigation<Navigation>();
  const [code, setCode] = useState<string>('');

  useFocusEffect(
    useCallback(() => {
      setError(null);
    }, [])
  );

  const fillingCallback = async (text: string) => {
    setCode(text);
  };

  const handleVerifyCode = async () => {
    try {
      await validateResetPasswordCode(code);
      navigation.navigate('ResetPassword');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex flex-1 gap-6 items-center px-12 pt-12 bg-quaternary dark:bg-darksecondary">
      <View className="w-full">
        <GoBackButton absolute={false} />
      </View>

      <View className="flex gap-5 justify-center items-center w-full flex-col">
        <View>
          <Text className="text-2xl text-primary dark:text-darkprimary font-medium">
            Recuperar contraseña
          </Text>
          <Text className="text-secondary dark:text-darksecondary">
            Por favor ingrese el código de verificación que le hemos enviado a su correo electrónico.
          </Text>
        </View>
      </View>

      <CodeInput
        cellsQtty={6}
        fillingCallback={fillingCallback}
      />

      {error && (
        <View className="bg-red-500/10 px-3 py-2 rounded-lg flex-row gap-4 items-center w-full">
          <Info size={20} color="#ee0000" />
          <View className="flex-1">
            <Text className="text-red-500 text-start">{error}</Text>
          </View>
        </View>
      )}

      <Button
        text="Verificar código"
        onPress={handleVerifyCode}
        className={`max-w-96 ${code.length !== 6 ? 'opacity-60' : ''}`}
        disabled={code.length !== 6}
      />
    </View>
  );
}
