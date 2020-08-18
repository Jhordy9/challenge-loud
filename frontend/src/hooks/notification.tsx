import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import NotificationContainer from '../components/NotificationContainer';

export interface NotificationMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface NotificationContextData {
  addNotification(message: Omit<NotificationMessage, 'id'>): void;
  removeNotification(id: string): void;
}

const NotificationContext = createContext<NotificationContextData>(
  {} as NotificationContextData,
);

const NotificationProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<NotificationMessage[]>([]);

  const addNotification = useCallback(
    ({ type, title, description }: Omit<NotificationMessage, 'id'>) => {
      const id = uuid();

      const notification = {
        id,
        type,
        title,
        description,
      };

      setMessages(state => [...state, notification]);
    },
    [],
  );

  const removeNotification = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <NotificationContext.Provider
      value={{ addNotification, removeNotification }}
    >
      {children}
      <NotificationContainer messages={messages} />
    </NotificationContext.Provider>
  );
};

function useNotification(): NotificationContextData {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  }

  return context;
}

export { NotificationProvider, useNotification };
