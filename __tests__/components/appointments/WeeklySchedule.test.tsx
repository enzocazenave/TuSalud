import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import WeeklySchedule from '../../../src/components/appointments/WeeklyCalendarAppointments';
import useAppointments from '../../../src/hooks/useAppointments';
import { useTheme } from '../../../src/context/ThemeContext';
import {
  getUserTimeZone,
  getMonthNameFromDateString,
  formatUtcToLocalDate,
} from '../../../src/utils/date';

jest.mock('../../../src/hooks/useAppointments');
jest.mock('../../../src/context/ThemeContext');
jest.mock('../../../src/utils/date');
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('WeeklySchedule', () => {
  const mockGetAppointmentsByDate = jest.fn();

  const renderWithNavigation = (component: React.ReactElement) =>
    render(<NavigationContainer>{component}</NavigationContainer>);

  beforeEach(() => {
    jest.clearAllMocks();

    (useAppointments as jest.Mock).mockReturnValue({
      getAppointmentsByDate: mockGetAppointmentsByDate.mockResolvedValue([]),
      isLoading: { appointmentsByDate: false },
    });

    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });

    (getUserTimeZone as jest.Mock).mockReturnValue('America/Argentina/Buenos_Aires');
    (getMonthNameFromDateString as jest.Mock).mockReturnValue('Julio');
    (formatUtcToLocalDate as jest.Mock).mockImplementation((date) => {
      if (typeof date === 'string') return date;
      return date.toISOString().split('T')[0];
    });
  });

  it('renderiza correctamente y muestra "No hay turnos"', async () => {
    const { getByText } = renderWithNavigation(<WeeklySchedule />);

    await waitFor(() => {
      expect(getByText('Julio')).toBeTruthy();
      expect(getByText('No hay turnos')).toBeTruthy();
      expect(mockGetAppointmentsByDate).toHaveBeenCalled();
    });
  });

  it('permite cambiar la semana y actualiza las citas', async () => {
    const { getByTestId } = renderWithNavigation(<WeeklySchedule />);

    fireEvent.press(getByTestId('prev-week'));
    fireEvent.press(getByTestId('next-week'));

    await waitFor(() => {
      expect(mockGetAppointmentsByDate).toHaveBeenCalledTimes(3);
    });
  });

  it('cambia el día seleccionado al tocar otro', async () => {
    const { getAllByText } = renderWithNavigation(<WeeklySchedule />);
    const dayButtons = getAllByText(/^\d+$/); // Números del calendario

    fireEvent.press(dayButtons[1]);

    await waitFor(() => {
      expect(mockGetAppointmentsByDate).toHaveBeenCalledTimes(2);
    });
  });
});
