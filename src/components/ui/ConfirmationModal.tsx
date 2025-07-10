import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';

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
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <Pressable
        className="flex-1 bg-black/60 dark:bg-black/80 justify-center items-center"
        onPress={onCancel}
      >
        <Pressable
          className="bg-white dark:bg-gray-800 w-[85%] rounded-2xl p-6 shadow-lg relative items-center"
          onPress={(e) => e.stopPropagation()}
        >
          <TouchableOpacity onPress={onCancel} className="absolute top-4 left-4 p-2 w-12 h-12 flex justify-center items-center rounded-full bg-primary">
            <ChevronLeft size={30} color="#9ACBD0" />
          </TouchableOpacity>

          <Text className="text-xl font-bold text-primary dark:text-secondary mt-2">{title}</Text>

          <Text className="text-center mt-4 text-base text-black/70 dark:text-secondary/80">{message}</Text>

          <TouchableOpacity
            onPress={onConfirm}
            className="bg-primary mt-6 px-6 py-3 rounded-xl shadow-md"
          >
            <Text className="text-white font-bold text-base">{confirmText}</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
