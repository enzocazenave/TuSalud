import { TouchableOpacity, View, Text } from "react-native";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";
import { useTheme } from "../../context/ThemeContext";

export default function Dropdown({ label, children }: { label: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const iconColor = theme === 'dark' ? '#5CC8D7' : '#48A6A7';

  return (
    <View className="border border-t-0 border-primary dark:border-darkprimary">
      <TouchableOpacity
        onPress={toggleDropdown}
        className="flex-row items-center justify-between bg-tertiary/30 dark:bg-darktertiary/30 border-t border-primary dark:border-darkprimary px-5 py-3"
      >
        <Text className="text-primary dark:text-darkprimary font-bold text-2xl">{label}</Text>
        {isOpen
          ? <ChevronUpIcon size={30} color={iconColor} />
          : <ChevronDownIcon size={30} color={iconColor} />
        }
      </TouchableOpacity>

      {isOpen && children}
    </View>
  );
}
