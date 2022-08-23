import React from 'react';

import { AuthProvider } from './auth';
import { LanguageProvider } from './lang';
import { SubscribeProvider } from './subscriptionInfo';

export function GlobalStateProvider({ children }) {
  return (
    <AuthProvider>
      <SubscribeProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </SubscribeProvider>
    </AuthProvider>
  );
}
