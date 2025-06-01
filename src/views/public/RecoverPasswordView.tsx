import { Text, View } from "react-native";
import GoBackButton from "../../components/ui/GoBackButton";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../navigators/AuthStackNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

type Navigation = NativeStackNavigationProp<AuthStackParamList>

export default function RecoverPasswordView() {
  const navigation = useNavigation<Navigation>();
  const { requestRecoverPassword } = useAuth();
  
  const [form, setForm] = useState({
    email: "",
  });

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
        <Button text="Enviar código" onPress={handleSubmit} className="max-w-96" />
      </View>
    </View>
  )
}