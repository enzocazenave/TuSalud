import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronLeft } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { AuthStackParamList } from "../../navigators/AuthStackNavigator";
import { useTheme } from "../../context/ThemeContext";

type Navigation = NativeStackNavigationProp<AuthStackParamList>;

interface Props {
  absolute?: boolean;
  callback?: () => void;
}

export default function GoBackButton({ absolute, callback }: Props) {
  const navigation = useNavigation<Navigation>();
  const { theme } = useTheme();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      callback?.();
      navigation.goBack();
    }
  };

  const iconColor = theme === "dark" ? "#FFFFFF" : "#9ACBD0";

  return (
    <View className={`${absolute ? "absolute left-0 top-8 ps-12" : ""}`}>
      <TouchableOpacity
        className="p-2 bg-primary dark:bg-darkprimary w-12 h-12 flex justify-center items-center rounded-full"
        onPress={handleGoBack}
      >
        <ChevronLeft size={30} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
}
