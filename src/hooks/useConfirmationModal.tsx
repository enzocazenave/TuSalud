import { useState } from "react";
import ConfirmationModal from "../components/ui/ConfirmationModal";

type Options = {
  title: string;
  message: string;
  confirmText?: string;
};

export default function useConfirmationModal() {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<Options | null>(null);
  const [resolver, setResolver] = useState<(value: boolean) => void>();

  const showConfirmation = (opts: Options): Promise<boolean> => {
    setOptions(opts);
    setVisible(true);
    return new Promise((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleConfirm = () => {
    setVisible(false);
    resolver?.(true);
  };

  const handleCancel = () => {
    setVisible(false);
    resolver?.(false);
  };

  const Confirmation = () => (
    <ConfirmationModal
      visible={visible}
      title={options?.title || ""}
      message={options?.message || ""}
      confirmText={options?.confirmText}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );

  return { showConfirmation, Confirmation };
}