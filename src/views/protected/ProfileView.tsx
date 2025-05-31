import { Text, View } from "react-native";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function ProfileView() {
  const { logout } = useAuth();

  return (
    <View>
      <Text>Profile</Text>
      <Button onPress={logout} text="Cerrar sesión" />
    </View>
  )
}