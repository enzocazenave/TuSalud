import { View, Text, TextInput } from "react-native";

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
        className="bg-secondary rounded-lg border border-primary ps-4 shadow-md shadow-black"
        secureTextEntry={secureTextEntry}
        autoCapitalize={secureTextEntry ? "none" : "sentences"}
        autoCorrect={!secureTextEntry}
      />
    </View>
  )
}