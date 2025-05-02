import { Text, TouchableOpacity } from "react-native";

interface Props {
  text: string;
}

export default function Button({ text }: Props) {
  return (
    <TouchableOpacity className="bg-[#48A6A7] rounded-lg px-6 py-3 text-white border border-[#006A71]">
      <Text className="text-2xl text-white">{text}</Text>
    </TouchableOpacity>
  )
}