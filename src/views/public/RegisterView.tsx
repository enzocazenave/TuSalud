import { Text, View } from "react-native";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import GoBackButton from "../../components/ui/GoBackButton";
import { useCallback, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Info } from "lucide-react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function RegisterView() {
  const { register, error, setError } = useAuth();

  const [credentials, setCredentials] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    if (credentials.fullName === '' || credentials.email === '' || credentials.password === '' || credentials.confirmPassword === '') {
      setError('El nombre, correo electrónico, contraseña o la confirmación de contraseña no puede estar vacío');
      return
    }

    if (credentials.password !== credentials.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return
    }

    await register(credentials.fullName, credentials.email, credentials.password, credentials.confirmPassword);
  }

  return (
    <View className="flex flex-1 gap-12 items-center justify-center px-12">
      <GoBackButton absolute />

      <View className="flex gap-8 items-center justify-center w-full">
        <Text className="text-center text-2xl text-primary font-bold">Crear cuenta</Text>

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
          text="Crear cuenta"
          onPress={handleSubmit}
        />
      </View>
    </View>
  )
}