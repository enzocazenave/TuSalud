import { View, Text, TextInput } from "react-native";
import { Platform } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface Props {
  placeholder?: string;
  label: string;
  onChange: (field: string, value: string) => void;
  value: string;
  name: string;
  secureTextEntry?: boolean;
}

export default function Input({
  placeholder,
  label,
  onChange,
  name,
  value,
  secureTextEntry
}: Props) {
  const { theme } = useTheme();
  return (
    <View className="flex flex-col gap-2 w-full">
      <Text className="text-xl text-primary dark:text-darkprimary">{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={theme === 'dark' ? '#5CC8D7' : '#006A71'}
        onChangeText={(text) => onChange?.(name, text)}
        value={value}
        className={`
          bg-secondary dark:bg-darktertiary rounded-lg border border-primary dark:border-darkprimary
          shadow-md shadow-black text-primary dark:text-darkprimary
          ${Platform.OS === 'ios' ? 'pl-4' : 'pl-3'}
          ${Platform.OS === "ios" ? 'py-3' : ''}
        `}
        secureTextEntry={secureTextEntry}
        autoCapitalize={secureTextEntry || label === "Correo electrónico" ? "none" : "sentences"}
        autoCorrect={!secureTextEntry}
        autoComplete="off"
      />
    </View>
  )
}