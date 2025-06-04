import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { Text, TouchableOpacity, View } from "react-native";
import { BookOpen, Calendar, FileText, Home, LogOut, User } from "lucide-react-native";
import { BottomTabNavigator } from "./BottomTabNavigator";
import DoctorsView from "../views/protected/DoctorsView";
import Header from "../components/layout/Header";
import { useAuth } from "../context/AuthContext";
import MedicalRecordView from "../views/protected/MedicalRecordView";

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
    </Drawer.Navigator>
  );
};


const CustomDrawerContent = ({ navigation }: { navigation: any }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  }

  return (
    <View className="flex-1 bg-[#EAF5F6]">
      <View className="bg-secondary px-4 py-[21px] border-b border-b-primary">
        <Text className="text-2xl font-bold text-primary">Menú</Text>
      </View>

      <DrawerContentScrollView contentContainerStyle={{ paddingTop: 0 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}
          className="flex-row items-center gap-3 px-5 py-4 border-b border-primary"
        >
          <Home color="#006A71" size={25} />
          <Text className="text-primary text-lg">Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MainTabs", { screen: "MyAppointments" })}
          className="flex-row items-center gap-3 px-5 py-4 border-b border-primary"
        >
          <Calendar color="#006A71" size={25} />
          <Text className="text-primary text-lg">Turnos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MainTabs", { screen: "Profile" })}
          className="flex-row items-center gap-3 px-5 py-4 border-b border-primary"
        >
          <User color="#006A71" size={25} />
          <Text className="text-primary text-lg">Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {}}
          className="flex-row items-center gap-3 px-5 py-4 border-b border-[#006A71]"
        >
          <BookOpen color="#006A71" size={25} />
          <Text className="text-[#006A71] text-lg">Cartilla</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MedicalRecord")}
          className="flex-row items-center gap-3 px-5 py-4 border-b border-[#006A71]"
        >
          <FileText color="#006A71" size={25} />
          <Text className="text-[#006A71] text-lg">Historia clínica</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>

      <View className="p-5">
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center justify-center gap-2 bg-[#9ACBD0] rounded-lg py-4 shadow-md"
        >
          <LogOut color="#006A71" size={25} />
          <Text className="text-[#006A71] font-bold text-lg">Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
