import { View, NativeSyntheticEvent, Text, TextInput, TextInputChangeEventData } from "react-native";

interface Props {
  placeholder?: string;
  label: string;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  value?: string;
}

export default function Input({ placeholder, label, onChange, value }: Props) {
  return (
    <View className="flex flex-col gap-4 w-full">
      <Text className="text-2xl text-[#006A71]">{label}</Text>
      <TextInput
        placeholder={placeholder}
        onChange={onChange} 
        value={value} 
        className="bg-[#9ACBD0] rounded-lg border border-[#006A71] ps-4" 
      />
    </View>
  )
}