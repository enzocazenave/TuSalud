import { Text, View } from "react-native";
import GoBackButton from "../../components/ui/GoBackButton";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../navigators/AuthStackNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Info } from "lucide-react-native";

type Navigation = NativeStackNavigationProp<AuthStackParamList>

export default function RecoverPasswordView() {
  const navigation = useNavigation<Navigation>();
  const { requestRecoverPassword, error, setError } = useAuth();

  const [form, setForm] = useState({
    email: "",
  });

  useFocusEffect(
    useCallback(() => {
      setError(null)
    }, [])
  )

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  }

  const handleSubmit = async () => {
    try {
      await requestRecoverPassword(form.email);
      navigation.navigate('InsertCode');
    } catch (error) {
      console.log(error); // TODO: Handle error
    }
  }

  return (
    <View className="flex flex-1 gap-12 items-center px-12 pt-12">
      <View className="w-full">
        <GoBackButton absolute={false} />
      </View>

      <View className="flex gap-5 justify-center items-center w-full flex-col">
        <View>
          <Text className="text-2xl text-[#006A71] font-medium">Recuperar contraseña</Text>
          <Text className="text-[#447f81]">Por favor ingrese su correo electrónico para cambiar su contraseña.</Text>
        </View>

        <Input
          label="Correo electrónico"
          placeholder="Correo electrónico"
          onChange={handleChange}
          value={form.email}
          name="email"
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
        <Button text="Enviar código" onPress={handleSubmit} className="max-w-96" />
      </View>
    </View>
  )
}