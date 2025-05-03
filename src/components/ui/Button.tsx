import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  text?: string;
  className?: string;
}

export default function Button({ text, className = "", ...rest }: Props) {
  return (
    <TouchableOpacity
      className={`bg-[#48A6A7] rounded-lg px-6 py-3 border-2 border-[#006A71] ${className}`}
      {...rest}
    >
      <Text className="text-xl text-white text-center">{text}</Text>
    </TouchableOpacity>
  );
}