import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Dropdown from '../../../src/components/ui/Dropdown';
import { ThemeProvider } from '../../../src/context/ThemeContext';
import { Text } from 'react-native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const renderDropdown = () =>
  render(
    <ThemeProvider>
      <Dropdown label="Opciones">
        <Text testID="dropdown-child">Contenido desplegable</Text>
      </Dropdown>
    </ThemeProvider>
  );

describe('Dropdown', () => {
  it('renderiza con el label y no muestra children por defecto', () => {
    const { getByText, queryByTestId } = renderDropdown();

    expect(getByText('Opciones')).toBeTruthy();
    expect(queryByTestId('dropdown-child')).toBeNull();
  });

  it('togglea el contenido al presionar', () => {
    const { getByText, getByTestId, queryByTestId } = renderDropdown();

    fireEvent.press(getByText('Opciones'));
    expect(getByTestId('dropdown-child')).toBeTruthy(); 

    fireEvent.press(getByText('Opciones'));
    expect(queryByTestId('dropdown-child')).toBeNull();
  });
});
