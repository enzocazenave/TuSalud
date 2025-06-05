import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import GoBackButton from "../../components/ui/GoBackButton";
import useNotificationsScreen from "../../hooks/useNotificationsScreen";
import { Check } from "lucide-react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { formatUtcToLocalDateTime, getUserTimeZone } from "../../utils/date";

export type NotificationsStackParamList = {
  ListOfNotifications: undefined;
}

const Stack = createNativeStackNavigator<NotificationsStackParamList>();

export default function NotificationsView() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ListOfNotifications" component={NotificationsScreen} />
    </Stack.Navigator>
  )
}

const NotificationsScreen = () => {
  const { isLoading, notifications, markAsRead } = useNotificationsScreen()

  return (
    <View className="pt-9 px-5 gap-4">
      <View className="flex-row items-center justify-between">
        <GoBackButton />
        <Text className="text-4xl text-primary font-bold">Notificaciones</Text>
      </View>

      <FlatList
        data={notifications}
        renderItem={({ item }: { item: any }) => <NotificationItem notification={item} markAsRead={() => markAsRead(item.id)} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text className="text-center text-lg text-primary">No hay notificaciones</Text>}
        refreshing={isLoading}
        onRefresh={() => {}}
      />
    </View>
  )
}

const NotificationItem = ({ notification, markAsRead }: { notification: any, markAsRead: () => void }) => {
  const timezone = getUserTimeZone()
  const formattedDate = formatUtcToLocalDateTime(
    notification.createdAt, 
    timezone, 
    { hour12: false, hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'long', year: 'numeric' }
  )

  return (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity 
          className="bg-primary justify-center items-center px-6 rounded-l-xl"
          onPress={markAsRead}
          style={{
            transform: [{ translateX: -2 }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
          }}
        >
          <View className="items-center">
            <Check color="white" size={28} />
            <Text className="text-white text-sm mt-1">Leído</Text>
          </View>
        </TouchableOpacity>
      )}
    >
      <View className="border-b border-primary py-4 gap-1">
        <Text className={`text-lg text-primary`}>
          {notification.message}
        </Text>
        <Text className="text-sm text-primary">
          {formattedDate}
        </Text>
      </View>
    </Swipeable>
  )
}