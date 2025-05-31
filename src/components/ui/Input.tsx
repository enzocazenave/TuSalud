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
    <View className="flex flex-col gap-3 w-full">
      <Text className="text-xl text-[#006A71]">{label}</Text>
      <TextInput
        placeholder={placeholder}
        onChangeText={(text) => onChange?.(name, text)}
        value={value}
        className="bg-[#9ACBD0] rounded-lg border border-[#006A71] ps-4 shadow-md shadow-black"
        secureTextEntry={secureTextEntry}
        autoCapitalize={secureTextEntry ? "none" : "sentences"}
        autoCorrect={!secureTextEntry}
      />
    </View>
  )
}