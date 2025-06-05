import { useCallback, useEffect, useRef } from 'react';
import { AppState, PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import backend from '../api/backend';
import { useAuth } from '../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

const TOKEN_KEY = 'lastPushToken';

export const useNotifications = () => {
  const { isAuthenticated } = useAuth();
  const appState = useRef(AppState.currentState);
  const isSendingRef = useRef(false);

  const checkAndSendToken = useCallback(async () => {
    if (isSendingRef.current || !isAuthenticated) return;
    isSendingRef.current = true;

    try {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );

        if (
          permission === PermissionsAndroid.RESULTS.DENIED ||
          permission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
        ) {
          console.log('[Push] Permiso denegado, eliminando token');
          await backend.delete('/user/push-token');
          await AsyncStorage.removeItem('lastPushToken');
          return;
        }
      }

      const authStatus = await messaging().hasPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        console.log('[Push] Firebase no tiene permiso, eliminando token');
        await backend.delete('/user/push-token');
        await AsyncStorage.removeItem('lastPushToken');
        return;
      }

      const token = await messaging().getToken();
      const lastToken = await AsyncStorage.getItem('lastPushToken');

      if (token && token !== lastToken) {
        await backend.post('/user/push-token', { pushToken: token });
        await AsyncStorage.setItem('lastPushToken', token);
        console.log('[Push] Token actualizado:', token);
      }
    } catch (err) {
      console.error('[Push] Error registrando token push:', err);
    } finally {
      isSendingRef.current = false;
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (nextState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextState === 'active'
      ) {
        checkAndSendToken();
      }
      appState.current = nextState;
    });

    return () => sub.remove();
  }, [checkAndSendToken]);

  useFocusEffect(
    useCallback(() => {
      checkAndSendToken();
    }, [checkAndSendToken])
  );

  useEffect(() => {
    checkAndSendToken();
  }, [checkAndSendToken]);
};
