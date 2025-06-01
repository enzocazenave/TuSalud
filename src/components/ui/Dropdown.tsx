import { TouchableOpacity, View, Text } from "react-native";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";

export default function Dropdown({ label, children }: { label: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  }

  return (
    <View className="border border-t-0 border-primary">
      <TouchableOpacity onPress={toggleDropdown} className="flex-row items-center justify-between bg-tertiary/30 border-t border-primary px-5 py-3">
        <Text className="text-primary font-bold text-2xl">{label}</Text>
        {isOpen
          ? <ChevronUpIcon size={30} color="#48A6A7" />
          : <ChevronDownIcon size={30} color="#48A6A7" />
        }
      </TouchableOpacity>

      {isOpen && children}
    </View>
  )
}