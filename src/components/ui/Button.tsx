import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  text?: string;
  className?: string;
}

export default function Button({ text, className = "", ...rest }: Props) {
  return (
    <TouchableOpacity
      className={`bg-secondary dark:bg-gray-800 rounded-lg px-6 py-3 border-2 border-primary dark:border-gray-600 ${className}`}
      {...rest}
    >
      <Text className="text-xl text-primary dark:text-secondary text-center">{text}</Text>
    </TouchableOpacity>
  );
}