import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { type AxiosResponse, type AxiosInstance } from "axios";
import { Platform, NativeModules } from "react-native";

const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';

const getBaseURL = (): string => {
  const platformConstants = NativeModules?.PlatformConstants;

  const isAndroidEmulator = isAndroid && platformConstants?.Fingerprint?.includes?.('generic');

  const isIOSSimulator = isIOS && platformConstants?.model?.includes?.('Simulator');

  if (isAndroidEmulator) return 'http://10.0.2.2:3000';
  if (isIOSSimulator) return 'http://localhost:3000';

  return 'http://192.168.0.170:3000';
};

const backend: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
}

backend.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

backend.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    const shouldSkipRefresh = ["/auth/login", "/auth/refresh-token"].some(endpoint => originalRequest.url?.includes(endpoint));

    if (error.response?.status === 401 && !originalRequest._retry && !shouldSkipRefresh) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token: string) => {
            if (token) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              return backend(originalRequest);
            }

            throw new Error('No token found');
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await backend.post('/auth/refresh-token');
        const newAccessToken = response?.data?.data.token;

        if (newAccessToken) {
          await AsyncStorage.setItem('accessToken', newAccessToken);
          processQueue(null, newAccessToken);
        }

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return backend(originalRequest);
      } catch (err) {
        processQueue(err, null);
        await AsyncStorage.removeItem('accessToken');
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default backend;