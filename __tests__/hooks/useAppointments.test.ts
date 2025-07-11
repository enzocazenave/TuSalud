import { renderHook, act } from '@testing-library/react-hooks';
import useAppointments from '../../src/hooks/useAppointments';
import AsyncStorage from '@react-native-async-storage/async-storage';
import backend from '../../src/api/backend';

// Mockeos
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

jest.mock('../../src/api/backend', () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
}));

describe('useAppointments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.getItem.mockResolvedValue('123');
  });

  it('getMoreRecentAppointment funciona y setea loading', async () => {
    const mockData = { id: 1, name: 'Consulta' };
    backend.get.mockResolvedValueOnce({ data: { data: mockData } });

    const { result } = renderHook(() => useAppointments());

    let response;
    await act(async () => {
      response = await result.current.getMoreRecentAppointment();
    });

    expect(backend.get).toHaveBeenCalledWith('/appointments/patients/123/more-recent');
    expect(response).toEqual(mockData);
    expect(result.current.isLoading.moreRecentAppointment).toBe(false);
  });

  it('getAppointmentsByDate retorna turnos ordenados por hora', async () => {
    const data = [
      { start_time: '15:00' },
      { start_time: '09:00' },
      { start_time: '13:00' }
    ];
    backend.get.mockResolvedValueOnce({ data: { data } });

    const { result } = renderHook(() => useAppointments());

    let response;
    await act(async () => {
      response = await result.current.getAppointmentsByDate('2025-01-01');
    });

    expect(backend.get).toHaveBeenCalledWith('/appointments/patients/123', {
      params: {
        startDate: '2025-01-01',
        endDate: '2025-01-01',
        appointmentStateId: 1
      }
    });

    expect(response.map(a => a.start_time)).toEqual(['09:00', '13:00', '15:00']);
    expect(result.current.isLoading.appointmentsByDate).toBe(false);
  });

  it('createAppointment envía datos correctamente', async () => {
    const appointmentInput = { professionalId: 9 };
    const responseMock = { id: 2 };
    backend.post.mockResolvedValueOnce({ data: responseMock });

    const { result } = renderHook(() => useAppointments());

    let res;
    await act(async () => {
      res = await result.current.createAppointment(appointmentInput);
    });

    expect(backend.post).toHaveBeenCalledWith('/appointments', {
      ...appointmentInput,
      patientId: 123,
    });

    expect(res).toEqual(responseMock);
    expect(result.current.isLoading.createAppointment).toBe(false);
  });

  it('getNextAppointments funciona', async () => {
    const mockList = [{ id: 1 }];
    backend.get.mockResolvedValueOnce({ data: { data: mockList } });

    const { result } = renderHook(() => useAppointments());

    await act(async () => {
      const res = await result.current.getNextAppointments();
      expect(res).toEqual(mockList);
    });

    expect(backend.get).toHaveBeenCalled();
    expect(result.current.isLoading.nextAppointments).toBe(false);
  });

  it('deleteAppointmentById funciona', async () => {
    backend.delete.mockResolvedValueOnce({ data: {} });

    const { result } = renderHook(() => useAppointments());

    await act(async () => {
      await result.current.deleteAppointmentById(42);
    });

    expect(backend.delete).toHaveBeenCalledWith('/appointments/42');
    expect(result.current.isLoading.deleteAppointment).toBe(false);
  });

  it('getAppointments devuelve lista', async () => {
    backend.get.mockResolvedValueOnce({ data: { data: [{ id: 1 }] } });

    const { result } = renderHook(() => useAppointments());

    await act(async () => {
      const res = await result.current.getAppointments();
      expect(res).toEqual([{ id: 1 }]);
    });

    expect(backend.get).toHaveBeenCalledWith('/appointments/patients/123');
    expect(result.current.isLoading.appointments).toBe(false);
  });
});
