import React from 'react';

import { AuthProvider } from './auth';
import { NotificationProvider } from './notification';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <NotificationProvider>{children}</NotificationProvider>
  </AuthProvider>
);

export default AppProvider;
