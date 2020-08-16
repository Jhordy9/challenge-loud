import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  idLogged: string;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  token: string;
  idLogged: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@ChallengeLOUD:token');
    const idLogged = localStorage.getItem('@ChallengeLOUD:idLogged');

    if (token && idLogged) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, idLogged: JSON.parse(idLogged) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('login', {
      username,
      password,
    });
    const { token, id } = response.data;

    localStorage.setItem('@ChallengeLOUD:token', token);
    localStorage.setItem('@ChallengeLOUD:idLogged', JSON.stringify(id));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, idLogged: id });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@ChallengeLOUD:token');
    localStorage.removeItem('@ChallengeLOUD:idLogged');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token: data.token, signIn, signOut, idLogged: data.idLogged }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
