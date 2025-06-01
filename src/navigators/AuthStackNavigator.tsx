import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginView from '../views/public/LoginView';
import RegisterView from '../views/public/RegisterView';
import RecoverPasswordView from '../views/public/RecoverPasswordView';
import InsertCodeView from '../views/public/InsertCodeView';
import ResetPasswordView from '../views/public/ResetPasswordView';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RecoverPassword: undefined;
  InsertCode: undefined;
  ResetPassword: undefined;
}

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Register" component={RegisterView} />
      <Stack.Screen name="RecoverPassword" component={RecoverPasswordView} />
      <Stack.Screen name="InsertCode" component={InsertCodeView} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordView} />
    </Stack.Navigator>
  )
}