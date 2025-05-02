import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';
import RecoverPasswordView from '../views/RecoverPasswordView';
import InsertCodeView from '../views/InsertCodeView';
import ResetPasswordView from '../views/ResetPasswordView';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RecoverPassword: undefined;
  InsertCode: undefined;
  ResetPassword: undefined;
}

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Register" component={RegisterView} />
      <Stack.Screen name="RecoverPassword" component={RecoverPasswordView} />
      <Stack.Screen name="InsertCode" component={InsertCodeView} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordView} />
    </Stack.Navigator>
  )
}