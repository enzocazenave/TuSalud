import { Text, View, TouchableOpacity, Image } from "react-native";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigators/AuthStackNavigator";
import { useCallback, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { AlertTriangle, Info } from "lucide-react-native";

type Navigation = NativeStackNavigationProp<AuthStackParamList>

export default function LoginView() {
  const { login, error, setError } = useAuth();
  const navigation = useNavigation<Navigation>();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  useFocusEffect(
    useCallback(() => {
      setError(null)
    }, [])
  )

  const handleChange = (field: string, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
  }

  const handleSubmit = async () => {
    if (credentials.email === '' || credentials.password === '') {
      setError('El correo electrónico o la contraseña no puede estar vacío');
      return
    }

    await login(credentials.email, credentials.password);
  }

  return (
    <View className="flex flex-1 gap-12 items-center justify-center px-12 bg-quaternary dark:bg-darksecondary">
      <View className="bg-[#006A71] dark:bg-darkprimary rounded-full">
        <Image
          className="size-36"
          resizeMode="cover"
          source={require('../../assets/logo.png')}
        />
      </View>

      <View className="flex gap-8 items-center justify-center w-full">
        <Text className="text-center text-2xl text-primary dark:text-darkprimary font-bold">Iniciar sesión</Text>

        <Input
          label="Correo electrónico"
          value={credentials.email}
          onChange={handleChange}
          name="email"
        />
        <Input
          label="Contraseña"
          value={credentials.password}
          onChange={handleChange}
          name="password"
          secureTextEntry
        />

        {error
          ? (
            <View className="bg-red-500/10 px-3 py-2 rounded-lg flex-row gap-4 items-center w-full">
              <Info size={20} color="#ee0000" />
              <View className="flex-1">
                <Text className="text-red-500 text-start">{error}</Text>
              </View>
            </View>
          )
          : null
        }


        <Button
          text="Iniciar sesión"
          onPress={handleSubmit}
        />
      </View>

      <View className="flex flex-col gap-4">
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
        >
          <Text className="text-center text-xl text-[#006A71] dark:text-darkprimary">¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('RecoverPassword')}
        >
          <Text className="text-center text-xl text-[#006A71] dark:text-darkprimary">Olvidé mi contraseña</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}