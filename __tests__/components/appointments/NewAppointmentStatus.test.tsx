import React from 'react';
import { render } from '@testing-library/react-native';
import NewAppointmentStatus from '../../../src/components/appointments/NewAppointmentStatus';
import { ThemeProvider } from '../../../src/context/ThemeContext';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('../../../src/context/NewAppointmentContext', () => {
  const original = jest.requireActual('../../../src/context/NewAppointmentContext');
  return {
    ...original,
    useNewAppointment: () => ({
      prepaidAffiliation: { prepaid: { name: 'OSDE' } },
      specialty: { name: 'Dermatología' },
      professional: { full_name: 'Dr. Carlos Pérez' },
      slot: {
        date: '2025-07-11',
        start_time: '14:30',
      },
    }),
  };
});

// Mock para timezone
jest.mock('../../../src/utils/date', () => {
  const actual = jest.requireActual('../../../src/utils/date');
  return {
    ...actual,
    getUserTimeZone: () => 'America/Argentina/Buenos_Aires',
  };
});

describe('NewAppointmentStatus', () => {
  it('renderiza todos los pasos con datos válidos', () => {
    const { getByText } = render(
      <ThemeProvider>
        <NewAppointmentStatus />
      </ThemeProvider>
    );

    expect(getByText('1. OSDE')).toBeTruthy();
    expect(getByText('2. Dermatología')).toBeTruthy();
    expect(getByText('3. Dr. Carlos Pérez')).toBeTruthy();
    expect(getByText('4.')).toBeTruthy();
    expect(getByText('11/07/2025')).toBeTruthy();
    expect(getByText('11:30')).toBeTruthy();
  });
});
