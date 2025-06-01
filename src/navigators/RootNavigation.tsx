import { NavigationContainer } from "@react-navigation/native";
import { AuthStackNavigator } from "./AuthStackNavigator";
import { useAuth } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";
import { DrawerNavigator } from "./DrawerNavigator";

export const RootNavigation = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated 
        ? <DrawerNavigator /> 
        : <AuthStackNavigator />
      }
      {isLoading && (
        <View className="flex-1 items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-white">
          <ActivityIndicator size="large" color="#006A71" />
        </View>
      )}
    </NavigationContainer>
  )
}