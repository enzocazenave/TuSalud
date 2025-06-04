import { View, Text, TextInput } from "react-native";
import { Platform } from "react-native";

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
  return (
    <View className="flex flex-col gap-2 w-full">
      <Text className="text-xl text-primary">{label}</Text>
      <TextInput
        placeholder={placeholder}
        onChangeText={(text) => onChange?.(name, text)}
        value={value}
        className={`
          bg-secondary rounded-lg border border-primary 
          shadow-md shadow-black
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