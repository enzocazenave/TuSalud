import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModal({
  visible,
  title,
  message,
  confirmText = "Confirmar",
  onCancel,
  onConfirm
}: Props) {
  const { theme } = useTheme();
  const iconColor = theme === 'dark' ? '#FFFFFF' : '#9ACBD0';

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <Pressable
        className="flex-1 bg-black/60 justify-center items-center"
        onPress={onCancel}
      >
        <Pressable
          className="bg-white dark:bg-darktertiary w-[85%] rounded-2xl p-6 shadow-lg relative items-center"
          onPress={(e) => e.stopPropagation()}
        >
          <TouchableOpacity
            onPress={onCancel}
            className="absolute top-4 left-4 p-2 w-12 h-12 flex justify-center items-center rounded-full bg-primary dark:bg-darkprimary"
          >
            <ChevronLeft size={30} color={iconColor} />
          </TouchableOpacity>

          <Text className="text-xl font-bold text-primary dark:text-darkprimary mt-2">{title}</Text>

          <Text className="text-center mt-4 text-base text-primary/70 dark:text-darkprimary/70">
            {message}
          </Text>

          <TouchableOpacity
            onPress={onConfirm}
            className="bg-primary dark:bg-darkprimary mt-6 px-6 py-3 rounded-xl shadow-md"
          >
            <Text className="text-white font-bold text-base">{confirmText}</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
