import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { Text, TouchableOpacity, View, Switch } from "react-native";
import { BookOpen, Calendar, FileText, Home, LogOut, User } from "lucide-react-native";
import { BottomTabNavigator } from "./BottomTabNavigator";
import DoctorsView from "../views/protected/DoctorsView";
import Header from "../components/layout/Header";
import { useAuth } from "../context/AuthContext";
import MedicalRecordView from "../views/protected/MedicalRecordView";
import NotificationsView from "../views/protected/NotificationsView";
import { useNotifications } from "../hooks/useNotifications";
import { useTheme } from "../context/ThemeContext";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  useNotifications()
  
  return (
    <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        header: ({ navigation }) => <Header navigation={navigation} />
      }}
    >
      <Drawer.Screen name="MainTabs" component={BottomTabNavigator} options={{ title: "Inicio" }} />
      <Drawer.Screen name="Doctors" component={DoctorsView} />
      <Drawer.Screen name="MedicalRecord" component={MedicalRecordView} />
      <Drawer.Screen name="Notifications" component={NotificationsView} />
    </Drawer.Navigator>
  );
};


const CustomDrawerContent = ({ navigation }: { navigation: any }) => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await logout();
  }

  return (
    <View className={`flex-1 ${theme === 'dark' ? 'bg-gray-900' : 'bg-[#EAF5F6]'}` }>
      <View className="bg-secondary dark:bg-gray-800 px-4 py-[21px] border-b border-b-primary dark:border-b-gray-700">
        <Text className="text-2xl font-bold text-primary dark:text-secondary">Menú</Text>
      </View>

      <DrawerContentScrollView contentContainerStyle={{ paddingTop: 0 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}
          className="flex-row items-center gap-3 px-5 py-4 border-b border-primary dark:border-gray-700"
        >
          <Home color={theme === 'dark' ? '#9ACBD0' : '#006A71'} size={25} />
          <Text className="text-primary dark:text-secondary text-lg">Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MainTabs", { screen: "MyAppointments" })}
          className="flex-row items-center gap-3 px-5 py-4 border-b border-primary dark:border-gray-700"
        >
          <Calendar color={theme === 'dark' ? '#9ACBD0' : '#006A71'} size={25} />
          <Text className="text-primary dark:text-secondary text-lg">Turnos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MainTabs", { screen: "Profile" })}
          className="flex-row items-center gap-3 px-5 py-4 border-b border-primary dark:border-gray-700"
        >
          <User color={theme === 'dark' ? '#9ACBD0' : '#006A71'} size={25} />
          <Text className="text-primary dark:text-secondary text-lg">Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Doctors')}
          className="flex-row items-center gap-3 px-5 py-4 border-b border-[#006A71] dark:border-gray-700"
        >
          <BookOpen color={theme === 'dark' ? '#9ACBD0' : '#006A71'} size={25} />
          <Text className="text-[#006A71] dark:text-secondary text-lg">Cartilla</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MedicalRecord")}
          className="flex-row items-center gap-3 px-5 py-4 border-b border-[#006A71] dark:border-gray-700"
        >
          <FileText color={theme === 'dark' ? '#9ACBD0' : '#006A71'} size={25} />
          <Text className="text-[#006A71] dark:text-secondary text-lg">Historia clínica</Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-between px-5 py-4 border-b border-primary dark:border-gray-700">
          <Text className="text-primary dark:text-secondary text-lg">Modo oscuro</Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            thumbColor={theme === 'dark' ? '#006A71' : '#f4f3f4'}
            trackColor={{ true: '#48A6A7', false: '#767577' }}
          />
        </View>
      </DrawerContentScrollView>

      <View className="p-5">
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center justify-center gap-2 bg-[#9ACBD0] dark:bg-gray-700 rounded-lg py-4 shadow-md"
        >
          <LogOut color={theme === 'dark' ? '#9ACBD0' : '#006A71'} size={25} />
          <Text className="text-[#006A71] dark:text-secondary font-bold text-lg">Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
