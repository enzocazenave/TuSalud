import React from 'react';
import { render } from '@testing-library/react-native';
import SmallAppointmentCard from '../../../src/components/appointments/SmallAppointmentCard';
import { ThemeProvider } from '../../../src/context/ThemeContext';

// Simulamos una cita médica de ejemplo
const appointment = {
  start_time: '2025-07-11T14:30:00.000Z',
  professional: {
    full_name: 'Dra. Carolina Gómez',
  },
  specialty: {
    name: 'Cardiología',
  },
};

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('SmallAppointmentCard', () => {
  it('renderiza nombre del profesional, especialidad y hora', () => {
    const { getByText } = render(
      <ThemeProvider>
        <SmallAppointmentCard appointment={appointment} />
      </ThemeProvider>
    );

    expect(getByText('Dra. Carolina Gómez')).toBeTruthy();
    expect(getByText('Cardiología')).toBeTruthy();
    expect(getByText('11:30')).toBeTruthy(); // 14:30 UTC === 11:30 ART
  });
});
