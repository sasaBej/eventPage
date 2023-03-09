import React, { useMemo, useState } from 'react';
import { BaseContext } from '../shared-context/BaseContext';
import { createSharedContext } from '../shared-context/StaticallySharedContexts';
import useShareContextDataProxy from '../shared-context/UseShareContextDataProxy';

export interface AuthContextModel extends BaseContext {
  isLoggedIn: boolean;
}

export const { reactContext: AuthContext, contextKey: AuthContextKey } = createSharedContext<AuthContextModel>({
  isLoggedIn: false
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn] = useState<boolean>(false);

  const contextValue = useMemo<AuthContextModel>(() => ({ isLoggedIn }), [isLoggedIn]);

  useShareContextDataProxy(AuthContextKey, contextValue);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
