import { Text, View } from "react-native";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function RegisterView() {
  return (
    <View className="flex flex-1 gap-12 items-center justify-center px-12">
      <View className="flex gap-8 items-center justify-center w-full">
        <Input placeholder="John Doe" label="Nombre completo" />
        <Input placeholder="ejemplo@gmail.com" label="Correo electrónico" />
        <Input placeholder="******" label="Contraseña" />
        <Input placeholder="******" label="Repite tu contraseña" />
        <Button text="Confirmar" />
      </View>
    </View>
  )
}