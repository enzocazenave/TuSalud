import { View, Text } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field';
import { useState } from 'react';

interface Props {
  cellsQtty: number;
  fillingCallback: (text: string) => void;
}

export default function CodeInput({ cellsQtty, fillingCallback }: Props) {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: cellsQtty });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleOnChangeText = (text: string) => {
    setValue(text);
    fillingCallback(text);
  };

  return (
    <View className="items-center justify-center mt-8">
      <Text className="mb-4 text-xl text-primary dark:text-darkprimary font-bold">
        Ingresá el código
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={handleOnChangeText}
        cellCount={cellsQtty}
        rootStyle={{ justifyContent: 'space-between', width: '80%' }}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            onLayout={getCellOnLayoutHandler(index)}
            className={`w-12 h-12 border-2 rounded-lg items-center justify-center
              ${isFocused
                ? 'border-primary dark:border-darkprimary'
                : 'border-gray-300 dark:border-gray-600'}
            `}
          >
            <Text className="text-xl text-primary dark:text-darkprimary">
              {symbol || (isFocused ? <Cursor /> : '')}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
