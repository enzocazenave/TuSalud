import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import backend from "../api/backend";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  isAuthenticated: boolean;
  register: (fullName: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  requestRecoverPassword: (email: string) => Promise<void>;
  validateResetPasswordCode: (code: string) => Promise<void>;
  confirmResetPassword: (newPassword: string, confirmPassword: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [temporalResetPasswordData, setTemporalResetPasswordData] = useState({
    email: "",
    code: ""
  })

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const patientId = await AsyncStorage.getItem('patientId');
      setIsAuthenticated(!!accessToken && !!patientId);
      setIsLoading(false);
    }
    
    checkAuth();
  }, []);

  const register = async (fullName: string, email: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
    }

    try {
      setIsLoading(true);
      const response = await backend.post('/auth/register', { fullName, email, password, roleId: 1 });
      const { token, userId } = response.data.data;

      await AsyncStorage.setItem('accessToken', token);
      await AsyncStorage.setItem('patientId', userId.toString());
      setIsAuthenticated(true);
      setError(null);
    } catch (error: any) {
      setError(errorParser(error));
    } finally {
      setIsLoading(false);
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await backend.post('/auth/login', { email, password });
      const { token, userId } = response.data.data;

      await AsyncStorage.setItem('accessToken', token);
      await AsyncStorage.setItem('patientId', userId.toString());
      setIsAuthenticated(true);
      setError(null);
    } catch (error: any) {
      setError(errorParser(error));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await backend.post("/auth/logout");
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('patientId');
      await AsyncStorage.removeItem('lastPushToken');
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestRecoverPassword = async (email: string) => {
    try {
      setIsLoading(true);
      await backend.post('/auth/forgot-password', { email });
      setTemporalResetPasswordData({ 
        email: email, 
        code: "" 
      });
      setError(null);
    } catch (error: any) {
      setError(errorParser(error));
      throw new Error("Ocurrio un error");
    } finally {
      setIsLoading(false);
    }
  }

  const validateResetPasswordCode = async (code: string) => {
    try {
      await backend.post('/auth/validate-reset-password-code', { 
        code,
        email: temporalResetPasswordData.email
      });
      setTemporalResetPasswordData({ 
        email: temporalResetPasswordData.email, 
        code 
      });
      setError(null);
    } catch (error: any) {
      setError(errorParser(error));  
      throw new Error("Ocurrio un error");
    } finally {
      setIsLoading(false);
    }
  }

  const confirmResetPassword = async (newPassword: string, confirmPassword: string) => {
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      throw new Error("Las contraseñas no coinciden");  
    }
    
    try {
      setIsLoading(true);
      await backend.post('/auth/reset-password', { 
        email: temporalResetPasswordData.email, 
        code: temporalResetPasswordData.code, 
        password: newPassword 
      });
      setTemporalResetPasswordData({
        email: "",
        code: ""
      });
      setError(null);
    } catch (error: any) {
      setError(errorParser(error));
      throw new Error("Ocurrio un error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, register, login, logout, requestRecoverPassword, confirmResetPassword, validateResetPasswordCode, isLoading, error, setError
    }}>
      {children}
    </AuthContext.Provider>
  );
}

const errorParser = (error: any) => {
  if (Array.isArray(error.response.data.error)) {
    return error.response.data.error.map((e: any) => e.message).join(', ');
  }

  return error.response.data.error;
}