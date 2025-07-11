import { renderHook, act } from '@testing-library/react-hooks';
import useUser from '../../src/hooks/useUser';
import backend from '../../src/api/backend';

jest.mock('../../src/api/backend', () => ({
  get: jest.fn(),
  patch: jest.fn(),
  post: jest.fn(),
  delete: jest.fn()
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('useUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getUserData llama a /user y setea loading', async () => {
    backend.get.mockResolvedValueOnce({ data: { data: { name: 'Enzo' } } });

    const { result } = renderHook(() => useUser());

    let data;
    await act(async () => {
      data = await result.current.getUserData();
    });

    expect(backend.get).toHaveBeenCalledWith('/user');
    expect(data).toEqual({ name: 'Enzo' });
    expect(result.current.isLoading.getUserData).toBe(false);
  });

  it('getUserPrepaids llama a /user/prepaids y devuelve datos', async () => {
    const mockData = [{ id: 1, name: 'OSDE' }];
    backend.get.mockResolvedValueOnce({ data: { data: mockData } });

    const { result } = renderHook(() => useUser());

    let data;
    await act(async () => {
      data = await result.current.getUserPrepaids();
    });

    expect(backend.get).toHaveBeenCalledWith('/user/prepaids');
    expect(data).toEqual(mockData);
    expect(result.current.isLoading.getUserPrepaids).toBe(false);
  });

  it('updateUserData llama a PATCH y setea loading', async () => {
    const updatePayload = { full_name: 'Nuevo Nombre' };
    backend.patch.mockResolvedValueOnce({});

    const { result } = renderHook(() => useUser());

    await act(async () => {
      await result.current.updateUserData(updatePayload);
    });

    expect(backend.patch).toHaveBeenCalledWith('/user', updatePayload);
    expect(result.current.isLoading.updateUserData).toBe(false);
  });

  it('updateUserPrepaid borra si el id no es -1 y postea el nuevo', async () => {
    backend.delete.mockResolvedValueOnce({});
    backend.post.mockResolvedValueOnce({});

    const { result } = renderHook(() => useUser());

    const oldPrepaid = { prepaidId: 5 };
    const newPrepaid = { prepaidId: 7 };

    await act(async () => {
      await result.current.updateUserPrepaid(oldPrepaid, newPrepaid);
    });

    expect(backend.delete).toHaveBeenCalledWith('/user/prepaid', {
      data: { prepaidId: 5 }
    });

    expect(backend.post).toHaveBeenCalledWith('/user/prepaid', newPrepaid);
    expect(result.current.isLoading.updateUserPrepaid).toBe(false);
  });

  it('updateUserPrepaid no borra si prepaidId es -1', async () => {
    backend.post.mockResolvedValueOnce({});

    const { result } = renderHook(() => useUser());

    await act(async () => {
      await result.current.updateUserPrepaid({ prepaidId: -1 }, { prepaidId: 99 });
    });

    expect(backend.delete).not.toHaveBeenCalled();
    expect(backend.post).toHaveBeenCalledWith('/user/prepaid', { prepaidId: 99 });
  });
});
