import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginView from '../../../src/views/public/LoginView';

const mockLogin = jest.fn();
const mockSetError = jest.fn();
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
  useFocusEffect: (fn: any) => fn(),
}));

jest.mock('../../../src/context/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
    error: null,
    setError: mockSetError,
  }),
}));

jest.mock('../../../src/components/ui/Input', () => {
  const React = require('react');
  const { TextInput } = require('react-native');
  return (props: any) => (
    <TextInput
      testID={`input-${props.name}`}
      value={props.value}
      placeholder={props.label}
      onChangeText={(text: string) => props.onChange(props.name, text)}
    />
  );
});

// Mock Button como TouchableOpacity
jest.mock('../../../src/components/ui/Button', () => {
  const React = require('react');
  const { TouchableOpacity, Text } = require('react-native');
  return (props: any) => (
    <TouchableOpacity testID="login-button" onPress={props.onPress}>
      <Text>{props.text}</Text>
    </TouchableOpacity>
  );
});

describe('LoginView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza inputs y botón', () => {
    const { getByTestId } = render(<LoginView />);
    expect(getByTestId('input-email')).toBeTruthy();
    expect(getByTestId('input-password')).toBeTruthy();
    expect(getByTestId('login-button')).toBeTruthy();
  });

  it('muestra error si campos vacíos', () => {
    const { getByTestId } = render(<LoginView />);
    fireEvent.press(getByTestId('login-button'));
    expect(mockSetError).toHaveBeenCalledWith('El correo electrónico o la contraseña no puede estar vacío');
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('llama login si campos completos', () => {
    const { getByTestId } = render(<LoginView />);
    fireEvent.changeText(getByTestId('input-email'), 'enzo@example.com');
    fireEvent.changeText(getByTestId('input-password'), '123456');
    fireEvent.press(getByTestId('login-button'));
    expect(mockLogin).toHaveBeenCalledWith('enzo@example.com', '123456');
  });

  it('navega a Register', () => {
    const { getByText } = render(<LoginView />);
    fireEvent.press(getByText(/¿No tienes cuenta/i));
    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });

  it('navega a RecoverPassword', () => {
    const { getByText } = render(<LoginView />);
    fireEvent.press(getByText(/Olvid[ée] mi contraseña/i));
    expect(mockNavigate).toHaveBeenCalledWith('RecoverPassword');
  });
});
