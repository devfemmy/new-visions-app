import React, { useState, useMemo } from 'react';

export const SubscribeContext = React.createContext();

export function SubscribeProvider({ children }) {
  const [subscriptionInfo, setSubscriptionInfo] = useState({});

  //   const value = useMemo(() => ({ subscribeInfo, setSubscribeInfo }), [subscribeInfo]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SubscribeContext.Provider value={{ subscriptionInfo, setSubscriptionInfo }}>
      {children}
    </SubscribeContext.Provider>
  );
}
