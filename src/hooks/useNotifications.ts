import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import backend from '../api/backend';
import { useEffect } from 'react';

const TOKEN_KEY = 'lastPushToken';

export const useNotifications = (userId?: number) => {
  const registerPushToken = async () => {
    try {
      const permission = await messaging().requestPermission();
      const enabled =
        permission === messaging.AuthorizationStatus.AUTHORIZED ||
        permission === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled || !userId) return;

      const token = await messaging().getToken();
      if (!token) return;

      const lastToken = await AsyncStorage.getItem(TOKEN_KEY);

      if (token !== lastToken) {
        await backend.post(`/users/push-token`, {
          pushToken: token,
        });
        await AsyncStorage.setItem(TOKEN_KEY, token);
      }
    } catch (err) {
      if (__DEV__) console.error("Push Token Register Error:", err);
    }
  };

  useEffect(() => {
    if (!userId) return;

    registerPushToken();

    const unsubscribe = messaging().onTokenRefresh(async (newToken) => {
      try {
        if (!newToken) return;

        await backend.post(`/users/push-token`, {
          pushToken: newToken,
        });
        await AsyncStorage.setItem(TOKEN_KEY, newToken);
      } catch (err) {
        if (__DEV__) console.error("Push Token Refresh Error:", err);
      }
    });

    return unsubscribe;
  }, [userId]);

  return null;
};