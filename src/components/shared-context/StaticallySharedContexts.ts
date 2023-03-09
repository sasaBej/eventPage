import { createContext } from 'react';
import { BaseContext } from './BaseContext';
import ContextsStaticDataBus from './ContextsStaticDataBus';

export function createSharedContext<T extends BaseContext>(defaultValue: T) {
  const reactContext = createContext(defaultValue);
  const contextKey = ContextsStaticDataBus.addContextToPool<T>(defaultValue);

  return { contextKey, reactContext };
}
