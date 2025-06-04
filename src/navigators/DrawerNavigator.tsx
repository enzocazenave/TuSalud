import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";

import { Text, TouchableOpacity, View, Switch } from "react-native";
import { BookOpen, Calendar, FileText, Home, LogOut, User, Moon } from "lucide-react-native";
import { BottomTabNavigator } from "./BottomTabNavigator";
import DoctorsView from "../views/protected/DoctorsView";
import Header from "../components/layout/Header";
import { useAuth } from "../context/AuthContext";
import MedicalRecordView from "../views/protected/MedicalRecordView";
import NotificationsView from "../views/protected/NotificationsView";
import ThemeSettingsView from "../views/protected/ThemeSettingsView";
import { useTheme } from "../context/ThemeContext";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
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
      <Drawer.Screen name="ThemeSettings" component={ThemeSettingsView} options={{ title: 'Tema' }} />
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
    <View className="flex-1 bg-[#EAF5F6] dark:bg-darksecondary">
      <View className="bg-secondary dark:bg-darktertiary px-4 py-[21px] border-b border-b-primary dark:border-b-darkprimary">
        <Text className="text-2xl font-bold text-primary dark:text-darkprimary">Menú</Text>
      </View>

      <DrawerContentScrollView contentContainerStyle={{ paddingTop: 0 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}
          className="flex-row items-center gap-3 px-5 py-4 border-b border-primary dark:border-darkprimary"
        >
          <Home color={theme === 'dark' ? '#5CC8D7' : '#006A71'} size={25} />
          <Text className="text-primary dark:text-darkprimary text-lg">Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MainTabs", { screen: "MyAppointments" })}
          className="flex-row items-center gap-3 px-5 py-4 border-b border-primary dark:border-darkprimary"
        >
          <Calendar color={theme === 'dark' ? '#5CC8D7' : '#006A71'} size={25} />
          <Text className="text-primary dark:text-darkprimary text-lg">Turnos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MainTabs", { screen: "Profile" })}
          className="flex-row items-center gap-3 px-5 py-4 border-b border-primary dark:border-darkprimary"
        >
          <User color={theme === 'dark' ? '#5CC8D7' : '#006A71'} size={25} />
          <Text className="text-primary dark:text-darkprimary text-lg">Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Doctors')}
          className="flex-row items-center gap-3 px-5 py-4 border-b border-[#006A71] dark:border-darkprimary"
        >
          <BookOpen color={theme === 'dark' ? '#5CC8D7' : '#006A71'} size={25} />
          <Text className="text-[#006A71] dark:text-darkprimary text-lg">Cartilla</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MedicalRecord")}
          className="flex-row items-center gap-3 px-5 py-4 border-b border-[#006A71] dark:border-darkprimary"
        >
          <FileText color={theme === 'dark' ? '#5CC8D7' : '#006A71'} size={25} />
          <Text className="text-[#006A71] dark:text-darkprimary text-lg">Historia clínica</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('ThemeSettings')}
          className="flex-row items-center gap-3 px-5 py-4 border-b border-[#006A71] dark:border-darkprimary"
        >
          <Moon color={theme === 'dark' ? '#5CC8D7' : '#006A71'} size={25} />
          <Text className="text-[#006A71] dark:text-darkprimary text-lg">Tema</Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-between px-5 py-4 border-b border-[#006A71] dark:border-darkprimary">
          <View className="flex-row items-center gap-3">
            <Moon color={theme === 'dark' ? '#5CC8D7' : '#006A71'} size={25} />
            <Text className="text-[#006A71] dark:text-darkprimary text-lg">Modo oscuro</Text>
          </View>
          <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
        </View>
      </DrawerContentScrollView>

      <View className="p-5">
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center justify-center gap-2 bg-[#9ACBD0] dark:bg-darktertiary rounded-lg py-4 shadow-md"
        >
          <LogOut color={theme === 'dark' ? '#5CC8D7' : '#006A71'} size={25} />
          <Text className="text-[#006A71] dark:text-darkprimary font-bold text-lg">Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
