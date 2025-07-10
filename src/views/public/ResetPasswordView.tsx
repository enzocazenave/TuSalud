import {Text, View} from 'react-native';
import GoBackButton from '../../components/ui/GoBackButton';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigators/AuthStackNavigator';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useAuth} from '../../context/AuthContext';
import {useCallback, useState} from 'react';
import {Info} from 'lucide-react-native';

type Navigation = NativeStackNavigationProp<AuthStackParamList>;

export default function ResetPasswordView() {
  const {confirmResetPassword, error, setError} = useAuth();
  const navigation = useNavigation<Navigation>();

  const [form, setForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  useFocusEffect(
    useCallback(() => {
      setError(null);
    }, []),
  );

  const handleChange = (field: string, value: string) => {
    setForm({...form, [field]: value});
  };

  const handleResetCode = async () => {
    try {
      await confirmResetPassword(form.newPassword, form.confirmPassword);
      navigation.navigate('Login');
    } catch (error) {
      console.log(error); // TODO: Handle error
    }
  };

  return (
    <View className="flex flex-1 gap-6 items-center px-12 pt-12">
      <View className="w-full">
        <GoBackButton absolute={false} />
      </View>

      <View className="flex gap-5 justify-center items-center w-full flex-col">
        <View className="w-full">
          <Text className="text-2xl text-primary dark:text-secondary font-medium">
            Recuperar contraseña
          </Text>
          <Text className="text-[#447f81] dark:text-secondary/80">
            Ingrese su nueva contraseña.
          </Text>
        </View>

        <Input
          placeholder="******"
          label="Contraseña"
          onChange={handleChange}
          value={form.newPassword}
          name="newPassword"
          secureTextEntry
        />
        <Input
          placeholder="******"
          label="Repite tu contraseña"
          onChange={handleChange}
          value={form.confirmPassword}
          name="confirmPassword"
          secureTextEntry
        />

        {error ? (
          <View className="bg-red-500/10 px-3 py-2 rounded-lg flex-row gap-4 items-center w-full">
            <Info size={20} color="#ee0000" />
            <View className="flex-1">
              <Text className="text-red-500 text-start">{error}</Text>
            </View>
          </View>
        ) : null}
        <Button text="Confirmar" onPress={handleResetCode} />
      </View>
    </View>
  );
}
