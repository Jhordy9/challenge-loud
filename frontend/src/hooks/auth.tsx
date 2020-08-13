import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@ChallengeLOUD:token');

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('login', {
      username,
      password,
    });
    const { token } = response.data;

    localStorage.setItem('@ChallengeLOUD:token', token);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@ChallengeLOUD:token');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ token: data.token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
