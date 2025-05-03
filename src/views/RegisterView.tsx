import { View } from "react-native";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import GoBackButton from "../components/ui/GoBackButton";

export default function RegisterView() {
  return (
    <View className="flex flex-1 gap-12 items-center justify-center px-12">
      <GoBackButton absolute />

      <View className="flex gap-8 items-center justify-center w-full">
        <Input placeholder="John Doe" label="Nombre completo" />
        <Input placeholder="ejemplo@gmail.com" label="Correo electrónico" />
        <Input placeholder="******" label="Contraseña" />
        <Input placeholder="******" label="Repite tu contraseña" />
        <Button text="Crear cuenta" />
      </View>
    </View>
  )
}