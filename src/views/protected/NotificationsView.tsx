import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import GoBackButton from "../../components/ui/GoBackButton";

export type NotificationsStackParamList = {
  Notifications: undefined;
}

const Stack = createNativeStackNavigator<NotificationsStackParamList>();

export default function NotificationsView() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  )
}

const Notifications = () => {
  return (
    <View className="pt-9 px-5 gap-4 bg-quaternary dark:bg-darksecondary flex-1">
      <View className="flex-row items-center justify-between">
        <GoBackButton />
        <Text className="text-4xl text-primary dark:text-darkprimary font-bold">Notificaciones</Text>
      </View>
    </View>
  )
}