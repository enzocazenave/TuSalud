import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NewAppointmentProvider, useNewAppointment } from '../../src/context/NewAppointmentContext';
import { Button, Text } from 'react-native';

const TestComponent = () => {
  const {
    prepaidAffiliation,
    setPrepaidAffiliation,
    specialty,
    setSpecialty,
    professional,
    setProfessional,
    slot,
    setSlot,
    resetNewAppointment,
  } = useNewAppointment();

  return (
    <>
      <Text testID="prepaid">{prepaidAffiliation?.name || 'empty'}</Text>
      <Text testID="specialty">{specialty?.name || 'empty'}</Text>
      <Text testID="professional">{professional?.name || 'empty'}</Text>
      <Text testID="slot">{slot?.time || 'empty'}</Text>

      <Button title="Set All" onPress={() => {
        setPrepaidAffiliation({ name: 'Osde' });
        setSpecialty({ name: 'Clínica' });
        setProfessional({ name: 'Dr. House' });
        setSlot({ time: '14:30' });
      }} />

      <Button title="Reset" onPress={resetNewAppointment} />
    </>
  );
};

describe('NewAppointmentContext', () => {
  it('actualiza y resetea los valores correctamente', () => {
    const { getByText, getByTestId } = render(
      <NewAppointmentProvider>
        <TestComponent />
      </NewAppointmentProvider>
    );

    // Estado inicial vacío
    expect(getByTestId('prepaid').children[0]).toBe('empty');
    expect(getByTestId('specialty').children[0]).toBe('empty');
    expect(getByTestId('professional').children[0]).toBe('empty');
    expect(getByTestId('slot').children[0]).toBe('empty');

    // Setear todos los valores
    fireEvent.press(getByText('Set All'));

    expect(getByTestId('prepaid').children[0]).toBe('Osde');
    expect(getByTestId('specialty').children[0]).toBe('Clínica');
    expect(getByTestId('professional').children[0]).toBe('Dr. House');
    expect(getByTestId('slot').children[0]).toBe('14:30');

    // Resetear
    fireEvent.press(getByText('Reset'));

    expect(getByTestId('prepaid').children[0]).toBe('empty');
    expect(getByTestId('specialty').children[0]).toBe('empty');
    expect(getByTestId('professional').children[0]).toBe('empty');
    expect(getByTestId('slot').children[0]).toBe('empty');
  });
});
