import { Text, View, TouchableOpacity, Image } from "react-native";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigators/AuthStackNavigator";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

type Navigation = NativeStackNavigationProp<AuthStackParamList>

export default function LoginView() {
  const { login } = useAuth();
  const navigation = useNavigation<Navigation>();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (field: string, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
  }

  const handleSubmit = async () => {
    await login(credentials.email, credentials.password);
  }

  return (
    <View className="flex flex-1 gap-12 items-center justify-center px-12">
      <View className="bg-[#006A71] rounded-full">
        <Image
          className="size-36"
          resizeMode="cover"
          source={require('../../assets/logo.png')}
        />
      </View>
      
      <View className="flex gap-8 items-center justify-center w-full">
        <Text className="text-center text-2xl text-primary font-bold">Iniciar sesión</Text>
        
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
        <Button 
          text="Iniciar sesión" 
          onPress={handleSubmit} 
        />
      </View>

      <View className="flex flex-col gap-4">
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
        >
          <Text className="text-center text-xl text-[#006A71]">¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('RecoverPassword')}
        >
          <Text className="text-center text-xl text-[#006A71]">Olvidé mi contraseña</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}