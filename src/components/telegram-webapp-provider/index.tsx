'use client';

import { createContext, ReactNode, useEffect } from 'react';
export const TelegramWebappContext = createContext<{}>({});

export default function TelegramWebappProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const WebApp = window?.Telegram?.WebApp;
    WebApp.ready();
    WebApp.expand();
  }, []);
  return <TelegramWebappContext.Provider value={{}}>{children}</TelegramWebappContext.Provider>;
}
