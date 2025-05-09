import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./AuthStack";
import { useAuth } from "../context/AuthContext";
import { BottomTabNavigator } from "./BottomTabNavigator";

export const RootNavigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated 
        ? <BottomTabNavigator /> 
        : <AuthStack />
      }
    </NavigationContainer>
  )
}