import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronLeft } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { AuthStackParamList } from "../../navigators/AuthStackNavigator";

type Navigation = NativeStackNavigationProp<AuthStackParamList> 

interface Props {
  absolute?: boolean;
}

export default function GoBackButton({ absolute }: Props) {
  const navigation = useNavigation<Navigation>();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <View className={`${absolute ? 'absolute left-0 top-8 ps-12' : ''} w-full`}>
      <TouchableOpacity 
        className="p-2 bg-primary w-12 h-12 flex justify-center items-center rounded-full" 
        onPress={handleGoBack}
      >
        <ChevronLeft size={30} color="#9ACBD0" />
      </TouchableOpacity>
    </View>
  )
}