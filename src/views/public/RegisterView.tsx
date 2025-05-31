import { View } from "react-native";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import GoBackButton from "../../components/ui/GoBackButton";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function RegisterView() {
  const { register } = useAuth();

  const [credentials, setCredentials] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field: string, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
  }

  const handleSubmit = async () => {
    await register(credentials.fullName, credentials.email, credentials.password, credentials.confirmPassword);
  }
  
  return (
    <View className="flex flex-1 gap-12 items-center justify-center px-12">
      <GoBackButton absolute />

      <View className="flex gap-8 items-center justify-center w-full">
        <Input 
          placeholder="John Doe" 
          label="Nombre completo"
          onChange={handleChange}
          value={credentials.fullName}
          name="fullName"
        />
        <Input 
          placeholder="ejemplo@gmail.com" 
          label="Correo electrónico"
          onChange={handleChange}
          value={credentials.email}
          name="email"
        />
        <Input 
          placeholder="******" 
          label="Contraseña"
          onChange={handleChange}
          value={credentials.password}
          name="password"
          secureTextEntry
        />
        <Input 
          placeholder="******" 
          label="Repite tu contraseña"
          onChange={handleChange}
          value={credentials.confirmPassword}
          name="confirmPassword"
          secureTextEntry
        />
        <Button 
          text="Crear cuenta" 
          onPress={handleSubmit} 
        />
      </View>
    </View>
  )
}