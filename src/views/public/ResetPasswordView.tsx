import { Text, View } from "react-native";
import GoBackButton from "../../components/ui/GoBackButton";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigators/AuthStack";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

type Navigation = NativeStackNavigationProp<AuthStackParamList>

export default function ResetPasswordView() {
  const { confirmResetPassword } = useAuth();
  const navigation = useNavigation<Navigation>();

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  }

  const handleResetCode = async () => {
    try {
      await confirmResetPassword(form.newPassword, form.confirmPassword);
      navigation.navigate('Login');
    } catch (error) {
      console.log(error); // TODO: Handle error
    }
  }

  return (
    <View className="flex flex-1 gap-6 items-center px-12 pt-12">
      <GoBackButton absolute={false} />

      <View className="flex gap-5 justify-center items-center w-full flex-col">
        <View className="w-full">
          <Text className="text-2xl text-[#006A71] font-medium">Recuperar contraseña</Text>
          <Text className="text-[#447f81]">Ingrese su nueva contraseña.</Text>
        </View>

        <Input 
          placeholder="******" 
          label="Contraseña" 
          onChange={handleChange} 
          value={form.newPassword} 
          name="newPassword" 
          secureTextEntry
        />
        <Input 
          placeholder="******" 
          label="Repite tu contraseña" 
          onChange={handleChange} 
          value={form.confirmPassword} 
          name="confirmPassword" 
          secureTextEntry
        />
        <Button text="Confirmar" onPress={handleResetCode} />
      </View>

    </View>
  )
}